"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TrendingUp } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

import { MoodForm } from "@/components/mood-form/mood-form";
import { useMoodStore } from "@/store/moodStore";
import { MoodEntry } from "@/types/mood";
import { useWeeklyInsights } from "@/hooks/useWeeklyInsights";
import WeeklyInsights from "@/components/mood-list/weekly-insights";
import { MoodJourney } from "@/components/mood-list/mood-journey";

export function MoodList() {
  const entries = useMoodStore((state) => state.entries);
  const [editingEntry, setEditingEntry] = useState<MoodEntry | null>(null);
  const { thisWeekEntries, averageMood, moodTrend } = useWeeklyInsights(entries);
  const router = useRouter();

  if (editingEntry) {
    return (
      <div className="max-w-2xl mx-auto">
        <MoodForm
          entry={editingEntry}
          onSuccess={() => setEditingEntry(null)}
          onCancel={() => setEditingEntry(null)}
        />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {entries.length > 0 && (
        <Tabs defaultValue="insights" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="insights" className="flex items-center gap-2">
              <Image
                src="/logo.png"
                alt="Logo"
                width={20}
                height={10}
                style={{ height: "auto" }}
              />
              Weekly Insights
            </TabsTrigger>

            <TabsTrigger
              value="trends"
              className="flex items-center gap-2"
              onClick={(e) => {
                e.preventDefault();
                router.push("/insights");
              }}
            >
              <TrendingUp className="w-4 h-4" />
              Mood Trends
            </TabsTrigger>
          </TabsList>

          <TabsContent value="insights" className="space-y-6">
            <WeeklyInsights
              averageMood={averageMood}
              entriesCount={thisWeekEntries.length}
              moodTrend={moodTrend as "improving" | "declining" | "stable" | null}
            />
            <MoodJourney entries={entries} onEdit={setEditingEntry} />
          </TabsContent>
        </Tabs>
      )}
    </div>
  );
}
