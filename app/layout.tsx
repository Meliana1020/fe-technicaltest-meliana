import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Toaster } from "@/components/ui/sonner"

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  metadataBase: new URL("https://moodtracker.meliana.vercel.com"),
  title: "Mood Tracker - Track Your Daily Emotions",
  description: "Track your daily emotions, gain insights into your mental well-being, and celebrate your emotional journey.",
  authors: [{ name: "Mood Tracker App" }],
  keywords: ["mood tracker", "mental health", "emotions", "wellness", "daily mood", "emotional well-being"],
  openGraph: {
    title: "Mood Tracker - Track Your Daily Emotions",
    description: "Beautiful mood tracking app to monitor your daily emotions and gain insights into your mental well-being.",
    type: "website",
    images: ["/logo.png"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
        <Toaster />
      </body>
    </html>
  )
}