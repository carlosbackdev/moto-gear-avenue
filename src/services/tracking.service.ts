/**
 * Tracking Service
 * 
 * Maneja el seguimiento de pedidos.
 * 
 * Endpoints del backend utilizados:
 * - POST /api/track/track-udpate/{orderId} → Actualizar tracking (máximo 2 veces al día)
 * - GET /api/track/track-order/{orderId} → Obtener tracking por order ID
 */

import { apiService } from './api.service';
import { Tracking } from '@/types/models';

class TrackingService {
  /**
   * Actualiza el tracking de un pedido (máximo 2 veces al día)
   * Backend: POST /api/track/track-udpate/{orderId}
   */
  async updateTracking(orderId: number): Promise<Tracking> {
    return apiService.post<Tracking>(`/track/track-udpate/${orderId}`, {}, true);
  }

  /**
   * Obtiene el tracking de un pedido
   * Backend: GET /api/track/track-order/{orderId}
   */
  async getTrackingByOrderId(orderId: number): Promise<Tracking> {
    return apiService.get<Tracking>(`/track/track-order/${orderId}`, true);
  }

  /**
   * Obtiene y actualiza el tracking de forma secuencial
   * Primero actualiza, luego obtiene los datos actualizados
   */
  async getAndUpdateTracking(orderId: number): Promise<Tracking> {
    await this.updateTracking(orderId);
    return this.getTrackingByOrderId(orderId);
  }
}

export const trackingService = new TrackingService();
