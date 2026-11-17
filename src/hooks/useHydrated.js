import { useState, useSyncExternalStore } from 'react';

const subscribe = () => () => {};
const inBrowser = () => true;
const onServer = () => false;

/**
 * False while rendering on the server and during hydration, true afterwards.
 * React re-renders with `true` straight after hydrating, so components can render exactly
 * what the prerendered HTML contains first, then apply browser-only state (like ?query values).
 * Ordinary client renders (dev server, tests, later navigations) see `true` immediately.
 */
export function useHydrated() {
  return useSyncExternalStore(subscribe, inBrowser, onServer);
}

/**
 * Whether this component first rendered after hydration, e.g. after a client-side navigation.
 * Fixed for the component's lifetime: prerendered components keep `false`.
 */
export function useMountedAfterHydration() {
  const hydrated = useHydrated();
  const [mountedAfterHydration] = useState(hydrated);
  return mountedAfterHydration;
}
