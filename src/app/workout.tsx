import { useTheme, H5, Image, Separator, SizableText, XStack, YStack } from "tamagui";
import { AppButton } from "@/components/app-button";
import { AppCard } from "@/components/app-card";
import CustomScreen from "@/components/screen";
import TitleHeader from "@/components/title-header";
import { CheckCircle2, Dumbbell, Plus } from "@tamagui/lucide-icons-2";
import { useState } from "react";
import { ChangeActivityModal, WorkoutPlan } from "@/components/change-activity-modal";
export default function WorkOutScreen() {
  const theme = useTheme();
  const [plan, setPlan] = useState<WorkoutPlan>({ activity: 'Walking', customName: '', minutes: 30 });
  const [changingActivity, setChangingActivity] = useState(false);
  return (
    <CustomScreen>
      <YStack gap={"$4"}>
        <TitleHeader hasDate={true} title="Workout" />
        <AppCard>
          <H5>{"Today's workout"}</H5>
          <XStack alignItems="center">
            {plan.activity === 'Walking' ? <Image
              src={require("@/assets/images/walk.png")}
              width={80}
              height={80}
            /> : <YStack width={80} height={80} alignItems="center" justifyContent="center"><Dumbbell size={40} color="$primaryAction" /></YStack>}
            <YStack>
              <SizableText size="$6" fontWeight="700">
                {plan.activity === 'Custom' ? plan.customName : plan.activity}
              </SizableText>
              <SizableText>{plan.minutes} min goal</SizableText>
            </YStack>
          </XStack>
          <AppButton>Start workout</AppButton>
          <AppButton theme="secondary" textOnly onPress={() => setChangingActivity(true)}>
            Change activity
          </AppButton>
        </AppCard>
        <AppCard>
          <H5>Recent Activity</H5>
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
          <AppButton theme={"secondary"} icon={Plus}>
            Log completed workout
          </AppButton>
        </AppCard>
      </YStack>
      {changingActivity && <ChangeActivityModal initialPlan={plan} onClose={() => setChangingActivity(false)}
        onSave={(nextPlan) => { setPlan(nextPlan); setChangingActivity(false); }} />}
    </CustomScreen>
  );
}
