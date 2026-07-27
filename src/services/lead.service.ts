/**
 * Lead Service
 *
 * Registra el interés de un visitante en un producto que todavía no se puede
 * comprar (fase COMING_SOON). Sustituye al antiguo flujo "mailto:" del
 * formulario de contacto, que no dejaba ningún dato estructurado.
 *
 * Endpoint del backend:
 * - POST /leads → Registrar (o actualizar) un lead
 */

import { apiService } from './api.service';
import { Lead, LeadRequest } from '@/types/lead';

class LeadService {
  async createLead(request: LeadRequest): Promise<Lead> {
    return apiService.post<Lead>('/leads', request);
  }
}

export const leadService = new LeadService();
