import type { Metadata } from "next";
import Link from "next/link";
import { getPosts } from "@/lib/posts";

export const metadata: Metadata = {
  title: "Blog",
  description: "Notes and write-ups by Riichi Rusdiana.",
  alternates: {
    canonical: "/blog",
  },
};

export default function BlogIndex() {
  const posts = getPosts();

  return (
    <>
      <h1>Blog</h1>
      <p>
        Notes and write-ups on the things I build: web frontends, Go services,
        Linux desktops, and home networking.
      </p>

      <h2>Posts</h2>
      {posts.length === 0 ? (
        <p>Nothing published yet.</p>
      ) : (
        <ul>
          {posts.map((post) => (
            <li key={post.slug}>
              <Link href={`/blog/${post.slug}`}>{post.title}</Link>
              {post.publishedAt ? (
                <time
                  dateTime={post.publishedAt}
                  className="ml-2 text-sm text-foreground/70"
                >
                  {post.publishedAt}
                </time>
              ) : null}
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
