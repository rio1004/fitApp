import { Button, styled } from "tamagui";

export const AppButton = styled(Button, {
  theme: "primary",
  minHeight: 48,
  height: "auto",
  paddingVertical: 12,
  paddingHorizontal: 16,
  borderRadius: 10,
  borderWidth: 1,
  borderColor: "$borderColor",
  fontSize: 16,
  fontWeight: "600",
  color: "$color",
  gap: 8,
  iconSize: 40,
  disabledStyle: { opacity: 0.5 },

  variants: {
    textOnly: {
      true: {
        backgroundColor: "transparent",
        borderColor: "transparent",
        hoverStyle: { borderColor: "transparent" },
        pressStyle: { borderColor: "transparent" },
      },
    },
  } as const,
});
