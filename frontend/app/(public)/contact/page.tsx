"use client";

import { useState } from "react";
import { Mail, MapPin, Phone } from "lucide-react";

import PageHeader from "@/components/site/page-header";
import QuickLinksSidebar from "@/components/site/quick-links-sidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default function ContactPage() {
  const [status, setStatus] = useState<"idle" | "sent">("idle");

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setStatus("sent");
  };

  return (
    <div className="mx-auto w-full max-w-6xl px-6 py-10">
      <PageHeader
        eyebrow="Contact"
        title="Connect with the editorial office"
        description="Reach out for manuscript support, policy questions, or partnership inquiries."
      />

      <div className="mt-10 grid gap-10 lg:grid-cols-[2fr_1fr]">
        <div className="space-y-6">
          <div className="rounded-3xl border border-slate-200/70 bg-white p-8 shadow-sm">
            <h2 className="font-display text-2xl text-slate-900">Send a message</h2>
            <form onSubmit={handleSubmit} className="mt-4 grid gap-4 md:grid-cols-2">
              <Input placeholder="Full name" className="h-11 rounded-full" required />
              <Input placeholder="Email address" type="email" className="h-11 rounded-full" required />
              <Input placeholder="Organization" className="h-11 rounded-full md:col-span-2" />
              <Textarea placeholder="How can we help?" className="min-h-32 md:col-span-2" required />
              <div className="md:col-span-2">
                <Button type="submit" className="rounded-full bg-slate-900 text-white hover:bg-slate-800">
                  {status === "sent" ? "Message sent" : "Send message"}
                </Button>
              </div>
            </form>
          </div>

          <div className="rounded-3xl border border-slate-200/70 bg-white p-8 shadow-sm">
            <h2 className="font-display text-2xl text-slate-900">Contact details</h2>
            <div className="mt-4 space-y-3 text-sm text-slate-600">
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-slate-500" />
                <span>editor@trinixjournal.com</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-slate-500" />
                <span>+91 11 4800 2211</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-slate-500" />
                <span>Jasola District Centre, New Delhi 110025</span>
              </div>
            </div>
          </div>
        </div>

        <QuickLinksSidebar />
      </div>
    </div>
  );
}
