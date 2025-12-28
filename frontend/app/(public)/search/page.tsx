"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { ArrowRight, Filter, Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import PageHeader from "@/components/site/page-header";
import QuickLinksSidebar from "@/components/site/quick-links-sidebar";
import { featuredArticles, searchFilters } from "@/lib/site-data";

type SearchResult = {
  id: string;
  title: string;
  abstract: string;
  authors: string;
  category?: string;
  issue?: string;
};

export default function SearchPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get("query") ?? "";
  const issueFilter = searchParams.get("issue");
  const issueLabel = useMemo(() => {
    if (!issueFilter) return null;
    const match = issueFilter.match(/volume-(\d+)-issue-(\d+)/);
    return match ? `Vol ${match[1]} Issue ${match[2]}` : issueFilter;
  }, [issueFilter]);

  const [queryInput, setQueryInput] = useState(initialQuery);
  const [activeQuery, setActiveQuery] = useState(initialQuery);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");

  useEffect(() => {
    setQueryInput(initialQuery);
    setActiveQuery(initialQuery);
  }, [initialQuery]);

  const localResults = useMemo<SearchResult[]>(
    () =>
      featuredArticles.map((article) => ({
        id: article.id,
        title: article.title,
        abstract: article.abstract,
        authors: article.authors,
        category: article.category,
        issue: article.issue,
      })),
    []
  );

  const runSearch = useCallback(
    async (query: string, category: string, issue: string | null) => {
    setStatus("loading");
    const normalizedQuery = query.trim().toLowerCase();
    let data: SearchResult[] = [];
    let usedLocal = false;

    try {
      if (process.env.NEXT_PUBLIC_API_URL) {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/manuscripts/public`);
        if (!res.ok) throw new Error("Failed request");
        const apiData = await res.json();
        data = apiData.map((item: any) => ({
          id: item.id,
          title: item.title,
          abstract: item.abstract ?? "Abstract available on request.",
          authors: item.author?.name ?? "Editorial team",
          category: item.category ?? "Research article",
        }));
      } else {
        data = localResults;
        usedLocal = true;
      }
    } catch (error) {
      data = localResults;
      usedLocal = true;
    }

    if (normalizedQuery) {
      data = data.filter((item) =>
        [item.title, item.abstract, item.authors].some((field) =>
          field.toLowerCase().includes(normalizedQuery)
        )
      );
    }

    if (category !== "All") {
      data = data.filter((item) => item.category === category);
    }

    if (issue && (usedLocal || data.some((item) => item.issue))) {
      data = data.filter((item) => item.issue === issue);
    }

    setResults(data);
    setStatus("idle");
    },
    [localResults]
  );

  useEffect(() => {
    runSearch(activeQuery, selectedCategory, issueLabel);
  }, [activeQuery, selectedCategory, issueLabel, runSearch]);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setActiveQuery(queryInput);
    if (queryInput.trim()) {
      router.push(`/search?query=${encodeURIComponent(queryInput.trim())}`);
    }
  };

  return (
    <div className="mx-auto w-full max-w-6xl px-6 py-10">
      <PageHeader
        eyebrow="Article search"
        title="Find published research and issue highlights"
        description="Search by title, author, or keyword. Refine results by topic areas and issue collections."
      />

      <div className="mt-10 grid gap-10 lg:grid-cols-[2fr_1fr]">
        <div className="space-y-6">
          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-4 rounded-3xl border border-slate-200/70 bg-white p-6 shadow-sm md:flex-row md:items-center"
          >
            <Input
              value={queryInput}
              onChange={(event) => setQueryInput(event.target.value)}
              placeholder="Search by title, author, or keyword"
              className="h-11 flex-1 rounded-full"
            />
            <Button type="submit" className="h-11 rounded-full bg-slate-900 text-white hover:bg-slate-800">
              {status === "loading" ? <Loader2 className="h-4 w-4 animate-spin" /> : "Search"}
            </Button>
          </form>

          <div className="rounded-3xl border border-slate-200/70 bg-white p-6 shadow-sm">
            <div className="flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-slate-500">
              <Filter className="h-4 w-4" />
              Filters
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              {["All", ...searchFilters].map((filter) => (
                <button
                  key={filter}
                  type="button"
                  onClick={() => setSelectedCategory(filter)}
                  className={`rounded-full border px-3 py-1 text-xs transition ${
                    selectedCategory === filter
                      ? "border-slate-900 bg-slate-900 text-white"
                      : "border-slate-200 text-slate-600 hover:border-slate-300"
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>
            {issueLabel && (
              <p className="mt-4 text-xs text-slate-500">
                Filtering by issue: <span className="text-slate-900">{issueLabel}</span>
              </p>
            )}
          </div>

          <div className="space-y-4">
            {status === "loading" && (
              <div className="rounded-2xl border border-slate-200 bg-white p-6 text-sm text-slate-500">
                Loading results...
              </div>
            )}

            {status !== "loading" && results.length === 0 && (
              <div className="rounded-2xl border border-dashed border-slate-200 bg-white p-6 text-sm text-slate-500">
                No results found. Try adjusting your search or filters.
              </div>
            )}

            {results.map((result) => (
              <article
                key={result.id}
                className="rounded-3xl border border-slate-200/70 bg-white p-6 shadow-sm transition hover:shadow-lg"
              >
                <div className="flex flex-wrap items-center justify-between gap-3 text-xs text-slate-500">
                  <span className="rounded-full bg-slate-100 px-3 py-1">
                    {result.category ?? "Research article"}
                  </span>
                  <span>Article ID {result.id}</span>
                </div>
                <h2 className="mt-4 font-display text-2xl text-slate-900">{result.title}</h2>
                <p className="mt-2 text-sm text-slate-600">{result.abstract}</p>
                <p className="mt-3 text-xs text-slate-500">By {result.authors}</p>
                <Link
                  href={`/article/${result.id}`}
                  className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-slate-900"
                >
                  View article <ArrowRight className="h-4 w-4" />
                </Link>
              </article>
            ))}
          </div>
        </div>

        <QuickLinksSidebar />
      </div>
    </div>
  );
}
