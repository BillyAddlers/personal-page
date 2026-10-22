import type { MDXComponents } from "mdx/types";
import Link from "next/link";
import type { ComponentProps } from "react";

function MdxLink({
  href,
  ...props
}: ComponentProps<"a">) {
  if (href && (href.startsWith("/") || href.startsWith("#"))) {
    return <Link href={href} {...props} />;
  }
  return <a href={href} rel="noreferrer" target="_blank" {...props} />;
}

// Required by @next/mdx in the App Router. MDX pages resolve their component
// map from this file; without it they will not render.
export function useMDXComponents(): MDXComponents {
  return {
    a: MdxLink,
    img: (props) => (
      // eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text
      <img loading="lazy" decoding="async" {...props} />
    ),
  };
}
