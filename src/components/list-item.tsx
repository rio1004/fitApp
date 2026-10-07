import { useTheme, Separator, SizableText, XStack, YStack } from "tamagui";
import { CheckCircle2 } from "@tamagui/lucide-icons-2";
import { ComponentType } from "react";
type ListProps = {
  icon: ComponentType<any>;
  commitmentType: string;
  time: string;
  status: string;
};

export const ListComponent = ({
  icon: Icon,
  commitmentType,
  time,
  status,
}: ListProps) => {
  const theme = useTheme();
  return (
    <>
      <XStack alignItems="center" justifyContent="space-between">
        <XStack alignItems="center" gap={"$5"}>
          <Icon />
          <YStack>
            <SizableText fontWeight={"bold"}>{commitmentType}</SizableText>
            <SizableText size="$3" color="$textSecondary">
              {time} - {status}
            </SizableText>
          </YStack>
        </XStack>
        <CheckCircle2 fill={theme.primaryAction.get()} color="$onPrimary" size={"$3"} />
      </XStack>
      <Separator my={"$2"} />
    </>
  );
};
