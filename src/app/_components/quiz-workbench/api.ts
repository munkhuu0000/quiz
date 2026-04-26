import type { ArticleRecord, QuizQuestion } from "./types";

type GraphQLErrorItem = {
  message?: unknown;
};

type GraphQLPayload<T> = {
  data?: T;
  errors?: GraphQLErrorItem[];
};

type SummaryResponse = {
  summary?: unknown;
  error?: unknown;
};

type QuizResponse = {
  quiz?: unknown;
  error?: unknown;
};

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

async function graphqlRequest<T>(
  query: string,
  variables?: Record<string, unknown>,
) {
  const response = await fetch("/api/graphql", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query, variables }),
  });

  const payload = (await response.json()) as GraphQLPayload<T>;

  if (!response.ok || payload.errors?.length) {
    const firstError = payload.errors?.[0];
    const message =
      isRecord(firstError) && typeof firstError.message === "string"
        ? firstError.message
        : "GraphQL request failed";

    throw new Error(message);
  }

  if (typeof payload.data === "undefined") {
    throw new Error("GraphQL data is missing");
  }

  return payload.data;
}

export async function requestSummary(
  articleTitle: string,
  articleContent: string,
) {
  const response = await fetch("/api/generateAI", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ articleTitle, articleContent }),
  });

  const data = (await response.json()) as SummaryResponse;

  if (!response.ok) {
    throw new Error(
      typeof data.error === "string" ? data.error : "Summary request failed",
    );
  }

  const summary = typeof data.summary === "string" ? data.summary.trim() : "";

  if (!summary) {
    throw new Error("Summary хоосон ирлээ");
  }

  return summary;
}

export async function requestQuiz(
  articleTitle: string,
  articleContent: string,
  articleSummary: string,
) {
  const response = await fetch("/api/generateQuiz", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ articleTitle, articleContent, articleSummary }),
  });

  const data = (await response.json()) as QuizResponse;

  if (!response.ok) {
    throw new Error(
      typeof data.error === "string" ? data.error : "Quiz request failed",
    );
  }

  if (!Array.isArray(data.quiz) || data.quiz.length !== 5) {
    throw new Error("Quiz 5 асуулттай ирсэнгүй");
  }

  return data.quiz as QuizQuestion[];
}

type MyArticlesResponse = {
  myArticles: ArticleRecord[];
};

export async function requestMyArticles() {
  const data = await graphqlRequest<MyArticlesResponse>(`
    query MyArticles {
      myArticles {
        id
        title
        content
        summary
        quiz {
          id
          prompt
          options
          correctIndex
          explanation
        }
      }
    }
  `);

  return data.myArticles;
}

type SaveArticleInput = {
  id?: string;
  title: string;
  content: string;
  summary: string;
  quiz: QuizQuestion[];
};

type SaveArticleResponse = {
  saveArticle: ArticleRecord;
};

export async function requestSaveArticle(input: SaveArticleInput) {
  const data = await graphqlRequest<SaveArticleResponse>(
    `
      mutation SaveArticle($input: SaveArticleInput!) {
        saveArticle(input: $input) {
          id
          title
          content
          summary
          quiz {
            id
            prompt
            options
            correctIndex
            explanation
          }
        }
      }
    `,
    { input },
  );

  return data.saveArticle;
}

type SaveQuizAttemptInput = {
  articleId: string;
  answers: number[];
  score: number;
  total: number;
};

export async function requestSaveQuizAttempt(input: SaveQuizAttemptInput) {
  const data = await graphqlRequest<{ saveQuizAttempt: { id: string } }>(
    `
      mutation SaveQuizAttempt($input: SaveQuizAttemptInput!) {
        saveQuizAttempt(input: $input) {
          id
        }
      }
    `,
    { input },
  );

  return data.saveQuizAttempt;
}
