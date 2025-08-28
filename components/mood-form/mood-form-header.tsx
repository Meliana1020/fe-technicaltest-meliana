import { CardHeader, CardTitle } from "@/components/ui/card";
import { Heart } from "lucide-react";

interface MoodFormHeaderProps {
  isEditMode: boolean;
}

export function MoodFormHeader({ isEditMode }: MoodFormHeaderProps) {
  return (
    <CardHeader className="text-center space-y-2">
      <div className="mx-auto w-16 h-16 gradient-primary rounded-full flex items-center justify-center animate-float">
        <Heart className="w-8 h-8 text-white" />
      </div>
      <CardTitle className="text-2xl font-bold text-foreground">
        {isEditMode ? "Edit Your Mood" : "How Are You Feeling?"}
      </CardTitle>
      <p className="text-muted-foreground">
        {isEditMode ? "Update your mood entry" : "Track your emotional well-being"}
      </p>
    </CardHeader>
  );
}
