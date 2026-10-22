import { createHash } from "node:crypto";
import { readFile, readdir, stat, mkdir, rm, writeFile } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const SOURCE_DIR = "assets/blog";
const OUTPUT_DIR = "public/blog";
const MANIFEST_PATH = ".cache/image-manifest.json";
const MAX_WIDTH = 1920;
const QUALITY = 80;

type ManifestEntry = {
  hash: string;
  size: number;
  mtimeMs: number;
};

type Manifest = {
  settings: { maxWidth: number; quality: number };
  entries: Record<string, ManifestEntry>;
};

const force = process.argv.includes("--force");

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

async function hashFile(file: string): Promise<string> {
  return createHash("sha256").update(await readFile(file)).digest("hex");
}

async function readManifest(): Promise<Manifest | null> {
  try {
    const data = JSON.parse(await readFile(MANIFEST_PATH, "utf8"));
    if (!data?.entries || !data?.settings) return null;
    return data as Manifest;
  } catch {
    return null;
  }
}

let sourceFiles: string[] = [];
try {
  sourceFiles = (await walk(SOURCE_DIR)).filter((file) =>
    /\.(png|jpe?g)$/i.test(file),
  );
} catch {
  console.log(`No source directory ${SOURCE_DIR}; skipping image optimization.`);
  process.exit(0);
}

const previous = await readManifest();
const settingsMatch =
  previous?.settings.maxWidth === MAX_WIDTH &&
  previous?.settings.quality === QUALITY;
const manifest: Manifest = {
  settings: { maxWidth: MAX_WIDTH, quality: QUALITY },
  entries: {},
};

const expectedOutputs = new Set<string>();

for (const source of sourceFiles) {
  const relative = path.relative(SOURCE_DIR, source);
  const outputPath = path.join(
    OUTPUT_DIR,
    relative.replace(/\.(png|jpe?g)$/i, ".webp"),
  );
  expectedOutputs.add(path.resolve(outputPath));

  await mkdir(path.dirname(outputPath), { recursive: true });

  const hash = await hashFile(source);
  const sourceStat = await stat(source);
  const previousEntry = previous?.entries[relative];

  let outputExists = true;
  try {
    await stat(outputPath);
  } catch {
    outputExists = false;
  }

  const changed =
    force ||
    !outputExists ||
    !settingsMatch ||
    !previousEntry ||
    previousEntry.hash !== hash;

  if (!changed) {
    manifest.entries[relative] = {
      hash,
      size: sourceStat.size,
      mtimeMs: sourceStat.mtimeMs,
    };
    console.log(`skip  ${outputPath}`);
    continue;
  }

  await sharp(source)
    .resize({ width: MAX_WIDTH, withoutEnlargement: true })
    .webp({ quality: QUALITY })
    .toFile(outputPath);

  manifest.entries[relative] = {
    hash,
    size: sourceStat.size,
    mtimeMs: sourceStat.mtimeMs,
  };
  console.log(`built ${source} -> ${outputPath}`);
}

let outputFiles: string[] = [];
try {
  outputFiles = await walk(OUTPUT_DIR);
} catch {
  outputFiles = [];
}
for (const output of outputFiles) {
  if (!output.endsWith(".webp")) continue;
  if (expectedOutputs.has(path.resolve(output))) continue;
  await rm(output);
  console.log(`clean ${output}`);
}

async function pruneEmptyDirs(dir: string): Promise<boolean> {
  const entries = await readdir(dir, { withFileTypes: true });
  let empty = true;
  for (const entry of entries) {
    if (entry.isDirectory()) {
      const childEmpty = await pruneEmptyDirs(path.join(dir, entry.name));
      if (!childEmpty) empty = false;
    } else {
      empty = false;
    }
  }
  if (empty && path.resolve(dir) !== path.resolve(OUTPUT_DIR)) {
    await rm(dir, { recursive: true, force: true });
  }
  return empty;
}

try {
  await pruneEmptyDirs(OUTPUT_DIR);
} catch {
  // Output directory does not exist yet.
}

await mkdir(path.dirname(MANIFEST_PATH), { recursive: true });
await writeFile(MANIFEST_PATH, `${JSON.stringify(manifest, null, 2)}\n`);
