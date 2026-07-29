/**
 * Utility functions for SEO
 */

export function generateSlug(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
    .substring(0, 80);
}

export function getProductUrl(id: number, name: string): string {
  const slug = generateSlug(name);
  return `/product/${id}/${slug}`;
}

export function truncateDescription(text: string, maxLength: number = 155): string {
  if (!text || text.length <= maxLength) return text;
  return text.substring(0, maxLength - 3).trim() + '...';
}

export const DEFAULT_SEO = {
  siteName: 'MotoGear',
  siteUrl: 'https://motogear.es',
  defaultTitle: 'Ordenador de a bordo Kawasaki con pantalla | MotoGear',
  defaultDescription:
    'Ordenador de a bordo MotoGear con pantalla integrada para Kawasaki ER-6n, ER-6f y Z750: marcha, telemetría, batería, temperaturas, avisos DTC y app complementaria.',
  defaultImage: 'https://motogear.es/onboard-computer-prototype.png',
};
