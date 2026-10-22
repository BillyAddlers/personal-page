import type { Metadata } from "next";
import About from "@/components/homepage/about";
import Contact from "@/components/homepage/contact";
import HomeHero from "@/components/homepage/hero";
import Profile from "@/components/homepage/profile";
import SelectedWork from "@/components/homepage/selected-work";
import Toolkit from "@/components/homepage/toolkit";
import { siteDescription, siteName, siteTitle, siteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: siteTitle,
  description: siteDescription,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    url: "/",
    title: siteTitle,
    description: siteDescription,
  },
  twitter: {
    title: siteTitle,
    description: siteDescription,
  },
};

const homeUrl = `${siteUrl}/`;

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "ProfilePage",
      "@id": homeUrl,
      url: homeUrl,
      name: `${siteName}, web developer and designer`,
      description: siteDescription,
      inLanguage: "en",
      mainEntity: { "@id": `${homeUrl}#person` },
    },
    {
      "@type": "Person",
      "@id": `${homeUrl}#person`,
      name: "Riichi Rusdiana",
      alternateName: "Sabily Rusyda",
      url: homeUrl,
      jobTitle: "Web developer and designer",
      image: `${siteUrl}/me.webp`,
      email: "me@riichi.my.id",
      address: {
        "@type": "PostalAddress",
        addressRegion: "East Java",
        addressCountry: "ID",
      },
      worksFor: {
        "@type": "Organization",
        name: "PT Trimitra Aditama Koneksindo",
      },
      alumniOf: {
        "@type": "CollegeOrUniversity",
        name: "Widyagama University",
      },
      knowsAbout: [
        "Web development",
        "Interface design",
        "TypeScript",
        "React",
        "Next.js",
        "Go",
        "Linux",
        "Networking",
      ],
      sameAs: ["https://github.com/BillyAddlers"],
    },
  ],
};

export default function Home() {
  return (
    <div className="flex flex-1 flex-col">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <main>
        <HomeHero />
        <Profile />
        <SelectedWork />
        <Toolkit />
        <About />
        <Contact />
      </main>
    </div>
  );
}
