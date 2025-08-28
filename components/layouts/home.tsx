"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function HomeLayout() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-4">
      <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mb-4 animate-float">
        <Image src="/logo.png" alt="Logo" width={80} height={80} style={{ height: "auto" }}/>
      </div>

      <h1 className="text-4xl md:text-5xl font-bold mb-4">Mood Tracker</h1>
      <p className="text-lg text-zinc-600 mb-6 max-w-xl">
        Track your daily emotions, gain insights into your mental well-being,
        and celebrate your emotional journey.
      </p>

      <div className="flex gap-4">
        <Button size="lg" onClick={() => router.push("/moods")}>
          View Moods
        </Button>
        <Button size="lg" variant="outline" onClick={() => router.push("/insights")}>
          Insights
        </Button>
      </div>
    </div>
  );
}
