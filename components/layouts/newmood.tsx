"use client";

import { MoodForm } from "@/components/mood-form/mood-form";
import { useRouter } from "next/navigation";

export default function NewMoodLayout() {
  const router = useRouter();

  return (
    <div className="min-h-screen py-8 px-4 flex-1">
      <div className="max-w-xl mx-auto">
        <h1 className="text-2xl font-bold mb-4">Track Today&apos;s Mood</h1>
        <MoodForm
          onSuccess={() => router.push("/moods")}
          onCancel={() => router.push("/moods")}
        />
      </div>
    </div>
  );
}
