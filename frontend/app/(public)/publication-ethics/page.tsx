import PageHeader from "@/components/site/page-header";
import QuickLinksSidebar from "@/components/site/quick-links-sidebar";

export default function PublicationEthicsPage() {
  return (
    <div className="mx-auto w-full max-w-6xl px-6 py-10">
      <PageHeader
        eyebrow="Publication ethics"
        title="Ethics-first scholarly publishing"
        description="We follow COPE guidelines to ensure integrity, transparency, and accountability in all published work."
      />

      <div className="mt-10 grid gap-10 lg:grid-cols-[2fr_1fr]">
        <div className="space-y-6">
          <section className="rounded-3xl border border-slate-200/70 bg-white p-8 shadow-sm">
            <h2 className="font-display text-2xl text-slate-900">Originality and plagiarism</h2>
            <p className="mt-3 text-sm text-slate-600">
              Manuscripts are screened for similarity using plagiarism detection tools.
              Significant overlap, duplicate submissions, or fabricated content lead to
              rejection and editorial review.
            </p>
          </section>

          <section className="rounded-3xl border border-slate-200/70 bg-white p-8 shadow-sm">
            <h2 className="font-display text-2xl text-slate-900">Authorship and conflicts</h2>
            <p className="mt-3 text-sm text-slate-600">
              All contributors must meet authorship criteria. Conflicts of interest are
              disclosed by authors, reviewers, and editors to maintain impartial review.
            </p>
          </section>

          <section className="rounded-3xl border border-slate-200/70 bg-white p-8 shadow-sm">
            <h2 className="font-display text-2xl text-slate-900">Ethical oversight</h2>
            <p className="mt-3 text-sm text-slate-600">
              Research involving human participants or animals must include approval
              from the appropriate ethics committees and consent documentation.
            </p>
          </section>

          <section className="rounded-3xl border border-slate-200/70 bg-white p-8 shadow-sm">
            <h2 className="font-display text-2xl text-slate-900">Corrections and retractions</h2>
            <p className="mt-3 text-sm text-slate-600">
              We publish corrections, clarifications, or retractions when necessary to
              preserve the integrity of the scholarly record.
            </p>
          </section>
        </div>

        <QuickLinksSidebar />
      </div>
    </div>
  );
}
