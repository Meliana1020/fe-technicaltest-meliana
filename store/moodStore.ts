import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { MoodEntry } from '@/types/mood';

interface MoodStore {
  entries: MoodEntry[];
  isLoading: boolean;
  error: string | null;
  
  // Actions
  addEntry: (entry: Omit<MoodEntry, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateEntry: (id: string, entry: Partial<Omit<MoodEntry, 'id' | 'createdAt'>>) => void;
  deleteEntry: (id: string) => void;
  getEntryById: (id: string) => MoodEntry | undefined;
  getEntriesByDateRange: (startDate: string, endDate: string) => MoodEntry[];
  clearError: () => void;
}

const generateId = (): string => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};

export const useMoodStore = create<MoodStore>()(
  persist(
    (set, get) => ({
      entries: [],
      isLoading: false,
      error: null,

      addEntry: (entryData) => {
        try {
          const now = new Date().toISOString();
          const newEntry: MoodEntry = {
            ...entryData,
            id: generateId(),
            createdAt: now,
            updatedAt: now,
          };

          set((state) => ({
            entries: [newEntry, ...state.entries].sort(
              (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
            ),
            error: null,
          }));
        } catch (error) {
          set({ error: 'Failed to add mood entry' });
        }
      },

      updateEntry: (id, updateData) => {
        try {
          set((state) => ({
            entries: state.entries.map((entry) =>
              entry.id === id
                ? { ...entry, ...updateData, updatedAt: new Date().toISOString() }
                : entry
            ),
            error: null,
          }));
        } catch (error) {
          set({ error: 'Failed to update mood entry' });
        }
      },

      deleteEntry: (id) => {
        try {
          set((state) => ({
            entries: state.entries.filter((entry) => entry.id !== id),
            error: null,
          }));
        } catch (error) {
          set({ error: 'Failed to delete mood entry' });
        }
      },

      getEntryById: (id) => {
        return get().entries.find((entry) => entry.id === id);
      },

      getEntriesByDateRange: (startDate, endDate) => {
        const start = new Date(startDate);
        const end = new Date(endDate);
        
        return get().entries.filter((entry) => {
          const entryDate = new Date(entry.date);
          return entryDate >= start && entryDate <= end;
        });
      },

      clearError: () => {
        set({ error: null });
      },
    }),
    {
      name: 'mood-tracker-storage',
      version: 1,
    }
  )
);