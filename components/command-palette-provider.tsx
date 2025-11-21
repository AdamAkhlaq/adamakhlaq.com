"use client";

import * as React from "react";
import { CommandPalette } from "./command-palette";
import { CommandMenuButton } from "./command-menu-button";

export function CommandPaletteProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [open, setOpen] = React.useState(false);

  return (
    <>
      {children}
      <CommandMenuButton onClick={() => setOpen(true)} />
      <CommandPalette open={open} setOpen={setOpen} />
    </>
  );
}
