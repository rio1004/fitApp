import { H3, SizableText, XStack, YStack } from "tamagui";

import { Colors } from "@/constants/theme";
import { Settings } from "@tamagui/lucide-icons-2";
import { useColorScheme } from "react-native";

type TitleProps = {
  hasDate: boolean;
  title: string;
};

export default function TitleHeader({ hasDate, title }: TitleProps) {
  const scheme = useColorScheme();
  const colors = Colors[scheme === "unspecified" ? "light" : scheme];

  return (
    <XStack justifyContent="space-between">
      <YStack>
        {hasDate ? (
          <SizableText size="$3" color={colors.textSecondary}>
            THU, SEP 24
          </SizableText>
        ) : null}

        {title ? <H3>{title}</H3> : null}
      </YStack>
      <Settings />
    </XStack>
  );
}
