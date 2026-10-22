import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Blog",
  description: "Notes and write-ups by Riichi Rusdiana.",
  alternates: {
    canonical: "/blog",
  },
};

export default function BlogLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-1 flex-col" id="top">
      <article className="prose prose-zinc mx-auto w-full max-w-3xl px-6 py-24 dark:prose-invert">
        {children}
      </article>
    </div>
  );
}
