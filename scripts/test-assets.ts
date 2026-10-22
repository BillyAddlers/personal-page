import { readdir, stat } from "node:fs/promises";
import path from "node:path";
import { execFileSync } from "node:child_process";

// Regenerate first so outputs are fresh.
execFileSync(
  process.execPath,
  ["scripts/optimize-images.ts", ...process.argv.slice(2)],
  { stdio: "inherit" },
);

const SOURCE_DIR = "assets/blog";
const OUTPUT_DIR = "public/blog";

async function walk(dir: string): Promise<string[]> {
  const entries = await readdir(dir, { withFileTypes: true });
  const files: string[] = [];
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) files.push(...(await walk(full)));
    else files.push(full);
  }
  return files;
}

const sources = (await walk(SOURCE_DIR)).filter((file) =>
  /\.(png|jpe?g)$/i.test(file),
);

let ok = true;
for (const source of sources) {
  const relative = path.relative(SOURCE_DIR, source);
  const output = path.join(
    OUTPUT_DIR,
    relative.replace(/\.(png|jpe?g)$/i, ".webp"),
  );
  try {
    const st = await stat(output);
    console.log(`OK   ${path.resolve(output)} (${st.size} bytes)`);
  } catch {
    ok = false;
    console.error(`MISSING ${path.resolve(output)}`);
  }
}

if (!ok) process.exit(1);
console.log(`\n${sources.length} asset(s) verified.`);
