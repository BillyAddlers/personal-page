import {
  SectionLabel,
  actionLink,
  inlineLink,
  titleLink,
} from "@/components/homepage/shared";

type Project = {
  name: string;
  href: string;
  stack: string;
  paragraphs: readonly string[];
  role?: string;
  showRepositoryLink?: boolean;
  linkLabel?: string;
  download?: boolean;
};

type CompactProject = Pick<Project, "name" | "href" | "stack" | "download"> & {
  description: string;
};

const stellarite: Project = {
  name: "Stellarite",
  href: "https://github.com/BillyAddlers/stellarite",
  role: "Maintainer",
  stack: "Fedora Atomic, Bazzite, COSMIC, Make",
  showRepositoryLink: true,
  paragraphs: [
    "A COSMIC-based Fedora Atomic image tailored for gaming with the Bazzite kernel.",
  ],
};

const dkms: Project = {
  name: "Linuwu Sense AN515-55 DKMS",
  href: "https://aur.archlinux.org/packages/linuwu-sense-an515-55-dkms",
  role: "AUR maintainer",
  stack: "C, DKMS, AUR",
  showRepositoryLink: true,
  linkLabel: "View AUR package",
  paragraphs: [
    "A patched Acer Nitro AN515-55/58 WMI driver packaged for DKMS, with a fan-speed fix and kernel 7.2 compatibility.",
  ],
};

const featuredProjects = [stellarite, dkms];

const secondaryProjects: readonly Project[] = [
  {
    name: "pycollection",
    href: "https://github.com/BillyAddlers/pycollection",
    stack: "Python",
    paragraphs: [
      "A utility data structure with Map-style key/value helpers, built on Python's dict.",
    ],
  },
  {
    name: "go-project-layout",
    href: "https://github.com/BillyAddlers/go-project-layout",
    stack: "Go, Docker, Make",
    paragraphs: [
      "A ready-to-use Go project layout with Docker, Make, and clear component separation.",
    ],
  },
];

const compactProjects: readonly CompactProject[] = [
  {
    name: "Project Sovereign",
    href: "https://github.com/BillyAddlers/project-sovereign",
    stack: "TypeScript, Bun, Next.js, Hono, PostgreSQL",
    description:
      "An operational backbone for managing deliverables of high-value projects.",
  },
  {
    name: "cv_gw",
    href: "/cv.pdf",
    stack: "LaTeX, Make",
    download: true,
    description:
      "A single-column, ATS-friendly LaTeX CV with selectable text and live links.",
  },
];

function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="flex h-full flex-col border border-foreground/10 p-6 sm:p-8">
      <h3 className="text-2xl font-semibold tracking-tight text-foreground">
        <a
          href={project.href}
          className={titleLink}
          download={project.download}
        >
          {project.name}
        </a>
      </h3>
      {project.role ? (
        <p className="mt-2 font-mono text-xs text-foreground/70">
          {project.role}
        </p>
      ) : null}
      <div className="mt-4">
        {project.paragraphs.map((paragraph) => (
          <p
            key={paragraph}
            className="max-w-2xl text-base leading-relaxed text-foreground/80 [&:not(:first-child)]:mt-3"
          >
            {paragraph}
          </p>
        ))}
      </div>
      <div className="mt-auto flex flex-wrap items-center gap-x-6 gap-y-2 pt-5 text-xs text-foreground/70">
        <span className="font-mono">{project.stack}</span>
        {project.showRepositoryLink ? (
          <a href={project.href} className={`${actionLink} font-sans text-sm`}>
            {project.linkLabel ?? "View repository"}
          </a>
        ) : null}
      </div>
    </article>
  );
}

function ProjectRow({ project }: { project: Project }) {
  return (
    <article className="grid gap-4 border-b border-foreground/10 py-8 md:grid-cols-[220px_1fr]">
      <div>
        <h3 className="text-xl font-semibold tracking-tight text-foreground">
          <a
            href={project.href}
            className={titleLink}
            download={project.download}
          >
            {project.name}
          </a>
        </h3>
        {project.role ? (
          <p className="mt-2 font-mono text-xs text-foreground/70">
            {project.role}
          </p>
        ) : null}
      </div>
      <div>
        {project.paragraphs.map((paragraph) => (
          <p
            key={paragraph}
            className="max-w-2xl text-base leading-relaxed text-foreground/80 [&:not(:first-child)]:mt-3"
          >
            {paragraph}
          </p>
        ))}
        <div className="mt-3 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-foreground/70">
          <span className="font-mono">{project.stack}</span>
          {project.showRepositoryLink ? (
            <a
              href={project.href}
              className={`${actionLink} font-sans text-sm`}
            >
              {project.linkLabel ?? "View repository"}
            </a>
          ) : null}
        </div>
      </div>
    </article>
  );
}

export default function SelectedWork() {
  return (
    <section id="work" className="scroll-mt-8 border-b border-foreground/10">
      <div className="mx-auto w-full max-w-6xl px-6 py-16 sm:px-10 sm:py-24">
        <div className="grid gap-6 lg:grid-cols-[160px_1fr]">
          <SectionLabel>Work</SectionLabel>
          <div>
            <h2 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
              Selected work
            </h2>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-foreground/80">
              Here are some of the projects I&apos;ve worked on.
            </p>
          </div>
        </div>

        <div className="mt-12 border-t border-foreground/15 pt-8">
          <div className="grid gap-6 md:grid-cols-2">
            {featuredProjects.map((project, index) => (
              <ProjectCard key={`featured-${index}`} project={project} />
            ))}
          </div>
        </div>

        <div className="mt-12 border-t border-foreground/15">
          {secondaryProjects.map((project) => (
            <ProjectRow key={project.href} project={project} />
          ))}
        </div>

        <div className="mt-8 grid gap-x-8 gap-y-4 border-t border-foreground/10 pt-8 md:grid-cols-2">
          {compactProjects.map((project) => (
            <a
              key={project.name}
              href={project.href}
              download={project.download}
              className="group flex min-h-11 flex-col gap-1 rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4"
            >
              <span className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                <span className={`${inlineLink} font-medium text-foreground`}>
                  {project.name}
                </span>
                <span className="font-mono text-xs text-foreground/70">
                  {project.stack}
                </span>
              </span>
              <span className="text-sm leading-relaxed text-foreground/80">
                {project.description}
              </span>
            </a>
          ))}
        </div>

        <div className="mt-6 flex flex-wrap items-center gap-x-8 gap-y-2 text-sm">
          <a
            href="https://github.com/BillyAddlers?tab=repositories"
            className={actionLink}
          >
            All repositories
          </a>
        </div>
      </div>
    </section>
  );
}
