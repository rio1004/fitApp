import { useState } from 'react';
import { KeyboardAvoidingView, Modal, Platform, Pressable, ScrollView, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Button, H2, Input, SizableText, XStack, YStack } from 'tamagui';
import { X } from '@tamagui/lucide-icons-2';
import { AppButton } from '@/components/app-button';

export const workoutActivities = ['Gym', 'Running', 'Walking', 'Home workout', 'Custom'] as const;
export type WorkoutPlan = {
  activity: typeof workoutActivities[number];
  customName: string;
  minutes: number;
};

type Props = {
  initialPlan: WorkoutPlan;
  onClose: () => void;
  onSave: (plan: WorkoutPlan) => void;
};

export function ChangeActivityModal({ initialPlan, onClose, onSave }: Props) {
  const insets = useSafeAreaInsets();
  const [activity, setActivity] = useState(initialPlan.activity);
  const [customName, setCustomName] = useState(initialPlan.customName);
  const [minutes, setMinutes] = useState(String(initialPlan.minutes));
  const [error, setError] = useState('');

  function save() {
    if (activity === 'Custom' && !customName.trim()) {
      return setError('Enter a name for your workout.');
    }
    if (!/^\d+$/.test(minutes.trim()) || Number(minutes) < 1 || Number(minutes) > 1440) {
      return setError('Enter a duration between 1 and 1,440 minutes.');
    }
    onSave({ activity, customName: customName.trim(), minutes: Number(minutes) });
  }

  return (
    <Modal transparent animationType="slide" visible onRequestClose={onClose} statusBarTranslucent>
      <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <Pressable style={styles.overlay} onPress={onClose} accessibilityRole="button" accessibilityLabel="Dismiss change activity" />
        <YStack backgroundColor="$surface" borderTopLeftRadius={24} borderTopRightRadius={24}
          width="100%" maxWidth={560} alignSelf="center" maxHeight="90%"
          paddingTop={12} paddingBottom={Math.max(insets.bottom, 24)}
          paddingLeft={Math.max(insets.left, 24)} paddingRight={Math.max(insets.right, 24)}
          accessibilityViewIsModal onAccessibilityEscape={onClose}>
          <YStack width={48} height={5} borderRadius={5} backgroundColor="$borderColor" alignSelf="center" marginBottom={12} />
          <XStack justifyContent="space-between" alignItems="center" marginBottom={12}>
            <H2 fontSize={26} flex={1}>Change activity</H2>
            <Button circular chromeless size={48} icon={X} accessibilityLabel="Close change activity" onPress={onClose} />
          </XStack>
          <ScrollView keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}>
            <YStack gap={16}>
              <SizableText color="$textSecondary">Choose your workout and duration goal for today.</SizableText>
              <YStack gap={8}>
                <SizableText fontWeight="600">Activity</SizableText>
                <XStack gap={8} flexWrap="wrap">
                  {workoutActivities.map((item) => (
                    <Button key={item} theme={activity === item ? 'primary' : 'secondary'} minHeight={48}
                      borderRadius={12} paddingHorizontal={16} flexGrow={1}
                      accessibilityRole="radio" accessibilityState={{ checked: activity === item }}
                      onPress={() => { setActivity(item); setError(''); }}>
                      {item}
                    </Button>
                  ))}
                </XStack>
              </YStack>
              {activity === 'Custom' && (
                <YStack gap={6}>
                  <SizableText fontWeight="600">Workout name</SizableText>
                  <Input accessibilityLabel="Custom workout name" placeholder="e.g. Cycling" value={customName}
                    onChangeText={setCustomName} maxLength={80} height={48} borderRadius={12} backgroundColor="$surface" />
                </YStack>
              )}
              <YStack gap={6}>
                <SizableText fontWeight="600">Duration goal</SizableText>
                <XStack alignItems="center" borderWidth={1} borderColor="$borderColor" borderRadius={12} paddingRight={14}>
                  <Input flex={1} minWidth={0} height={48} borderWidth={0} backgroundColor="transparent"
                    accessibilityLabel="Duration goal in minutes" keyboardType="number-pad" value={minutes}
                    onChangeText={setMinutes} maxLength={4} placeholder="30" />
                  <SizableText color="$textSecondary" size="$3">min</SizableText>
                </XStack>
                <XStack gap={8} flexWrap="wrap">
                  {[15, 30, 45, 60].map((value) => (
                    <Button key={value} minHeight={48} flexGrow={1} borderRadius={12}
                      theme={Number(minutes) === value ? 'primary' : 'secondary'}
                      accessibilityLabel={`${value} minutes`} accessibilityState={{ selected: Number(minutes) === value }}
                      onPress={() => { setMinutes(String(value)); setError(''); }}>{value} min</Button>
                  ))}
                </XStack>
              </YStack>
              {!!error && <SizableText color="$danger" accessibilityRole="alert" accessibilityLiveRegion="polite">{error}</SizableText>}
              <AppButton marginTop={8} onPress={save}>Save activity</AppButton>
            </YStack>
          </ScrollView>
        </YStack>
      </KeyboardAvoidingView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'flex-end' },
  overlay: { position: 'absolute', top: 0, bottom: 0, left: 0, right: 0, backgroundColor: 'rgba(0, 0, 0, 0.45)' },
});
