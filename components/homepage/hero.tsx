import Link from "next/link";
import HeroVisual from "@/components/hero-visual";
import ShrinkHero from "@/components/shrink-hero";
import WorkLink from "@/components/work-link";
import { actionLink, ctaLink } from "@/components/homepage/shared";

export default function HomeHero() {
  return (
    <ShrinkHero>
      <div>
        <p className="font-mono text-sm text-foreground/80">
          Sabily Rusyda / Riichi Rusdiana
        </p>
        <h1 className="mt-4 max-w-xl text-5xl font-semibold tracking-tight text-balance text-foreground sm:text-6xl">
          Web developer and designer.
        </h1>
        <p className="mt-6 max-w-xl text-lg leading-relaxed text-foreground/80 sm:text-xl">
          Shipping features and building products. Hoping to change the world
          for the better, one commit at a time.
        </p>
        <p className="mt-4 max-w-xl text-sm leading-relaxed text-foreground/80">
          &quot;If the world is full of things we never wanted to know, is our
          only option to look away? To won&apos;t solve anything by running
          away.&quot; - Kyousuke Natsume
        </p>
        <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-2">
          <WorkLink className={ctaLink}>See the work</WorkLink>
          <Link href="/blog" className={ctaLink}>
            Read the blog
          </Link>
          <a href="https://github.com/BillyAddlers" className={actionLink}>
            GitHub
          </a>
          <a
            href="https://github.com/BillyAddlers/config.nvim"
            className={actionLink}
          >
            Neovim Config
          </a>
        </div>
      </div>
      <HeroVisual />
    </ShrinkHero>
  );
}
