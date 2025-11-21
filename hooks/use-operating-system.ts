"use client";

import { useSyncExternalStore } from "react";

function getIsMac() {
  if (typeof window === "undefined") return false;
  return navigator.platform.toUpperCase().indexOf("MAC") >= 0;
}

function subscribe() {
  return () => {};
}

export function useOperatingSystem() {
  const isMac = useSyncExternalStore(subscribe, getIsMac, () => false);

  return { isMac, mounted: true };
}
