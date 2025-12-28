"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";

type Issue = {
  slug: string;
  label: string;
  month: string;
  year: number;
  pages: string;
  theme: string;
};

type IssueCarouselProps = {
  issues: Issue[];
};

export default function IssueCarousel({ issues }: IssueCarouselProps) {
  const [active, setActive] = useState(0);
  const touchStart = useRef<number | null>(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setActive((prev) => (prev + 1) % issues.length);
    }, 7000);
    return () => clearInterval(timer);
  }, [issues.length]);

  const handlePrev = () => {
    setActive((prev) => (prev - 1 + issues.length) % issues.length);
  };

  const handleNext = () => {
    setActive((prev) => (prev + 1) % issues.length);
  };

  const handleTouchStart = (event: React.TouchEvent<HTMLDivElement>) => {
    touchStart.current = event.touches[0]?.clientX ?? null;
  };

  const handleTouchEnd = (event: React.TouchEvent<HTMLDivElement>) => {
    if (touchStart.current === null) return;
    const delta = touchStart.current - event.changedTouches[0].clientX;
    if (Math.abs(delta) > 40) {
      delta > 0 ? handleNext() : handlePrev();
    }
    touchStart.current = null;
  };

  return (
    <div className="relative overflow-hidden rounded-3xl border border-slate-200/70 bg-white shadow-lg">
      <div
        className="flex transition-transform duration-700 ease-out"
        style={{ transform: `translateX(-${active * 100}%)` }}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {issues.map((issue) => (
          <div key={issue.slug} className="w-full flex-shrink-0 p-8 md:p-10">
            <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
              <div className="space-y-3">
                <p className="text-xs uppercase tracking-[0.35em] text-slate-500">
                  Latest Issue
                </p>
                <h3 className="font-display text-3xl text-slate-900 md:text-4xl">
                  {issue.label} - {issue.month} {issue.year}
                </h3>
                <p className="max-w-xl text-sm text-slate-600">{issue.theme}</p>
                <div className="flex flex-wrap gap-3 text-xs text-slate-500">
                  <span className="rounded-full bg-slate-100 px-3 py-1">Pages {issue.pages}</span>
                  <span className="rounded-full bg-slate-100 px-3 py-1">Peer-reviewed</span>
                  <span className="rounded-full bg-slate-100 px-3 py-1">Open access options</span>
                </div>
              </div>
              <div className="flex flex-col gap-3">
                <Button asChild className="rounded-full bg-slate-900 text-white hover:bg-slate-800">
                  <Link href={`/archive?issue=${issue.slug}`}>View Issue</Link>
                </Button>
                <Button variant="outline" asChild className="rounded-full border-slate-300">
                  <Link href="/search">Search Articles</Link>
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="absolute left-6 top-1/2 hidden -translate-y-1/2 gap-2 md:flex">
        <button
          type="button"
          onClick={handlePrev}
          className="rounded-full border border-slate-200 bg-white p-2 text-slate-700 shadow-sm transition hover:border-slate-300"
          aria-label="Previous issue"
        >
          <ArrowLeft className="h-4 w-4" />
        </button>
        <button
          type="button"
          onClick={handleNext}
          className="rounded-full border border-slate-200 bg-white p-2 text-slate-700 shadow-sm transition hover:border-slate-300"
          aria-label="Next issue"
        >
          <ArrowRight className="h-4 w-4" />
        </button>
      </div>

      <div className="flex items-center justify-center gap-2 pb-6">
        {issues.map((_, index) => (
          <button
            key={index}
            type="button"
            className={`h-2.5 w-2.5 rounded-full transition ${
              active === index ? "bg-slate-900" : "bg-slate-300"
            }`}
            onClick={() => setActive(index)}
            aria-label={`Go to issue ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
