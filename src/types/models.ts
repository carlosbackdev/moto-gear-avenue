/**
 * Product Variant Option - Opciones dentro de un grupo de variantes
 */
export interface ProductVariantOption {
  value: string;
  extraPrice: number;
  image?: string | null;
}

/**
 * Product Variant Group - Grupo de variantes (ej: Color, Talla)
 */
export interface ProductVariantGroup {
  groupName: string;
  options: ProductVariantOption[];
}

/**
 * Product interface - Representa un accesorio de moto desde el backend
 */
export interface Product {
  id: number;
  name: string;
  details: string;
  specifications: string; // JSON string
  originalPrice: number;
  sellPrice: number;
  discount: number;
  currency: string;
  shippingCost: number;
  deliveryEstimateDays: string;
  deliveryMinDate: string; // ISO date string
  deliveryMaxDate: string; // ISO date string
  variant: string; // JSON string de ProductVariantGroup[]
  sellerName: string;
  category: number;
  keywords?: string;
  images: string[];
  // Campos calculados para compatibilidad con frontend
  price?: number; // = sellPrice
  imageUrl?: string; // = images[0] o placeholder
  stock?: number; // Por defecto 100
  brand?: string; // = sellerName
  description?: string; // = details
  categoryId?: number; // = category
  averageRating?: number;
  reviewCount?: number;
}

/**
 * Category interface - Categorías de accesorios (Cascos, Guantes, etc.)
 */
export interface Category {
  id: number;
  name: string; // Casco, Guantes, Escape, Maletas, etc.
  logo: string;
}

/**
 * BackendCartItem - Item del carrito desde el backend
 */
export interface BackendCartItem {
  id: number;
  productId: number;
  userId: number;
  quantity: number;
  variant?: string;
  createdAt: string;
}

/**
 * AddToCartRequest - Payload para agregar al carrito
 */
export interface AddToCartRequest {
  productId: number;
  quantity: number;
  variant?: string;
}

/**
 * CartItem interface - Item en el carrito con producto y cantidad (para UI)
 */
export interface CartItem {
  id?: number; // ID del item en el backend
  product: Product;
  quantity: number;
  variant?: string;
}

/**
 * OrderStatus - Estados de una orden
 */
export type OrderStatus = 'PENDING' | 'PAID' | 'PROCESSING' | 'SHIPPED' | 'DELIVERED' | 'CANCELLED';

/**
 * Order interface - Pedido realizado
 */
export interface Order {
  id: number;
  userId: number;
  checkoutId: number;
  cartShadedIds: number[];
  status: OrderStatus;
  total: number;
  notes?: string;
  createdAt: string;
  updatedAt: string;
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
  fullName?: string;
  role?: string;
  photoUrl?: string | null;
  authProvider?: string;
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
  fullName: string;
}

/**
 * FirebaseLoginRequest - Payload para login con Google/Firebase
 */
export interface FirebaseLoginRequest {
  email: string;
  fullName: string;
  firebaseToken: string;
  firebaseUid?: string;
  photoUrl?: string | null;
}

/**
 * AuthResponse - Respuesta del backend al hacer login
 */
export interface AuthResponse {
  token: string;
  user: User;
  userId?: number;
  email?: string;
  fullName?: string;
  role?: string;
  photoUrl?: string | null;
}

/**
 * CreateOrderRequest - Payload para crear pedido
 */
export interface CreateOrderRequest {
  checkoutId: number;
  cartShadedItemIds: number[];
  total: number;
  notes?: string;
}

/**
 * UpdateOrderStatusRequest - Payload para actualizar estado de orden
 */
export interface UpdateOrderStatusRequest {
  status: OrderStatus;
  notes?: string;
}

/**
 * Review - Reseña de producto
 */
export interface Review {
  id: number;
  userId: number;
  productId: number;
  content: string;
  rating: number; // 1-5 estrellas
  userFullName?: string;
}

/**
 * CreateReviewRequest - Payload para crear reseña
 */
export interface CreateReviewRequest {
  productId: number;
  content: string;
  rating: number;
}

/**
 * WishlistItem - Item en la lista de deseos
 */
export interface WishlistItem {
  id: number;
  userId: number;
  product: Product;
  addedAt: string;
}

/**
 * TimelineEvent - Evento en la línea temporal de seguimiento
 */
export interface TimelineEvent {
  date: string;
  title: string;
  location: string | null;
  isActive: boolean;
}

/**
 * Tracking - Información de seguimiento de pedido
 */
export interface Tracking {
  id: number;
  trackingNumber: string;
  orderId: number;
  status: string;
  statusDescription: string;
  origin: string;
  destination: string;
  weight: string | null;
  daysOnRoute: number;
  sourceUrl: string;
  couriers: string; // JSON string array
  timeline: string; // JSON string array de TimelineEvent
  createdAt: string;
  updatedAt: string;
}

/**
 * Change Password Request
 */
export interface ChangePasswordRequest {
  email: string;
  newPassword: string;
}

/**
 * Change Password Response
 */
export interface ChangePasswordResponse {
  message: string;
}
