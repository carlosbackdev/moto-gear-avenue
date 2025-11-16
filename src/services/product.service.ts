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

/**
 * Respuesta paginada del backend
 */
interface PageResponse<T> {
  content: T[];
  pageable: {
    pageNumber: number;
    pageSize: number;
    offset: number;
  };
  totalElements: number;
  totalPages: number;
  last: boolean;
  first: boolean;
  empty: boolean;
}

class ProductService {
  /**
   * Normaliza un producto del backend para usar en el frontend
   */
  private normalizeProduct(product: Product): Product {
    return {
      ...product,
      price: product.sellPrice,
      imageUrl: product.images && product.images.length > 0 ? product.images[0] : '/placeholder.svg',
      stock: 100, // Por defecto, el backend no devuelve stock
      brand: product.sellerName,
      description: product.details,
      categoryId: product.category,
    };
  }

  /**
   * Obtiene todos los productos paginados
   * Backend: GET /products/page?page={page}&size={size}
   */
  async getProducts(page: number = 0, size: number = 20): Promise<Product[]> {
    const response = await apiService.get<PageResponse<Product>>(`/products/page?page=${page}&size=${size}`);
    return response.content.map(p => this.normalizeProduct(p));
  }

  /**
   * Obtiene un producto por ID
   * Backend: GET /products/{id}
   */
  async getProductById(id: number): Promise<Product> {
    const product = await apiService.get<Product>(`/products/${id}`);
    return this.normalizeProduct(product);
  }

  /**
   * Obtiene productos filtrados por categoría
   * Backend: GET /products/category/{categoryId}?page={page}
   */
  async getProductsByCategory(categoryId: number, page: number = 0): Promise<Product[]> {
    const products = await apiService.get<Product[]>(`/products/category/${categoryId}?page=${page}`);
    return products.map(p => this.normalizeProduct(p));
  }
}

export const productService = new ProductService();
