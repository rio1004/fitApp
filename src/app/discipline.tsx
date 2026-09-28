import { AppCard } from "@/components/app-card";
import CustomScreen from "@/components/screen";
import TitleHeader from "@/components/title-header";
import { Flame } from "@tamagui/lucide-icons-2";
import { SizableText, XStack, YStack } from "tamagui";

export default function DisciplineScreen() {
  return (
    <CustomScreen>
      <TitleHeader hasDate={false} title="Discipline" />
      <XStack>
        <Flame />
        <YStack>
          <XStack>
            <SizableText>7</SizableText>
            <SizableText>day streak</SizableText>
          </XStack>
          <SizableText>Show up. Keep going</SizableText>
        </YStack>
      </XStack>
      <AppCard>
        
      </AppCard>
    </CustomScreen>
  );
}
