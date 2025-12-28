"use client";

import { useEffect, useMemo, useState } from "react";
import { useParams } from "next/navigation";
import { Calendar, FileDown, FileText } from "lucide-react";

import { Button } from "@/components/ui/button";
import QuickLinksSidebar from "@/components/site/quick-links-sidebar";
import { featuredArticles } from "@/lib/site-data";

type Article = {
  id: string;
  title: string;
  abstract: string;
  authors: string;
  updatedAt?: string;
  contentUrl?: string;
  keywords?: string[];
  category?: string;
  doi?: string;
};

export default function ArticlePage() {
  const { id } = useParams();
  const [article, setArticle] = useState<Article | null>(null);
  const [status, setStatus] = useState<"loading" | "ready" | "error">("loading");

  const localArticle = useMemo(
    () => featuredArticles.find((item) => item.id === id),
    [id]
  );

  useEffect(() => {
    if (!id) return;
    const fetchArticle = async () => {
      try {
        if (!process.env.NEXT_PUBLIC_API_URL) {
          if (localArticle) setArticle({ ...localArticle, authors: localArticle.authors });
          setStatus("ready");
          return;
        }

        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/manuscripts/public/${id}`);
        if (!res.ok) throw new Error("Failed request");
        const data = await res.json();
        setArticle({
          id: data.id ?? String(id),
          title: data.title ?? "Untitled article",
          abstract: data.abstract ?? "Abstract available on request.",
          authors: data.author?.name ?? "Editorial team",
          updatedAt: data.updatedAt,
          contentUrl: data.contentUrl,
          keywords: data.keywords ?? [],
          category: data.category ?? "Research article",
          doi: data.doi,
        });
        setStatus("ready");
      } catch (error) {
        if (localArticle) {
          setArticle({ ...localArticle, authors: localArticle.authors });
          setStatus("ready");
        } else {
          setStatus("error");
        }
      }
    };
    fetchArticle();
  }, [id, localArticle]);

  if (status === "loading") {
    return <div className="mx-auto w-full max-w-6xl px-6 py-10">Loading article...</div>;
  }

  if (status === "error" || !article) {
    return (
      <div className="mx-auto w-full max-w-6xl px-6 py-10">
        <div className="rounded-3xl border border-dashed border-slate-200 bg-white p-8 text-sm text-slate-600">
          Article not found. Try searching the archive for related work.
        </div>
      </div>
    );
  }

  const publishedDate = article.updatedAt
    ? new Date(article.updatedAt).toLocaleDateString()
    : "Sep 2025";

  return (
    <div className="mx-auto w-full max-w-6xl px-6 py-10">
      <div className="grid gap-10 lg:grid-cols-[2fr_1fr]">
        <div className="space-y-6">
          <div className="rounded-3xl border border-slate-200/70 bg-white p-8 shadow-sm">
            <p className="text-xs uppercase tracking-[0.3em] text-slate-500">
              {article.category ?? "Research article"}
            </p>
            <h1 className="mt-3 font-display text-3xl text-slate-900 md:text-4xl">
              {article.title}
            </h1>
            <p className="mt-3 text-sm text-slate-600">By {article.authors}</p>
            <div className="mt-4 flex flex-wrap items-center gap-3 text-xs text-slate-500">
              <span className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-3 py-1">
                <Calendar className="h-3.5 w-3.5" />
                Published {publishedDate}
              </span>
              {article.doi && (
                <span className="rounded-full bg-slate-100 px-3 py-1">DOI {article.doi}</span>
              )}
            </div>
            {article.keywords?.length ? (
              <div className="mt-4 flex flex-wrap gap-2 text-xs text-slate-500">
                {article.keywords.map((keyword) => (
                  <span key={keyword} className="rounded-full border border-slate-200 px-3 py-1">
                    {keyword}
                  </span>
                ))}
              </div>
            ) : null}
          </div>

          <div className="rounded-3xl border border-slate-200/70 bg-white p-8 shadow-sm">
            <h2 className="font-display text-2xl text-slate-900">Abstract</h2>
            <p className="mt-3 text-sm text-slate-600 leading-relaxed">{article.abstract}</p>
          </div>

          <div className="rounded-3xl border border-slate-200/70 bg-white p-8 shadow-sm">
            <h2 className="font-display text-2xl text-slate-900">Article resources</h2>
            <p className="mt-2 text-sm text-slate-600">
              Access the full manuscript PDF and citation details.
            </p>
            <div className="mt-4 flex flex-wrap gap-3">
              <Button
                className="rounded-full bg-slate-900 text-white hover:bg-slate-800"
                onClick={() => article.contentUrl && window.open(article.contentUrl, "_blank")}
                disabled={!article.contentUrl}
              >
                <FileText className="mr-2 h-4 w-4" />
                {article.contentUrl ? "View PDF" : "PDF pending"}
              </Button>
              <Button variant="outline" className="rounded-full border-slate-300">
                <FileDown className="mr-2 h-4 w-4" />
                Download citation
              </Button>
            </div>
          </div>
        </div>

        <QuickLinksSidebar />
      </div>
    </div>
  );
}
