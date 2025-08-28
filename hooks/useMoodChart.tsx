"use client";

import { useMemo } from "react";
import { eachWeekOfInterval, endOfWeek, format, parseISO } from "date-fns";
import { useMoodStore } from "@/store/moodStore";
import { MOOD_EMOJIS } from "@/types/mood";

export function useMoodChart(weeks: number = 8) {
  const entries = useMoodStore((s) => s.entries);

  const chartData = useMemo(() => {
    if (entries.length === 0) return { labels: [], datasets: [] };

    const endDate = new Date();
    const startDate = new Date();
    startDate.setMonth(endDate.getMonth() - 2);

    const weekRanges = eachWeekOfInterval({ start: startDate, end: endDate }).slice(-weeks);

    const labels = weekRanges.map((start) => {
      const end = endOfWeek(start);
      return `${format(start, "MMM d")} - ${format(end, "MMM d")}`;
    });

    const data = weekRanges.map((start) => {
      const end = endOfWeek(start);
      const weekEntries = entries.filter((e) => {
        const d = parseISO(e.date);
        return d >= start && d <= end;
      });
      if (weekEntries.length === 0) return null;
      const avg = weekEntries.reduce((s, e) => s + e.mood, 0) / weekEntries.length;
      return parseFloat(avg.toFixed(2));
    });

    return {
      labels,
      datasets: [
        {
          label: "Weekly Avg Mood",
          data,
          backgroundColor: "hsl(180, 65%, 45%)",
          borderRadius: 12,
        },
      ],
    };
  }, [entries, weeks]);

  const avgAll = (() => {
    const dataset = chartData.datasets?.[0]?.data as (number | null | undefined)[] | undefined;
    if (!dataset || dataset.length === 0) return 0;

    const valid = dataset.filter((v): v is number => typeof v === "number");
    if (valid.length === 0) return 0;

    return valid.reduce((s, v) => s + v, 0) / valid.length;
  })();

  return { entries, chartData, avgAll };
}
