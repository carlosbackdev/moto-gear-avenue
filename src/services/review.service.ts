/**
 * Review Service
 * 
 * Maneja las reseñas de productos.
 * 
 * Endpoints del backend utilizados:
 * - GET /products/{productId}/reviews → Obtener reseñas de un producto
 * - POST /reviews → Crear una reseña
 * - GET /users/me/reviews → Obtener reseñas del usuario
 */

import { apiService } from './api.service';
import { Review, CreateReviewRequest } from '@/types/models';

class ReviewService {
  /**
   * Obtiene las reseñas de un producto
   * Backend: GET /products/{productId}/reviews
   */
  async getProductReviews(productId: number): Promise<Review[]> {
    return apiService.get<Review[]>(`/products/${productId}/reviews`);
  }

  /**
   * Crea una nueva reseña
   * Backend: POST /reviews
   */
  async createReview(reviewData: CreateReviewRequest): Promise<Review> {
    return apiService.post<Review>('/reviews', reviewData, true);
  }

  /**
   * Obtiene las reseñas del usuario autenticado
   * Backend: GET /users/me/reviews
   */
  async getUserReviews(): Promise<Review[]> {
    return apiService.get<Review[]>('/users/me/reviews', true);
  }
}

export const reviewService = new ReviewService();
