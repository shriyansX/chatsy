import React from 'react';

export const metadata = {
  title: 'Contact • Chatsy',
  description: 'Contact links for Shriyans Mukherjee'
};

const links = [
  { label: 'Portfolio', href: 'https://portfolio-six-mocha-83.vercel.app/', icon: (
    <svg width="18" height="18" viewBox="0 0 24 24" className="text-primary" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>
  ) },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/shriyansmukherjee/', icon: (
    <svg width="18" height="18" viewBox="0 0 24 24" className="text-primary" fill="currentColor"><path d="M4.98 3.5C4.98 4.88 3.87 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5zM.5 8h4V23h-4V8zm7.5 0h3.8v2.15h.05c.53-1 1.84-2.15 3.79-2.15 4.05 0 4.8 2.67 4.8 6.14V23h-4v-7.13c0-1.7-.03-3.88-2.37-3.88-2.38 0-2.75 1.85-2.75 3.76V23h-4V8z"/></svg>
  ) },
  { label: 'GitHub', href: 'https://github.com/shriyansX', icon: (
    <svg width="18" height="18" viewBox="0 0 24 24" className="text-primary" fill="currentColor"><path d="M12 .5C5.65.5.5 5.65.5 12c0 5.1 3.29 9.42 7.86 10.95.58.11.79-.25.79-.56 0-.28-.01-1.02-.02-2-3.2.69-3.88-1.54-3.88-1.54-.53-1.33-1.3-1.69-1.3-1.69-1.06-.73.08-.72.08-.72 1.17.08 1.78 1.2 1.78 1.2 1.04 1.78 2.73 1.27 3.39.97.11-.75.41-1.27.74-1.56-2.55-.29-5.23-1.28-5.23-5.7 0-1.26.45-2.3 1.2-3.11-.12-.29-.52-1.45.11-3.02 0 0 .97-.31 3.18 1.19a11.1 11.1 0 0 1 2.9-.39c.98 0 1.97.13 2.9.39 2.2-1.5 3.17-1.19 3.17-1.19.63 1.57.23 2.73.11 3.02.75.81 1.2 1.85 1.2 3.11 0 4.43-2.69 5.41-5.25 5.69.42.36.79 1.07.79 2.16 0 1.56-.01 2.82-.01 3.2 0 .31.21.68.8.56A10.52 10.52 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5Z"/></svg>
  ) },
  { label: 'Email', href: 'mailto:shriyans696@gmail.com', icon: (
    <svg width="18" height="18" viewBox="0 0 24 24" className="text-primary" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="5" width="18" height="14" rx="2"/><polyline points="3 7 12 13 21 7"/></svg>
  ) },
];

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-24">
      <h1 className="text-4xl font-semibold tracking-tight">Contact</h1>
      <p className="mt-3 text-muted-foreground max-w-prose">Connect with Shriyans Mukherjee using the links below.</p>
      <ul className="mt-10 space-y-4">
        {links.map(l => (
          <li key={l.href} className="group flex items-center justify-between rounded-lg border bg-card/70 px-5 py-4 transition hover:bg-accent/60">
            <div className="flex items-center gap-4">
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-md bg-primary/10 ring-1 ring-border/50">{l.icon}</span>
              <div className="flex flex-col">
                <span className="font-medium">{l.label}</span>
                <span className="text-xs text-muted-foreground break-all">{l.href.replace('mailto:','')}</span>
              </div>
            </div>
            <a href={l.href} target="_blank" rel="noreferrer" className="text-xs font-medium text-primary underline-offset-4 group-hover:underline">Open</a>
          </li>
        ))}
      </ul>
      <p className="mt-14 text-xs text-muted-foreground">© Shriyans Mukherjee 2025</p>
    </div>
  );
}
