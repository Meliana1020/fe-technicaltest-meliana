import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface NoteFieldProps {
  note: string;
  setNote: (note: string) => void;
}

export function NoteField({ note, setNote }: NoteFieldProps) {
  return (
    <div className="space-y-2">
      <Label htmlFor="note" className="text-sm font-semibold text-foreground">
        Note (Optional)
      </Label>
      <Textarea
        id="note"
        placeholder="How was your day? What made you feel this way?"
        value={note}
        onChange={(e) => setNote(e.target.value)}
        className="min-h-[100px] transition-smooth focus:shadow-mood"
        maxLength={500}
      />
      <p className="text-xs text-muted-foreground text-right">
        {note.length}/500 characters
      </p>
    </div>
  );
}
