import PageHeader from "@/components/site/page-header";
import QuickLinksSidebar from "@/components/site/quick-links-sidebar";
import { journalMeta } from "@/lib/site-data";

export default function AboutPage() {
  return (
    <div className="mx-auto w-full max-w-6xl px-6 py-10">
      <PageHeader
        eyebrow="About the journal"
        title="A home for advanced engineering and scientific discovery"
        description="Trinix Journal of Advanced Engineering and Sciences is a bi-monthly, peer-reviewed journal published by Trinix Pvt Ltd."
      />

      <div className="mt-10 grid gap-10 lg:grid-cols-[2fr_1fr]">
        <div className="space-y-6">
          <section className="rounded-3xl border border-slate-200/70 bg-white p-8 shadow-sm">
            <h2 className="font-display text-2xl text-slate-900">Mission and scope</h2>
            <p className="mt-3 text-sm text-slate-600">
              {journalMeta.shortTitle} publishes original research, reviews, and applied
              studies in engineering, AI and ML, advanced materials, sustainability, and
              technology innovation. We focus on work that advances industry practice,
              academic rigor, and societal impact.
            </p>
            <div className="mt-4 grid gap-3 text-sm text-slate-600 md:grid-cols-2">
              <div className="rounded-2xl border border-slate-200/70 bg-slate-50 p-4">
                <p className="font-semibold text-slate-900">Publication model</p>
                <p className="mt-2">Hybrid open access with optional APC waivers.</p>
              </div>
              <div className="rounded-2xl border border-slate-200/70 bg-slate-50 p-4">
                <p className="font-semibold text-slate-900">Review cadence</p>
                <p className="mt-2">Double-blind peer review with editorial oversight.</p>
              </div>
            </div>
          </section>

          <section className="rounded-3xl border border-slate-200/70 bg-white p-8 shadow-sm">
            <h2 className="font-display text-2xl text-slate-900">Publisher</h2>
            <p className="mt-3 text-sm text-slate-600">
              {journalMeta.publisher} is a Delhi-based technology company dedicated to
              ethical research dissemination, open innovation, and public impact. The
              journal is governed by an independent editorial board to ensure academic
              integrity and transparency.
            </p>
          </section>

          <section className="rounded-3xl border border-slate-200/70 bg-white p-8 shadow-sm">
            <h2 className="font-display text-2xl text-slate-900">Focus areas</h2>
            <ul className="mt-4 grid gap-3 text-sm text-slate-600 md:grid-cols-2">
              {[
                "Engineering systems and automation",
                "AI, ML, and data-intensive applications",
                "Materials, manufacturing, and nanotechnology",
                "Energy, climate, and sustainability",
                "Robotics and cyber-physical systems",
                "Technology policy and innovation management",
              ].map((item) => (
                <li key={item} className="rounded-2xl border border-slate-200/70 bg-slate-50 p-4">
                  {item}
                </li>
              ))}
            </ul>
          </section>
        </div>

        <QuickLinksSidebar />
      </div>
    </div>
  );
}
