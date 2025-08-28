"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { MOOD_EMOJIS } from "@/types/mood";

interface Props {
  averageMood: number;
  entriesCount: number;
  moodTrend: "improving" | "declining" | "stable" | null;
}

export default function WeeklyInsights({ averageMood, entriesCount, moodTrend }: Props) {
  return (
    <Card className="gradient-card shadow-card border-0">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-xl">
          <Image src="/logo.png" alt="Logo" width={20} height={10} style={{ height: "auto" }} />
          This Week&apos;s Insights
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid md:grid-cols-3 grid-cols-3 gap-4">
          <div className="text-center p-4 bg-accent/50 rounded-lg">
            <div className="text-2xl mb-2">
              {MOOD_EMOJIS[Math.round(averageMood) as 1 | 2 | 3 | 4 | 5]}
            </div>
            <p className="text-sm text-muted-foreground">Average Mood</p>
            <p className="font-semibold">{averageMood.toFixed(1)}/5</p>
          </div>

          <div className="text-center p-4 bg-accent/50 rounded-lg">
            <div className="text-2xl mb-2">📊</div>
            <p className="text-sm text-muted-foreground">Entries This Week</p>
            <p className="font-semibold">{entriesCount}</p>
          </div>

          <div className="text-center p-4 bg-accent/50 rounded-lg">
            <div className="text-2xl mb-2">
              {moodTrend === "improving" ? "📈" : moodTrend === "declining" ? "📉" : "➡️"}
            </div>
            <p className="text-sm text-muted-foreground">Trend</p>
            <Badge
              variant={
                moodTrend === "improving"
                  ? "default"
                  : moodTrend === "declining"
                  ? "destructive"
                  : "secondary"
              }
            >
              {moodTrend || "Not enough data"}
            </Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
