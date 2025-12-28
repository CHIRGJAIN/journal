"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X, Search } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { journalMeta, navLinks } from "@/lib/site-data";

export default function SiteNav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50">
      <div className="bg-slate-950 text-white/80 text-xs">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-2">
          <span className="tracking-wide">
            {journalMeta.issnPrint} | {journalMeta.issnOnline}
          </span>
          <span className="hidden md:inline">{journalMeta.location}</span>
        </div>
      </div>
      <div className="border-b border-slate-200/70 bg-white/80 backdrop-blur">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-4">
          <Link href="/" className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-sky-500 via-cyan-500 to-emerald-400 text-white font-semibold shadow-md">
              TJ
            </div>
            <div>
              <p className="font-display text-lg leading-tight text-slate-900">
                {journalMeta.shortTitle}
              </p>
              <p className="text-xs text-slate-500">Advanced Engineering and Sciences</p>
            </div>
          </Link>

          <nav className="hidden lg:flex items-center gap-5 text-sm text-slate-600">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "transition hover:text-slate-900",
                  pathname === link.href && "text-slate-900 font-semibold"
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="hidden lg:flex items-center gap-3">
            <Link
              href="/search"
              className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-2 text-sm text-slate-600 shadow-sm transition hover:border-slate-300 hover:text-slate-900"
            >
              <Search className="h-4 w-4" />
              Search
            </Link>
            <Button asChild className="rounded-full bg-slate-900 text-white hover:bg-slate-800">
              <Link href="/manuscript-submission">Submit Manuscript</Link>
            </Button>
          </div>

          <button
            type="button"
            className="inline-flex items-center justify-center rounded-full border border-slate-200 bg-white p-2 text-slate-700 shadow-sm lg:hidden"
            aria-label="Toggle menu"
            onClick={() => setOpen((prev) => !prev)}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {open && (
          <div className="border-t border-slate-200/70 bg-white px-6 py-4 lg:hidden">
            <div className="flex flex-col gap-3 text-sm text-slate-700">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "rounded-lg px-3 py-2 transition hover:bg-slate-100",
                    pathname === link.href && "bg-slate-100 font-semibold text-slate-900"
                  )}
                  onClick={() => setOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <Button
                asChild
                className="mt-2 w-full rounded-full bg-slate-900 text-white hover:bg-slate-800"
                onClick={() => setOpen(false)}
              >
                <Link href="/manuscript-submission">Submit Manuscript</Link>
              </Button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
