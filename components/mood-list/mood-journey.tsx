import { Calendar } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { MoodCard } from "@/components/mood-card/mood-card";
import { EmptyState } from "@/components/mood-list/empty-state";
import { MoodEntry } from "@/types/mood";

interface Props {
  entries: MoodEntry[];
  onEdit: (entry: MoodEntry) => void;
}

export function MoodJourney({ entries, onEdit }: Props) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-foreground flex items-center gap-2">
          <Calendar className="w-6 h-6 text-primary" />
          Your Mood Journey
        </h2>
        {entries.length > 0 && (
          <Badge variant="secondary" className="px-3 py-1">
            {entries.length} {entries.length === 1 ? "entry" : "entries"}
          </Badge>
        )}
      </div>

      {entries.length === 0 ? (
        <EmptyState />
      ) : (
        <div className="grid gap-4">
          {entries.map((entry) => (
            <MoodCard key={entry.id} entry={entry} onEdit={onEdit} />
          ))}
        </div>
      )}
    </div>
  );
}
