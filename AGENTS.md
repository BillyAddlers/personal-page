<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## SOP: Testing and Deployment

### Branches
- `master` — development tracker. All work lands here first.
- `deploy-page` — Cloudflare Pages production branch. Pages auto-builds on push.

### Local development
```bash
bun install
bun run dev          # http://localhost:3000
```
`predev` regenerates blog images from `assets/blog/` into `public/blog/` (gitignored).

### Testing checklist (run before every push)
1. `bun run lint` — must pass with no errors.
2. `bun run build` — must succeed; confirm `out/` is produced and routes render.
3. `bun run assets:test` — verifies generated WebP outputs and prints their paths.
4. Smoke-test the production build:
   ```bash
   bun run start        # or: bunx serve out
   ```
   Verify `/`, `/blog`, `/blog/<slug>`, `/blog/<unknown>` (404), `/sitemap.xml`, `/robots.txt`, `/opengraph-image`.

### Deployment flow
1. Commit work to `master` and push:
   ```bash
   git add -A
   git commit -m "..."
   git push origin master
   ```
2. Sync `deploy-page` to `master` and push (triggers Cloudflare Pages build):
   ```bash
   git checkout deploy-page
   git merge --ff-only master
   git push origin deploy-page
   git checkout master
   ```
3. Cloudflare Pages builds with `bun run build` (prebuild runs image optimization) and serves `out/`.

### Cloudflare Pages settings (dashboard)
- Production branch: `deploy-page`
- Build command: `bun run build`
- Build output directory: `out`
- Custom domain: `riichi.my.id`
- No wrangler / no manual deploy needed.

### Adding a blog post
1. Create `content/blog/<slug>.mdx` with frontmatter (`title`, `description`, `publishedAt`).
2. (Optional) Add source image to `assets/blog/<slug>/`.
3. Run `bun run assets:regen` if new images were added.
4. Run the testing checklist, then deploy.

### Troubleshooting
- Build fails on `output: "export"` with "dynamic not configured": add `export const dynamic = "force-static"` to the route file (see `app/opengraph-image.tsx`, `app/sitemap.ts`, `app/robots.ts`).
- Unknown blog slug returns 200 instead of 404: ensure `export const dynamicParams = false` is set in `app/blog/[slug]/page.tsx` (requires `cacheComponents` off).
- Stale/missing generated images: run `bun run assets:regen` (force rebuild) or delete `.cache/image-manifest.json`.
- `public/blog/` and `.cache/` are gitignored; never commit generated assets.
