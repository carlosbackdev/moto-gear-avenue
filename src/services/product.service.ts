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
   */
  private normalizeProduct(product: Product, primaryImageUrl?: string): Product {
    return {
      ...product,
      price: product.sellPrice,
      imageUrl: primaryImageUrl || '/placeholder.svg',
      stock: 100, // Por defecto, el backend no devuelve stock
      brand: product.sellerName,
      description: product.details,
      categoryId: product.category,
    };
  }

  /**
   * Obtiene la imagen primaria de un producto
   */
  private async fetchPrimaryImage(productId: number): Promise<string> {
    const primaryImage = await imageService.getProductPrimaryImage(productId);
    return primaryImage ? imageService.getFullImageUrl(primaryImage.imageUrl) : '/placeholder.svg';
  }

  /**
   * Obtiene todas las imágenes de un producto
   */
  private async fetchAllImages(productId: number): Promise<string[]> {
    const images = await imageService.getProductImages(productId);
    if (images.length === 0) return ['/placeholder.svg'];
    return images.map(img => imageService.getFullImageUrl(img.imageUrl));
  }

  /**
   * Obtiene todos los productos paginados con sus imágenes primarias
   * Backend: GET /products/page?page={page}&size={size}
   */
  async getProducts(page: number = 0, size: number = 20): Promise<Product[]> {
    const response = await apiService.get<PageResponse<Product>>(`/products/page?page=${page}&size=${size}`);
    
    // Obtener imagen primaria para cada producto
    const productsWithImages = await Promise.all(
      response.content.map(async (product) => {
        const primaryImageUrl = await this.fetchPrimaryImage(product.id);
        return this.normalizeProduct(product, primaryImageUrl);
      })
    );
    
    return productsWithImages;
  }

  /**
   * Obtiene un producto por ID con todas sus imágenes
   * Backend: GET /products/{id}
   */
  async getProductById(id: number): Promise<Product> {
    const product = await apiService.get<Product>(`/products/${id}`);
    
    // Obtener todas las imágenes del producto
    const images = await this.fetchAllImages(product.id);
    const normalizedProduct = this.normalizeProduct(product, images[0]);
    
    // Asignar todas las imágenes al producto
    normalizedProduct.images = images;
    
    return normalizedProduct;
  }

  /**
   * Obtiene productos filtrados por categoría con sus imágenes primarias
   * Backend: GET /products/category/{categoryId}?page={page}&size={size}
   */
  async getProductsByCategory(categoryId: number, page: number = 0, size: number = 20): Promise<Product[]> {
    const products = await apiService.get<Product[]>(`/products/category/${categoryId}?page=${page}&size=${size}`);
    
    // Obtener imagen primaria para cada producto
    const productsWithImages = await Promise.all(
      products.map(async (product) => {
        const primaryImageUrl = await this.fetchPrimaryImage(product.id);
        return this.normalizeProduct(product, primaryImageUrl);
      })
    );
    
    return productsWithImages;
  }
}

export const productService = new ProductService();
