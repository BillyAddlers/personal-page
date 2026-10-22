import Image from "next/image";
import { SectionLabel } from "@/components/homepage/shared";

export default function Profile() {
  return (
    <section id="profile" className="scroll-mt-8 border-b border-foreground/10">
      <div className="mx-auto w-full max-w-6xl px-6 py-16 sm:px-10 sm:py-24">
        <div className="grid gap-6 lg:grid-cols-[160px_1fr]">
          <SectionLabel>Profile</SectionLabel>
          <div className="grid gap-8 md:grid-cols-[220px_1fr] md:items-start md:gap-10">
            <figure className="relative aspect-square w-full max-w-64 overflow-hidden border border-foreground/15 bg-foreground/5">
              <Image
                src="/me.webp"
                alt="Portrait of Riichi Rusdiana"
                width={920}
                height={920}
                sizes="(min-width: 768px) 220px, 256px"
                className="h-full w-full object-cover dark:hidden"
              />
              <Image
                src="/me2.webp"
                alt="Portrait of Riichi Rusdiana"
                width={920}
                height={920}
                sizes="(min-width: 768px) 220px, 256px"
                className="hidden h-full w-full object-cover dark:block"
              />
            </figure>

            <div>
              <h2 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
                Riichi Rusdiana
              </h2>
              <p className="mt-2 font-mono text-sm text-foreground/80">
                Web developer and designer
              </p>
              <p className="mt-6 max-w-2xl text-base leading-relaxed text-foreground/80">
                Currently working as a technical helpdesk at PT Trimitra Aditama
                Koneksindo, and a final-semester IT student at Widyagama
                University. I have a passion for web development and interface
                design, and I enjoy shipping features and building products that
                can make a positive impact on the world.
              </p>
              <p className="mt-4 max-w-2xl text-base leading-relaxed text-foreground/80">
                In my free time, I like to explore new technologies, contribute
                to open-source projects, and improve my skills in web
                development and design. I believe that continuous learning and
                collaboration are key to creating meaningful and impactful work.
              </p>

              <dl className="mt-8 grid gap-5 border-t border-foreground/15 pt-6 sm:grid-cols-3">
                <div>
                  <dt className="font-mono text-xs text-foreground/70">
                    Based in
                  </dt>
                  <dd className="mt-1 text-sm leading-relaxed text-foreground/80">
                    East Java, Indonesia
                  </dd>
                </div>
                <div>
                  <dt className="font-mono text-xs text-foreground/70">
                    Focus
                  </dt>
                  <dd className="mt-1 text-sm leading-relaxed text-foreground/80">
                    Web development and interface design
                  </dd>
                </div>
                <div>
                  <dt className="font-mono text-xs text-foreground/70">
                    Currently
                  </dt>
                  <dd className="mt-1 text-sm leading-relaxed text-foreground/80">
                    Full-time Employee; <br /> Final-semester IT student
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
