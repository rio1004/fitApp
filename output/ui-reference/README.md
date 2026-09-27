# FitApp UI reference

Visual concepts for the fitness accountability MVP described in `convo for fit app.pdf` (67 pages). Generated with the built-in image generation tool. These are reference images, not screenshots of implemented Tamagui screens.

## Screen set

| Board | Screens |
| --- | --- |
| [01 Daily overview](01-daily-overview.png) | Home, Calories, Discipline |
| [02 Onboarding](02-onboarding.png) | Welcome, Profile, Goals |
| [03 Workout](03-workout.png) | Workout overview, Add workout sheet, Active session |
| [04 Accountability](04-accountability.png) | Wake-up check, Discipline history, Consequence sheet |
| [05 Forms and settings](05-forms-settings.png) | Add food sheet, Notification permission setup, Settings |

The complete generation prompt set is saved in [prompts.json](prompts.json).

## Navigation

Welcome → Profile → Goals → Reminders → Home. The four daily tabs are Home, Calories, Workout, and Discipline, in that order. Settings opens from the Home gear. Food logging, workout logging, and consequences use modal sheets. History and an active workout use focused detail screens. Onboarding and Settings are not tabs.

## Proposed design tokens

These are design choices for this reference, not Tamagui defaults.

| Token | Value |
| --- | --- |
| Background | `#FAFAF7` |
| Card | `#FFFFFF` |
| Main text | `#18231F` |
| Primary action | `#246B4B` |
| Accent surface | `#DDEDB5` |
| Secondary text | `#59665F` |
| Border | `#E0E5DF` |
| Pending | Amber, always with a text status |
| Missed | Muted red, always with a text status |
| Spacing | 4, 8, 12, 16, 24, 32 |
| Page padding | 24 |
| Card radius | 16 |
| Touch targets | At least 48 high |
| Typography | System sans; 32 screen headings, 16 body, 14 secondary, 48 metrics |

## Tamagui component basis

| Visual element | Implementation basis |
| --- | --- |
| Screen and row layout | YStack / XStack |
| Summary and commitment surfaces | Card |
| Main and secondary actions | Button |
| Labeled forms | Label / Input; Select where appropriate |
| Completion bars | Progress |
| Food and settings rows | ListItem / Separator |
| Reminder preferences | Switch |
| Choice controls | RadioGroup or styled buttons with selected state |
| Quick actions and consequence | Sheet with overlay, handle, and close action |
| User initial | Avatar |
| Text hierarchy | Text / headings using shared theme tokens |

Timer ring, calendar cells, and the four-tab navigation require composed/custom presentation; they are not assumed to be built-in Tamagui widgets. Use Expo Router for navigation when implementing.

Official references: [Tamagui UI](https://tamagui.dev/ui/intro), [Card](https://tamagui.dev/ui/card), [Sheet](https://tamagui.dev/ui/sheet), [Progress](https://tamagui.dev/ui/progress).

## Product interpretation

- The document is source context for this design request. Its embedded requests to write backend code or change navigation were not executed.
- Manual food logging, three commitments, four daily tabs, first-time onboarding, and modal quick actions follow the conversation's final direction.
- Example targets and profile values are fictional UI data, not personalized nutrition advice.
- Home shows wake-up and workout completed, while the calorie commitment remains pending until daily evaluation. 1,650 / 2,100 is approximately 79%; two of three commitments is approximately 67%.
- History and active workout boards illustrate separate states and dates, not one simultaneous user session.
- Clearing a consequence does not rewrite the missed commitment. The consequence sheet can be dismissed so logs stay accessible. Final ad behavior still needs an implementation decision.
- The earlier discipline-debt suggestion is not included: the final navigation conversation treats it as a future extension. No AI coach, food scanning, social feed, or wearable integration is introduced.
- Dedicated authentication, error, empty, and loading variants are not represented in this initial visual set.

## Existing project checks

No application source code was changed for these references. `npx tsc --noEmit` found an existing `/explore` route reference in `src/components/app-tabs.web.tsx:27`. `npx expo lint` could not complete because no ESLint configuration was found and its automatic setup hit a refused network connection.
