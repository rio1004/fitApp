import { H1, Progress, SizableText, XStack } from "tamagui";

type ProgressTypes = {
  percentage: string;
  numerator: string;
  denumenator?: string;
  rightValue?: [string, string?];
};
export const ProgressComponent = ({
  percentage,
  numerator,
  denumenator,
  rightValue,
}: ProgressTypes) => {
  return (
    <>
      <XStack alignItems="flex-end" justifyContent="space-between">
        <XStack alignItems="flex-end">
          {numerator && <H1>{numerator}</H1>}
          {denumenator && <SizableText>{denumenator}</SizableText>}
        </XStack>
        {rightValue && (
          <SizableText
            color={
              rightValue[1] === "secondary"
                ? "$textSecondary"
                : "$primaryAction"
            }
            fontWeight={rightValue[1] === "secondary" ? "normal" : "bold"}
          >
            {rightValue[0]}
          </SizableText>
        )}
      </XStack>
      <Progress backgroundColor="$progressTrack" value={Number(percentage)}>
        <Progress.Indicator backgroundColor="$primaryAction" />
      </Progress>
    </>
  );
};
