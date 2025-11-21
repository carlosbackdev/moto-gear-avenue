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
import { Order, CreateOrderRequest, UpdateOrderStatusRequest, OrderStatus } from '@/types/models';

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
   * Backend: GET /orders
   */
  async getUserOrders(): Promise<Order[]> {
    return apiService.get<Order[]>('/orders', true);
  }

  /**
   * Obtiene pedidos por estado
   * Backend: GET /orders/status/{status}
   */
  async getOrdersByStatus(status: OrderStatus): Promise<Order[]> {
    return apiService.get<Order[]>(`/orders/status/${status}`, true);
  }

  /**
   * Actualiza el estado de un pedido
   * Backend: PATCH /orders/{orderId}/status
   */
  async updateOrderStatus(orderId: number, data: UpdateOrderStatusRequest): Promise<Order> {
    return apiService.put<Order>(`/orders/${orderId}/status`, data, true);
  }

  /**
   * Cancela un pedido
   * Backend: PATCH /orders/{orderId}/cancel
   */
  async cancelOrder(orderId: number): Promise<Order> {
    return apiService.put<Order>(`/orders/${orderId}/cancel`, {}, true);
  }

  /**
   * Elimina un pedido cancelado
   * Backend: DELETE /orders/{orderId}
   */
  async deleteOrder(orderId: number): Promise<void> {
    return apiService.delete(`/orders/${orderId}`, true);
  }
}

export const orderService = new OrderService();
