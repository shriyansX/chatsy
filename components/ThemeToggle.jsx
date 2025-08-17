"use client";
import { useEffect, useState } from 'react';
import { Sun, Moon } from 'lucide-react';

export default function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const [theme, setTheme] = useState('light');

  // On mount, read preference
  useEffect(() => {
    const stored = typeof window !== 'undefined' ? localStorage.getItem('theme') : null;
    const prefersDark = typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches;
    const initial = stored || (prefersDark ? 'dark' : 'light');
    setTheme(initial);
    applyTheme(initial);
    setMounted(true);
  }, []);

  function applyTheme(t) {
    if (typeof document === 'undefined') return;
    const root = document.documentElement;
    if (t === 'dark') root.classList.add('dark'); else root.classList.remove('dark');
  }

  function toggle() {
    const next = theme === 'dark' ? 'light' : 'dark';
    setTheme(next);
    applyTheme(next);
    try { localStorage.setItem('theme', next); } catch {}
  }

  const label = theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode';
  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={label}
      title={label}
      className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-white/10 bg-white/10 text-white hover:bg-white/20 transition dark:border-gray-600 dark:bg-gray-700 dark:hover:bg-gray-600"
    >
      {mounted && theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
      {!mounted && <span className="h-4 w-4" />}
    </button>
  );
}
