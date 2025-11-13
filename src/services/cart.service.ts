/**
 * Cart Service
 * 
 * Maneja el carrito de compras del usuario.
 * Mantiene el estado del carrito localmente y sincroniza con el backend.
 * 
 * Endpoints del backend utilizados:
 * - POST /cart → Crear/actualizar carrito
 * - GET /cart/{cartId} → Obtener carrito
 */

import { apiService } from './api.service';
import { CartItem, Product } from '@/types/models';

class CartService {
  /**
   * Sincroniza el carrito con el backend
   * Backend: POST /cart
   */
  async syncCartWithBackend(cartItems: CartItem[]): Promise<void> {
    try {
      await apiService.post('/cart', { items: cartItems }, true);
    } catch (error) {
      console.error('Error syncing cart with backend:', error);
    }
  }

  /**
   * Obtiene el carrito del backend por ID
   * Backend: GET /cart/{cartId}
   */
  async getCartById(cartId: string): Promise<CartItem[]> {
    return apiService.get<CartItem[]>(`/cart/${cartId}`, true);
  }
}

export const cartService = new CartService();
