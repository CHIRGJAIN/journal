"use client";

import { useMemo, useState } from "react";
import { CheckCircle2, FileText, UploadCloud } from "lucide-react";

import PageHeader from "@/components/site/page-header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

type FormData = {
  title: string;
  articleType: string;
  abstract: string;
  keywords: string;
  correspondingName: string;
  correspondingEmail: string;
  affiliation: string;
  orcid: string;
  manuscriptFile: File | null;
  coverLetterFile: File | null;
  license: string;
  apcWaiver: boolean;
  agree: boolean;
};

const steps = [
  { title: "Manuscript details", description: "Article type, title, abstract." },
  { title: "Author information", description: "Corresponding author contact." },
  { title: "Files and declarations", description: "Upload files and confirm policies." },
];

export default function ManuscriptSubmissionPage() {
  const [step, setStep] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    title: "",
    articleType: "Research Article",
    abstract: "",
    keywords: "",
    correspondingName: "",
    correspondingEmail: "",
    affiliation: "",
    orcid: "",
    manuscriptFile: null,
    coverLetterFile: null,
    license: "CC BY 4.0",
    apcWaiver: false,
    agree: false,
  });

  const progress = useMemo(() => ((step + 1) / steps.length) * 100, [step]);

  const canProceed = useMemo(() => {
    if (step === 0) {
      return Boolean(formData.title && formData.articleType && formData.abstract);
    }
    if (step === 1) {
      return Boolean(formData.correspondingName && formData.correspondingEmail && formData.affiliation);
    }
    if (step === 2) {
      return Boolean(formData.manuscriptFile && formData.agree);
    }
    return false;
  }, [formData, step]);

  const updateField = (field: keyof FormData, value: string | boolean | File | null) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="mx-auto w-full max-w-6xl px-6 py-10">
      <PageHeader
        eyebrow="Manuscript submission"
        title="Submit your research to Trinix Journal"
        description="Complete the guided submission form. You will receive an email confirmation and tracking ID."
      />

      <div className="mt-10 grid gap-10 lg:grid-cols-[2fr_1fr]">
        <div className="rounded-3xl border border-slate-200/70 bg-white p-8 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.35em] text-slate-500">Step {step + 1} of {steps.length}</p>
              <h2 className="mt-2 font-display text-2xl text-slate-900">{steps[step].title}</h2>
              <p className="text-sm text-slate-500">{steps[step].description}</p>
            </div>
            <div className="text-xs text-slate-500">{Math.round(progress)}% complete</div>
          </div>
          <div className="mt-4 h-2 w-full rounded-full bg-slate-100">
            <div className="h-2 rounded-full bg-slate-900 transition-all" style={{ width: `${progress}%` }} />
          </div>

          {submitted ? (
            <div className="mt-8 rounded-2xl border border-emerald-200 bg-emerald-50 p-6 text-sm text-emerald-700">
              <div className="flex items-center gap-2 font-semibold">
                <CheckCircle2 className="h-4 w-4" />
                Submission received
              </div>
              <p className="mt-2">
                Thank you. Your manuscript has been logged and the editorial office will contact you soon.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="mt-8 space-y-6">
              {step === 0 && (
                <div className="grid gap-4">
                  <Input
                    placeholder="Manuscript title"
                    value={formData.title}
                    onChange={(event) => updateField("title", event.target.value)}
                    className="h-11 rounded-full"
                    required
                  />
                  <label className="text-xs text-slate-500">
                    Article type
                    <select
                      value={formData.articleType}
                      onChange={(event) => updateField("articleType", event.target.value)}
                      className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700"
                    >
                      <option>Research Article</option>
                      <option>Review Article</option>
                      <option>Short Communication</option>
                      <option>Letter</option>
                    </select>
                  </label>
                  <Textarea
                    placeholder="Abstract (max 300 words)"
                    value={formData.abstract}
                    onChange={(event) => updateField("abstract", event.target.value)}
                    className="min-h-32"
                    required
                  />
                  <Input
                    placeholder="Keywords (comma separated)"
                    value={formData.keywords}
                    onChange={(event) => updateField("keywords", event.target.value)}
                    className="h-11 rounded-full"
                  />
                </div>
              )}

              {step === 1 && (
                <div className="grid gap-4">
                  <Input
                    placeholder="Corresponding author name"
                    value={formData.correspondingName}
                    onChange={(event) => updateField("correspondingName", event.target.value)}
                    className="h-11 rounded-full"
                    required
                  />
                  <Input
                    placeholder="Email address"
                    type="email"
                    value={formData.correspondingEmail}
                    onChange={(event) => updateField("correspondingEmail", event.target.value)}
                    className="h-11 rounded-full"
                    required
                  />
                  <Input
                    placeholder="Affiliation"
                    value={formData.affiliation}
                    onChange={(event) => updateField("affiliation", event.target.value)}
                    className="h-11 rounded-full"
                    required
                  />
                  <Input
                    placeholder="ORCID (optional)"
                    value={formData.orcid}
                    onChange={(event) => updateField("orcid", event.target.value)}
                    className="h-11 rounded-full"
                  />
                </div>
              )}

              {step === 2 && (
                <div className="grid gap-4">
                  <label className="flex flex-col gap-2 text-xs text-slate-500">
                    Manuscript file (DOCX or PDF)
                    <input
                      type="file"
                      onChange={(event) => updateField("manuscriptFile", event.target.files?.[0] ?? null)}
                      className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700"
                      required
                    />
                  </label>
                  <label className="flex flex-col gap-2 text-xs text-slate-500">
                    Cover letter (optional)
                    <input
                      type="file"
                      onChange={(event) => updateField("coverLetterFile", event.target.files?.[0] ?? null)}
                      className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700"
                    />
                  </label>
                  <label className="text-xs text-slate-500">
                    License preference
                    <select
                      value={formData.license}
                      onChange={(event) => updateField("license", event.target.value)}
                      className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700"
                    >
                      <option>CC BY 4.0</option>
                      <option>CC BY-NC 4.0</option>
                    </select>
                  </label>
                  <label className="flex items-center gap-2 text-sm text-slate-600">
                    <input
                      type="checkbox"
                      checked={formData.apcWaiver}
                      onChange={(event) => updateField("apcWaiver", event.target.checked)}
                    />
                    Request APC waiver (if eligible)
                  </label>
                  <label className="flex items-center gap-2 text-sm text-slate-600">
                    <input
                      type="checkbox"
                      checked={formData.agree}
                      onChange={(event) => updateField("agree", event.target.checked)}
                      required
                    />
                    I confirm that the manuscript follows journal policies and ethics.
                  </label>
                </div>
              )}

              <div className="flex flex-wrap items-center justify-between gap-3">
                <Button
                  type="button"
                  variant="outline"
                  className="rounded-full border-slate-300"
                  onClick={() => setStep((prev) => Math.max(prev - 1, 0))}
                  disabled={step === 0}
                >
                  Previous
                </Button>
                {step < steps.length - 1 ? (
                  <Button
                    type="button"
                    className="rounded-full bg-slate-900 text-white hover:bg-slate-800"
                    onClick={() => setStep((prev) => Math.min(prev + 1, steps.length - 1))}
                    disabled={!canProceed}
                  >
                    Continue
                  </Button>
                ) : (
                  <Button
                    type="submit"
                    className="rounded-full bg-slate-900 text-white hover:bg-slate-800"
                    disabled={!canProceed}
                  >
                    Submit
                  </Button>
                )}
              </div>
            </form>
          )}
        </div>

        <div className="space-y-6">
          <div className="rounded-3xl border border-slate-200/70 bg-white p-6 shadow-sm">
            <div className="flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-slate-500">
              <FileText className="h-4 w-4" />
              Submission guidelines
            </div>
            <ul className="mt-4 space-y-2 text-sm text-slate-600">
              <li>Format: A4, Times New Roman 12 pt, double-spaced.</li>
              <li>Include Introduction, Methods, Results, Discussion.</li>
              <li>Maximum 60 references and 600 DPI figures.</li>
              <li>Cover letter required for reviews and letters.</li>
            </ul>
          </div>

          <div className="rounded-3xl border border-slate-200/70 bg-white p-6 shadow-sm">
            <div className="flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-slate-500">
              <UploadCloud className="h-4 w-4" />
              Templates
            </div>
            <p className="mt-3 text-sm text-slate-600">
              Download the manuscript template and checklist before submission.
            </p>
            <Button variant="outline" className="mt-4 w-full rounded-full border-slate-300" disabled>
              Template coming soon
            </Button>
          </div>

          <div className="rounded-3xl border border-slate-200/70 bg-slate-900 p-6 text-white">
            <p className="text-xs uppercase tracking-[0.3em] text-white/60">Need help</p>
            <p className="mt-3 text-sm text-white/80">
              Email the editorial office at editor@trinixjournal.com for submission support.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
