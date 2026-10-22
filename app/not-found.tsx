import Link from "next/link";
import { ctaLink, SectionLabel } from "@/components/homepage/shared";

export default function NotFound() {
  return (
    <div
      id="top"
      className="mx-auto flex w-full max-w-6xl flex-1 flex-col justify-center px-6 py-24 sm:px-10 sm:py-32"
    >
      <div className="grid gap-6 lg:grid-cols-[160px_1fr]">
        <SectionLabel>404</SectionLabel>
        <div className="max-w-2xl">
          <h1 className="text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
            Page not found
          </h1>
          <p className="mt-6 text-base leading-relaxed text-foreground/80">
            The page you&apos;re looking for doesn&apos;t exist or has moved.
          </p>
          <Link href="/" className={`mt-8 ${ctaLink}`}>
            Back home
          </Link>
        </div>
      </div>
    </div>
  );
}
