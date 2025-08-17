import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import {
  ClerkProvider,
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from '@clerk/nextjs'
import Navbar from "@/components/Navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Chatsy • Real‑Time Chat & Forums",
  description: "Chatsy provides real‑time 1:1 chat and discussion forums.",
  icons: [{ rel: 'icon', url: '/favicon.ico' }]
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col`}>
          <Navbar />
          <main className="flex-1">{children}</main>
          <footer className="border-t bg-background/70 px-6 py-8 text-center text-xs text-muted-foreground">
            <p>© Shriyans Mukherjee 2025 • <a href="/contact" className="underline underline-offset-4 hover:text-foreground">Contact</a></p>
          </footer>
        </body>
      </html>
    </ClerkProvider>
  );
}
