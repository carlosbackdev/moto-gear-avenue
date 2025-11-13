/**
 * Category Service
 * 
 * Maneja las operaciones relacionadas con categorías de productos.
 * 
 * Endpoints del backend utilizados:
 * - GET /categories → Obtener todas las categorías
 */

import { apiService } from './api.service';
import { Category } from '@/types/models';

class CategoryService {
  /**
   * Obtiene todas las categorías
   * Backend: GET /categories
   */
  async getCategories(): Promise<Category[]> {
    return apiService.get<Category[]>('/categories');
  }
}

export const categoryService = new CategoryService();
