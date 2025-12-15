/**
 * Utility functions for SEO
 */

/**
 * Generates a URL-friendly slug from a string
 */
export function generateSlug(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // Remove diacritics
    .replace(/[^a-z0-9\s-]/g, '') // Remove special characters
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-') // Replace multiple hyphens with single hyphen
    .replace(/^-|-$/g, '') // Remove leading/trailing hyphens
    .substring(0, 80); // Limit length
}

/**
 * Generates a product URL with slug
 */
export function getProductUrl(id: number, name: string): string {
  const slug = generateSlug(name);
  return `/product/${id}/${slug}`;
}

/**
 * Truncate text for meta descriptions (max 160 characters)
 */
export function truncateDescription(text: string, maxLength: number = 155): string {
  if (!text || text.length <= maxLength) return text;
  return text.substring(0, maxLength - 3).trim() + '...';
}

/**
 * Default SEO values
 */
export const DEFAULT_SEO = {
  siteName: 'MotoGear',
  siteUrl: 'https://motogear.es',
  defaultTitle: 'MotoGear - Accesorios Premium para Motoristas',
  defaultDescription: 'Tienda online de accesorios y equipamiento premium para motos. Cascos, guantes, chaquetas, maletas y más. Envío en 2-7 días. Devolución gratis.',
  defaultImage: 'https://motogear.es/icon-512.png',
};
