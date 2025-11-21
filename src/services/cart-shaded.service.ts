/**
 * Cart Shaded Service
 * 
 * Maneja el carrito sombreado (copia temporal del carrito para órdenes).
 * Se usa para clonar el carrito durante el checkout.
 * 
 * Endpoints del backend utilizados:
 * - POST /cart-shaded → Agregar item al carrito sombreado
 * - GET /cart-shaded → Obtener items del carrito sombreado
 * - DELETE /cart-shaded → Vaciar carrito sombreado
 */

import { apiService } from './api.service';
import { BackendCartItem, AddToCartRequest } from '@/types/models';

class CartShadedService {
  /**
   * Agrega un item al carrito sombreado
   * Backend: POST /cart-shaded
   */
  async addItem(request: AddToCartRequest): Promise<BackendCartItem> {
    return apiService.post<BackendCartItem>('/cart-shaded', request, true);
  }

  /**
   * Obtiene todos los items del carrito sombreado
   * Backend: GET /cart-shaded
   */
  async getItems(): Promise<BackendCartItem[]> {
    return apiService.get<BackendCartItem[]>('/cart-shaded', true);
  }

  /**
   * Vacía el carrito sombreado completo
   * Backend: DELETE /cart-shaded
   */
  async clearCart(): Promise<void> {
    return apiService.delete('/cart-shaded', true);
  }

  /**
   * Clona todos los items del carrito normal al carrito sombreado
   */
  async cloneFromCart(cartItems: BackendCartItem[]): Promise<BackendCartItem[]> {
    const shadedItems: BackendCartItem[] = [];
    
    for (const item of cartItems) {
      const request: AddToCartRequest = {
        productId: item.productId,
        quantity: item.quantity,
        variant: item.variant
      };
      
      const shadedItem = await this.addItem(request);
      shadedItems.push(shadedItem);
    }
    
    return shadedItems;
  }
}

export const cartShadedService = new CartShadedService();
