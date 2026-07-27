/**
 * Lead - Interés registrado por un visitante en un producto todavía no disponible.
 * Refleja el DTO `LeadRequest` / entidad `Lead` del backend (módulo shop.lead).
 */

export type LeadSource = 'EARLY_ACCESS' | 'COMPATIBILITY';

export interface LeadRequest {
  name: string;
  email: string;
  motorcycleModel: string;
  motorcycleYear?: string;
  message?: string;
  source: LeadSource;
  productSlug?: string;
}

export interface Lead extends LeadRequest {
  id: number;
  createdAt: string;
  updatedAt: string;
}
