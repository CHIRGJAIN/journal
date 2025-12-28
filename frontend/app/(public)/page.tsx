import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  BookOpen,
  Globe2,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import EditorialBoardSlider from "@/components/site/editorial-board-slider";
import IssueCarousel from "@/components/site/issue-carousel";
import SectionHeader from "@/components/site/section-header";
import {
  editorialBoard,
  featuredArticles,
  journalMeta,
  journalStats,
  latestIssues,
} from "@/lib/site-data";

export default function Home() {
  return (
    <div>
      <section className="relative overflow-hidden bg-hero">
        <div className="absolute inset-0 bg-grid opacity-60" />
        <div className="absolute -left-20 top-10 h-64 w-64 rounded-full bg-sky-200/50 blur-3xl animate-float" />
        <div className="absolute right-10 top-20 h-48 w-48 rounded-full bg-emerald-200/60 blur-3xl animate-float-slow" />
        <div className="relative mx-auto w-full max-w-6xl px-6 py-20 md:py-28">
          <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr]">
            <div className="space-y-6">
              <p className="text-xs uppercase tracking-[0.35em] text-slate-500">
                {journalMeta.publisher} | {journalMeta.location}
              </p>
              <h1 className="font-display text-4xl text-slate-900 md:text-6xl">
                Trinix Journal of Advanced Engineering and Sciences
              </h1>
              <p className="max-w-2xl text-base text-slate-600 md:text-lg">
                {journalMeta.tagline}
              </p>
              <div className="flex flex-wrap gap-3 text-xs text-slate-600">
                <span className="rounded-full border border-slate-200 bg-white px-3 py-1">
                  {journalMeta.issnPrint}
                </span>
                <span className="rounded-full border border-slate-200 bg-white px-3 py-1">
                  {journalMeta.issnOnline}
                </span>
                <span className="rounded-full border border-slate-200 bg-white px-3 py-1">
                  Peer-reviewed
                </span>
                <span className="rounded-full border border-slate-200 bg-white px-3 py-1">
                  Hybrid open access
                </span>
              </div>
              <div className="flex flex-wrap gap-4">
                <Button asChild className="rounded-full bg-slate-900 text-white hover:bg-slate-800">
                  <Link href="/manuscript-submission">
                    Submit Manuscript
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button variant="outline" asChild className="rounded-full border-slate-300">
                  <Link href="/archive">Explore Archive</Link>
                </Button>
              </div>
            </div>

            <div className="glass-card relative rounded-3xl p-6 md:p-8">
              <div className="space-y-4">
                <p className="text-xs uppercase tracking-[0.3em] text-slate-500">
                  Call for Papers
                </p>
                <h2 className="font-display text-2xl text-slate-900">
                  Submit by Nov 15, 2025
                </h2>
                <p className="text-sm text-slate-600">
                  Fast-track review for interdisciplinary work in AI, energy, materials,
                  and resilient infrastructure. APC waived for invited submissions.
                </p>
                <div className="grid gap-3 text-sm text-slate-600">
                  <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white/70 p-3">
                    <ShieldCheck className="h-5 w-5 text-emerald-500" />
                    <div>
                      <p className="font-semibold text-slate-900">Rigorous peer review</p>
                      <p className="text-xs">Double-blind with conflict safeguards</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white/70 p-3">
                    <BadgeCheck className="h-5 w-5 text-sky-500" />
                    <div>
                      <p className="font-semibold text-slate-900">Ethics-first publishing</p>
                      <p className="text-xs">COPE-aligned editorial governance</p>
                    </div>
                  </div>
                </div>
                <Link
                  href="/manuscript-submission"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-slate-900"
                >
                  View author guidelines <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>

          <div className="mt-10 grid gap-4 rounded-3xl border border-slate-200 bg-white/70 p-6 md:grid-cols-4">
            {journalStats.map((stat) => (
              <div key={stat.label} className="space-y-1">
                <p className="text-xs uppercase tracking-[0.3em] text-slate-400">{stat.label}</p>
                <p className="font-display text-2xl text-slate-900">{stat.value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-6 py-16" id="latest-issue">
        <SectionHeader
          label="Latest issue"
          title="Curated research for emerging engineering frontiers"
          description="Each issue features peer-reviewed studies, applied research, and technology briefs aligned with global priorities."
        />
        <div className="mt-8">
          <IssueCarousel issues={latestIssues} />
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-6 py-16">
        <SectionHeader
          label="Featured articles"
          title="High-impact work selected by the editorial board"
          description="Explore our highlighted articles across AI, sustainability, materials, and energy systems."
        />
        <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {featuredArticles.map((article) => (
            <article
              key={article.id}
              className="group rounded-3xl border border-slate-200/70 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="flex items-center justify-between text-xs text-slate-500">
                <span className="rounded-full bg-slate-100 px-3 py-1">{article.category}</span>
                <span>{article.issue}</span>
              </div>
              <h3 className="mt-4 font-display text-2xl text-slate-900 group-hover:text-slate-950">
                {article.title}
              </h3>
              <p className="mt-2 text-sm text-slate-600">{article.abstract}</p>
              <p className="mt-4 text-xs text-slate-500">By {article.authors}</p>
              <div className="mt-4 flex flex-wrap gap-2 text-xs text-slate-500">
                {article.keywords.map((keyword) => (
                  <span key={keyword} className="rounded-full border border-slate-200 px-2 py-1">
                    {keyword}
                  </span>
                ))}
              </div>
              <Link
                href={`/article/${article.id}`}
                className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-slate-900"
              >
                Read article <ArrowRight className="h-4 w-4" />
              </Link>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-6 py-16">
        <SectionHeader
          label="Publishing advantage"
          title="A premium workflow built for trusted research"
          description="Transparent editorial practices and modern infrastructure ensure fast, compliant publishing for global readers."
        />
        <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {[
            {
              icon: BookOpen,
              title: "Structured peer review",
              description: "Double-blind review with decision traceability and reviewer recognition.",
            },
            {
              icon: Sparkles,
              title: "AI-assisted discovery",
              description: "Semantic tagging improves discoverability across indexing agencies.",
            },
            {
              icon: ShieldCheck,
              title: "Ethics and compliance",
              description: "COPE-aligned policies with plagiarism and authorship checks.",
            },
            {
              icon: Globe2,
              title: "Global reach",
              description: "Optimized for international readership with open access options.",
            },
          ].map((item) => (
            <div
              key={item.title}
              className="rounded-3xl border border-slate-200/70 bg-white p-6 shadow-sm"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-900 text-white">
                <item.icon className="h-5 w-5" />
              </div>
              <h3 className="mt-4 font-semibold text-slate-900">{item.title}</h3>
              <p className="mt-2 text-sm text-slate-600">{item.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-6 py-16">
        <EditorialBoardSlider members={editorialBoard} />
      </section>

      <section className="mx-auto w-full max-w-6xl px-6 pb-20">
        <div className="rounded-3xl bg-slate-900 p-8 text-white md:p-10">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div className="space-y-3">
              <p className="text-xs uppercase tracking-[0.3em] text-white/60">Ready to publish</p>
              <h2 className="font-display text-3xl">Accelerate your next breakthrough</h2>
              <p className="max-w-xl text-sm text-white/70">
                Submit your manuscript to Trinix Journal and benefit from rapid editorial
                triage, ethical review, and premium publishing support.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Button asChild className="rounded-full bg-white text-slate-900 hover:bg-white/90">
                <Link href="/manuscript-submission">Submit Manuscript</Link>
              </Button>
              <Button
                variant="outline"
                asChild
                className="rounded-full border-white/40 text-white hover:bg-white/10"
              >
                <Link href="/contact">Talk to the editorial office</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
