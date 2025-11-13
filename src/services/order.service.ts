/**
 * Order Service
 * 
 * Maneja los pedidos del usuario.
 * 
 * Endpoints del backend utilizados:
 * - POST /orders → Crear un nuevo pedido
 * - GET /orders/{orderId} → Obtener detalle de un pedido
 * - GET /users/me/orders → Obtener pedidos del usuario autenticado
 */

import { apiService } from './api.service';
import { Order, CreateOrderRequest } from '@/types/models';

class OrderService {
  /**
   * Crea un nuevo pedido
   * Backend: POST /orders
   */
  async createOrder(orderData: CreateOrderRequest): Promise<Order> {
    return apiService.post<Order>('/orders', orderData, true);
  }

  /**
   * Obtiene un pedido por ID
   * Backend: GET /orders/{orderId}
   */
  async getOrderById(orderId: number): Promise<Order> {
    return apiService.get<Order>(`/orders/${orderId}`, true);
  }

  /**
   * Obtiene todos los pedidos del usuario autenticado
   * Backend: GET /users/me/orders
   */
  async getUserOrders(): Promise<Order[]> {
    return apiService.get<Order[]>('/users/me/orders', true);
  }
}

export const orderService = new OrderService();
