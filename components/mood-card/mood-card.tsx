"use client";
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { MoodEntry, MOODS } from "@/types/mood";
import { useMoodStore } from "@/store/moodStore";
import { getContrastColor } from "@/lib/color";

import { MoodHeader } from "./header";
import { MoodNote } from "./note";
import { MoodFooter } from "./footer";
import { MoodActions } from "./actions";
import { DeleteDialog } from "./delete-dialog";

interface MoodCardProps {
  entry: MoodEntry;
  onEdit?: (entry: MoodEntry) => void;
}

export function MoodCard({ entry, onEdit }: MoodCardProps) {
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const deleteEntry = useMoodStore((state) => state.deleteEntry);

  const mood = MOODS[entry.mood];
  const textColor = getContrastColor(mood.color);

  const handleDelete = () => {
    deleteEntry(entry.id);
    setShowDeleteDialog(false);
  };

  return (
    <>
      <Card
        className="mood-card gradient-card shadow-card border-0 group"
        style={{ backgroundColor: mood.color, color: textColor }}
      >
        <CardContent className="p-6">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <MoodHeader entry={entry} textColor={textColor} />
              <MoodNote note={entry.note} textColor={textColor} />
              <MoodFooter entry={entry} textColor={textColor} />
            </div>
            <MoodActions
              entry={entry}
              onEdit={onEdit}
              onDelete={() => setShowDeleteDialog(true)}
              textColor={textColor}
            />
          </div>
        </CardContent>
      </Card>

      <DeleteDialog
        open={showDeleteDialog}
        onOpenChange={setShowDeleteDialog}
        entry={entry}
        onConfirm={handleDelete}
      />
    </>
  );
}
