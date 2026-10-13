/**
 * Blog content loader.
 * Loads all published articles at build time via Vite glob import.
 * Draft/review articles are visible only in dev mode or with VITE_SHOW_DRAFTS=1.
 */

export interface Article {
  slug: string;
  title: string;
  seoTitle?: string;
  description: string;
  status: 'draft' | 'review' | 'published';
  date: string;
  updated?: string;
  type: 'milestone' | 'devlog' | 'case-study' | 'essay';
  project?: string;
  author: string;
  tags: string[];
  hypothesis?: string;
  heroImage?: { src: string; alt: string; kind: string; caption?: string };
  ogImage?: string;
  tryUrl?: string;
  milestoneRef?: string;
  sources?: { label: string; ref: string }[];
  readingTime: number; // minutes
  body: string; // raw markdown content (rendered at component level)
}

/** Minimal YAML front-matter parser for build-time loading */
function parseFrontMatter(src: string): { data: Record<string, string | string[]>; content: string } {
  const match = src.match(/^---\n([\s\S]*?)\n---/);
  if (!match) return { data: {}, content: src };

  const yaml = match[1];
  const data: Record<string, string | string[]> = {};
  let currentKey: string | null = null;
  let inArray = false;
  let arrayItems: string[] = [];

  for (const line of yaml.split('\n')) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;

    const kvMatch = trimmed.match(/^([\w][\w-]*):\s*(.*)/);
    if (kvMatch && !inArray) {
      const [, key, value] = kvMatch;
      if (value === '' || value === undefined) {
        currentKey = key;
        continue;
      }
      data[key] = value.replace(/^["']|["']$/g, '');
      currentKey = key;
      continue;
    }

    if (trimmed.startsWith('- ')) {
      if (!inArray) {
        inArray = true;
        arrayItems = [];
      }
      arrayItems.push(trimmed.slice(2).replace(/^["']|["']$/g, ''));
      continue;
    }

    if (inArray && !trimmed.startsWith('- ')) {
      if (currentKey) data[currentKey] = arrayItems;
      inArray = false;
      arrayItems = [];
      const kv2 = trimmed.match(/^([\w][\w-]*):\s*(.*)/);
      if (kv2) {
        data[kv2[1]] = kv2[2].replace(/^["']|["']$/g, '');
        currentKey = kv2[1];
      }
    }
  }
  if (inArray && currentKey) data[currentKey] = arrayItems;

  const contentStart = src.indexOf('---', 4);
  const content = contentStart >= 0 ? src.slice(contentStart + 4).trim() : '';
  return { data, content };
}

function wordCount(text: string): number {
  return text.replace(/[#*_`\[\]()]/g, '').split(/\s+/).filter(Boolean).length;
}

function readingTime(wordCnt: number): number {
  return Math.max(1, Math.round(wordCnt / 200));
}

// Vite glob import: imports all index.md files from content/blog/
// The 'raw' import gives us the file content as a string
const articleModules = import.meta.glob('/content/blog/*/index.md', { as: 'raw', eager: true });

function loadArticles(): Article[] {
  const articles: Article[] = [];
  const isDev = import.meta.env.DEV || import.meta.env.VITE_SHOW_DRAFTS === '1';

  for (const [path, raw] of Object.entries(articleModules)) {
    const slugMatch = path.match(/\/content\/blog\/([^/]+)\/index\.md$/);
    if (!slugMatch) continue;

    const slug = slugMatch[1];
    const { data, content } = parseFrontMatter(raw as string);
    const status = (data.status as Article['status']) || 'draft';

    // In production, only published articles are visible
    if (!isDev && status !== 'published') continue;

    const tags = Array.isArray(data.tags) ? data.tags : data.tags ? [data.tags as string] : [];

    articles.push({
      slug: data.slug as string || slug,
      title: (data.title as string) || slug,
      seoTitle: data.seoTitle as string | undefined,
      description: (data.description as string) || '',
      status,
      date: (data.date as string) || '',
      updated: data.updated as string | undefined,
      type: (data.type as Article['type']) || 'devlog',
      project: data.project as string | undefined,
      author: (data.author as string) || 'ZYVRO LABS',
      tags,
      hypothesis: data.hypothesis as string | undefined,
      ogImage: data.ogImage as string | undefined,
      tryUrl: data.tryUrl as string | undefined,
      milestoneRef: data.milestoneRef as string | undefined,
      readingTime: readingTime(wordCount(content)),
      body: content,
    });
  }

  // Sort by date descending
  articles.sort((a, b) => (b.date || '').localeCompare(a.date || ''));
  return articles;
}

export const articles: Article[] = loadArticles();