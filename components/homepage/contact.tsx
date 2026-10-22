import type { ComponentType } from "react";
import { FaLinkedinIn } from "react-icons/fa6";
import { SiDevdotto, SiDiscord, SiWhatsapp, SiYoutube } from "react-icons/si";
import { SectionLabel, actionLink } from "@/components/homepage/shared";

const socials: {
  label: string;
  href: string;
  Icon: ComponentType<{ className?: string; "aria-hidden"?: boolean }>;
}[] = [
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/sabily-rusyda-3a440b234/",
    Icon: FaLinkedinIn,
  },
  {
    label: "Discord",
    href: "https://discord.gg/Qcf6VUDspY",
    Icon: SiDiscord,
  },
  {
    label: "YouTube",
    href: "https://www.youtube.com/@riichannel-3021",
    Icon: SiYoutube,
  },
  {
    label: "DEV Community",
    href: "https://dev.to/billyaddlers",
    Icon: SiDevdotto,
  },
  {
    label: "WhatsApp",
    href: "https://wa.me/6281331445166",
    Icon: SiWhatsapp,
  },
];

export default function Contact() {
  return (
    <section>
      <div className="mx-auto grid w-full max-w-6xl gap-6 px-6 pt-16 pb-28 sm:px-10 sm:pt-24 sm:pb-24 lg:grid-cols-[160px_1fr]">
        <SectionLabel>Contact</SectionLabel>
        <div>
          <h2 className="text-3xl font-semibold tracking-tight text-balance text-foreground sm:text-4xl">
            Hire me for a project, or just say hello.
          </h2>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-foreground/80">
            Currently open to new opportunities and collaborations. If you have
            a project in mind, or just want to connect, feel free to reach out
            to me via email or through my social media profiles.
          </p>
          <div className="mt-10 grid gap-8 sm:grid-cols-2">
            <div>
              <p className="font-mono text-xs text-foreground/70">Email</p>
              <a
                href="mailto:me@riichi.my.id"
                className="mt-2 block border border-dashed border-foreground/40 px-3 py-3 text-sm text-foreground/80 transition-colors hover:border-moonstone-500 hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-4"
              >
                me@riichi.my.id
              </a>
              <div className="mt-4">
                <p className="font-mono text-xs text-foreground/70">
                  Elsewhere
                </p>
                <ul className="mt-1 flex flex-wrap items-center gap-x-6">
                  {socials.map(({ label, href, Icon }) => (
                    <li key={label}>
                      <a
                        href={href}
                        target="_blank"
                        rel="me noreferrer"
                        className={actionLink}
                      >
                        <Icon aria-hidden={true} className="size-5" />
                        <span className="sr-only">{label}</span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="flex flex-col items-start gap-1">
              <a href="https://github.com/BillyAddlers" className={actionLink}>
                GitHub
              </a>
              <a
                href="https://github.com/BillyAddlers/config.nvim"
                className={actionLink}
              >
                Neovim Config
              </a>
              <a
                href="https://github.com/BillyAddlers?tab=repositories"
                className={actionLink}
              >
                All repositories
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
