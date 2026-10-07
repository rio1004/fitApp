import { AppButton } from "@/components/app-button";
import { AppCard } from "@/components/app-card";
import {
  ChangeActivityModal,
  WorkoutPlan,
} from "@/components/change-activity-modal";
import CustomScreen from "@/components/screen";
import TitleHeader from "@/components/title-header";
import { WorkoutSession } from "@/components/workout-session";
import { dateKey } from "@/utils/dates";
import { CheckCircle2, Dumbbell, Plus } from "@tamagui/lucide-icons-2";
import { useState } from "react";
import {
  H5,
  Image,
  Separator,
  SizableText,
  useTheme,
  XStack,
  YStack,
} from "tamagui";
export default function WorkOutScreen() {
  const theme = useTheme();
  const [plan, setPlan] = useState<WorkoutPlan>({
    activity: "Walking",
    customName: "",
    minutes: 30,
  });
  const [changingActivity, setChangingActivity] = useState(false);
  const [loggingWorkout, setLoggingWorkout] = useState(false);
  const [sessionPlan, setSessionPlan] = useState<WorkoutPlan | null>(null);
  const [completed, setCompleted] = useState<
    { id: number; activity: string; seconds: number; date: string }[]
  >([]);
  const [completionMessage, setCompletionMessage] = useState("");

  function completeWorkout(seconds: number) {
    if (!sessionPlan) return;
    const activity =
      sessionPlan.activity === "Custom"
        ? sessionPlan.customName
        : sessionPlan.activity;
    setCompleted((entries) => [
      { id: Date.now(), activity, seconds, date: dateKey() },
      ...entries,
    ]);
    setCompletionMessage(
      `${activity} completed! ${Math.floor(seconds / 60)} min ${seconds % 60} sec recorded.${seconds >= sessionPlan.minutes * 60 ? " Duration goal reached." : ""}`,
    );
    setSessionPlan(null);
  }
  return (
    <CustomScreen>
      <YStack gap={"$4"}>
        <TitleHeader hasDate={true} title="Workout" />
        {!!completionMessage && (
          <SizableText color="$primaryAction" accessibilityLiveRegion="polite">
            {completionMessage}
          </SizableText>
        )}
        {sessionPlan ? (
          <WorkoutSession
            plan={sessionPlan}
            onComplete={completeWorkout}
            onDiscard={() => {
              setSessionPlan(null);
              setCompletionMessage("");
            }}
          />
        ) : (
          <AppCard>
            <H5>{"Today's workout"}</H5>
            <XStack alignItems="center">
              {plan.activity === "Walking" ? (
                <Image
                  src={require("@/assets/images/walk.png")}
                  width={80}
                  height={80}
                />
              ) : (
                <YStack
                  width={80}
                  height={80}
                  alignItems="center"
                  justifyContent="center"
                >
                  <Dumbbell size={40} color="$primaryAction" />
                </YStack>
              )}
              <YStack>
                <SizableText size="$6" fontWeight="700">
                  {plan.activity === "Custom" ? plan.customName : plan.activity}
                </SizableText>
                <SizableText>{plan.minutes} min goal</SizableText>
              </YStack>
            </XStack>
            <AppButton
              onPress={() => {
                setSessionPlan({ ...plan });
                setCompletionMessage("");
              }}
            >
              Start workout
            </AppButton>
            <AppButton
              theme="secondary"
              textOnly
              onPress={() => setChangingActivity(true)}
            >
              Change activity
            </AppButton>
          </AppCard>
        )}
        <AppCard>
          <H5>Recent Activity</H5>
          {[...completed]
            .sort((a, b) => b.date.localeCompare(a.date) || b.id - a.id)
            .map((entry) => (
              <YStack key={entry.id} gap={8}>
                <XStack
                  justifyContent="space-between"
                  alignItems="center"
                  gap={12}
                >
                  <YStack flex={1}>
                    <SizableText fontWeight="bold">
                      {entry.date === dateKey()
                        ? "Today"
                        : new Date(`${entry.date}T12:00:00`).toLocaleDateString(
                            "en-US",
                            { month: "short", day: "numeric", year: "numeric" },
                          )}
                    </SizableText>
                    <SizableText size="$3" color="$textSecondary">
                      {entry.activity} - {Math.floor(entry.seconds / 60)} min
                      {entry.seconds % 60 ? ` ${entry.seconds % 60} sec` : ""}
                    </SizableText>
                  </YStack>
                  <CheckCircle2
                    color="$primaryAction"
                    size={24}
                    accessibilityLabel="Completed workout"
                  />
                </XStack>
                <Separator />
              </YStack>
            ))}
          <XStack justifyContent="space-between" alignItems="center">
            <YStack>
              <SizableText fontWeight={"bold"}>Yesterday</SizableText>
              <SizableText size="$3" color="$textSecondary">
                Strength - 45 min
              </SizableText>
            </YStack>
            <CheckCircle2
              fill={theme.primaryAction.get()}
              color="$onPrimary"
              size={"$3"}
            />
          </XStack>
          <Separator my={"$3"} />
          <AppButton
            theme={"secondary"}
            icon={Plus}
            onPress={() => setLoggingWorkout(true)}
          >
            Log completed workout
          </AppButton>
        </AppCard>
      </YStack>
      {changingActivity && (
        <ChangeActivityModal
          initialPlan={plan}
          onClose={() => setChangingActivity(false)}
          onSave={(nextPlan) => {
            setPlan(nextPlan);
            setChangingActivity(false);
          }}
        />
      )}
      {loggingWorkout && (
        <ChangeActivityModal
          initialPlan={plan}
          onClose={() => setLoggingWorkout(false)}
          onSave={() => {}}
          onLog={(loggedPlan, date) => {
            const activity =
              loggedPlan.activity === "Custom"
                ? loggedPlan.customName
                : loggedPlan.activity;
            setCompleted((entries) => [
              {
                id: Date.now(),
                activity,
                seconds: loggedPlan.minutes * 60,
                date,
              },
              ...entries,
            ]);
            setCompletionMessage(
              `${activity} logged! ${loggedPlan.minutes} min added to your history.`,
            );
            setLoggingWorkout(false);
          }}
        />
      )}
    </CustomScreen>
  );
}
