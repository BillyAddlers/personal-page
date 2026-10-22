import { inlineLink } from "@/components/homepage/shared";

export default function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-foreground/10">
      <div className="mx-auto w-full max-w-6xl px-6 py-8 text-center sm:px-10">
        <p className="text-sm text-foreground/80">
          Designed with <span aria-hidden="true">❤️</span>
          <span className="sr-only">love</span> by{" "}
          <a
            href="https://github.com/billyaddlers"
            target="_blank"
            rel="noreferrer"
            className={`${inlineLink} text-foreground`}
          >
            Riichi Rusdiana
          </a>
        </p>
      </div>
    </footer>
  );
}
