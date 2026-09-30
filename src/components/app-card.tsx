import { Colors } from "@/constants/theme";
import { ReactNode } from "react";
import { useColorScheme } from "react-native";
import { Card, SizableText } from "tamagui";

type CardProps = {
  children: ReactNode;
  title?: string;
};
export const AppCard = ({ children, title }: CardProps) => {
  const scheme = useColorScheme();
  const colors = Colors[scheme === "unspecified" ? "light" : scheme];
  return (
    <Card
      padding={"$4"}
      gap={"$2"}
      border="0.2"
      borderColor={colors.textSecondary}
    >
      {title && <SizableText fontWeight={"bold"}>{title}</SizableText>}
      {children}
    </Card>
  );
};
