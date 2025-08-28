import { Card, CardContent } from "@/components/ui/card";
import { Brain } from "lucide-react";

export function EmptyState() {
  return (
    <Card className="gradient-card shadow-card border-0">
      <CardContent className="py-16 text-center">
        <div className="w-20 h-20 gradient-primary rounded-full flex items-center justify-center mx-auto mb-4 animate-float">
          <Brain className="w-10 h-10 text-white" />
        </div>
        <h3 className="text-xl font-semibold mb-2 text-foreground">
          Start Your Mood Journey
        </h3>
        <p className="text-muted-foreground mb-6 max-w-md mx-auto">
          Track your daily emotions and gain insights into your mental well-being.
        </p>
        <div className="flex justify-center">
          <div className="w-32 h-2 gradient-mood rounded-full opacity-50"></div>
        </div>
      </CardContent>
    </Card>
  );
}
