# Apply to Gradle and Prefab child JVMs for compatibility with Java 24+.
$gradleArguments = $args
$previousJavaOptions = $env:JAVA_TOOL_OPTIONS
$nativeAccessOption = '--enable-native-access=ALL-UNNAMED'
if (-not ($env:JAVA_TOOL_OPTIONS -like "*$nativeAccessOption*")) {
    $env:JAVA_TOOL_OPTIONS = "$previousJavaOptions $nativeAccessOption".Trim()
}

$gradleExitCode = 1
Push-Location (Join-Path $PSScriptRoot '../android')
try {
    & .\gradlew.bat --init-script (Join-Path $PSScriptRoot 'native-build-paths.gradle') @gradleArguments
    $gradleExitCode = $LASTEXITCODE
}
finally {
    Pop-Location
    $env:JAVA_TOOL_OPTIONS = $previousJavaOptions
}
exit $gradleExitCode
