import { MoodEntry } from "@/types/mood";
import { formatDistanceToNow } from "date-fns";

interface MoodFooterProps {
  entry: MoodEntry;
  textColor: string;
}

export function MoodFooter({ entry, textColor }: MoodFooterProps) {
  return (
    <p className="text-xs opacity-80" style={{ color: textColor }}>
      Added {formatDistanceToNow(new Date(entry.createdAt), { addSuffix: true })}
      {entry.updatedAt !== entry.createdAt && (
        <span className="ml-2">
          • Updated{" "}
          {formatDistanceToNow(new Date(entry.updatedAt), { addSuffix: true })}
        </span>
      )}
    </p>
  );
}
