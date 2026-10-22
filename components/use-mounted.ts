"use client";

import { useSyncExternalStore } from "react";

// Hydration gate: false during SSR and the first client render, true after.
// useSyncExternalStore with a stable server snapshot avoids setState-in-effect.
const emptySubscribe = () => () => {};
const getClientSnapshot = () => true;
const getServerSnapshot = () => false;

export function useMounted(): boolean {
  return useSyncExternalStore(
    emptySubscribe,
    getClientSnapshot,
    getServerSnapshot,
  );
}
