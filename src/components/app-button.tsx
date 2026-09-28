import { Button, styled } from "tamagui";

// Shared action geometry from output/ui-reference; colors come from the theme.
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
  // Tamagui resolves numeric iconSize to half its value.
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
