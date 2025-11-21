/**
 * Payment Service
 * 
 * Handles payment operations with Stripe.
 */

import { apiService } from './api.service';

export interface CreateCheckoutSessionRequest {
  orderId: number;
  successUrl: string;
  cancelUrl: string;
}

export interface CheckoutSessionResponse {
  url: string;
  sessionId: string;
}

class PaymentService {
  /**
   * Create a Stripe Checkout Session
   * Backend: POST /api/payments/create-checkout-session
   */
  async createCheckoutSession(data: CreateCheckoutSessionRequest): Promise<CheckoutSessionResponse> {
    return apiService.post<CheckoutSessionResponse>('/payments/create-checkout-session', data, true);
  }
}

export const paymentService = new PaymentService();
