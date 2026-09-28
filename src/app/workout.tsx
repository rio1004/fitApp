import { AppButton } from "@/components/app-button";
import { AppCard } from "@/components/app-card";
import CustomScreen from "@/components/screen";
import TitleHeader from "@/components/title-header";
import { Colors } from "@/constants/theme";
import { CheckCircle2, Plus } from "@tamagui/lucide-icons-2";
import { useColorScheme } from "react-native";
import { H5, Image, Separator, SizableText, XStack, YStack } from "tamagui";
export default function WorkOutScreen() {
  const scheme = useColorScheme();
  const colors = Colors[scheme === "unspecified" ? "light" : scheme];
  return (
    <CustomScreen>
      <YStack gap={"$4"}>
        <TitleHeader hasDate={true} title="Workout" />
        <AppCard>
          <H5>{"Today's workout"}</H5>
          <XStack alignItems="center">
            <Image
              src={require("@/assets/images/walk.png")}
              width={80}
              height={80}
            />
            <YStack>
              <SizableText size="$6" fontWeight="700">
                Walking
              </SizableText>
              <SizableText>30 min goal</SizableText>
            </YStack>
          </XStack>
          <AppButton>Start workout</AppButton>
          <AppButton theme="secondary" textOnly>
            Change activity
          </AppButton>
        </AppCard>
        <AppCard>
          <H5>Recent Activity</H5>
          <XStack justifyContent="space-between" alignItems="center">
            <YStack>
              <SizableText fontWeight={"bold"}>Yesterday</SizableText>
              <SizableText size="$3" color={colors.textSecondary}>
                Strength - 45 min
              </SizableText>
            </YStack>
            <CheckCircle2
              fill={colors.primaryAction}
              color={"#fff"}
              size={"$3"}
            />
          </XStack>
          <Separator my={"$3"} />
          <AppButton theme={"secondary"} icon={Plus}>
            Log completed workout
          </AppButton>
        </AppCard>
      </YStack>
    </CustomScreen>
  );
}
