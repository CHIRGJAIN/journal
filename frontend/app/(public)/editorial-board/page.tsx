import Link from "next/link";
import { Mail } from "lucide-react";

import PageHeader from "@/components/site/page-header";
import QuickLinksSidebar from "@/components/site/quick-links-sidebar";
import { editorialBoard } from "@/lib/site-data";

const getInitials = (name: string) =>
  name
    .split(" ")
    .map((part) => part[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

export default function EditorialBoardPage() {
  return (
    <div className="mx-auto w-full max-w-6xl px-6 py-10">
      <PageHeader
        eyebrow="Editorial board"
        title="Global experts guiding rigorous peer review"
        description="Our editorial board represents leading researchers across engineering, AI, materials, and sustainability."
      />

      <div className="mt-10 grid gap-10 lg:grid-cols-[2fr_1fr]">
        <div className="grid gap-6 md:grid-cols-2">
          {editorialBoard.map((member) => (
            <div
              key={member.email}
              className="rounded-3xl border border-slate-200/70 bg-white p-6 shadow-sm"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-sky-500 via-cyan-500 to-emerald-400 text-white font-semibold">
                  {getInitials(member.name)}
                </div>
                <div>
                  <p className="font-semibold text-slate-900">{member.name}</p>
                  <p className="text-xs text-slate-500">{member.role}</p>
                </div>
              </div>
              <p className="mt-3 text-sm text-slate-600">{member.affiliation}</p>
              <div className="mt-4 flex items-center justify-between text-xs text-slate-500">
                <a href={`mailto:${member.email}`} className="flex items-center gap-1 hover:text-slate-900">
                  <Mail className="h-3.5 w-3.5" />
                  {member.email}
                </a>
                <Link href={member.link} className="text-slate-700 hover:text-slate-900">
                  Profile
                </Link>
              </div>
            </div>
          ))}
        </div>

        <QuickLinksSidebar />
      </div>
    </div>
  );
}
