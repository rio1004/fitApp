import { AppButton } from "@/components/app-button";
import { FoodEntry, Meal, meals } from "@/constants/food-log";
import { dateKey, dateLabel } from "@/utils/dates";
import { ChevronLeft, ChevronRight, X } from "@tamagui/lucide-icons-2";
import { useRef, useState } from "react";
import {
  KeyboardAvoidingView,
  Modal,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Button, H2, Input, SizableText, XStack, YStack } from "tamagui";

type Props = {
  initialDate: string;
  onClose: () => void;
  onSave: (entry: Omit<FoodEntry, "id">) => void;
};

export function AddFoodModal({ initialDate, onClose, onSave }: Props) {
  const insets = useSafeAreaInsets();
  const saving = useRef(false);
  const [name, setName] = useState("");
  const [calories, setCalories] = useState("");
  const [meal, setMeal] = useState<Meal>("Lunch");
  const [date, setDate] = useState(initialDate);
  const [error, setError] = useState("");
  const [editingDate, setEditingDate] = useState(false);
  const [dateDraft, setDateDraft] = useState(initialDate);

  function save() {
    if (!name.trim()) return setError("Enter a food name.");
    if (
      !/^\d+(\.\d{1,2})?$/.test(calories.trim()) ||
      !Number.isFinite(Number(calories)) ||
      Number(calories) <= 0
    ) {
      return setError("Enter a calorie amount greater than zero.");
    }
    if (saving.current) return;
    saving.current = true;
    onSave({ name: name.trim(), calories: Number(calories), meal, date });
  }

  function applyDate() {
    const parsed = new Date(`${dateDraft}T12:00:00`);
    if (
      !/^\d{4}-\d{2}-\d{2}$/.test(dateDraft) ||
      Number.isNaN(parsed.getTime()) ||
      dateKey(parsed) !== dateDraft
    ) {
      return setError("Enter a valid date as YYYY-MM-DD.");
    }
    setDate(dateDraft);
    setEditingDate(false);
    setError("");
  }

  function shiftDate(days: number) {
    const next = new Date(`${date}T12:00:00`);
    next.setDate(next.getDate() + days);
    setDate(dateKey(next));
  }

  return (
    <Modal
      transparent
      animationType="slide"
      visible
      onRequestClose={onClose}
      statusBarTranslucent
    >
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <Pressable
          style={styles.overlay}
          onPress={onClose}
          accessibilityRole="button"
          accessibilityLabel="Dismiss add food"
        />
        <YStack
          backgroundColor="$surface"
          borderTopLeftRadius={24}
          borderTopRightRadius={24}
          width="100%"
          maxWidth={560}
          alignSelf="center"
          maxHeight="90%"
          paddingTop={12}
          paddingBottom={Math.max(insets.bottom, 24)}
          paddingLeft={Math.max(insets.left, 24)}
          paddingRight={Math.max(insets.right, 24)}
          accessibilityViewIsModal
          onAccessibilityEscape={onClose}
        >
          <YStack
            width={48}
            height={5}
            borderRadius={5}
            backgroundColor="$borderColor"
            alignSelf="center"
            marginBottom={12}
          />
          <XStack
            alignItems="center"
            justifyContent="space-between"
            marginBottom={12}
          >
            <H2 fontSize={26}>Add food</H2>
            <Button
              circular
              size={48}
              chromeless
              icon={X}
              accessibilityLabel="Close add food"
              onPress={onClose}
            />
          </XStack>
          <ScrollView
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
          >
            <YStack gap={16}>
              <YStack gap={6}>
                <SizableText>Food name</SizableText>
                <Input
                  accessibilityLabel="Food name"
                  placeholder="e.g. Chicken breast"
                  value={name}
                  onChangeText={setName}
                  maxLength={100}
                  height={48}
                  borderRadius={12}
                  backgroundColor="$surface"
                  returnKeyType="done"
                />
              </YStack>
              <YStack gap={6}>
                <SizableText>Calories</SizableText>
                <XStack
                  alignItems="center"
                  borderWidth={1}
                  borderColor="$borderColor"
                  borderRadius={12}
                  paddingRight={14}
                >
                  <Input
                    flex={1}
                    minWidth={0}
                    borderWidth={0}
                    height={48}
                    backgroundColor="transparent"
                    accessibilityLabel="Calories"
                    placeholder="e.g. 300"
                    keyboardType="decimal-pad"
                    value={calories}
                    onChangeText={setCalories}
                    maxLength={8}
                  />
                  <SizableText color="$textSecondary" size="$3">
                    kcal
                  </SizableText>
                </XStack>
              </YStack>
              <YStack gap={6}>
                <SizableText>Meal</SizableText>
                <XStack gap={8} flexWrap="wrap">
                  {meals.map((item) => (
                    <Button
                      key={item}
                      theme={meal === item ? "primary" : "secondary"}
                      minHeight={48}
                      paddingHorizontal={12}
                      borderRadius={16}
                      flexGrow={1}
                      accessibilityRole="radio"
                      accessibilityState={{ checked: meal === item }}
                      onPress={() => setMeal(item)}
                    >
                      {item}
                    </Button>
                  ))}
                </XStack>
              </YStack>
              <YStack gap={6}>
                <SizableText>Date</SizableText>
                <Button
                  theme="secondary"
                  height={48}
                  borderRadius={12}
                  justifyContent="space-between"
                  iconAfter={ChevronRight}
                  accessibilityLabel="Choose food date"
                  onPress={() => {
                    setDateDraft(date);
                    setEditingDate(!editingDate);
                    setError("");
                  }}
                >
                  {dateLabel(date)}
                </Button>
                {editingDate && (
                  <YStack gap={8}>
                    <XStack gap={8}>
                      <Input
                        flex={1}
                        minWidth={0}
                        accessibilityLabel="Date, YYYY-MM-DD"
                        placeholder="YYYY-MM-DD"
                        value={dateDraft}
                        onChangeText={setDateDraft}
                        maxLength={10}
                      />
                      <Button onPress={applyDate}>Apply</Button>
                    </XStack>
                    <XStack gap={8}>
                      <Button
                        flex={1}
                        icon={ChevronLeft}
                        accessibilityLabel="Previous day"
                        onPress={() => {
                          shiftDate(-1);
                          setEditingDate(false);
                        }}
                      >
                        Previous
                      </Button>
                      <Button
                        flex={1}
                        onPress={() => {
                          setDate(dateKey());
                          setEditingDate(false);
                        }}
                      >
                        Today
                      </Button>
                      <Button
                        flex={1}
                        iconAfter={ChevronRight}
                        accessibilityLabel="Next day"
                        onPress={() => {
                          shiftDate(1);
                          setEditingDate(false);
                        }}
                      >
                        Next
                      </Button>
                    </XStack>
                  </YStack>
                )}
              </YStack>
              <SizableText size="$3" color="$textSecondary">
                Enter calories from the label or your estimate.
              </SizableText>
              {!!error && (
                <SizableText
                  color="$danger"
                  accessibilityRole="alert"
                  accessibilityLiveRegion="polite"
                >
                  {error}
                </SizableText>
              )}
              <AppButton
                marginTop={16}
                onPress={editingDate ? applyDate : save}
              >
                {editingDate ? "Confirm date" : "Add food"}
              </AppButton>
            </YStack>
          </ScrollView>
        </YStack>
      </KeyboardAvoidingView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "flex-end" },
  overlay: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "rgba(0, 0, 0, 0.45)",
  },
});
