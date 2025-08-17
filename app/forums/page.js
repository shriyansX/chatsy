import React from 'react'
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Code2, Braces, FileCode, Palette, Atom, Server, ArrowRight } from 'lucide-react';

const topics = [
    {
        text: 'Python',
        icon: <Code2 className="size-8 text-indigo-500" />,
        accent: 'from-indigo-500/15 to-indigo-500/0',
        desc: 'Discuss Python, data tooling, async, packaging & more.',
        slug: 'Python'
    },
    {
        text: 'JavaScript',
        icon: <Braces className="size-8 text-yellow-500" />,
        accent: 'from-yellow-400/20 to-yellow-500/0',
        desc: 'ESNext, tooling, patterns, testing & ecosystem news.',
        slug: 'Javascript'
    },
    {
        text: 'HTML',
        icon: <FileCode className="size-8 text-orange-500" />,
        accent: 'from-orange-500/15 to-orange-500/0',
        desc: 'Semantic structure, accessibility & emerging specs.',
        slug: 'Html'
    },
    {
        text: 'CSS',
        icon: <Palette className="size-8 text-sky-500" />,
        accent: 'from-sky-500/15 to-sky-500/0',
        desc: 'Modern layout, design systems, theming & animations.',
        slug: 'Css'
    },
    {
        text: 'React',
        icon: <Atom className="size-8 text-cyan-500" />,
        accent: 'from-cyan-500/15 to-cyan-500/0',
        desc: 'Hooks, server components, performance & patterns.',
        slug: 'React'
    },
    {
        text: 'Node.js',
        icon: <Server className="size-8 text-emerald-500" />,
        accent: 'from-emerald-500/15 to-emerald-500/0',
        desc: 'Runtime advances, frameworks, scaling & observability.',
        slug: 'Nodejs'
    }
];

const Forums = () => {
    return (
        <div className="mx-auto max-w-6xl px-6 py-28">
            <header className="mb-14 text-center">
                <h1 className="text-4xl font-semibold tracking-tight md:text-5xl">Discussion Forums</h1>
                <p className="mx-auto mt-4 max-w-2xl text-muted-foreground md:text-lg">Pick a domain and dive into focused, high‑signal conversations with the community.</p>
            </header>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {topics.map(topic => (
                    <div
                        key={topic.slug}
                        className="group relative flex flex-col overflow-hidden rounded-xl border bg-card/70 p-6 backdrop-blur transition-all hover:shadow-md"
                    >
                        <div className="mb-5 inline-flex items-center gap-3">
                            <div className={`relative flex size-14 items-center justify-center rounded-xl border bg-gradient-to-br ${topic.accent}`}>
                                {topic.icon}
                            </div>
                            <h2 className="text-xl font-semibold tracking-tight">{topic.text}</h2>
                        </div>
                        <p className="mb-6 line-clamp-3 text-sm text-muted-foreground leading-relaxed">{topic.desc}</p>
                        <div className="mt-auto">
                            <Button asChild size="sm" className="group/button">
                                <Link href={`/forum/${topic.slug}`} className="flex items-center">
                                    Discuss Now <ArrowRight className="ml-1 size-4 transition-transform group-hover/button:translate-x-1" />
                                </Link>
                            </Button>
                        </div>
                        <div className="pointer-events-none absolute inset-0 -z-10 opacity-0 group-hover:opacity-100 transition-opacity bg-[radial-gradient(circle_at_30%_20%,hsl(0_0%_100%_/_0.1),transparent_70%)]" />
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Forums
