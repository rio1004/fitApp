import { AppButton } from "@/components/app-button";
import CustomScreen from "@/components/screen";
import TitleHeader from "@/components/title-header";
import { calorieGoal, dateKey, useFoodLog } from "@/contexts/food-log";
import {
  CheckCircle2,
  Dumbbell,
  Flame,
  Plus,
  Sun,
  Utensils,
} from "@tamagui/lucide-icons-2";
import { ComponentType } from "react";
import {
  Card,
  H1,
  Progress,
  Separator,
  SizableText,
  useTheme,
  XStack,
  YStack,
} from "tamagui";

type ListProps = {
  icon: ComponentType<any>;
  commitmentType: string;
  time: string;
  status: string;
};

const commitments: ListProps[] = [
  {
    icon: Sun,
    commitmentType: "Wake up",
    status: "Completed",
    time: "9:30 am",
  },
  {
    icon: Dumbbell,
    commitmentType: "Workout",
    status: "Completed",
    time: "6:30 am",
  },
  {
    icon: Utensils,
    commitmentType: "Calorie Deficit",
    status: "On track",
    time: "8:30 pm",
  },
];

export default function HomeScreen() {
  const theme = useTheme();
  const { entries, openAddFood } = useFoodLog();
  const total =
    1650 +
    entries
      .filter((entry) => entry.date === dateKey())
      .reduce((sum, entry) => sum + entry.calories, 0);
  const percent = Math.round((total / calorieGoal) * 100);

  const ListComponent = ({
    icon: Icon,
    commitmentType,
    time,
    status,
  }: ListProps) => (
    <>
      <XStack alignItems="center" justifyContent="space-between">
        <XStack alignItems="center" gap={"$5"}>
          <Icon />
          <YStack>
            <SizableText fontWeight={"bold"}>{commitmentType}</SizableText>
            <SizableText size="$3" color="$textSecondary">
              {time} - {status}
            </SizableText>
          </YStack>
        </XStack>
        <CheckCircle2
          fill={theme.primaryAction.get()}
          color="$onPrimary"
          size={"$3"}
        />
      </XStack>
      <Separator my={"$2"} />
    </>
  );

  return (
    <CustomScreen>
      <YStack gap={"$4"}>
        <TitleHeader hasDate={true} title="Good morning, Rio" />
        <XStack>
          <XStack
            theme="accent"
            backgroundColor="$background"
            borderRadius={"$radius.9"}
            padding={5}
            paddingHorizontal={20}
            justifyContent="center"
            alignItems="center"
            gap={"$2"}
          >
            <Flame />
            <SizableText size={"$3"} fontWeight={"bold"}>
              {" "}
              7 day streak
            </SizableText>
          </XStack>
        </XStack>
        <Card
          padding={"$4"}
          gap={"$2"}
          borderWidth={1}
          borderColor="$borderColor"
        >
          <SizableText fontWeight={"bold"}>Calories today</SizableText>
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
          <AppButton icon={Plus} theme="primary" onPress={() => openAddFood()}>
            Add food
          </AppButton>
        </Card>
        <Card
          padding={"$4"}
          gap={"$2"}
          borderWidth={1}
          borderColor="$borderColor"
        >
          <SizableText fontWeight={"bold"}>{"Today's commitments"}</SizableText>
          <XStack justifyContent="space-between">
            <SizableText size="$3" color="$textSecondary">
              2 of 3 complete
            </SizableText>
            <SizableText color="$primaryAction" fontWeight={"bold"}>
              67%
            </SizableText>
          </XStack>
          <Progress backgroundColor="$progressTrack" value={60}>
            <Progress.Indicator backgroundColor="$primaryAction" />
          </Progress>
          <Separator my={"$3"} />
          {commitments &&
            commitments.map((item) => (
              <ListComponent
                commitmentType={item.commitmentType}
                icon={item.icon}
                status={item.status}
                time={item.time}
                key={item.commitmentType}
              />
            ))}
          <SizableText size="$2" color="$textSecondary">
            One commitment at a time
          </SizableText>
        </Card>
      </YStack>
    </CustomScreen>
  );
}
