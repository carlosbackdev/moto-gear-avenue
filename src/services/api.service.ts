/**
 * API Service Base
 * 
 * Servicio base para todas las llamadas HTTP al backend Spring Boot.
 * Centraliza la configuración de headers, autenticación y manejo de errores.
 * 
 * Endpoints del backend:
 * - Todas las URLs se construyen a partir de environment.apiBaseUrl
 */

import { environment } from '@/config/environment';

class ApiService {
  private baseUrl: string;

  constructor() {
    this.baseUrl = environment.apiBaseUrl;
  }

  /**
   * Obtiene el token JWT del localStorage
   */
  private getAuthToken(): string | null {
    return localStorage.getItem('authToken');
  }

  /**
   * Construye los headers para las peticiones
   * Incluye el token JWT si está disponible
   */
  private getHeaders(authenticated: boolean = false): HeadersInit {
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
    };

    if (authenticated) {
      const token = this.getAuthToken();
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }
    }

    return headers;
  }

  /**
   * GET request
   * @param endpoint - Endpoint relativo (ej: '/products')
   * @param authenticated - Si requiere autenticación
   */
  async get<T>(endpoint: string, authenticated: boolean = false): Promise<T> {
    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      method: 'GET',
      headers: this.getHeaders(authenticated),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
  }

  /**
   * POST request
   * @param endpoint - Endpoint relativo
   * @param data - Datos a enviar
   * @param authenticated - Si requiere autenticación
   */
  async post<T>(endpoint: string, data: any, authenticated: boolean = false): Promise<T> {
    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      method: 'POST',
      headers: this.getHeaders(authenticated),
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
  }

  /**
   * PUT request
   * @param endpoint - Endpoint relativo
   * @param data - Datos a actualizar
   * @param authenticated - Si requiere autenticación
   */
  async put<T>(endpoint: string, data: any, authenticated: boolean = false): Promise<T> {
    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      method: 'PUT',
      headers: this.getHeaders(authenticated),
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
  }

  /**
   * DELETE request
   * @param endpoint - Endpoint relativo
   * @param authenticated - Si requiere autenticación
   */
  async delete<T>(endpoint: string, authenticated: boolean = false): Promise<T> {
    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      method: 'DELETE',
      headers: this.getHeaders(authenticated),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
  }
}

export const apiService = new ApiService();
