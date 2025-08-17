import React from 'react';
import DirectChat from '@/components/DirectChat';
import { SignedIn, SignedOut, SignInButton } from '@clerk/nextjs';

export const metadata = {
  title: 'Direct Messages • Chatsy',
  description: 'Chat privately with other members in real time.'
};

export default function ChatPage() {
  return (
    <>
      <SignedIn>
        <DirectChat />
      </SignedIn>
      <SignedOut>
        <div className="mx-auto max-w-md py-32 text-center">
          <h1 className="text-2xl font-semibold">Sign in to start chatting</h1>
          <p className="mt-3 text-sm text-muted-foreground">You need an account to send and receive messages.</p>
          <div className="mt-6 inline-flex">
            <SignInButton mode="modal">
              <button className="rounded-md bg-primary px-5 py-2 text-sm font-medium text-primary-foreground shadow hover:bg-primary/90">Sign In</button>
            </SignInButton>
          </div>
        </div>
      </SignedOut>
    </>
  );
}
