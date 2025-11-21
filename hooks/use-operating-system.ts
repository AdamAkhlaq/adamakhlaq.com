"use client";

import { useState } from "react";

export function useOperatingSystem() {
  const [isMac] = useState(() => {
    if (typeof window === "undefined") return false;
    return navigator.platform.toUpperCase().indexOf("MAC") >= 0;
  });

  return { isMac };
}
