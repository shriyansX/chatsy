import HomePageContent from "@/components/HomePageContent";

export default function Home() {
  return <HomePageContent />;
}

export const metadata = {
  title: 'Chatsy • Connect, Discuss & Collaborate',
  description: 'Chatsy is a modern platform for real‑time chat, rich forums, and community collaboration.',
  openGraph: {
    title: 'Chatsy • Connect, Discuss & Collaborate',
    description: 'Join focused discussions, jump into real‑time chat, and grow your community with Chatsy.',
    url: 'https://chatsy.example',
    siteName: 'Chatsy',
    images: [
      { url: '/globe.svg', width: 1200, height: 630, alt: 'Chatsy Preview' }
    ],
    type: 'website'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Chatsy • Connect, Discuss & Collaborate',
    description: 'Modern forums + real‑time chat in one clean experience.'
  }
}