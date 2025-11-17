/**
 * Cart Service
 * 
 * Maneja el carrito de compras del usuario.
 * Sincroniza con el backend usando JWT authentication.
 * 
 * Endpoints del backend utilizados:
 * - POST /cart → Agregar producto al carrito
 * - GET /cart → Obtener carrito del usuario autenticado
 * - PUT /cart/{cartItemId}?quantity={quantity} → Actualizar cantidad
 * - DELETE /cart/{cartItemId} → Eliminar item
 * - DELETE /cart/product/{productId} → Eliminar por producto
 * - DELETE /cart → Vaciar carrito
 */

import { apiService } from './api.service';
import { BackendCartItem, AddToCartRequest } from '@/types/models';

class CartService {
  /**
   * Agrega un producto al carrito
   * Backend: POST /cart
   */
  async addToCart(request: AddToCartRequest): Promise<BackendCartItem> {
    return apiService.post<BackendCartItem>('/cart', request, true);
  }

  /**
   * Obtiene el carrito del usuario autenticado
   * Backend: GET /cart
   */
  async getCart(): Promise<BackendCartItem[]> {
    return apiService.get<BackendCartItem[]>('/cart', true);
  }

  /**
   * Actualiza la cantidad de un item
   * Backend: PUT /cart/{cartItemId}?quantity={quantity}
   */
  async updateQuantity(cartItemId: number, quantity: number): Promise<BackendCartItem> {
    return apiService.put<BackendCartItem>(`/cart/${cartItemId}?quantity=${quantity}`, {}, true);
  }

  /**
   * Elimina un item del carrito por su ID
   * Backend: DELETE /cart/{cartItemId}
   */
  async removeItem(cartItemId: number): Promise<void> {
    return apiService.delete(`/cart/${cartItemId}`, true);
  }

  /**
   * Elimina un producto del carrito
   * Backend: DELETE /cart/product/{productId}
   */
  async removeByProduct(productId: number): Promise<void> {
    return apiService.delete(`/cart/product/${productId}`, true);
  }

  /**
   * Vacía el carrito completo
   * Backend: DELETE /cart
   */
  async clearCart(): Promise<void> {
    return apiService.delete('/cart', true);
  }
}

export const cartService = new CartService();
