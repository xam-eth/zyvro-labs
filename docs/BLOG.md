# Blog System Contract

## Folder layout

```
content/blog/
  <slug>/
    index.md          # Article with YAML front-matter
    <images>.jpg      # Images alongside the article
```

The folder name equals the `slug` field in front-matter.

## Front-matter fields

| Field | Required | Type | Max | Notes |
|-------|----------|------|-----|-------|
| `title` | Yes | string | 70 chars | Display title |
| `slug` | No | string | — | Defaults to folder name; must match folder |
| `seoTitle` | No | string | 60 chars | Used in `<title>` if set; falls back to `title` |
| `description` | No | string | 155 chars | Used in meta description |
| `status` | Yes | `draft` \| `review` \| `published` | — | Only `published` appears in production builds |
| `date` | When published | `YYYY-MM-DD` | — | Required when `status: published` |
| `updated` | No | `YYYY-MM-DD` | — | Last update date |
| `type` | No | `milestone` \| `devlog` \| `case-study` \| `essay` | — | Defaults to `devlog` |
| `project` | No | string | — | Game slug this article relates to |
| `author` | No | string | — | Defaults to `ZYVRO LABS` |
| `tags` | No | string[] | 1-5 tags | Lowercase |
| `hypothesis` | For milestone/case-study | string | — | What this article tests or proves |
| `sources` | For milestone/case-study | `{label, ref}[]` | — | External references |
| `heroImage` | No | `{src, alt, kind, caption}` | — | `kind`: key-art, gameplay, code, chart, ui |
| `ogImage` | No | string | — | Custom OG image path |
| `tryUrl` | No | string | — | Link to play/try the feature |
| `milestoneRef` | No | string | — | Reference to a milestone ID |

## Build pipeline

1. `node scripts/validate-blog.mjs` — validates all articles, exits non-zero on error
2. `node scripts/generate-sitemap.mjs` — generates sitemap
3. `tsc && vite build` — type-check and bundle

The validation script runs first in the `build` script: `node scripts/validate-blog.mjs && node scripts/generate-sitemap.mjs && tsc && vite build`.

## Test fixtures

Test fixtures live under `scripts/__fixtures__/` and are validated by `npm run test:blog`. They never ship in `content/blog/`.

## Visibility

- `published`: always visible
- `draft` and `review`: visible only when `import.meta.env.DEV` is true or `VITE_SHOW_DRAFTS=1` (preview deployments)

A production build with zero articles succeeds and exposes an empty list.