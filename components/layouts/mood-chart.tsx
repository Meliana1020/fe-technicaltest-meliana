"use client";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartOptions,
  TooltipItem,
  Tick,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { BarChart3 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useMoodChart } from "@/hooks/useMoodChart";
import { MOOD_EMOJIS } from "@/types/mood";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface MoodChartProps {
  weeks?: number;
}

export function MoodChart({ weeks = 8 }: MoodChartProps) {
  const { entries, chartData, avgAll } = useMoodChart(weeks);

  const options: ChartOptions<"bar"> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: {
          label: (ctx: TooltipItem<"bar">) => {
            const mood = ctx.parsed.y;
            if (!mood) return "No entry";
            const emoji =
              MOOD_EMOJIS[Math.round(mood) as keyof typeof MOOD_EMOJIS];
            return `${emoji} Avg: ${mood.toFixed(1)}/5`;
          },
        },
      },
    },
    scales: {
      x: {
        grid: { display: false },
        ticks: { color: "hsl(220, 10%, 55%)", font: { size: 12 } },
      },
      y: {
        min: 1,
        max: 5,
        ticks: {
          stepSize: 1,
          callback: (val: string | number) => {
            const emoji = MOOD_EMOJIS[val as keyof typeof MOOD_EMOJIS];
            return `${val} ${emoji || ""}`;
          },
        },
        grid: { color: "hsl(220, 20%, 88%, 0.3)", drawTicks: false },
      },
    },
  };

  return (
    <Card className="gradient-card shadow-card border-0">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-xl">
            <BarChart3 className="w-5 h-5 text-primary" />
            Weekly Insights ({weeks} Weeks)
          </CardTitle>
          <Badge variant="secondary">Avg: {avgAll.toFixed(1)}</Badge>
        </div>
      </CardHeader>
      <CardContent>
        {entries.length === 0 ? (
          <div className="h-64 flex items-center justify-center text-center text-muted-foreground">
            No weekly insights available yet.
          </div>
        ) : (
          <div className="h-64 w-full">
            <Bar data={chartData} options={options} />
          </div>
        )}
      </CardContent>
    </Card>
  );
}
