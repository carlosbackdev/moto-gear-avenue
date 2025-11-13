/**
 * Auth Service
 * 
 * Maneja la autenticación de usuarios (login, registro, logout).
 * Gestiona el token JWT en localStorage.
 * 
 * Endpoints del backend utilizados:
 * - POST /auth/register → Registrar nuevo usuario
 * - POST /auth/login → Iniciar sesión (devuelve token JWT)
 * - GET /users/me → Obtener datos del usuario autenticado
 */

import { apiService } from './api.service';
import { LoginRequest, RegisterRequest, AuthResponse, User } from '@/types/models';

class AuthService {
  private readonly TOKEN_KEY = 'authToken';

  /**
   * Registra un nuevo usuario
   * Backend: POST /auth/register
   */
  async register(data: RegisterRequest): Promise<AuthResponse> {
    const response = await apiService.post<AuthResponse>('/auth/register', data);
    this.saveToken(response.token);
    return response;
  }

  /**
   * Inicia sesión
   * Backend: POST /auth/login
   */
  async login(data: LoginRequest): Promise<AuthResponse> {
    const response = await apiService.post<AuthResponse>('/auth/login', data);
    this.saveToken(response.token);
    return response;
  }

  /**
   * Cierra sesión (elimina token)
   */
  logout(): void {
    localStorage.removeItem(this.TOKEN_KEY);
  }

  /**
   * Guarda el token JWT en localStorage
   */
  private saveToken(token: string): void {
    localStorage.setItem(this.TOKEN_KEY, token);
  }

  /**
   * Obtiene el token JWT del localStorage
   */
  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  /**
   * Verifica si el usuario está autenticado
   */
  isAuthenticated(): boolean {
    return this.getToken() !== null;
  }

  /**
   * Obtiene los datos del usuario autenticado
   * Backend: GET /users/me
   */
  async getCurrentUser(): Promise<User> {
    return apiService.get<User>('/users/me', true);
  }
}

export const authService = new AuthService();
