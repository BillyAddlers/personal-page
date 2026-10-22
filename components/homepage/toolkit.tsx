import type { ComponentType } from "react";
import {
  Hammer,
  LayoutGrid,
  Route,
  Router,
  SquareTerminal,
  Type,
} from "lucide-react";
import {
  SiArchlinux,
  SiFedora,
  SiGit,
  SiGo,
  SiJunipernetworks,
  SiLinux,
  SiMariadb,
  SiMikrotik,
  SiNextdotjs,
  SiNodedotjs,
  SiPostgresql,
  SiReact,
  SiSocketdotio,
  SiTailwindcss,
  SiTypescript,
} from "react-icons/si";
import { SectionLabel } from "@/components/homepage/shared";

type StackIcon = ComponentType<{
  className?: string;
  "aria-hidden"?: boolean;
}>;

type StackItem = {
  name: string;
  Icon: StackIcon;
};

const stack: StackItem[] = [
  // Systems
  { name: "Arch", Icon: SiArchlinux },
  { name: "BIRD", Icon: Route },
  { name: "Fedora", Icon: SiFedora },
  { name: "Git", Icon: SiGit },
  { name: "Juniper Junos", Icon: SiJunipernetworks },
  { name: "Linux", Icon: SiLinux },
  { name: "Make", Icon: Hammer },
  { name: "MariaDB/MySQL", Icon: SiMariadb },
  { name: "PostgreSQL", Icon: SiPostgresql },
  { name: "RouterOS", Icon: SiMikrotik },
  { name: "Shell", Icon: SquareTerminal },
  { name: "VyOS", Icon: Router },
  // Frameworks and libraries
  { name: "Go", Icon: SiGo },
  { name: "Next.js", Icon: SiNextdotjs },
  { name: "Node.js", Icon: SiNodedotjs },
  { name: "React", Icon: SiReact },
  { name: "Socket.IO", Icon: SiSocketdotio },
  { name: "Tailwind CSS", Icon: SiTailwindcss },
  { name: "TypeScript", Icon: SiTypescript },
  // Design
  { name: "Typography", Icon: Type },
  { name: "UI layout", Icon: LayoutGrid },
];

export default function Toolkit() {
  return (
    <section className="border-b border-foreground/10">
      <div className="mx-auto grid w-full max-w-6xl gap-6 px-6 py-16 sm:px-10 sm:py-24 lg:grid-cols-[160px_1fr]">
        <SectionLabel>Toolkit</SectionLabel>
        <div>
          <h2 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            Tech/stack
          </h2>
          <ul className="mt-10 flex flex-wrap gap-px border border-foreground/15 bg-foreground/10">
            {stack.map(({ name, Icon }) => (
              <li
                key={name}
                className="flex min-h-24 grow basis-[calc(33.333%_-_1px)] flex-col items-center justify-center gap-2 bg-background px-1.5 py-5 text-center md:basis-[calc(16.6667%_-_1px)] lg:basis-[calc(14.2857%_-_1px)]"
              >
                <Icon aria-hidden={true} className="size-7 text-foreground/80" />
                <span className="font-mono text-xs leading-tight text-foreground/70">
                  {name}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
