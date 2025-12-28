import PageHeader from "@/components/site/page-header";
import QuickLinksSidebar from "@/components/site/quick-links-sidebar";

export default function JournalPolicyPage() {
  return (
    <div className="mx-auto w-full max-w-6xl px-6 py-10">
      <PageHeader
        eyebrow="Journal policy"
        title="Transparent publishing policies and open access options"
        description="Our journal policies follow COPE recommendations and prioritize ethical, accessible research dissemination."
      />

      <div className="mt-10 grid gap-10 lg:grid-cols-[2fr_1fr]">
        <div className="space-y-6">
          <section className="rounded-3xl border border-slate-200/70 bg-white p-8 shadow-sm">
            <h2 className="font-display text-2xl text-slate-900">Open access</h2>
            <p className="mt-3 text-sm text-slate-600">
              Trinix Journal operates a hybrid open access model. Authors may choose
              open access licensing or subscription-based publishing. APC waivers are
              available for invited manuscripts until Dec 2025.
            </p>
          </section>

          <section className="rounded-3xl border border-slate-200/70 bg-white p-8 shadow-sm">
            <h2 className="font-display text-2xl text-slate-900">Licensing</h2>
            <p className="mt-3 text-sm text-slate-600">
              Authors retain copyright and may select Creative Commons licenses (CC BY
              4.0 or CC BY-NC 4.0) for open access articles. All submissions must include
              a signed publishing agreement.
            </p>
          </section>

          <section className="rounded-3xl border border-slate-200/70 bg-white p-8 shadow-sm">
            <h2 className="font-display text-2xl text-slate-900">Archiving and indexing</h2>
            <p className="mt-3 text-sm text-slate-600">
              Digital preservation is provided through long-term archival partners.
              Metadata is prepared for indexing agencies, DOI registration, and
              institutional repositories.
            </p>
          </section>

          <section className="rounded-3xl border border-slate-200/70 bg-white p-8 shadow-sm">
            <h2 className="font-display text-2xl text-slate-900">Author rights</h2>
            <p className="mt-3 text-sm text-slate-600">
              Authors may share accepted manuscripts on personal or institutional
              repositories with proper citation and embargo compliance.
            </p>
          </section>
        </div>

        <QuickLinksSidebar />
      </div>
    </div>
  );
}
