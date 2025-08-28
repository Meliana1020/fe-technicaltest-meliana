import { Calendar } from "lucide-react";
import { MoodEntry, MOODS } from "@/types/mood";
import { format } from "date-fns";

interface MoodHeaderProps {
  entry: MoodEntry;
  textColor: string;
}

export function MoodHeader({ entry, textColor }: MoodHeaderProps) {
  const mood = MOODS[entry.mood];

  return (
    <div className="flex items-center gap-3 mb-3">
      <div className="text-3xl p-2 rounded-full">{mood.emoji}</div>
      <div>
        <h3 className="font-semibold text-lg">{mood.label}</h3>
        <div
          className="flex items-center gap-2 text-sm opacity-90"
          style={{ color: textColor }}
        >
          <Calendar className="w-4 h-4" />
          <span>{format(new Date(entry.date), "EEEE, MMMM d, yyyy")}</span>
        </div>
      </div>
    </div>
  );
}
