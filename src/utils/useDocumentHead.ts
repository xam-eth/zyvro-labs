import { useEffect } from 'react';

interface HeadConfig {
  title: string;
  description: string;
  path: string;
  image?: string;
}

const SITE_URL = 'https://zyvrolabs.com';
const DEFAULT_IMAGE = '/assets/brandkit/zyvro-zv-social-banner-og.jpg';

export function useDocumentHead({ title, description, path, image }: HeadConfig): void {
  useEffect(() => {
    const fullUrl = `${SITE_URL}${path}`;
    const fullImage = image?.startsWith('http') ? image : `${SITE_URL}${image || DEFAULT_IMAGE}`;

    // Title
    document.title = title.length > 60 ? title.slice(0, 57) + '...' : title;

    // Helper to set or create meta tags
    const setMeta = (attr: string, key: string, content: string) => {
      let el = document.querySelector(`meta[${attr}="${key}"]`) as HTMLMetaElement | null;
      if (!el) {
        el = document.createElement('meta');
        el.setAttribute(attr, key);
        document.head.appendChild(el);
      }
      el.setAttribute('content', content);
    };

    // Helper to set link tags
    const setLink = (rel: string, href: string) => {
      let el = document.querySelector(`link[rel="${rel}"]`) as HTMLLinkElement | null;
      if (!el) {
        el = document.createElement('link');
        el.setAttribute('rel', rel);
        document.head.appendChild(el);
      }
      el.setAttribute('href', href);
    };

    // Description
    setMeta('name', 'description', description.slice(0, 155));

    // Canonical
    setLink('canonical', fullUrl);

    // Open Graph
    setMeta('property', 'og:title', title);
    setMeta('property', 'og:description', description.slice(0, 155));
    setMeta('property', 'og:url', fullUrl);
    setMeta('property', 'og:image', fullImage);
    setMeta('property', 'og:type', 'website');

    // Twitter
    setMeta('name', 'twitter:card', 'summary_large_image');
    setMeta('name', 'twitter:title', title);
    setMeta('name', 'twitter:description', description.slice(0, 155));
    setMeta('name', 'twitter:image', fullImage);
  }, [title, description, path, image]);
}