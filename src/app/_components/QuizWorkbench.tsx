"use client";

import { useMemo, useRef, useState, useTransition } from "react";
import { ArticleComposer } from "./quiz-workbench/ArticleComposer";
import { ArticleContentModal } from "./quiz-workbench/ArticleContentModal";
import {
  requestQuiz,
  requestSaveArticle,
  requestSaveQuizAttempt,
  requestSummary,
} from "./quiz-workbench/api";

import { CancelQuizModal } from "./quiz-workbench/CancelQuizModal";
import { HistorySidebar } from "./quiz-workbench/HistorySidebar";
import { QuizCard } from "./quiz-workbench/QuizCard";
import { ResultCard } from "./quiz-workbench/ResultCard";
import { SummaryCard } from "./quiz-workbench/SummaryCard";
import type {
  ArticleRecord,
  QuizQuestion,
  ReviewItem,
  View,
} from "./quiz-workbench/types";
import { useSavedArticles } from "./quiz-workbench/useSavedArticles";
import { findMatchingSavedArticleId, slugify } from "./quiz-workbench/utils";
import { WorkbenchScaffold } from "./quiz-workbench/WorkbenchScaffold";

export function QuizWorkbench() {
  const [view, setView] = useState<View>("compose");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [draftArticle, setDraftArticle] = useState<ArticleRecord | null>(null);
  const { savedArticles, setSavedArticles, refreshSavedArticles } =
    useSavedArticles();

  const [selectedArticleId, setSelectedArticleId] = useState<string | null>(
    null,
  );
  const [quizIndex, setQuizIndex] = useState(0);
  const [quizAnswers, setQuizAnswers] = useState<number[]>([]);
  const [showContentModal, setShowContentModal] = useState(false);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [isGeneratingSummary, setIsGeneratingSummary] = useState(false);
  const [isGeneratingQuiz, setIsGeneratingQuiz] = useState(false);
  const [isSavingAndLeaving, setIsSavingAndLeaving] = useState(false);
  const isSavingAndLeavingRef = useRef(false);
  const [isPending, startTransition] = useTransition();

  const selectedArticle = useMemo(
    () =>
      savedArticles.find((article) => article.id === selectedArticleId) ?? null,
    [savedArticles, selectedArticleId],
  );
  const activeArticle = selectedArticle ?? draftArticle;
  const currentQuestion = activeArticle?.quiz[quizIndex] ?? null;
  const savedMatchId = activeArticle
    ? findMatchingSavedArticleId(activeArticle, savedArticles)
    : null;
  const reviewItems = useMemo<ReviewItem[]>(() => {
    if (!activeArticle) return [];
    return activeArticle.quiz.map((question, index) => {
      const chosenIndex = quizAnswers[index] ?? null;
      return {
        question,
        chosenIndex,
        isCorrect: chosenIndex === question.correctIndex,
      };
    });
  }, [activeArticle, quizAnswers]);
  const score = reviewItems.filter((item) => item.isCorrect).length;
  const isComposeDisabled =
    !title.trim() || !content.trim() || isGeneratingSummary || isPending;

  const setQuizForActiveArticle = (quiz: QuizQuestion[]) => {
    if (selectedArticleId) {
      setSavedArticles((current) =>
        current.map((article) =>
          article.id === selectedArticleId ? { ...article, quiz } : article,
        ),
      );
      return;
    }
    setDraftArticle((current) => (current ? { ...current, quiz } : current));
  };

  const handleGenerateSummary = async () => {
    const trimmedTitle = title.trim();
    const trimmedContent = content.trim();
    if (!trimmedTitle || !trimmedContent) return;

    try {
      setIsGeneratingSummary(true);
      const summary = await requestSummary(trimmedTitle, trimmedContent);
      startTransition(() => {
        setSelectedArticleId(null);
        setDraftArticle({
          id: slugify(trimmedTitle),
          title: trimmedTitle,
          content: trimmedContent,
          summary,
          quiz: [],
        });
        setView("summary");
      });
    } catch (error) {
      console.error("Generate summary failed:", error);
    } finally {
      setIsGeneratingSummary(false);
    }
  };

  const persistActiveArticle = async () => {
    if (!activeArticle) return null;

    const savedArticle = await requestSaveArticle({
      id: selectedArticleId ?? savedMatchId ?? undefined,
      title: activeArticle.title,
      content: activeArticle.content,
      summary: activeArticle.summary,
      quiz: activeArticle.quiz,
    });

    await refreshSavedArticles();
    return savedArticle.id;
  };

  const handleSaveArticle = async () => {
    if (!activeArticle) return;

    try {
      const articleId = await persistActiveArticle();
      if (!articleId) return;

      startTransition(() => {
        setSelectedArticleId(articleId);
        setView("summary");
        setIsSidebarOpen(true);
      });
    } catch (error) {
      console.error("Save article failed:", error);
    }
  };

  const handleSaveAndLeave = async () => {
    if (isSavingAndLeavingRef.current) return;

    isSavingAndLeavingRef.current = true;
    setIsSavingAndLeaving(true);

    try {
      const articleId = await persistActiveArticle();

      if (articleId && activeArticle && quizAnswers.length > 0) {
        await requestSaveQuizAttempt({
          articleId,
          answers: quizAnswers,
          score,
          total: activeArticle.quiz.length,
        });
      }
    } catch (error) {
      console.error("Save before leave failed:", error);
    } finally {
      isSavingAndLeavingRef.current = false;
      setIsSavingAndLeaving(false);
    }

    startTransition(() => {
      setSelectedArticleId(null);
      setDraftArticle(null);
      setTitle("");
      setContent("");
      setQuizAnswers([]);
      setQuizIndex(0);
      setShowContentModal(false);
      setShowCancelModal(false);
      setView("compose");
      setIsSidebarOpen(true);
    });
  };

  const handleSelectHistory = (articleId: string) => {
    setSelectedArticleId(articleId);
    setView("summary");
    setShowContentModal(false);
    setShowCancelModal(false);
  };

  const handleStartQuiz = async () => {
    if (!activeArticle) return;
    try {
      setIsGeneratingQuiz(true);
      const quiz = await requestQuiz(
        activeArticle.title,
        activeArticle.content,
        activeArticle.summary,
      );
      startTransition(() => {
        setQuizForActiveArticle(quiz);
        setQuizAnswers([]);
        setQuizIndex(0);
        setShowCancelModal(false);
        setView("quiz");
      });
    } catch (error) {
      console.error("Generate quiz failed:", error);
    } finally {
      setIsGeneratingQuiz(false);
    }
  };

  const handleAnswer = (answerIndex: number) => {
    if (!activeArticle || !currentQuestion) return;
    startTransition(() => {
      const nextAnswers = [...quizAnswers];
      nextAnswers[quizIndex] = answerIndex;
      setQuizAnswers(nextAnswers);
      if (quizIndex === activeArticle.quiz.length - 1) {
        setView("result");
        return;
      }

      setQuizIndex((current) => current + 1);
    });
  };

  const handleRestartQuiz = () => {
    setQuizAnswers([]);
    setQuizIndex(0);
    setShowCancelModal(false);
    setView("quiz");
  };

  const handleConfirmCancel = () => {
    setShowCancelModal(false);
    setSelectedArticleId(null);
    setDraftArticle(null);
    setTitle("");
    setContent("");
    setQuizAnswers([]);
    setQuizIndex(0);
    setView("compose");
  };

  let contentView = null;
  if (view === "compose") {
    contentView = (
      <ArticleComposer
        title={title}
        content={content}
        isPending={isGeneratingSummary}
        isDisabled={isComposeDisabled}
        onTitleChange={setTitle}
        onContentChange={setContent}
        onGenerate={handleGenerateSummary}
      />
    );
  }
  if (view === "summary" && activeArticle) {
    contentView = (
      <SummaryCard
        article={activeArticle}
        isSaved={Boolean(savedMatchId)}
        isPending={isPending}
        isQuizPending={isGeneratingQuiz}
        onSeeContent={() => setShowContentModal(true)}
        onSave={handleSaveArticle}
        onTakeQuiz={handleStartQuiz}
      />
    );
  }
  if (view === "quiz" && activeArticle && currentQuestion) {
    contentView = (
      <QuizCard
        question={currentQuestion}
        currentIndex={quizIndex}
        total={activeArticle.quiz.length}
        isPending={isPending}
        onAnswer={handleAnswer}
        onCancel={() => setShowCancelModal(true)}
      />
    );
  }
  if (view === "result" && activeArticle) {
    contentView = (
      <ResultCard
        score={score}
        total={activeArticle.quiz.length}
        items={reviewItems}
        isSavingAndLeaving={isSavingAndLeaving}
        onRestart={handleRestartQuiz}
        onSaveAndLeave={handleSaveAndLeave}
      />
    );
  }
  return (
    <div className="min-h-screen px-4 py-6 md:px-6 md:py-8">
      <div className="mx-auto max-w-310">
        <WorkbenchScaffold
          isLocked={false}
          isSidebarOpen={isSidebarOpen}
          items={savedArticles}
          selectedArticleId={selectedArticleId}
          onToggleSidebar={() => setIsSidebarOpen((current) => !current)}
          onSelectHistory={handleSelectHistory}
          mobileSidebar={
            <HistorySidebar
              items={savedArticles}
              selectedArticleId={selectedArticleId}
              onSelect={(articleId) => {
                handleSelectHistory(articleId);
                setIsSidebarOpen(false);
              }}
            />
          }
        >
          {contentView}
          {showCancelModal ? (
            <CancelQuizModal
              onGoBack={() => setShowCancelModal(false)}
              onCancelQuiz={handleConfirmCancel}
            />
          ) : null}
          {showContentModal && activeArticle ? (
            <ArticleContentModal
              article={activeArticle}
              onClose={() => setShowContentModal(false)}
            />
          ) : null}
        </WorkbenchScaffold>
      </div>
    </div>
  );
}
