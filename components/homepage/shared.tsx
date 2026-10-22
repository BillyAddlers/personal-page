import type { ReactNode } from "react";

// Moonstone decoration is the repeated accent, kept off the text color so
// contrast does not depend on the palette.
export const inlineLink =
  "underline decoration-moonstone-500 decoration-1 underline-offset-4 transition-colors hover:text-foreground hover:decoration-foreground focus-visible:outline-2 focus-visible:outline-offset-4";

// Standalone links double as tap targets, so they get a 44px hit area.
export const actionLink =
  "inline-flex min-h-11 items-center text-foreground/80 underline decoration-moonstone-500 decoration-1 underline-offset-4 transition-colors hover:text-foreground hover:decoration-foreground focus-visible:outline-2 focus-visible:outline-offset-4";

export const ctaLink =
  "inline-flex min-h-11 items-center rounded-sm border border-foreground/50 px-5 text-sm font-medium text-foreground transition-colors hover:border-moonstone-500 hover:bg-foreground/5 focus-visible:outline-2 focus-visible:outline-offset-4";

// Heading link box grows to a comfortable tap target.
export const titleLink = `${inlineLink} inline-block py-2 -my-2`;

export function SectionLabel({ children }: { children: ReactNode }) {
  return <p className="font-mono text-xs text-foreground/70">{children}</p>;
}
