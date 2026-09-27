import { defaultConfig } from "@tamagui/config/v5";
import { createTamagui } from "tamagui";

import { Colors } from "@/constants/theme";

export const tamaguiConfig = createTamagui({
  ...defaultConfig,

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
