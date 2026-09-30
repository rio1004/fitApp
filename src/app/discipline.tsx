import { AppCard } from "@/components/app-card";
import { ListComponent } from "@/components/list-item";
import { ProgressComponent } from "@/components/progress-comp";
import CustomScreen from "@/components/screen";
import TitleHeader from "@/components/title-header";
import { Colors } from "@/constants/theme";
import {
  ChartNoAxesColumnIncreasing,
  CheckCircle2,
  ChevronRight,
  Clock,
  Dumbbell,
  Flame,
  Sun,
  Utensils,
} from "@tamagui/lucide-icons-2";
import { ComponentType } from "react";
import { useColorScheme } from "react-native";
import { H1, Separator, SizableText, XStack, YStack } from "tamagui";

type ListProps = {
  icon: ComponentType<any>;
  commitmentType: string;
  time: string;
  status: string;
};

type WeekItemProps = {
  day: string;
  status: string;
};

const weekItems: WeekItemProps[] = [
  { day: "Mon", status: "done" },
  { day: "Tue", status: "done" },
  { day: "Wed", status: "done" },
  { day: "Thu", status: "done" },
  { day: "Fri", status: "done" },
  { day: "Sat", status: "done" },
  { day: "Sun", status: "done" },
];

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

export default function DisciplineScreen() {
  const scheme = useColorScheme();
  const colors = Colors[scheme === "unspecified" ? "light" : scheme];

  const WeekItem = ({ day, status }: WeekItemProps) => (
    <YStack>
      <SizableText>{day}</SizableText>
      <CheckCircle2 fill={colors.primaryAction} color={"#fff"} size={"$3"} />
    </YStack>
  );
  return (
    <CustomScreen>
      <YStack gap={"$4"}>
        <TitleHeader hasDate={false} title="Discipline" />
        <XStack
          backgroundColor={colors.accentSurface}
          alignItems="center"
          padding={"$3"}
          borderRadius={"$5"}
          gap={"$4"}
        >
          <Flame size={"$5"} />
          <YStack>
            <XStack alignItems="flex-end">
              <H1>7</H1>
              <SizableText>day streak</SizableText>
            </XStack>
            <SizableText fontSize={"$2"}>Show up. Keep going</SizableText>
          </YStack>
        </XStack>
        <AppCard title="Today's score">
          <ProgressComponent
            numerator="67%"
            percentage="67"
            rightValue={["2 of 3 complete", "secondary"]}
          />
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
        </AppCard>
        <AppCard title="This week">
          <XStack justifyContent="space-between">
            {weekItems &&
              weekItems.map((item) => (
                <WeekItem day={item.day} status={item.status} key={item.day} />
              ))}
          </XStack>
          <XStack gap={"$5"}>
            <XStack alignItems="center" gap={"$3"}>
              <CheckCircle2
                fill={colors.primaryAction}
                color={"#fff"}
                size={"$2"}
              />
              <SizableText>Complete</SizableText>
            </XStack>
            <XStack alignItems="center" gap={"$3"}>
              <Clock color={"#cf9f64"} />
              <SizableText>Pending</SizableText>
            </XStack>
          </XStack>
        </AppCard>
        <AppCard>
          <XStack justifyContent="space-between">
            <XStack alignItems="center" gap={"$5"}>
              <ChartNoAxesColumnIncreasing />
              <SizableText fontWeight={"bold"}>View History</SizableText>
            </XStack>
            <ChevronRight />
          </XStack>
        </AppCard>
      </YStack>
    </CustomScreen>
  );
}
