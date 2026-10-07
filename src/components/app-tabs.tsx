import { useTheme } from "tamagui";
import { ChartNoAxesColumnIncreasing, Dumbbell, House, Utensils } from "@tamagui/lucide-icons-2";
import { Tabs, TabList, TabSlot, TabTrigger, type TabTriggerSlotProps } from "expo-router/ui";
import { Pressable, StyleSheet, Text } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { MaxContentWidth } from "@/constants/theme";
import { FontFamily } from "@/constants/fonts";

const tabs = [
  { name: "home", href: "/", label: "Home", icon: House },
  { name: "calories", href: "/calories", label: "Calories", icon: Utensils },
  { name: "workout", href: "/workout", label: "Workout", icon: Dumbbell },
  { name: "discipline", href: "/discipline", label: "Discipline", icon: ChartNoAxesColumnIncreasing },
] as const;

type TabButtonProps = TabTriggerSlotProps & {
  tab: (typeof tabs)[number];
  activeColor: string;
  inactiveColor: string;
};

function TabButton({ tab, activeColor, inactiveColor, isFocused, style, ...props }: TabButtonProps) {
  const Icon = tab.icon;
  const color = isFocused ? activeColor : inactiveColor;

  return (
    <Pressable
      {...props}
      accessibilityRole="tab"
      accessibilityLabel={tab.label}
      accessibilityState={{ selected: Boolean(isFocused) }}
      style={(state) => [
        typeof style === "function" ? style(state) : style,
        styles.button,
        state.pressed && styles.pressed,
      ]}
    >
      <Icon size={24} color={isFocused ? "$primaryAction" : "$textSecondary"} strokeWidth={isFocused ? 2.5 : 1.8} />
      <Text style={[styles.label, { color, fontFamily: isFocused ? FontFamily.semibold : FontFamily.regular }]}>
        {tab.label}
      </Text>
    </Pressable>
  );
}

export default function AppTabs() {
  const theme = useTheme();
  const insets = useSafeAreaInsets();

  return (
    <Tabs style={[styles.container, { backgroundColor: theme.background.get() }]}>
      <TabSlot style={styles.container} />
      <TabList
        style={[
          styles.bar,
          {
            backgroundColor: theme.surface.get(),
            borderTopColor: theme.borderColor.get(),
            paddingBottom: Math.max(insets.bottom, 8),
            paddingLeft: Math.max(insets.left, 8),
            paddingRight: Math.max(insets.right, 8),
          },
        ]}
      >
        {tabs.map((tab) => (
          <TabTrigger key={tab.name} name={tab.name} href={tab.href} asChild>
            <TabButton
              tab={tab}
              activeColor={theme.primaryAction.get()}
              inactiveColor={theme.textSecondary.get()}
            />
          </TabTrigger>
        ))}
      </TabList>
    </Tabs>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  bar: {
    flexDirection: "row",
    justifyContent: "center",
    borderTopWidth: StyleSheet.hairlineWidth,
    paddingTop: 8,
    flexShrink: 0,
  },
  button: {
    flex: 1,
    flexDirection: "column",
    maxWidth: MaxContentWidth / 4,
    minHeight: 48,
    alignItems: "center",
    justifyContent: "center",
    gap: 4,
    paddingVertical: 4,
  },
  label: { fontSize: 12, textAlign: "center" },
  pressed: { opacity: 0.6 },
});
