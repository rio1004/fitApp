const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const { patchSource } = require('./patch-expo-router.cjs');

const file = path.join(path.dirname(require.resolve('expo-router/package.json')), 'build/fork/useLinking.native.js');
const source = patchSource(fs.readFileSync(file, 'utf8'));
assert.equal(patchSource(source), source, 'Patch must be idempotent');

function harness(url) {
  const effects = [];
  const notifications = [];
  let linkListener;
  const mocks = {
    react: {
      useRef: (current) => ({ current }),
      useCallback: (callback) => callback,
      useEffect: (effect) => effects.push(effect),
    },
    'expo-linking': {},
    'react-native': {},
    './extractPathFromURL': { extractExpoPathFromURL: (_prefixes, value) => value.replace('fitapp://', '/') },
    '../react-navigation/native': {
      useNavigationIndependentTree: () => false,
      getStateFromPath: (value) => ({ routes: [{ name: value }] }),
      getActionFromState: () => ({ type: 'NAVIGATE' }),
    },
  };
  const exports = {};
  vm.runInNewContext(source, { exports, require: (id) => {
    assert.ok(id in mocks, `Unexpected dependency: ${id}`);
    return mocks[id];
  }, process: { env: { NODE_ENV: 'test' } }, console });
  const ref = { current: { getRootState: () => ({ routeNames: ['/workout'] }), dispatch: () => {} } };
  const hook = exports.useLinking(ref, {
    prefixes: ['fitapp://'], getInitialURL: () => url,
    subscribe: (listener) => { linkListener = listener; return () => {}; },
  }, (value) => notifications.push(value));
  let cleanups = [];
  return {
    hook, notifications,
    mount: () => { cleanups = effects.map((effect) => effect()); },
    unmount: () => cleanups.forEach((cleanup) => cleanup?.()),
    sendLink: (value) => linkListener(value),
  };
}

async function main() {
  for (const url of ['fitapp://workout', Promise.resolve('fitapp://workout')]) {
    const h = harness(url);
    const state = await h.hook.getInitialState();
    assert.equal(state.routes[0].name, '/workout', 'Initial navigation state is preserved');
    assert.equal(h.notifications.length, 0, 'No state update before commit');
    h.mount();
    assert.deepEqual(h.notifications, ['/workout']);
    h.unmount();
    h.mount(); // Strict Mode effect replay must not duplicate the initial notification.
    assert.deepEqual(h.notifications, ['/workout']);
    h.sendLink('fitapp://workout');
    assert.equal(h.notifications.length, 2, 'Live deep links remain enabled');
    h.unmount();
  }
  for (const unmountFirst of [false, true]) {
    let resolve;
    const h = harness(new Promise((done) => { resolve = done; }));
    const result = h.hook.getInitialState();
    h.mount();
    if (unmountFirst) h.unmount();
    resolve('fitapp://workout');
    await result;
    assert.equal(h.notifications.length, unmountFirst ? 0 : 1, 'Late resolution respects mount lifecycle');
    if (!unmountFirst) h.unmount();
  }
  const empty = harness(Promise.resolve(null));
  assert.equal(await empty.hook.getInitialState(), undefined);
  empty.mount();
  assert.equal(empty.notifications.length, 0);
  empty.unmount();
  console.log('Initial-link checks passed: sync/async URLs, pre-mount queue, mounted resolution, unmount, effect replay, null URL, and live links.');
}

main().catch((error) => { console.error(error); process.exitCode = 1; });
