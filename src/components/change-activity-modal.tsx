import { AppButton } from "@/components/app-button";
import { dateKey } from "@/utils/dates";
import { X } from "@tamagui/lucide-icons-2";
import { useRef, useState } from "react";
import {
  KeyboardAvoidingView,
  Modal,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Button, H2, Input, SizableText, XStack, YStack } from "tamagui";

export const workoutActivities = [
  "Gym",
  "Running",
  "Walking",
  "Home workout",
  "Custom",
] as const;
export type WorkoutPlan = {
  activity: (typeof workoutActivities)[number];
  customName: string;
  minutes: number;
};

type Props = {
  initialPlan: WorkoutPlan;
  onClose: () => void;
  onSave: (plan: WorkoutPlan) => void;
  onLog?: (plan: WorkoutPlan, date: string) => void;
};

export function ChangeActivityModal({
  initialPlan,
  onClose,
  onSave,
  onLog,
}: Props) {
  const insets = useSafeAreaInsets();
  const [activity, setActivity] = useState(initialPlan.activity);
  const [customName, setCustomName] = useState(initialPlan.customName);
  const [minutes, setMinutes] = useState(String(initialPlan.minutes));
  const [error, setError] = useState("");
  const [date, setDate] = useState(dateKey);
  const saving = useRef(false);
  const title = onLog ? "Log completed workout" : "Change activity";

  function save() {
    if (activity === "Custom" && !customName.trim()) {
      return setError("Enter a name for your workout.");
    }
    if (
      !/^\d+$/.test(minutes.trim()) ||
      Number(minutes) < 1 ||
      Number(minutes) > 1440
    ) {
      return setError("Enter a duration between 1 and 1,440 minutes.");
    }
    if (onLog) {
      const parsed = new Date(`${date}T12:00:00`);
      if (
        !/^\d{4}-\d{2}-\d{2}$/.test(date) ||
        Number.isNaN(parsed.getTime()) ||
        dateKey(parsed) !== date
      ) {
        return setError("Enter a valid date as YYYY-MM-DD.");
      }
      if (date > dateKey())
        return setError("A completed workout cannot have a future date.");
    }
    if (saving.current) return;
    saving.current = true;
    const plan = {
      activity,
      customName: customName.trim(),
      minutes: Number(minutes),
    };
    if (onLog) onLog(plan, date);
    else onSave(plan);
  }

  return (
    <Modal
      transparent
      animationType="slide"
      visible
      onRequestClose={onClose}
      statusBarTranslucent
    >
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <Pressable
          style={styles.overlay}
          onPress={onClose}
          accessibilityRole="button"
          accessibilityLabel={`Dismiss ${title.toLowerCase()}`}
        />
        <YStack
          backgroundColor="$surface"
          borderTopLeftRadius={24}
          borderTopRightRadius={24}
          width="100%"
          maxWidth={560}
          alignSelf="center"
          maxHeight="90%"
          paddingTop={12}
          paddingBottom={Math.max(insets.bottom, 24)}
          paddingLeft={Math.max(insets.left, 24)}
          paddingRight={Math.max(insets.right, 24)}
          accessibilityViewIsModal
          onAccessibilityEscape={onClose}
        >
          <YStack
            width={48}
            height={5}
            borderRadius={5}
            backgroundColor="$borderColor"
            alignSelf="center"
            marginBottom={12}
          />
          <XStack
            justifyContent="space-between"
            alignItems="center"
            marginBottom={12}
          >
            <H2 fontSize={26} flex={1}>
              {title}
            </H2>
            <Button
              circular
              chromeless
              size={48}
              icon={X}
              accessibilityLabel={`Close ${title.toLowerCase()}`}
              onPress={onClose}
            />
          </XStack>
          <ScrollView
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
          >
            <YStack gap={16}>
              <SizableText color="$textSecondary">
                {onLog
                  ? "Record a workout you’ve already finished."
                  : "Choose your workout and duration goal for today."}
              </SizableText>
              <YStack gap={8}>
                <SizableText fontWeight="600">Activity</SizableText>
                <XStack gap={8} flexWrap="wrap">
                  {workoutActivities.map((item) => (
                    <Button
                      key={item}
                      theme={activity === item ? "primary" : "secondary"}
                      minHeight={48}
                      borderRadius={12}
                      paddingHorizontal={16}
                      flexGrow={1}
                      accessibilityRole="radio"
                      accessibilityState={{ checked: activity === item }}
                      onPress={() => {
                        setActivity(item);
                        setError("");
                      }}
                    >
                      {item}
                    </Button>
                  ))}
                </XStack>
              </YStack>
              {activity === "Custom" && (
                <YStack gap={6}>
                  <SizableText fontWeight="600">Workout name</SizableText>
                  <Input
                    accessibilityLabel="Custom workout name"
                    placeholder="e.g. Cycling"
                    value={customName}
                    onChangeText={setCustomName}
                    maxLength={80}
                    height={48}
                    borderRadius={12}
                    backgroundColor="$surface"
                  />
                </YStack>
              )}
              <YStack gap={6}>
                <SizableText fontWeight="600">
                  {onLog ? "Completed duration" : "Duration goal"}
                </SizableText>
                <XStack
                  alignItems="center"
                  borderWidth={1}
                  borderColor="$borderColor"
                  borderRadius={12}
                  paddingRight={14}
                >
                  <Input
                    flex={1}
                    minWidth={0}
                    height={48}
                    borderWidth={0}
                    backgroundColor="transparent"
                    accessibilityLabel={
                      onLog
                        ? "Completed duration in minutes"
                        : "Duration goal in minutes"
                    }
                    keyboardType="number-pad"
                    value={minutes}
                    onChangeText={setMinutes}
                    maxLength={4}
                    placeholder="30"
                  />
                  <SizableText color="$textSecondary" size="$3">
                    min
                  </SizableText>
                </XStack>
                <XStack gap={8} flexWrap="wrap">
                  {[15, 30, 45, 60].map((value) => (
                    <Button
                      key={value}
                      minHeight={48}
                      flexGrow={1}
                      borderRadius={12}
                      theme={
                        Number(minutes) === value ? "primary" : "secondary"
                      }
                      accessibilityLabel={`${value} minutes`}
                      accessibilityState={{
                        selected: Number(minutes) === value,
                      }}
                      onPress={() => {
                        setMinutes(String(value));
                        setError("");
                      }}
                    >{`${value} min`}</Button>
                  ))}
                </XStack>
              </YStack>
              {!!onLog && (
                <YStack gap={6}>
                  <SizableText fontWeight="600">Workout date</SizableText>
                  <Input
                    accessibilityLabel="Workout date, YYYY-MM-DD"
                    placeholder="YYYY-MM-DD"
                    value={date}
                    onChangeText={setDate}
                    maxLength={10}
                    height={48}
                    borderRadius={12}
                    backgroundColor="$surface"
                  />
                  <SizableText size="$3" color="$textSecondary">
                    YYYY-MM-DD · Today or an earlier date
                  </SizableText>
                  <XStack gap={8}>
                    <Button
                      flex={1}
                      minHeight={48}
                      theme="secondary"
                      onPress={() => {
                        setDate(dateKey());
                        setError("");
                      }}
                    >
                      Today
                    </Button>
                    <Button
                      flex={1}
                      minHeight={48}
                      theme="secondary"
                      onPress={() => {
                        const yesterday = new Date();
                        yesterday.setDate(yesterday.getDate() - 1);
                        setDate(dateKey(yesterday));
                        setError("");
                      }}
                    >
                      Yesterday
                    </Button>
                  </XStack>
                </YStack>
              )}
              {!!error && (
                <SizableText
                  color="$danger"
                  accessibilityRole="alert"
                  accessibilityLiveRegion="polite"
                >
                  {error}
                </SizableText>
              )}
              <AppButton marginTop={8} onPress={save}>
                {onLog ? "Log workout" : "Save activity"}
              </AppButton>
            </YStack>
          </ScrollView>
        </YStack>
      </KeyboardAvoidingView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "flex-end" },
  overlay: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "rgba(0, 0, 0, 0.45)",
  },
});
