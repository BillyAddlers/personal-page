"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowUp, Home, Moon, Sun } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import { useMounted } from "@/components/use-mounted";

const SHOW_BACK_TO_TOP_AT = 480;
const THEME_REVEAL_DURATION = 360;

const actionButton =
  "grid size-11 place-items-center rounded-full border border-foreground/20 bg-background/90 text-foreground shadow-sm backdrop-blur transition-[color,background-color,border-color,opacity,transform] duration-200 motion-reduce:transition-none hover:border-moonstone-500 hover:bg-foreground/5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground";

export default function FloatingActions() {
  const mounted = useMounted();
  const pathname = usePathname();
  const { resolvedTheme, setTheme } = useTheme();
  const isHome = pathname === "/";
  const [showBackToTop, setShowBackToTop] = useState(false);
  const themeButtonRef = useRef<HTMLButtonElement>(null);
  const themeTransitioning = useRef(false);

  useEffect(() => {
    const update = () => {
      setShowBackToTop(window.scrollY > SHOW_BACK_TO_TOP_AT);
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  const isDark = resolvedTheme === "dark";
  const themeLabel = mounted
    ? isDark
      ? "Switch to light theme"
      : "Switch to dark theme"
    : "Toggle color theme";

  const applyTheme = (nextTheme: "light" | "dark", suppressFor: number) => {
    const root = document.documentElement;
    const suppressTransitions = document.createElement("style");

    suppressTransitions.textContent =
      "*,*::before,*::after{transition:none!important}";
    document.head.appendChild(suppressTransitions);
    void window.getComputedStyle(document.body);

    root.classList.remove("light", "dark");
    root.classList.add(nextTheme);
    root.style.colorScheme = nextTheme;
    setTheme(nextTheme);

    window.setTimeout(() => suppressTransitions.remove(), suppressFor);
  };

  const toggleTheme = () => {
    if (themeTransitioning.current) return;

    const nextTheme = isDark ? "light" : "dark";
    const button = themeButtonRef.current;
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (
      reducedMotion ||
      !button ||
      typeof document.startViewTransition !== "function"
    ) {
      applyTheme(nextTheme, 200);
      return;
    }

    themeTransitioning.current = true;

    try {
      const transition = document.startViewTransition(() => {
        applyTheme(nextTheme, THEME_REVEAL_DURATION + 140);
      });

      transition.finished.finally(() => {
        themeTransitioning.current = false;
      });

      transition.ready
        .then(() => {
          const rect = button.getBoundingClientRect();
          const x = rect.left + rect.width / 2;
          const y = rect.top + rect.height / 2;
          const radius = Math.hypot(
            Math.max(x, window.innerWidth - x),
            Math.max(y, window.innerHeight - y),
          );

          document.documentElement.animate(
            {
              clipPath: [
                `circle(0px at ${x}px ${y}px)`,
                `circle(${radius}px at ${x}px ${y}px)`,
              ],
            },
            {
              duration: THEME_REVEAL_DURATION,
              easing: "cubic-bezier(0.2, 0, 0, 1)",
              pseudoElement: "::view-transition-new(root)",
            },
          );
        })
        .catch(() => {
          // The theme is already applied even if the reveal is skipped.
        });
    } catch {
      themeTransitioning.current = false;
      applyTheme(nextTheme, 200);
    }
  };

  const scrollToTop = () => {
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    window.scrollTo({
      top: 0,
      behavior: reducedMotion ? "auto" : "smooth",
    });
  };

  return (
    <div className="fixed right-[max(1.5rem,env(safe-area-inset-right))] bottom-[max(1.5rem,env(safe-area-inset-bottom))] z-50 flex items-center gap-2">
      <button
        type="button"
        aria-label="Back to top"
        aria-hidden={!showBackToTop}
        tabIndex={showBackToTop ? 0 : -1}
        onClick={scrollToTop}
        className={`${actionButton} ${
          showBackToTop
            ? "visible translate-y-0 opacity-100"
            : "invisible translate-y-2 opacity-0"
        }`}
      >
        <ArrowUp aria-hidden="true" className="size-4" />
      </button>

      {!isHome ? (
        <Link
          href="/"
          aria-label="Back to homepage"
          className={actionButton}
        >
          <Home aria-hidden="true" className="size-4" />
        </Link>
      ) : null}

      <button
        ref={themeButtonRef}
        type="button"
        aria-label={themeLabel}
        title={themeLabel}
        onClick={toggleTheme}
        className={actionButton}
      >
        <Sun aria-hidden="true" className="hidden size-4 dark:block" />
        <Moon aria-hidden="true" className="size-4 dark:hidden" />
      </button>
    </div>
  );
}
