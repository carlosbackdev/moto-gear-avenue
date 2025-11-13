/**
 * Product Service
 * 
 * Maneja todas las operaciones relacionadas con productos.
 * 
 * Endpoints del backend utilizados:
 * - GET /products → Obtener todos los productos
 * - GET /products/{id} → Obtener un producto por ID
 * - GET /products?category={id} → Filtrar productos por categoría
 */

import { apiService } from './api.service';
import { Product } from '@/types/models';

class ProductService {
  /**
   * Obtiene todos los productos
   * Backend: GET /products
   */
  async getProducts(): Promise<Product[]> {
    return apiService.get<Product[]>('/products');
  }

  /**
   * Obtiene un producto por ID
   * Backend: GET /products/{id}
   */
  async getProductById(id: number): Promise<Product> {
    return apiService.get<Product>(`/products/${id}`);
  }

  /**
   * Obtiene productos filtrados por categoría
   * Backend: GET /products?category={categoryId}
   */
  async getProductsByCategory(categoryId: number): Promise<Product[]> {
    return apiService.get<Product[]>(`/products?category=${categoryId}`);
  }
}

export const productService = new ProductService();
