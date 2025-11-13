/**
 * Wishlist Service
 * 
 * Maneja la lista de deseos del usuario.
 * 
 * Endpoints del backend utilizados:
 * - GET /users/me/wishlist → Obtener wishlist del usuario
 * - POST /users/me/wishlist → Añadir producto a wishlist
 * - DELETE /users/me/wishlist/{productId} → Eliminar de wishlist
 */

import { apiService } from './api.service';
import { WishlistItem } from '@/types/models';

class WishlistService {
  /**
   * Obtiene la wishlist del usuario
   * Backend: GET /users/me/wishlist
   */
  async getWishlist(): Promise<WishlistItem[]> {
    return apiService.get<WishlistItem[]>('/users/me/wishlist', true);
  }

  /**
   * Añade un producto a la wishlist
   * Backend: POST /users/me/wishlist
   */
  async addToWishlist(productId: number): Promise<WishlistItem> {
    return apiService.post<WishlistItem>('/users/me/wishlist', { productId }, true);
  }

  /**
   * Elimina un producto de la wishlist
   * Backend: DELETE /users/me/wishlist/{productId}
   */
  async removeFromWishlist(productId: number): Promise<void> {
    return apiService.delete<void>(`/users/me/wishlist/${productId}`, true);
  }
}

export const wishlistService = new WishlistService();
