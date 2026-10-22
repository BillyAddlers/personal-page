import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { getPostSlugs, getPosts } from "@/lib/posts";

export const dynamicParams = false;

export function generateStaticParams() {
  return getPostSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata(
  props: PageProps<"/blog/[slug]">,
): Promise<Metadata> {
  const { slug } = await props.params;
  const post = getPosts().find((entry) => entry.slug === slug);
  if (!post) notFound();

  return {
    title: post.title,
    description: post.description,
    alternates: {
      canonical: `/blog/${post.slug}`,
    },
    openGraph: {
      type: "article",
      url: `/blog/${post.slug}`,
      title: post.title,
      description: post.description,
    },
    twitter: {
      title: post.title,
      description: post.description,
    },
  };
}

async function PostContent({ slug }: { slug: string }) {
  const { default: Post } = await import(`@/content/blog/${slug}.mdx`);
  return <Post />;
}

export default async function BlogPost(props: PageProps<"/blog/[slug]">) {
  const { slug } = await props.params;

  if (!getPosts().some((entry) => entry.slug === slug)) notFound();

  return (
    <Suspense fallback={<p>Loading post…</p>}>
      <PostContent slug={slug} />
    </Suspense>
  );
}
