import { useEffect, useState } from "react";
import { requestMyArticles } from "./api";
import type { ArticleRecord } from "./types";

export function useSavedArticles() {
  const [savedArticles, setSavedArticles] = useState<ArticleRecord[]>([]);
  const [isLoadingSavedArticles, setIsLoadingSavedArticles] = useState(true);

  const refreshSavedArticles = async () => {
    try {
      setIsLoadingSavedArticles(true);
      const articles = await requestMyArticles();
      setSavedArticles(articles);
    } catch (error) {
      console.error("Load saved articles failed:", error);
    } finally {
      setIsLoadingSavedArticles(false);
    }
  };

  useEffect(() => {
    void refreshSavedArticles();
  }, []);

  return {
    savedArticles,
    setSavedArticles,
    isLoadingSavedArticles,
    refreshSavedArticles,
  };
}
