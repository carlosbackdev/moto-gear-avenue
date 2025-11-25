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
   * Obtiene el tracking por número de seguimiento
   * Backend: GET /api/track/{trackId}
   */
  async getTrackingByTrackingId(trackId: string): Promise<Tracking> {
    const encodedTrackId = encodeURIComponent(trackId);
    return apiService.get<Tracking>(`/track/track-number/${encodedTrackId}`, true);
  }

  /**
   * Obtiene el tracking de un pedido
   * Backend: GET /api/track/track-order/{orderId}
   */
  async getTrackingByOrderId(orderId: number): Promise<Tracking> {
    return apiService.get<Tracking>(`/track/track-order/${orderId}`, true);
  }

}

export const trackingService = new TrackingService();
