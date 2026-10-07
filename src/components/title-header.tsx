import { H3, SizableText, XStack, YStack } from "tamagui";

import { Settings } from "@tamagui/lucide-icons-2";

type TitleProps = {
  hasDate: boolean;
  title: string;
};

export default function TitleHeader({ hasDate, title }: TitleProps) {
  return (
    <XStack justifyContent="space-between">
      <YStack>
        {hasDate ? (
          <SizableText size="$3" color="$textSecondary">
            THU, SEP 24
          </SizableText>
        ) : null}

        {title ? <H3>{title}</H3> : null}
      </YStack>
      <Settings />
    </XStack>
  );
}
