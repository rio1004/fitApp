import { ReactNode } from "react";
import { Card, SizableText } from "tamagui";

type CardProps = {
  children: ReactNode;
  title?: string;
};
export const AppCard = ({ children, title }: CardProps) => {
  return (
    <Card padding={"$4"} gap={"$2"} borderWidth={1} borderColor="$borderColor">
      {title && <SizableText fontWeight={"bold"}>{title}</SizableText>}
      {children}
    </Card>
  );
};
