import { apiService } from './api.service';
import { Order } from '@/types/models';

class PaymentService {
  /**
   * Crea una sesión de Stripe Checkout con los productos de la orden
   * Backend: POST /api/payments/create-checkout-session
   */
  async createCheckoutSession(order: Order): Promise<{ url: string }> {
    return apiService.post<{ url: string }>(
      '/payments/create-checkout-session',
      order,
      true
    );
  }
}

export const paymentService = new PaymentService();
