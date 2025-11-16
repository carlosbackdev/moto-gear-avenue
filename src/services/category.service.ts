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
   * Backend: GET /categories/get/all
   */
  async getCategories(): Promise<Category[]> {
    return apiService.get<Category[]>('/categories/get/all');
  }

  /**
   * Obtiene una categoría por ID
   * Backend: GET /categories/get/{id}
   */
  async getCategoryById(id: number): Promise<Category> {
    return apiService.get<Category>(`/categories/get/${id}`);
  }
}

export const categoryService = new CategoryService();
