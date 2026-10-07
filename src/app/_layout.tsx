import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { StatusBar } from "expo-status-bar";
import { TamaguiProvider } from "tamagui";

import { AnimatedSplashOverlay } from "@/components/animated-icon";
import AppTabs from "@/components/app-tabs";
import FontStyles from "@/components/font-styles";
import { fontAssets } from "@/constants/fonts";
import { tamaguiConfig } from "../../tamagui.config";

SplashScreen.preventAutoHideAsync();

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const [fontsLoaded, fontError] = useFonts(fontAssets);

  useEffect(() => {
    if (fontError) {
      void SplashScreen.hideAsync();
      throw fontError;
    }
  }, [fontError]);

  // The existing splash overlay hides the native splash after fonts are ready.
  if (!fontsLoaded) return null;

  return (
    <TamaguiProvider
      config={tamaguiConfig}
      defaultTheme={colorScheme === "dark" ? "dark" : "light"}
    >
      <FontStyles />
      <AnimatedSplashOverlay />
      <AppTabs />

      <StatusBar style={colorScheme === "dark" ? "light" : "dark"} />
    </TamaguiProvider>
  );
}
