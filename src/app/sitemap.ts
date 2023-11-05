import { headers } from 'next/headers';
import { navigationSections } from './config/navigationSections';

import type { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const headersList = headers();
  const host = headersList.get('host') ?? 'localhost:3000';
  const proto = headersList.get('x-forwarded-proto') ?? 'https';
  const origin = `${proto}://${host}`;

  const currentDate = new Date();

  const navigationSectionsSitemap: MetadataRoute.Sitemap = navigationSections.map((section) => ({
    url: `${origin}/#${section}`,
    lastModified: currentDate,
    changeFrequency: 'monthly',
  }));

  return [
    { url: origin, lastModified: currentDate, changeFrequency: 'monthly' },
    ...navigationSectionsSitemap,
  ];
}
