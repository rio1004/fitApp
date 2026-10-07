import { AppButton } from "@/components/app-button";
import CustomScreen from "@/components/screen";
import TitleHeader from "@/components/title-header";
import {
  ChevronLeft,
  ChevronRight,
  Cookie,
  Drumstick,
  Hamburger,
  Plus,
  Sun,
} from "@tamagui/lucide-icons-2";
import { ComponentType } from "react";
import {
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
    calorie: "304",
  },
  {
    icon: Hamburger,
    lunchType: "Lunch",
    food: "Completed",
    calorie: "400",
  },
  {
    icon: Drumstick,
    lunchType: "Dinner",
    food: "On track",
    calorie: "450",
  },
  {
    icon: Cookie,
    lunchType: "Snacks",
    food: "On track",
    calorie: "120",
  },
];
export default function HomeScreen() {

  const ListComponent = ({
    icon: Icon,
    lunchType,
    calorie,
    food,
  }: ListProps) => (
    <Card
      padding={"$4"}
      gap={"$2"}
      borderWidth={1}
      borderColor="$borderColor"
    >
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
          <ChevronLeft />
          <SizableText fontWeight={"bold"}>Today, Sep 24</SizableText>
          <ChevronRight />
        </XStack>
        <Card
          padding={"$4"}
          gap={"$2"}
          borderWidth={1}
          borderColor="$borderColor"
        >
          <XStack alignItems="flex-end" justifyContent="space-between">
            <XStack alignItems="flex-end">
              <H1>1,650</H1>
              <SizableText>/2,100 kcal</SizableText>
            </XStack>
            <SizableText color="$primaryAction" fontWeight={"bold"}>
              79%
            </SizableText>
          </XStack>
          <Progress backgroundColor="$progressTrack" value={70}>
            <Progress.Indicator backgroundColor="$primaryAction" />
          </Progress>
          <SizableText size="$3" color="$textSecondary">
            450 kcal remaining
          </SizableText>
        </Card>
        {calories &&
          calories.map((item) => (
            <ListComponent
              lunchType={item.lunchType}
              icon={item.icon}
              food={item.food}
              calorie={item.calorie}
              key={item.lunchType}
            />
          ))}
        <AppButton icon={Plus}>Add food</AppButton>
      </YStack>
    </CustomScreen>
  );
}
