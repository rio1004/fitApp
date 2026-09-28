import { Colors } from "@/constants/theme";
import { ComponentType } from "react";
import { useColorScheme } from "react-native";
import { Separator, SizableText, XStack, YStack } from "tamagui";

type ListProps = {
  icon: ComponentType<any>;
  commitmentType: string;
  time: string;
  status: string;
};

import { CheckCircle2 } from "@tamagui/lucide-icons-2";

export const ListComponent = ({
  icon: Icon,
  commitmentType,
  time,
  status,
}: ListProps) => {
  const scheme = useColorScheme();
  const colors = Colors[scheme === "unspecified" ? "light" : scheme];
  return (
    <>
      <XStack alignItems="center" justifyContent="space-between">
        <XStack alignItems="center" gap={"$5"}>
          <Icon />
          <YStack>
            <SizableText fontWeight={"bold"}>{commitmentType}</SizableText>
            <SizableText size="$3" color={colors.textSecondary}>
              {time} - {status}
            </SizableText>
          </YStack>
        </XStack>
        <CheckCircle2 fill={colors.primaryAction} color={"#fff"} size={"$3"} />
      </XStack>
      <Separator my={"$2"} />
    </>
  );
};
