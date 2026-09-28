import { Colors } from "@/constants/theme";
import { ReactNode } from "react";
import { useColorScheme } from "react-native";
import { Card } from "tamagui";

type CardProps = {
  children: ReactNode;
};
export const AppCard = ({ children }: CardProps) => {
  const scheme = useColorScheme();
  const colors = Colors[scheme === "unspecified" ? "light" : scheme];
  return (
    <Card
      padding={"$4"}
      gap={"$2"}
      border="0.2"
      borderColor={colors.textSecondary}
    >
      {children}
    </Card>
  );
};
