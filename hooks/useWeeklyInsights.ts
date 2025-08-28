import { useMemo } from "react";
import { startOfWeek, endOfWeek, isWithinInterval } from "date-fns";
import { MoodEntry } from "@/types/mood";

export function useWeeklyInsights(entries: MoodEntry[]) {
  const thisWeekStart = startOfWeek(new Date(), { weekStartsOn: 1 });
  const thisWeekEnd = endOfWeek(new Date(), { weekStartsOn: 1 });

  const thisWeekEntries = useMemo(
    () =>
      entries.filter((entry) =>
        isWithinInterval(new Date(entry.date), {
          start: thisWeekStart,
          end: thisWeekEnd,
        })
      ),
    [entries, thisWeekStart, thisWeekEnd]
  );

  const averageMood =
    thisWeekEntries.length > 0
      ? thisWeekEntries.reduce((sum, entry) => sum + entry.mood, 0) /
        thisWeekEntries.length
      : 0;

  const moodTrend = useMemo(() => {
    if (thisWeekEntries.length < 2) return null;

    const sorted = [...thisWeekEntries].sort(
      (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
    );

    const half = Math.ceil(sorted.length / 2);
    const firstAvg =
      sorted.slice(0, half).reduce((s, e) => s + e.mood, 0) / half;
    const secondAvg =
      sorted.slice(half).reduce((s, e) => s + e.mood, 0) /
      (sorted.length - half);

    if (secondAvg > firstAvg + 0.3) return "improving";
    if (secondAvg < firstAvg - 0.3) return "declining";
    return "stable";
  }, [thisWeekEntries]);

  return { thisWeekEntries, averageMood, moodTrend };
}
