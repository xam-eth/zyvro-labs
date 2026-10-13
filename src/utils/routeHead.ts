import { GAME_PROJECTS } from './constants';

interface RouteHeadEntry {
  title: string;
  description: string;
  image?: string;
}

const BASE_TITLE = 'ZYVRO LABS';

const routeHeadTable: Record<string, RouteHeadEntry> = {
  '/': {
    title: `${BASE_TITLE} // Game OS & Digital Worlds`,
    description: 'Experimental Game OS, digital worlds, interactive prototypes and technical simulations by Zyvro Labs.',
    image: '/assets/brandkit/zyvro-zv-social-banner-og.jpg',
  },
  '/games': {
    title: `Games // ${BASE_TITLE}`,
    description: 'Explore game projects by Zyvro Labs: survival horror, crowd shooters, organic exploration and strategy management.',
    image: '/assets/brandkit/zyvro-zv-social-banner-og.jpg',
  },
  '/games/lab': {
    title: `Lab // ${BASE_TITLE}`,
    description: 'Interactive experimental prototypes: AI creature simulation, procedural terrain, cipher decryption and gravity physics.',
    image: '/assets/brandkit/zyvro-zv-social-banner-og.jpg',
  },
  '/games/archive': {
    title: `Archive // ${BASE_TITLE}`,
    description: 'Development logs, lore database and technical design documents from the Zyvro Labs game projects.',
    image: '/assets/brandkit/zyvro-zv-social-banner-og.jpg',
  },
  '/about': {
    title: `About // ${BASE_TITLE}`,
    description: 'Zyvro Labs is one founder building games in the open, with every claim traceable to source.',
    image: '/assets/brandkit/zyvro-zv-social-banner-og.jpg',
  },
  '/contact': {
    title: `Contact // ${BASE_TITLE}`,
    description: 'Open a transmission channel to Zyvro Labs for business, collaboration, press or talent inquiries.',
    image: '/assets/brandkit/zyvro-zv-social-banner-og.jpg',
  },
};

/** Get head config for a route, including dynamic /games/:slug */
export function getRouteHead(pathname: string): RouteHeadEntry & { path: string } {
  // Check for dynamic game route
  const gameMatch = pathname.match(/^\/games\/([^/]+)$/);
  if (gameMatch) {
    const slug = gameMatch[1];
    const project = GAME_PROJECTS.find(p => p.slug === slug);
    if (project) {
      return {
        title: `${project.title} // ${BASE_TITLE}`,
        description: project.tagline,
        image: project.images.cover,
        path: pathname,
      };
    }
  }

  const entry = routeHeadTable[pathname] || routeHeadTable['/'];
  return { ...entry, path: pathname };
}