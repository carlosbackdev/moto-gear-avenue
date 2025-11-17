import React, { createContext, useContext, useState, useEffect } from 'react';
import { CartItem, Product, BackendCartItem } from '@/types/models';
import { cartService } from '@/services/cart.service';
import { productService } from '@/services/product.service';
import { useAuth } from './AuthContext';
import { toast } from 'sonner';

interface CartContextType {
  cart: CartItem[];
  addItem: (product: Product, quantity: number, variant?: string) => Promise<void>;
  removeItem: (productId: number, variant?: string) => Promise<void>;
  updateQuantity: (productId: number, quantity: number, variant?: string) => Promise<void>;
  clearCart: () => Promise<void>;
  loadCart: () => Promise<void>;
  totalItems: number;
  totalAmount: number;
  totalSavings: number;
  loading: boolean;
  isInCart: (productId: number) => boolean;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(false);
  const { isAuthenticated, user } = useAuth();

  // Cargar carrito cuando el usuario se autentica
  useEffect(() => {
    if (isAuthenticated && user) {
      loadCart();
    } else {
      setCart([]);
    }
  }, [isAuthenticated, user]);

  const loadCart = async () => {
    if (!isAuthenticated) return;
    
    try {
      setLoading(true);
      const backendCart = await cartService.getCart();
      
      // Convertir BackendCartItem[] a CartItem[] obteniendo los productos
      const cartWithProducts = await Promise.all(
        backendCart.map(async (item) => {
          try {
            const product = await productService.getProductById(item.productId);
            return {
              id: item.id,
              product,
              quantity: item.quantity,
              variant: item.variant,
            } as CartItem;
          } catch (error) {
            console.error(`Error loading product ${item.productId}:`, error);
            return null;
          }
        })
      );

      setCart(cartWithProducts.filter((item): item is CartItem => item !== null));
    } catch (error) {
      console.error('Error loading cart:', error);
      toast.error('Error al cargar el carrito');
    } finally {
      setLoading(false);
    }
  };

  const addItem = async (product: Product, quantity: number, variant?: string) => {
    if (!isAuthenticated) {
      toast.error('Debes iniciar sesión para agregar productos al carrito');
      return;
    }

    try {
      const backendItem = await cartService.addToCart({
        productId: product.id,
        quantity,
        variant,
      });

      setCart((prevCart) => {
        const existingItem = prevCart.find((item) => item.product.id === product.id && item.variant === variant);
        
        if (existingItem) {
          return prevCart.map((item) =>
            item.product.id === product.id && item.variant === variant
              ? { ...item, id: backendItem.id, quantity: backendItem.quantity }
              : item
          );
        }
        
        return [...prevCart, { id: backendItem.id, product, quantity: backendItem.quantity, variant: backendItem.variant }];
      });
      
      toast.success('Producto agregado al carrito');
    } catch (error) {
      console.error('Error adding to cart:', error);
      toast.error('Error al agregar producto al carrito');
    }
  };

  const removeItem = async (productId: number, variant?: string) => {
    if (!isAuthenticated) return;

    const item = cart.find((item) => item.product.id === productId && item.variant === variant);
    if (!item?.id) return;

    try {
      // Optimistically update UI first
      setCart((prevCart) => prevCart.filter((cartItem) => cartItem.id !== item.id));
      
      // Then call backend
      await cartService.removeItem(item.id);
      
      toast.success('Producto eliminado del carrito');
    } catch (error) {
      console.error('Error removing from cart:', error);
      // Revert on error by reloading
      await loadCart();
      toast.error('Error al eliminar producto del carrito');
    }
  };

  const updateQuantity = async (productId: number, quantity: number, variant?: string) => {
    if (!isAuthenticated) return;

    if (quantity <= 0) {
      await removeItem(productId, variant);
      return;
    }

    const item = cart.find((item) => item.product.id === productId && item.variant === variant);
    if (!item?.id) return;

    try {
      // Optimistically update UI
      setCart((prevCart) =>
        prevCart.map((cartItem) =>
          cartItem.id === item.id ? { ...cartItem, quantity } : cartItem
        )
      );
      
      // Then call backend
      await cartService.updateQuantity(item.id, quantity);
    } catch (error) {
      console.error('Error updating quantity:', error);
      // Revert on error
      await loadCart();
      toast.error('Error al actualizar cantidad');
    }
  };

  const clearCart = async () => {
    if (!isAuthenticated) return;

    try {
      await cartService.clearCart();
      setCart([]);
      toast.success('Carrito vaciado');
    } catch (error) {
      console.error('Error clearing cart:', error);
      toast.error('Error al vaciar el carrito');
    }
  };

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalAmount = cart.reduce((sum, item) => sum + (item.product.sellPrice || item.product.price || 0) * item.quantity, 0);
  const totalSavings = cart.reduce((sum, item) => {
    const original = item.product.originalPrice || item.product.price || 0;
    const sell = item.product.sellPrice || item.product.price || 0;
    return sum + (original - sell) * item.quantity;
  }, 0);

  const isInCart = (productId: number) => {
    return cart.some((item) => item.product.id === productId);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        loadCart,
        totalItems,
        totalAmount,
        totalSavings,
        loading,
        isInCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within CartProvider');
  }
  return context;
};
