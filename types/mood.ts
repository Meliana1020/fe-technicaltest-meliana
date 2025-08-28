export interface MoodEntry {
  id: string;
  date: string;
  mood: 1 | 2 | 3 | 4 | 5;
  note?: string;
  createdAt: string;
  updatedAt: string;
}

export type MoodLevel = 1 | 2 | 3 | 4 | 5;

export const MOODS: Record<
  MoodLevel,
  { label: string; emoji: string; color: string }
> = {
  1: {
    label: "Very Sad",
    emoji: "😢",
    color: "#255167", 
  },
  2: {
    label: "Sad",
    emoji: "🙁",
    color: "#A5CDD7",
  },
  3: {
    label: "Neutral",
    emoji: "😐",
    color: "#C3DDBF",
  },
  4: {
    label: "Happy",
    emoji: "🙂",
    color: "#F4C653",
  },
  5: {
    label: "Very Happy",
    emoji: "😁",
    color: "#89B18A",
  },
};


export const MOOD_EMOJIS = Object.fromEntries(
  Object.entries(MOODS).map(([k, v]) => [k, v.emoji])
) as Record<MoodLevel, string>;

export const MOOD_LABELS = Object.fromEntries(
  Object.entries(MOODS).map(([k, v]) => [k, v.label])
) as Record<MoodLevel, string>;

export const MOOD_COLORS = Object.fromEntries(
  Object.entries(MOODS).map(([k, v]) => [k, v.color])
) as Record<MoodLevel, string>;
