import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { MOODS, MoodLevel } from "@/types/mood";

interface MoodLevelSelectorProps {
  selectedMood: MoodLevel | null;
  setSelectedMood: (mood: MoodLevel) => void;
}

export function MoodLevelSelector({ selectedMood, setSelectedMood }: MoodLevelSelectorProps) {
  return (
    <div className="space-y-3">
      <Label className="text-sm font-semibold text-foreground">
        Mood Level
      </Label>
      <div className="grid grid-cols-3 gap-1">
        {Object.entries(MOODS).map(([level, mood]) => {
          const numLevel = parseInt(level) as MoodLevel;
          const isSelected = selectedMood === numLevel;

          return (
            <Button
              key={level}
              type="button"
              variant="outline"
              onClick={() => setSelectedMood(numLevel)}
              className="h-20 flex-col gap-2 transition-bounce border-2"
              style={{
                backgroundColor: isSelected ? mood.color : "transparent",
                borderColor: isSelected ? mood.color : undefined,
                color: isSelected ? "#fff" : "inherit",
              }}
            >
              <span className="text-2xl">{mood.emoji}</span>
              <span className="text-xs font-medium">{mood.label}</span>
            </Button>
          );
        })}
      </div>
    </div>
  );
}
