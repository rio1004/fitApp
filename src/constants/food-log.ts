export const meals = ['Breakfast', 'Lunch', 'Dinner', 'Snack'] as const;
export type Meal = (typeof meals)[number];
export type FoodEntry = { id: string; name: string; calories: number; meal: Meal; date: string };
export const calorieGoal = 2100;
