/**
 * Environment configuration
 * Define aquí la URL base de tu backend Spring Boot
 */

export const environment = {
  production: false,
  apiBaseUrl: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api',
};

/**
 * Para producción, puedes usar variables de entorno:
 * 
 * Crea un archivo .env.local con:
 * VITE_API_BASE_URL=https://tu-backend-production.com/api
 * 
 * Y cuando hagas el build, usa:
 * VITE_API_BASE_URL=https://tu-backend-production.com/api npm run build
 */
