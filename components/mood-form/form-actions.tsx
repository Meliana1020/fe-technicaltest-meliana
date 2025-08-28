import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

interface FormActionsProps {
  onCancel?: () => void;
  isEditMode: boolean;
  isSubmitting: boolean;
  selectedMood: boolean;
}

export function FormActions({ onCancel, isEditMode, isSubmitting, selectedMood }: FormActionsProps) {
  return (
    <div className="flex gap-3 pt-4">
      {onCancel && (
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
          className="flex-1 transition-smooth"
        >
          Cancel
        </Button>
      )}
      <Button
        type="submit"
        disabled={!selectedMood || isSubmitting}
        className="flex-1 gradient-primary border-0 text-white transition-smooth hover:shadow-mood disabled:opacity-50"
      >
        {isSubmitting ? (
          "Saving..."
        ) : (
          <>
            {isEditMode ? "Update" : <Plus className="w-4 h-4 mr-2" />}
            {isEditMode ? " Mood" : "Save Mood"}
          </>
        )}
      </Button>
    </div>
  );
}
