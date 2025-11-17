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
import { imageService } from './image.service';

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
   * Ahora procesa el array de images que viene directamente del backend
   */
  private normalizeProduct(product: Product): Product {
    // Procesar las imágenes del backend
    const processedImages = product.images && product.images.length > 0
      ? product.images.map(img => imageService.getFullImageUrl(img))
      : ['/placeholder.svg'];

    return {
      ...product,
      price: product.sellPrice,
      imageUrl: processedImages[0], // Primera imagen como imagen principal
      images: processedImages, // Todas las imágenes procesadas
      stock: 100, // Por defecto, el backend no devuelve stock
      brand: product.sellerName,
      description: product.details,
      categoryId: product.category,
    };
  }

  /**
   * Obtiene todos los productos paginados
   * Backend: GET /products/page?page={page}&size={size}
   * Las imágenes vienen directamente en el array del producto
   */
  async getProducts(page: number = 0, size: number = 20): Promise<Product[]> {
    const response = await apiService.get<PageResponse<Product>>(`/products/page?page=${page}&size=${size}`);
    return response.content.map(p => this.normalizeProduct(p));
  }

  /**
   * Obtiene un producto por ID con todas sus imágenes
   * Backend: GET /products/{id}
   * Las imágenes ya vienen en el producto, solo necesitamos normalizarlas
   */
  async getProductById(id: number): Promise<Product> {
    const product = await apiService.get<Product>(`/products/${id}`);
    return this.normalizeProduct(product);
  }

  /**
   * Obtiene productos filtrados por categoría
   * Backend: GET /products/category/{categoryId}?page={page}&size={size}
   * Las imágenes vienen directamente en el producto
   */
  async getProductsByCategory(categoryId: number, page: number = 0, size: number = 20): Promise<Product[]> {
    const products = await apiService.get<Product[]>(`/products/category/${categoryId}?page=${page}&size=${size}`);
    return products.map(p => this.normalizeProduct(p));
  }

  /**
   * Busca productos por keywords
   * Backend: GET /products/search?keywords={keywords}&page={page}&size={size}
   */
  async searchProducts(keywords: string, page: number = 0, size: number = 20): Promise<{ products: Product[], totalPages: number }> {
    const response = await apiService.get<PageResponse<Product>>(`/products/search?keywords=${encodeURIComponent(keywords)}&page=${page}&size=${size}`);
    return {
      products: response.content.map(p => this.normalizeProduct(p)),
      totalPages: response.totalPages
    };
  }
}

export const productService = new ProductService();
