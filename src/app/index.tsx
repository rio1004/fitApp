import { BottomTabInset, MaxContentWidth, Spacing } from "@/constants/theme";
import {
  CheckCircle2,
  Flame,
  Plus,
  Settings,
  Sun,
} from "@tamagui/lucide-icons-2";
import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  Button,
  Card,
  H1,
  H3,
  Progress,
  Separator,
  SizableText,
  XStack,
  YStack,
} from "tamagui";

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <XStack justifyContent="space-between">
        <YStack>
          <SizableText size="$3">THU, SEP 24</SizableText>
          <H3>Good morning, Rio</H3>
        </YStack>
        <Settings />
      </XStack>
      <XStack>
        <Flame />
        <SizableText> 7 day streak</SizableText>
      </XStack>
      <Card>
        <Card.Header>
          <SizableText>Calories today</SizableText>
        </Card.Header>
        <XStack alignItems="flex-end" justifyContent="space-between">
          <XStack alignItems="flex-end">
            <H1>1,650</H1>
            <SizableText>/2,100 kcal</SizableText>
          </XStack>
          <SizableText>79%</SizableText>
        </XStack>
        <SizableText>450 kcal remaining</SizableText>
        <Card.Footer>
          <Button>
            <Plus />
            <SizableText>Add food</SizableText>
          </Button>
        </Card.Footer>
      </Card>
      <Card>
        <Card.Header>
          <SizableText>Calories today</SizableText>
          <XStack>
            <SizableText>2 of 3 complete</SizableText>
            <SizableText>67%</SizableText>
          </XStack>
          <Progress value={60}>
            <Progress.Indicator />
          </Progress>
          <Separator my={15} />
          <XStack alignItems="center" justifyContent="space-between">
            <XStack alignItems="center">
              <Sun />
              <YStack>
                <SizableText>Wake up</SizableText>
                <SizableText>6:30 AM - Completed</SizableText>
              </YStack>
            </XStack>
            <CheckCircle2 />
          </XStack>
          <Separator my={15} />
          <XStack alignItems="center" justifyContent="space-between">
            <XStack alignItems="center">
              <Sun />
              <YStack>
                <SizableText>Wake up</SizableText>
                <SizableText>6:30 AM - Completed</SizableText>
              </YStack>
            </XStack>
            <CheckCircle2 />
          </XStack>
          <Separator my={15} />
          <XStack alignItems="center" justifyContent="space-between">
            <XStack alignItems="center">
              <Sun />
              <YStack>
                <SizableText>Wake up</SizableText>
                <SizableText>6:30 AM - Completed</SizableText>
              </YStack>
            </XStack>
            <CheckCircle2 />
          </XStack>
          <Separator my={15} />
        </Card.Header>
        <Card.Footer>
          <SizableText>One commitment at a time</SizableText>
        </Card.Footer>
      </Card>
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
