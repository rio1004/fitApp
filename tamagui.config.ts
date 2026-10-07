import { defaultConfig } from "@tamagui/config/v5";
import { createFont, createTamagui } from "tamagui";

import { FontFamily } from "@/constants/fonts";
// All app colors are defined here and consumed through Tamagui themes.
const light = {
  "background": "#FAFAF7",
  "backgroundHover": "#F0F3ED",
  "backgroundPress": "#E5EBE1",
  "backgroundFocus": "#F0F3ED",
  "color": "#18231F",
  "textSecondary": "#59665F",
  "surface": "#FFFFFF",
  "surfaceMuted": "#EEF2EA",
  "borderColor": "#DCE3D8",
  "borderColorHover": "#B8C8B4",
  "borderColorPress": "#93AD8C",
  "borderColorFocus": "#246B4B",
  "primaryAction": "#246B4B",
  "primaryHover": "#205F43",
  "primaryPress": "#1B5139",
  "onPrimary": "#FFFFFF",
  "accentSurface": "#DDEDB5",
  "onAccent": "#253B1F",
  "progressTrack": "#E4EBDE",
  "warning": "#856021",
  "danger": "#B42318",
  "onDanger": "#FFFFFF",
  "shadowColor": "#18231F",
  "placeholderColor": "#59665F",
  "outlineColor": "#246B4B",
  "colorHover": "#18231F",
  "colorPress": "#18231F",
  "colorFocus": "#18231F"
};
const dark: typeof light = {
  "background": "#111713",
  "backgroundHover": "#1C261F",
  "backgroundPress": "#2A382D",
  "backgroundFocus": "#1C261F",
  "color": "#EDF3E9",
  "textSecondary": "#AAB8AD",
  "surface": "#1C261F",
  "surfaceMuted": "#263329",
  "borderColor": "#394A3D",
  "borderColorHover": "#526A58",
  "borderColorPress": "#6C8973",
  "borderColorFocus": "#A8D991",
  "primaryAction": "#A8D991",
  "primaryHover": "#B9E5A5",
  "primaryPress": "#93C67B",
  "onPrimary": "#172B1C",
  "accentSurface": "#30432A",
  "onAccent": "#DDEDB5",
  "progressTrack": "#344438",
  "warning": "#E4BD75",
  "danger": "#FFB4AB",
  "onDanger": "#5A1510",
  "shadowColor": "#000000",
  "placeholderColor": "#AAB8AD",
  "outlineColor": "#A8D991",
  "colorHover": "#EDF3E9",
  "colorPress": "#EDF3E9",
  "colorFocus": "#EDF3E9"
};

function actionTheme(palette: typeof light, secondary = false) {
  const color = secondary ? palette.primaryAction : palette.onPrimary;
  return {
    ...palette,
    background: secondary ? palette.surface : palette.primaryAction,
    backgroundHover: secondary ? palette.surfaceMuted : palette.primaryHover,
    backgroundPress: secondary ? palette.accentSurface : palette.primaryPress,
    backgroundFocus: secondary ? palette.surfaceMuted : palette.primaryAction,
    color, colorHover: color, colorPress: color, colorFocus: color,
    borderColor: palette.primaryAction,
  };
}
function accentTheme(palette: typeof light) {
  return { ...palette, background: palette.accentSurface, color: palette.onAccent };
}

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
    light, dark,
    light_Card: { ...light, background: light.surface },
    dark_Card: { ...dark, background: dark.surface },
    light_Button: actionTheme(light, true),
    dark_Button: actionTheme(dark, true),
    light_primary: actionTheme(light),
    dark_primary: actionTheme(dark),
    light_secondary: actionTheme(light, true),
    dark_secondary: actionTheme(dark, true),
    light_accent: accentTheme(light),
    dark_accent: accentTheme(dark),
    light_danger: { ...light, background: light.danger, color: light.onDanger },
    dark_danger: { ...dark, background: dark.danger, color: dark.onDanger },
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
  // Tamagui registers app tokens through interface augmentation.
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  interface TamaguiCustomConfig extends AppTamaguiConfig {}
}

export default tamaguiConfig;
