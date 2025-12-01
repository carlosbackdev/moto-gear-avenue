/**
 * Home Banner Service
 * Maneja la obtención de banners para el carrusel de la página principal
 */

import { apiService } from './api.service';

export interface HomeBanner {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  linkUrl: string;
  linkName: string;
}

class HomeBannerService {
  /**
   * Obtiene todos los banners configurados para la página principal
   */
  async getHomeBanners(): Promise<HomeBanner[]> {
    try {
      return await apiService.get<HomeBanner[]>('/home-banners/get');
    } catch (error) {
      console.error('Error fetching home banners:', error);
      throw error;
    }
  }
}

export const homeBannerService = new HomeBannerService();
