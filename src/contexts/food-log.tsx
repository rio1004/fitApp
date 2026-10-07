import { createContext, ReactNode, useContext, useState } from 'react';
import { AddFoodModal } from '@/components/add-food-modal';

export const meals = ['Breakfast', 'Lunch', 'Dinner', 'Snack'] as const;
export type Meal = (typeof meals)[number];
export type FoodEntry = { id: string; name: string; calories: number; meal: Meal; date: string };
export const calorieGoal = 2100;

export function dateKey(date = new Date()) {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
}

export function dateLabel(date: string) {
  const formatted = new Date(`${date}T12:00:00`).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  return date === dateKey() ? `Today, ${formatted}` : formatted;
}

const FoodLogContext = createContext<{
  entries: FoodEntry[];
  openAddFood: (date?: string) => void;
} | null>(null);

export function FoodLogProvider({ children }: { children: ReactNode }) {
  const [entries, setEntries] = useState<FoodEntry[]>([]);
  const [modalDate, setModalDate] = useState<string | null>(null);
  return (
    <FoodLogContext.Provider value={{ entries, openAddFood: (date = dateKey()) => setModalDate(date) }}>
      {children}
      {modalDate !== null && (
        <AddFoodModal
          initialDate={modalDate}
          onClose={() => setModalDate(null)}
          onSave={(entry) => {
            setEntries((current) => [...current, { ...entry, id: `${Date.now()}-${Math.random()}` }]);
            setModalDate(null);
          }}
        />
      )}
    </FoodLogContext.Provider>
  );
}

export function useFoodLog() {
  const context = useContext(FoodLogContext);
  if (!context) throw new Error('useFoodLog must be used within FoodLogProvider');
  return context;
}
