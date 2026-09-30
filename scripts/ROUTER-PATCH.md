# Expo Router initial-link workaround

Expo Router 57.0.23 calls `onUnhandledLinking` while resolving the initial URL.
On native cold starts, that promise can resolve before the navigation container
commits, causing React's "state update on a component that hasn't mounted yet"
warning. Upstream report: https://github.com/expo/expo/issues/49378.

`patch-expo-router.cjs` queues only the initial-link notification until the
hook's mount effect. It drops callbacks after unmount and leaves initial route
parsing and live URL subscriptions unchanged. The npm `postinstall` script
reapplies this workaround after dependency installation. No warning is suppressed.

Run `node scripts/check-router-initial-link.cjs` to exercise the installed hook
with controlled hook lifecycle and URL timing. This is a focused regression
check, not a native-device integration test.

The patch is pinned to 57.0.23 and checks the code it replaces. When upgrading
Expo Router, review whether the SDK-compatible release fixes the upstream issue.
Remove the postinstall entry and these patch/check files when no longer needed;
otherwise revalidate and update the guard. Restart Metro with
`npx expo start --clear` after applying the patch to an already running project.
