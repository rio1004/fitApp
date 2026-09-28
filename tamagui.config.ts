import { defaultConfig } from "@tamagui/config/v5";
import { createFont, createTamagui } from "tamagui";

import { FontFamily } from "@/constants/fonts";
import { Colors } from "@/constants/theme";

const primaryButtonTheme = {
  background: "#246B4B",
  backgroundHover: "#205F43",
  backgroundPress: "#1B5139",
  backgroundFocus: Colors.light.primaryAction,
  color: "#ffffff",
  colorHover: "#ffffff",
  colorPress: "#ffffff",
  colorFocus: "#ffffff",
  borderColor: "transparent",
  borderColorHover: "transparent",
  borderColorPress: "transparent",
  borderColorFocus: "transparent",
  outlineColor: Colors.light.primaryAction,
};

const secondaryButtonTheme = {
  background: "#fff",
  backgroundHover: "#F0F5ED",
  backgroundPress: "#DDEDB5",
  backgroundFocus: "#fff",
  color: "#246B4B",
  colorHover: "#246B4B",
  colorPress: "#246B4B",
  colorFocus: "#246B4B",
  borderColor: "#246B4B",
  borderColorHover: "#246B4B",
  borderColorPress: "#246B4B",
  borderColorFocus: "#246B4B",
  outlineColor: "#246B4B",
};

export const tamaguiConfig = createTamagui({
  ...defaultConfig,
  fonts: {
    body: createFont({
      ...defaultConfig.fonts.body,
      family: FontFamily.regular,
      face: {
        100: { normal: FontFamily.regular },
        200: { normal: FontFamily.regular },
        300: { normal: FontFamily.regular },
        400: { normal: FontFamily.regular },
        500: { normal: FontFamily.medium },
        600: { normal: FontFamily.semibold },
        700: { normal: FontFamily.bold },
        800: { normal: FontFamily.bold },
        900: { normal: FontFamily.bold },
        normal: { normal: FontFamily.regular },
        bold: { normal: FontFamily.bold },
      },
    }),
    heading: createFont({
      ...defaultConfig.fonts.heading,
      family: FontFamily.display,
      weight: { 0: "700", 6: "700", 9: "700" },
      face: {
        700: { normal: FontFamily.display },
        bold: { normal: FontFamily.display },
      },
    }),
  },

  themes: {
    ...defaultConfig.themes,

    light: {
      ...defaultConfig.themes.light,
      color: Colors.light.text,
      background: Colors.light.background,
    },

    dark: {
      ...defaultConfig.themes.dark,
      color: Colors.dark.text,
      background: Colors.dark.background,
    },
    // Scheme-qualified names take priority over the preset's light_Button/dark_Button.
    light_primary: primaryButtonTheme,
    dark_primary: primaryButtonTheme,

    light_secondary: secondaryButtonTheme,
    dark_secondary: secondaryButtonTheme,

    danger: {
      background: "#e53935",
      backgroundHover: "#d32f2f",
      backgroundPress: "#c62828",
      color: "#ffffff",
      borderColor: "#e53935",
    },
  },

  settings: {
    ...defaultConfig.settings,

    // Support descriptive React Native style props
    // as well as Tamagui shorthands.
    onlyAllowShorthands: false,
  },
});

type AppTamaguiConfig = typeof tamaguiConfig;

declare module "tamagui" {
  interface TamaguiCustomConfig extends AppTamaguiConfig {}
}

export default tamaguiConfig;
