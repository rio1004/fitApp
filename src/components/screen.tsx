import { useTheme } from "tamagui";
import { MaxContentWidth, Spacing } from "@/constants/theme";
import { ReactNode } from "react";
import { ScrollView, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type ScreenProps = {
  children: ReactNode;
  scroll?: boolean;
};

export default function CustomScreen({ children, scroll = true }: ScreenProps) {
  const theme = useTheme();

  return (
    <SafeAreaView
      style={[
        styles.safeArea,
        {
          backgroundColor: theme.background.get(),
        },
      ]}
      edges={["top", "left", "right"]}
    >
      {scroll ? (
        <ScrollView
          contentContainerStyle={styles.content}
          showsVerticalScrollIndicator={false}
        >
          {children}
        </ScrollView>
      ) : (
        children
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    width: "100%",
    alignSelf: "center",
    paddingHorizontal: Spacing.four,
    maxWidth: MaxContentWidth,
  },

  content: {
    paddingBottom: Spacing.three,
  },
});
