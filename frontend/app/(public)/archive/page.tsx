"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { ArrowRight, Download } from "lucide-react";

import { Button } from "@/components/ui/button";
import PageHeader from "@/components/site/page-header";
import QuickLinksSidebar from "@/components/site/quick-links-sidebar";
import { archiveIssues } from "@/lib/site-data";
import { cn } from "@/lib/utils";

export default function ArchivePage() {
  const searchParams = useSearchParams();
  const selectedIssue = searchParams.get("issue");
  const [selectedYear, setSelectedYear] = useState("All");
  const [selectedVolume, setSelectedVolume] = useState("All");
  const [visibleCount, setVisibleCount] = useState(6);

  const years = useMemo(
    () => Array.from(new Set(archiveIssues.map((issue) => issue.year))).sort((a, b) => b - a),
    []
  );

  const volumes = useMemo(
    () =>
      Array.from(new Set(archiveIssues.map((issue) => issue.volume))).sort((a, b) => b - a),
    []
  );

  const filtered = archiveIssues.filter((issue) => {
    if (selectedYear !== "All" && issue.year !== Number(selectedYear)) return false;
    if (selectedVolume !== "All" && issue.volume !== Number(selectedVolume)) return false;
    return true;
  });

  const visibleIssues = filtered.slice(0, visibleCount);

  return (
    <div className="mx-auto w-full max-w-6xl px-6 py-10">
      <PageHeader
        eyebrow="Journal archive"
        title="Volumes, issues, and full archives"
        description="Browse issue-level collections, explore highlights, and access published articles across the journal timeline."
      />

      <div className="mt-10 grid gap-10 lg:grid-cols-[2fr_1fr]">
        <div className="space-y-6">
          <div className="flex flex-wrap gap-4 rounded-2xl border border-slate-200/70 bg-white p-4 shadow-sm">
            <label className="text-xs text-slate-500">
              Year
              <select
                value={selectedYear}
                onChange={(event) => {
                  setSelectedYear(event.target.value);
                  setVisibleCount(6);
                }}
                className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700"
              >
                <option value="All">All</option>
                {years.map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </select>
            </label>
            <label className="text-xs text-slate-500">
              Volume
              <select
                value={selectedVolume}
                onChange={(event) => {
                  setSelectedVolume(event.target.value);
                  setVisibleCount(6);
                }}
                className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700"
              >
                <option value="All">All</option>
                {volumes.map((volume) => (
                  <option key={volume} value={volume}>
                    Vol {volume}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <div className="grid gap-6">
            {visibleIssues.map((issue) => (
              <div
                key={issue.slug}
                className={cn(
                  "rounded-3xl border border-slate-200/70 bg-white p-6 shadow-sm transition hover:shadow-lg",
                  selectedIssue === issue.slug && "ring-2 ring-slate-900/10"
                )}
              >
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <p className="text-xs uppercase tracking-[0.3em] text-slate-500">
                      Volume {issue.volume} - Issue {issue.issue}
                    </p>
                    <h2 className="mt-2 font-display text-2xl text-slate-900">
                      {issue.month} {issue.year}
                    </h2>
                  </div>
                  <div className="rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-xs text-slate-600">
                    Pages {issue.pages} | {issue.articleCount} articles
                  </div>
                </div>
                <ul className="mt-4 flex flex-wrap gap-2 text-xs text-slate-500">
                  {issue.highlights.map((highlight) => (
                    <li key={highlight} className="rounded-full border border-slate-200 px-3 py-1">
                      {highlight}
                    </li>
                  ))}
                </ul>
                <div className="mt-5 flex flex-wrap gap-3">
                  <Button asChild className="rounded-full bg-slate-900 text-white hover:bg-slate-800">
                    <Link href={`/search?issue=${issue.slug}`}>
                      View Issue <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                  <Button variant="outline" className="rounded-full border-slate-300" disabled>
                    <Download className="mr-2 h-4 w-4" />
                    PDF Coming Soon
                  </Button>
                </div>
              </div>
            ))}
          </div>

          {visibleCount < filtered.length && (
            <div className="flex justify-center">
              <Button
                variant="outline"
                className="rounded-full border-slate-300"
                onClick={() => setVisibleCount((count) => count + 6)}
              >
                Load more issues
              </Button>
            </div>
          )}

          {filtered.length === 0 && (
            <div className="rounded-2xl border border-dashed border-slate-200 p-6 text-sm text-slate-500">
              No issues found for the selected filters.
            </div>
          )}
        </div>

        <QuickLinksSidebar />
      </div>
    </div>
  );
}
