import { AppButton } from "@/components/app-button";
import CustomScreen from "@/components/screen";
import TitleHeader from "@/components/title-header";
import {
  calorieGoal,
  dateKey,
  dateLabel,
  useFoodLog,
} from "@/contexts/food-log";
import {
  ChevronLeft,
  ChevronRight,
  Cookie,
  Drumstick,
  Hamburger,
  Plus,
  Sun,
} from "@tamagui/lucide-icons-2";
import { ComponentType, useState } from "react";
import {
  Button,
  Card,
  H1,
  Progress,
  SizableText,
  XStack,
  YStack,
} from "tamagui";

type ListProps = {
  icon: ComponentType<any>;
  lunchType: string;
  food: string;
  calorie: string;
};

const calories: ListProps[] = [
  {
    icon: Sun,
    lunchType: "Breakfast",
    food: "Completed",
    calorie: "400",
  },
  {
    icon: Hamburger,
    lunchType: "Lunch",
    food: "Completed",
    calorie: "550",
  },
  {
    icon: Drumstick,
    lunchType: "Dinner",
    food: "On track",
    calorie: "580",
  },
  {
    icon: Cookie,
    lunchType: "Snacks",
    food: "On track",
    calorie: "120",
  },
];
export default function HomeScreen() {
  const { entries, openAddFood } = useFoodLog();
  const [selectedDate, setSelectedDate] = useState(dateKey);
  const dailyEntries = entries.filter((entry) => entry.date === selectedDate);
  const baseTotal = selectedDate === dateKey() ? 1650 : 0;
  const total =
    baseTotal + dailyEntries.reduce((sum, entry) => sum + entry.calories, 0);
  const percent = Math.round((total / calorieGoal) * 100);
  function shiftDate(days: number) {
    const date = new Date(`${selectedDate}T12:00:00`);
    date.setDate(date.getDate() + days);
    setSelectedDate(dateKey(date));
  }

  const ListComponent = ({
    icon: Icon,
    lunchType,
    calorie,
    food,
  }: ListProps) => (
    <Card padding={"$4"} gap={"$2"} borderWidth={1} borderColor="$borderColor">
      <XStack alignItems="center" justifyContent="space-between">
        <XStack alignItems="center" gap={"$5"}>
          <Icon size="$3" />
          <YStack>
            <SizableText fontWeight={"bold"}>{lunchType}</SizableText>
            <SizableText size="$3" color="$textSecondary">
              {food}
            </SizableText>
          </YStack>
        </XStack>
        <XStack>
          <SizableText fontWeight={"bold"}>{calorie} kcal</SizableText>
          <ChevronRight />
        </XStack>
      </XStack>
    </Card>
  );

  return (
    <CustomScreen>
      <YStack gap={"$4"}>
        <TitleHeader hasDate={false} title="Calories" />
        <XStack gap={"$6"} justifyContent="center">
          <Button
            chromeless
            icon={ChevronLeft}
            minHeight={48}
            accessibilityLabel="Previous day"
            onPress={() => shiftDate(-1)}
          />
          <SizableText alignSelf="center" fontWeight={"bold"}>
            {dateLabel(selectedDate)}
          </SizableText>
          <Button
            chromeless
            icon={ChevronRight}
            minHeight={48}
            accessibilityLabel="Next day"
            onPress={() => shiftDate(1)}
          />
        </XStack>
        <Card
          padding={"$4"}
          gap={"$2"}
          borderWidth={1}
          borderColor="$borderColor"
        >
          <XStack alignItems="flex-end" justifyContent="space-between">
            <XStack alignItems="flex-end">
              <H1>{total.toLocaleString()}</H1>
              <SizableText>/2,100 kcal</SizableText>
            </XStack>
            <SizableText color="$primaryAction" fontWeight={"bold"}>
              {percent}%
            </SizableText>
          </XStack>
          <Progress
            backgroundColor="$progressTrack"
            value={Math.min(percent, 100)}
          >
            <Progress.Indicator backgroundColor="$primaryAction" />
          </Progress>
          <SizableText size="$3" color="$textSecondary">
            {Math.abs(calorieGoal - total).toLocaleString()} kcal{" "}
            {total > calorieGoal ? "over goal" : "remaining"}
          </SizableText>
        </Card>
        {calories &&
          calories.map((item) => (
            <ListComponent
              lunchType={item.lunchType}
              icon={item.icon}
              food={
                dailyEntries
                  .filter(
                    (entry) =>
                      entry.meal ===
                      (item.lunchType === "Snacks" ? "Snack" : item.lunchType),
                  )
                  .map((entry) => entry.name)
                  .join(", ") || (baseTotal ? item.food : "No foods logged")
              }
              calorie={String(
                (baseTotal ? Number(item.calorie) : 0) +
                  dailyEntries
                    .filter(
                      (entry) =>
                        entry.meal ===
                        (item.lunchType === "Snacks"
                          ? "Snack"
                          : item.lunchType),
                    )
                    .reduce((sum, entry) => sum + entry.calories, 0),
              )}
              key={item.lunchType}
            />
          ))}
        <AppButton icon={Plus} onPress={() => openAddFood(selectedDate)}>
          Add food
        </AppButton>
      </YStack>
    </CustomScreen>
  );
}
