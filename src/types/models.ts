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

/**
 * Review - Reseña de producto
 */
export interface Review {
  id: number;
  productId: number;
  userId: number;
  userName: string;
  rating: number; // 1-5 estrellas
  comment: string;
  images?: string[];
  createdAt: string;
}

/**
 * CreateReviewRequest - Payload para crear reseña
 */
export interface CreateReviewRequest {
  productId: number;
  rating: number;
  comment: string;
  images?: string[];
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
