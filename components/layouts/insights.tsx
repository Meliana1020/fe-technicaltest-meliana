"use client";

import dynamic from "next/dynamic";
import { Button } from "@/components/ui/button";
import { Home } from "lucide-react";
import { useRouter } from "next/navigation";

// lazy loading supaya tidak ke-load di awal
const MoodChart = dynamic(
  () => import("@/components/layouts/mood-chart").then((mod) => mod.MoodChart),
  {
    ssr: false,
  }
);
const WeeklyInsights = dynamic(
  () => import("@/components/mood-list/weekly-insights"),
  { ssr: false }
);

export default function InsightsLayout() {
  const router = useRouter();

  return (
    <div className="min-h-screen max-w-4xl mx-auto py-6 px-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Insights & Trends</h1>
        <Button
          variant="secondary"
          className="bg-blue-500 text-white hover:bg-blue-500/70 hover:text-white"
          onClick={() => router.push("/")}
        >
          <Home className="w-4 h-4 mr-2" />
          Home
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 justify-center">
        <div className="bg-card p-4 rounded-2xl shadow max-w-sm mx-auto w-full">
          <h2 className="text-lg font-semibold mb-3">Mood Trends</h2>
          <MoodChart />
        </div>

        <div className="bg-card p-4 rounded-2xl shadow max-w-sm mx-auto w-full">
          <h2 className="text-lg font-semibold mb-3">Weekly Insights</h2>
          <WeeklyInsights
            averageMood={3.2}
            entriesCount={5}
            moodTrend="improving"
          />
        </div>
      </div>
    </div>
  );
}
