/**
 * Image Service
 * 
 * Maneja todas las operaciones relacionadas con imágenes de productos.
 * 
 * Endpoints del backend utilizados:
 * - POST /products-images/get-image/{productId} → Obtener todas las imágenes de un producto
 * - POST /products-images/get-image/home/{productId} → Obtener solo la imagen primaria
 */

import { apiService } from './api.service';

export interface ImageProduct {
  id: number;
  imageUrl: string;
  isPrimary: boolean;
}

class ImageService {
  /**
   * Obtiene todas las imágenes de un producto
   * Backend: POST /products-images/get-image/{productId}
   */
  async getProductImages(productId: number): Promise<ImageProduct[]> {
    try {
      const images = await apiService.post<ImageProduct[]>(`/products-images/get-image/${productId}`, {});
      return images;
    } catch (error) {
      console.error(`Error fetching images for product ${productId}:`, error);
      return [];
    }
  }

  /**
   * Obtiene solo la imagen primaria de un producto
   * Backend: POST /products-images/get-image/home/{productId}
   */
  async getProductPrimaryImage(productId: number): Promise<ImageProduct | null> {
    try {
      const image = await apiService.post<ImageProduct>(`/products-images/get-image/home/${productId}`, {});
      return image;
    } catch (error) {
      console.error(`Error fetching primary image for product ${productId}:`, error);
      return null;
    }
  }

  /**
   * Construye la URL completa de una imagen
   */
  getFullImageUrl(imageUrl: string): string {
    if (!imageUrl) return '/placeholder.svg';
    // Si la URL ya es completa (http/https), devolverla tal cual
    if (imageUrl.startsWith('http://') || imageUrl.startsWith('https://')) {
      return imageUrl;
    }
    // Si es una ruta relativa del backend, construir la URL completa usando el basePath
    const baseUrl = import.meta.env.VITE_IMAGE_BASE_URL || 'http://localhost:8080';
    return `${baseUrl}${imageUrl}`;
  }
}

export const imageService = new ImageService();
