/**
 * Checkout Service
 * 
 * Maneja los datos de checkout del usuario.
 * 
 * Endpoints del backend utilizados:
 * - POST /checkout → Crear un nuevo checkout
 * - GET /checkout/{id} → Obtener un checkout específico
 * - GET /checkout → Listar checkouts del usuario autenticado
 * - PUT /checkout/{id} → Actualizar un checkout existente
 * - DELETE /checkout/{id} → Eliminar un checkout
 */

import { apiService } from './api.service';

export interface Checkout {
  id: number;
  userId: number;
  customerName: string;
  customerEmail: string;
  address: string;
  city: string;
  country: string;
  postalCode: string;
  phoneNumber: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateCheckoutRequest {
  customerName: string;
  customerEmail: string;
  address: string;
  city: string;
  country: string;
  postalCode: string;
  phoneNumber: string;
}

class CheckoutService {
  /**
   * Crea un nuevo checkout
   * Backend: POST /checkout
   */
  async createCheckout(checkoutData: CreateCheckoutRequest): Promise<Checkout> {
    return apiService.post<Checkout>('/checkout', checkoutData, true);
  }

  /**
   * Obtiene un checkout por ID
   * Backend: GET /checkout/{id}
   */
  async getCheckoutById(checkoutId: number): Promise<Checkout> {
    return apiService.get<Checkout>(`/checkout/${checkoutId}`, true);
  }

  /**
   * Obtiene todos los checkouts del usuario autenticado
   * Backend: GET /checkout
   */
  async getUserCheckouts(): Promise<Checkout[]> {
    return apiService.get<Checkout[]>('/checkout', true);
  }

  /**
   * Actualiza un checkout existente
   * Backend: PUT /checkout/{id}
   */
  async updateCheckout(checkoutId: number, checkoutData: CreateCheckoutRequest): Promise<Checkout> {
    return apiService.put<Checkout>(`/checkout/${checkoutId}`, checkoutData, true);
  }

  /**
   * Elimina un checkout
   * Backend: DELETE /checkout/{id}
   */
  async deleteCheckout(checkoutId: number): Promise<void> {
    return apiService.delete(`/checkout/${checkoutId}`, true);
  }
}

export const checkoutService = new CheckoutService();
