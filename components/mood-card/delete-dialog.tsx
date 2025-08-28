import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { MoodEntry } from "@/types/mood";
import { format } from "date-fns";

interface DeleteDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  entry: MoodEntry;
  onConfirm: () => void;
}

export function DeleteDialog({ open, onOpenChange, entry, onConfirm }: DeleteDialogProps) {
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete Mood Entry</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to delete this mood entry from{" "}
            {format(new Date(entry.date), "MMMM d, yyyy")}? <br />
            This action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={onConfirm}
            className="bg-destructive text-white hover:bg-destructive/90"
          >
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
