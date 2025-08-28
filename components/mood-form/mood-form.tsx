"use client";

import { useState } from "react";
import { format } from "date-fns";
import { Card, CardContent } from "@/components/ui/card";
import { useMoodStore } from "@/store/moodStore";
import { MoodEntry, MoodLevel } from "@/types/mood";

import { MoodFormHeader } from "@/components/mood-form/mood-form-header";
import { DatePickerField } from "@/components/mood-form/date-picker-field";
import { MoodLevelSelector } from "@/components/mood-form/mood-level-selector";
import { NoteField } from "@/components/mood-form/note-field";
import { FormActions } from "@/components/mood-form/form-actions";

interface MoodFormProps {
  entry?: MoodEntry;
  onSuccess?: () => void;
  onCancel?: () => void;
}

export function MoodForm({ entry, onSuccess, onCancel }: MoodFormProps) {
  const [date, setDate] = useState<Date>(entry ? new Date(entry.date) : new Date());
  const [selectedMood, setSelectedMood] = useState<MoodLevel | null>(entry?.mood || null);
  const [note, setNote] = useState(entry?.note || "");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { addEntry, updateEntry } = useMoodStore();
  const isEditMode = !!entry;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedMood) return;

    setIsSubmitting(true);
    try {
      const moodData = {
        date: format(date, "yyyy-MM-dd"),
        mood: selectedMood,
        note: note.trim() || undefined,
      };

      if (entry) {
        updateEntry(entry.id, moodData);
      } else {
        addEntry(moodData);
      }

      onSuccess?.();
    } catch (error) {
      console.error("Error saving mood:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="gradient-card shadow-card border-0">
      <MoodFormHeader isEditMode={isEditMode} />
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <DatePickerField date={date} setDate={setDate} />
          <MoodLevelSelector selectedMood={selectedMood} setSelectedMood={setSelectedMood} />
          <NoteField note={note} setNote={setNote} />
          <FormActions
            onCancel={onCancel}
            isEditMode={isEditMode}
            isSubmitting={isSubmitting}
            selectedMood={!!selectedMood}
          />
        </form>
      </CardContent>
    </Card>
  );
}
