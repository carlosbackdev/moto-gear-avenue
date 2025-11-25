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
   * Backend: GET /api/review/list/{productId}
   */
  async getProductReviews(productId: number): Promise<Review[]> {
    return apiService.get<Review[]>(`/review/list/${productId}`);
  }

  /**
   * Verifica si el usuario puede dejar una reseña para un producto
   * Backend: GET /api/review/can/{productId}
   */
  async canReview(productId: number): Promise<boolean> {
    return apiService.get<boolean>(`/review/can/${productId}`, true);
  }

  /**
   * Crea una nueva reseña
   * Backend: POST /api/review/create
   */
  async createReview(reviewData: CreateReviewRequest): Promise<Review> {
    return apiService.post<Review>('/review/create', reviewData, true);
  }
}

export const reviewService = new ReviewService();
