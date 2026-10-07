import { useEffect, useRef, useState } from "react";
import { AppState } from "react-native";
import { CheckCircle2, Pause, Play } from "@tamagui/lucide-icons-2";
import { H2, Progress, SizableText, XStack, YStack } from "tamagui";
import { AppButton } from "@/components/app-button";
import { AppCard } from "@/components/app-card";
import { WorkoutPlan } from "@/components/change-activity-modal";

export function WorkoutSession({
  plan,
  onComplete,
  onDiscard,
}: {
  plan: WorkoutPlan;
  onComplete: (seconds: number) => void;
  onDiscard: () => void;
}) {
  const accumulated = useRef(0);
  const startedAt = useRef<number | null>(null);
  const finished = useRef(false);
  const [seconds, setSeconds] = useState(0);
  const [paused, setPaused] = useState(false);
  const [confirmDiscard, setConfirmDiscard] = useState(false);
  const goalSeconds = plan.minutes * 60;
  const goalReached = seconds >= goalSeconds;

  function elapsed() {
    return (
      accumulated.current +
      (startedAt.current === null
        ? 0
        : Math.max(0, Date.now() - startedAt.current))
    );
  }

  useEffect(() => {
    startedAt.current = Date.now();
    function refresh() {
      setSeconds(Math.floor(elapsed() / 1000));
    }
    const interval = setInterval(refresh, 1000);
    const subscription = AppState.addEventListener("change", (state) => {
      if (state === "active") refresh();
    });
    return () => {
      accumulated.current = elapsed();
      startedAt.current = null;
      clearInterval(interval);
      subscription.remove();
    };
  }, []);

  function togglePause() {
    if (startedAt.current === null) {
      startedAt.current = Date.now();
      setPaused(false);
    } else {
      accumulated.current = elapsed();
      startedAt.current = null;
      setSeconds(Math.floor(accumulated.current / 1000));
      setPaused(true);
    }
  }

  function complete() {
    const duration = Math.floor(elapsed() / 1000);
    if (finished.current || duration < 1) return;
    finished.current = true;
    onComplete(duration);
  }

  const clock = `${String(Math.floor(seconds / 60)).padStart(2, "0")}:${String(seconds % 60).padStart(2, "0")}`;

  return (
    <AppCard>
      <XStack
        justifyContent="space-between"
        alignItems="center"
        flexWrap="wrap"
        gap={8}
      >
        <SizableText fontWeight="700">Workout session</SizableText>
        <SizableText color="$primaryAction">
          {paused ? "Paused" : "In progress"}
        </SizableText>
      </XStack>
      <YStack alignItems="center" gap={12} paddingVertical={24}>
        <H2 textAlign="center">
          {plan.activity === "Custom" ? plan.customName : plan.activity}
        </H2>
        <SizableText
          fontSize={56}
          lineHeight={68}
          fontWeight="700"
          accessibilityLabel={`${Math.floor(seconds / 60)} minutes, ${seconds % 60} seconds elapsed`}
        >
          {clock}
        </SizableText>
        <SizableText color="$textSecondary">
          Elapsed time · {plan.minutes} min goal
        </SizableText>
      </YStack>
      <Progress
        value={Math.min((seconds / goalSeconds) * 100, 100)}
        backgroundColor="$progressTrack"
        accessibilityLabel="Workout goal progress"
      >
        <Progress.Indicator backgroundColor="$primaryAction" />
      </Progress>
      <SizableText
        color={goalReached ? "$primaryAction" : "$textSecondary"}
        textAlign="center"
        marginVertical={8}
      >
        {goalReached
          ? "Goal reached! Finish when you’re ready."
          : `${Math.ceil((goalSeconds - seconds) / 60)} min to your goal`}
      </SizableText>
      <AppButton
        theme="secondary"
        icon={paused ? Play : Pause}
        onPress={togglePause}
      >
        {paused ? "Resume workout" : "Pause workout"}
      </AppButton>
      <AppButton icon={CheckCircle2} disabled={seconds < 1} onPress={complete}>
        Complete workout
      </AppButton>
      {!goalReached && (
        <SizableText size="$3" color="$textSecondary" textAlign="center">
          Finishing early saves your actual time. Your duration goal may still
          be incomplete.
        </SizableText>
      )}
      {confirmDiscard ? (
        <YStack
          gap={8}
          padding={12}
          backgroundColor="$surfaceMuted"
          borderRadius={12}
        >
          <SizableText>
            Discard this session? It won’t be added to your history.
          </SizableText>
          <AppButton theme="secondary" onPress={() => setConfirmDiscard(false)}>
            Keep workout
          </AppButton>
          <AppButton theme="danger" onPress={onDiscard}>
            Discard workout
          </AppButton>
        </YStack>
      ) : (
        <AppButton
          theme="secondary"
          textOnly
          onPress={() => setConfirmDiscard(true)}
        >
          Discard session
        </AppButton>
      )}
    </AppCard>
  );
}
