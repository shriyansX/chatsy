"use client";
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { ArrowRight, MessageSquare, Users2, Sparkles, ShieldCheck, Zap, PanelsTopLeft } from 'lucide-react';

const features = [
  {
    icon: <MessageSquare className="size-6 text-primary" />,
    title: 'Real‑Time Chat',
    desc: 'Low‑latency conversations powered by Stream. Threads, reactions & rich media.'
  },
  {
    icon: <PanelsTopLeft className="size-6 text-primary" />,
    title: 'Deep Forums',
    desc: 'Structured, searchable discussions for long‑form knowledge that persists.'
  },
  {
    icon: <Users2 className="size-6 text-primary" />,
    title: 'Community Spaces',
    desc: 'Create focused channels & topic hubs that keep teams aligned.'
  },
  {
    icon: <Sparkles className="size-6 text-primary" />,
    title: 'Smart UX',
    desc: 'Clean, minimal, dark‑mode ready & accessible out of the box.'
  },
  {
    icon: <ShieldCheck className="size-6 text-primary" />,
    title: 'Secure Auth',
    desc: 'Clerk powered authentication with enterprise‑grade security.'
  },
  {
    icon: <Zap className="size-6 text-primary" />,
    title: 'Fast by Default',
    desc: 'Next.js 15 + streaming + edge ready for instant loads.'
  }
];

export default function HomePageContent() {
  return (
    <main className="relative overflow-hidden">
      {/* Gradient + grid background */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,oklch(0.92_0.05_250_/_0.8),transparent_60%)] dark:bg-[radial-gradient(circle_at_70%_20%,oklch(0.3_0.05_250_/_0.6),transparent_60%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,#fff0,oklch(0.98_0_0)),repeating-linear-gradient(0deg,transparent,transparent_24px,oklch(0.92_0_0)_25px)] dark:bg-[linear-gradient(to_bottom,#0000,oklch(0.2_0_0)),repeating-linear-gradient(0deg,transparent,transparent_24px,oklch(0.28_0_0)_25px)] opacity-40 mix-blend-overlay" />
        <div className="absolute -top-40 left-1/2 size-[620px] -translate-x-1/2 rounded-full bg-primary/10 blur-3xl dark:bg-primary/30" />
      </div>

      {/* Hero Section */}
      <section className="relative mx-auto flex max-w-6xl flex-col items-center gap-10 px-6 pb-24 pt-28 text-center md:pt-36">
        <span className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-background/60 px-4 py-1 text-xs font-medium backdrop-blur">
          <Sparkles className="size-4 text-primary" /> New: Unified chat + forums experience
        </span>
        <h1 className="text-balance bg-gradient-to-br from-foreground to-foreground/70 bg-clip-text text-4xl font-semibold leading-tight text-transparent md:text-6xl">
          Conversations & Knowledge in One Place
        </h1>
        <p className="max-w-2xl text-pretty text-base text-muted-foreground md:text-lg">
          Chatsy blends real‑time messaging with persistent forum threads so teams & communities can move fast <span className="font-medium text-foreground">without losing context</span>.
        </p>
        <div className="flex flex-col items-center gap-3 sm:flex-row">
          <Button asChild size="lg">
            <Link href="/chat" className="group">
              Launch Chat <ArrowRight className="transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
          <Button asChild size="lg" variant="outline">
            <Link href="/forums" className="group">
              Explore Forums <ArrowRight className="transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </div>
        {/* Floating preview panel */}
        <div className="relative mt-6 w-full max-w-5xl rounded-xl border bg-card/70 p-4 shadow-sm backdrop-blur-sm ring-1 ring-border/50 dark:shadow-none">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="flex flex-col justify-between rounded-lg bg-muted/60 p-5 dark:bg-muted/20">
              <h3 className="mb-2 text-left text-sm font-semibold tracking-wide text-muted-foreground">Forum Snapshot</h3>
              <ul className="space-y-2 text-left text-sm">
                <li className="rounded-md bg-background/60 px-3 py-2 shadow-sm ring-1 ring-border/60">How do we improve onboarding?</li>
                <li className="rounded-md bg-background/60 px-3 py-2 shadow-sm ring-1 ring-border/60">Release plan Q4 brainstorm</li>
                <li className="rounded-md bg-background/60 px-3 py-2 shadow-sm ring-1 ring-border/60">Show your workspace setups</li>
              </ul>
            </div>
            <div className="relative hidden rounded-lg border bg-background/60 p-5 md:block">
              <h3 className="mb-3 text-sm font-semibold tracking-wide text-muted-foreground">Live Chat (demo)</h3>
              <div className="space-y-2 text-left text-xs">
                <div className="flex items-start gap-2">
                  <span className="inline-flex size-6 items-center justify-center rounded-full bg-primary/15 text-[10px] font-medium">AL</span>
                  <p className="rounded-md bg-muted/50 px-3 py-2">Anyone available to review the forum spec?</p>
                </div>
                <div className="flex items-start gap-2">
                  <span className="inline-flex size-6 items-center justify-center rounded-full bg-primary/15 text-[10px] font-medium">ME</span>
                  <p className="rounded-md bg-primary/10 px-3 py-2">Give me 5—uploading design now.</p>
                </div>
                <div className="flex items-start gap-2">
                  <span className="inline-flex size-6 items-center justify-center rounded-full bg-primary/15 text-[10px] font-medium">AL</span>
                  <p className="rounded-md bg-muted/50 px-3 py-2">Perfect, thanks!</p>
                </div>
              </div>
              <div className="absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-background to-transparent pointer-events-none" />
            </div>
          </div>
          <div className="pointer-events-none absolute -inset-1 -z-10 rounded-xl border border-transparent bg-[linear-gradient(var(--angle),theme(colors.primary.DEFAULT),theme(colors.primary.DEFAULT)_40%,transparent_70%)] [--angle:0deg] animate-[spin_6s_linear_infinite] opacity-10" />
        </div>
      </section>

      {/* Feature Grid */}
      <section className="mx-auto max-w-6xl px-6 pb-28">
        <div className="mb-14 text-center">
          <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">Why Teams Choose Chatsy</h2>
          <p className="mt-3 text-muted-foreground md:text-lg">Speed of chat + clarity of forums. Built for product squads, open communities & creators.</p>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map(f => (
            <div key={f.title} className="group relative overflow-hidden rounded-xl border bg-card/60 p-6 backdrop-blur hover:shadow-md transition-shadow">
              <div className="mb-4 inline-flex rounded-md bg-primary/10 p-3 ring-1 ring-primary/20">
                {f.icon}
              </div>
              <h3 className="text-lg font-semibold tracking-tight">{f.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
              <div className="absolute inset-0 -z-10 opacity-0 group-hover:opacity-100 transition-opacity bg-gradient-to-br from-primary/5 to-transparent" />
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="relative mx-auto max-w-5xl px-6 pb-32">
        <div className="relative overflow-hidden rounded-2xl border bg-gradient-to-br from-primary to-primary/60 p-10 text-center text-primary-foreground shadow-lg">
          <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,white/15,transparent_60%)]" />
          <h2 className="text-3xl font-semibold md:text-4xl">Ready to build your space?</h2>
          <p className="mx-auto mt-4 max-w-2xl text-primary-foreground/90 md:text-lg">Create topic hubs, start live conversations & grow knowledge that compounds.</p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button asChild size="lg" variant="secondary" className="font-semibold">
              <Link href="/forums" className="group">Get Started <ArrowRight className="transition-transform group-hover:translate-x-1" /></Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="bg-white/10 text-primary-foreground backdrop-blur hover:bg-white/20">
              <Link href="/chat" className="group">Jump into Chat <ArrowRight className="transition-transform group-hover:translate-x-1" /></Link>
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}
