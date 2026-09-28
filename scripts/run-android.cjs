// Prefab's bundled JNA emits a native-access warning on Java 24+ that
// Android's Gradle plugin treats as an error. Pass this to child JVMs too.
const nativeAccess = "--enable-native-access=ALL-UNNAMED";
const javaOptions = process.env.JAVA_TOOL_OPTIONS || "";

if (!javaOptions.includes(nativeAccess)) {
  process.env.JAVA_TOOL_OPTIONS = `${javaOptions} ${nativeAccess}`.trim();
}

// Run the installed Expo CLI without a shell, preserving arguments and signals.
const expoCli = require.resolve("expo/bin/cli");
process.argv = [process.execPath, expoCli, "run:android", ...process.argv.slice(2)];
require(expoCli);
