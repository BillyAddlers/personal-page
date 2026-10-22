import { SectionLabel } from "@/components/homepage/shared";

export default function About() {
  return (
    <section className="border-b border-foreground/10">
      <div className="mx-auto grid w-full max-w-6xl gap-6 px-6 py-16 sm:px-10 sm:py-24 lg:grid-cols-[160px_1fr]">
        <SectionLabel>About</SectionLabel>
        <div className="max-w-2xl">
          <h2 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            Little about me
          </h2>
          <p className="mt-6 text-base leading-relaxed text-foreground/80">
            As a someone who is struggle with basic communication skills, I have
            always been fascinated by the power of technology to connect people
            and ideas. This curiosity led me to pursue a career in software
            development, where I can leverage my skills to create innovative
            solutions that make a difference in people&apos;s lives.
          </p>
          <p className="mt-4 text-base leading-relaxed text-foreground/80">
            Now I&apos;m working on an in-house project for an Internet Service
            Provider company, changing the world of networking and connectivity.
            I&apos;m excited to continue learning and growing as a developer,
            and to contribute to the ever-evolving landscape of technology.
          </p>
        </div>
      </div>
    </section>
  );
}
