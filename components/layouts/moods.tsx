"use client";
import { Plus, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MoodList } from "@/components/mood-list/mood-list";
import { useRouter } from "next/navigation";

export default function MoodsLayout() {
  const router = useRouter();

  return (
    <div className="min-h-screen max-w-6xl mx-auto py-6 px-4">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-6 gap-4">
        <h1 className="text-2xl font-bold">Your Mood Journal</h1>
        <div className="flex gap-2">
          <Button
            variant="ghost"
            className="bg-blue-500 text-white hover:bg-blue-500/70 hover:text-white"
            onClick={() => router.push("/")}
          >
            <Home className="w-4 h-4 mr-2" /> Home
          </Button>
          <Button
            className="bg-gray-600 text-white hover:bg-gray-400/70"
            onClick={() => router.push("/moods/new")}
          >
            <Plus className="w-4 h-4 mr-2" /> Add Mood
          </Button>
        </div>
      </div>

      <MoodList />
    </div>
  );
}
