import { navigationSections } from './config/navigationSections';

import type { MetadataRoute } from 'next';

const { CANONICAL_HOST } = process.env;
const origin = CANONICAL_HOST ? `https://${CANONICAL_HOST}` : `http://localhost:3000`;

export default function sitemap(): MetadataRoute.Sitemap {
  const currentDate = new Date();

  const sharedOptions = {
    lastModified: currentDate,
    changeFrequency: 'monthly',
  } satisfies Omit<MetadataRoute.Sitemap[number], 'url'>;

  const navigationSectionsSitemap: MetadataRoute.Sitemap = navigationSections.map((section) => ({
    url: `${origin}/#${section}`,
    ...sharedOptions,
  }));

  return [{ url: origin, ...sharedOptions }, ...navigationSectionsSitemap];
}
