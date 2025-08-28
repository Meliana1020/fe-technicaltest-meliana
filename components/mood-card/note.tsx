interface MoodNoteProps {
  note?: string;
  textColor: string;
}

export function MoodNote({ note, textColor }: MoodNoteProps) {
  if (!note) return null;

  return (
    <div
      className="rounded-lg p-3 mb-3"
      style={{ backgroundColor: `${textColor}20` }}
    >
      <p className="text-sm leading-relaxed">&quot;{note}&quot;</p>
    </div>
  );
}
