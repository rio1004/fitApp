import { createContext, ReactNode, useContext, useState } from 'react';
import { AddFoodModal } from '@/components/add-food-modal';

import { FoodEntry } from '@/constants/food-log';
import { dateKey } from '@/utils/dates';

export { meals, calorieGoal } from '@/constants/food-log';
export type { FoodEntry, Meal } from '@/constants/food-log';
export { dateKey, dateLabel } from '@/utils/dates';

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
