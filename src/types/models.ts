/**
 * Product interface - Representa un accesorio de moto
 */
export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  stock: number;
  categoryId: number;
  brand: string;
  bikeModelCompatibility?: string; // ej. "Yamaha MT-07, Kawasaki Z900"
}

/**
 * Category interface - Categorías de accesorios (Cascos, Guantes, etc.)
 */
export interface Category {
  id: number;
  name: string; // Casco, Guantes, Escape, Maletas, etc.
  slug: string;
}

/**
 * CartItem interface - Item en el carrito con producto y cantidad
 */
export interface CartItem {
  product: Product;
  quantity: number;
}

/**
 * Order interface - Pedido realizado
 */
export interface Order {
  id: number;
  items: CartItem[];
  totalAmount: number;
  createdAt: string;
  status: 'CREATED' | 'PAID' | 'SHIPPED' | 'CANCELLED';
  shippingAddress?: ShippingAddress;
}

/**
 * ShippingAddress interface - Dirección de envío
 */
export interface ShippingAddress {
  fullName: string;
  address: string;
  city: string;
  postalCode: string;
  country: string;
  phone: string;
}

/**
 * User interface - Usuario autenticado
 */
export interface User {
  id: number;
  email: string;
  name: string;
  createdAt: string;
}

/**
 * LoginRequest - Payload para login
 */
export interface LoginRequest {
  email: string;
  password: string;
}

/**
 * RegisterRequest - Payload para registro
 */
export interface RegisterRequest {
  email: string;
  password: string;
  name: string;
}

/**
 * AuthResponse - Respuesta del backend al hacer login
 */
export interface AuthResponse {
  token: string;
  user: User;
}

/**
 * CreateOrderRequest - Payload para crear pedido
 */
export interface CreateOrderRequest {
  items: { productId: number; quantity: number }[];
  shippingAddress: ShippingAddress;
}
