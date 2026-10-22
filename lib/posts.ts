import { readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";


const POSTS_DIR = join(process.cwd(), "content", "blog");

export type PostMeta = {
  slug: string;
  title: string;
  description: string;
  publishedAt: string;
};

// Minimal frontmatter reader: a leading `---` block of `key: "value"` pairs.
// A YAML dependency would be more machinery than the content needs.
function parseFrontmatter(source: string): Record<string, string> {
  const match = /^---\r?\n([\s\S]*?)\r?\n---/.exec(source);
  if (!match) return {};

  const fields: Record<string, string> = {};
  for (const line of match[1].split(/\r?\n/)) {
    const separator = line.indexOf(":");
    if (separator === -1) continue;

    const key = line.slice(0, separator).trim();
    const raw = line.slice(separator + 1).trim();
    fields[key] = raw.replace(/^["']|["']$/g, "");
  }
  return fields;
}

function readPost(fileName: string): PostMeta {
  const slug = fileName.replace(/\.mdx?$/, "");
  const source = readFileSync(join(POSTS_DIR, fileName), "utf8");
  const fields = parseFrontmatter(source);

  return {
    slug,
    title: fields.title ?? slug,
    description: fields.description ?? "",
    publishedAt: fields.publishedAt ?? "",
  };
}

export function getPosts(): PostMeta[] {
  return readdirSync(POSTS_DIR)
    .filter((name) => /\.mdx?$/.test(name))
    .map(readPost)
    .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
}

export function getPostSlugs(): string[] {
  return getPosts().map((post) => post.slug);
}
