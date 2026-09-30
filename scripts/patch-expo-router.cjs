const fs = require('node:fs');
const path = require('node:path');

// Temporary workaround for https://github.com/expo/expo/issues/49378.
// Remove once the installed SDK-compatible router fixes initial-link updates.
const marker = '// FitApp: defer initial-link notifications until commit.';
const insertionPoint = '    const independent = (0, native_1.useNavigationIndependentTree)();';
const guard = `    ${marker}
    const initialLinkLifecycle = (0, react_1.useRef)({ mounted: false, disposed: false, pending: undefined });
    (0, react_1.useEffect)(() => {
        const lifecycle = initialLinkLifecycle.current;
        lifecycle.mounted = true;
        lifecycle.disposed = false;
        if (lifecycle.pending !== undefined) {
            const path = lifecycle.pending;
            lifecycle.pending = undefined;
            onUnhandledLinking(path);
        }
        return () => {
            lifecycle.mounted = false;
            lifecycle.disposed = true;
            lifecycle.pending = undefined;
        };
    }, [onUnhandledLinking]);
    const notifyInitialLink = (0, react_1.useCallback)((path) => {
        const lifecycle = initialLinkLifecycle.current;
        if (lifecycle.disposed) return;
        if (lifecycle.mounted) onUnhandledLinking(path);
        else lifecycle.pending = path;
    }, [onUnhandledLinking]);
`;

function patchSource(source) {
  if (source.includes(marker)) return source;
  const start = source.indexOf('    const getInitialState =');
  const end = source.indexOf('    (0, react_1.useEffect)', start);
  const initialState = source.slice(start, end);
  if (start < 0 || end < 0 || !source.includes(insertionPoint) ||
      initialState.split('onUnhandledLinking(').length !== 3 ||
      !initialState.includes('[getStateFromURL, onUnhandledLinking, prefixes]')) {
    throw new Error('Expo Router initial-link implementation changed. Review/remove scripts/patch-expo-router.cjs before proceeding.');
  }
  const replacement = initialState.replaceAll('onUnhandledLinking(', 'notifyInitialLink(')
    .replace('[getStateFromURL, onUnhandledLinking, prefixes]', '[getStateFromURL, notifyInitialLink, prefixes]');
  return (source.slice(0, start) + replacement + source.slice(end))
    .replace(insertionPoint, guard + insertionPoint);
}

if (require.main === module) {
  const packagePath = require.resolve('expo-router/package.json');
  const { version } = JSON.parse(fs.readFileSync(packagePath, 'utf8'));
  if (version !== '57.0.23') {
    throw new Error(`Review the initial-link workaround for expo-router ${version}; it was verified against 57.0.23.`);
  }
  const file = path.join(path.dirname(packagePath), 'build/fork/useLinking.native.js');
  const source = fs.readFileSync(file, 'utf8');
  const patched = patchSource(source);
  if (source !== patched) fs.writeFileSync(file, patched);
  console.log('Expo Router initial-link mount guard applied.');
}

module.exports = { patchSource };
