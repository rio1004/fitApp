import TitleHeader from "@/components/title-header";
import {
  BottomTabInset,
  Colors,
  MaxContentWidth,
  Spacing,
} from "@/constants/theme";
import {
  CheckCircle2,
  Dumbbell,
  Flame,
  Plus,
  Sun,
  Utensils,
} from "@tamagui/lucide-icons-2";
import { ComponentType } from "react";
import { StyleSheet, useColorScheme } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  Button,
  Card,
  H1,
  Progress,
  Separator,
  SizableText,
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
  const scheme = useColorScheme();
  const colors = Colors[scheme === "unspecified" ? "light" : scheme];

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
            <SizableText size="$3" color={colors.textSecondary}>
              {time} - {status}
            </SizableText>
          </YStack>
        </XStack>
        <CheckCircle2 fill={colors.primaryAction} color={"#fff"} size={"$3"} />
      </XStack>
      <Separator my={"$2"} />
    </>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <YStack gap={"$4"}>
        <TitleHeader hasDate={true} title="Good morning, Rio" />
        <XStack>
          <XStack
            backgroundColor={colors.accentSurface}
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
        <Card padding={"$4"} gap={"$2"}>
          <SizableText fontWeight={"bold"}>Calories today</SizableText>
          <XStack alignItems="flex-end" justifyContent="space-between">
            <XStack alignItems="flex-end">
              <H1>1,650</H1>
              <SizableText>/2,100 kcal</SizableText>
            </XStack>
            <SizableText color={colors.primaryAction} fontWeight={"bold"}>
              79%
            </SizableText>
          </XStack>
          <Progress value={70}>
            <Progress.Indicator backgroundColor={colors.primaryAction} />
          </Progress>
          <SizableText size="$3" color={colors.textSecondary}>
            450 kcal remaining
          </SizableText>
          <Button backgroundColor={colors.primaryAction}>
            <Plus color={"#fff"} />
            <SizableText color={"#fff"}>Add food</SizableText>
          </Button>
        </Card>
        <Card padding={"$4"} gap={"$2"}>
          <SizableText fontWeight={"bold"}>Today's commitments</SizableText>
          <XStack justifyContent="space-between">
            <SizableText size="$3" color={colors.textSecondary}>
              2 of 3 complete
            </SizableText>
            <SizableText color={colors.primaryAction} fontWeight={"bold"}>
              67%
            </SizableText>
          </XStack>
          <Progress value={60}>
            <Progress.Indicator backgroundColor={colors.primaryAction} />
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
          <SizableText size="$2" color={colors.textSecondary}>
            One commitment at a time
          </SizableText>
        </Card>
      </YStack>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    width: "100%",
    alignSelf: "center",
    paddingHorizontal: Spacing.four,
    paddingBottom: BottomTabInset + Spacing.three,
    maxWidth: MaxContentWidth,
  },
});
