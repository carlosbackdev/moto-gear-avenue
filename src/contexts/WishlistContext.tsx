import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { WishlistItem, Product } from '@/types/models';
import { wishlistService } from '@/services/wishlist.service';
import { useAuth } from './AuthContext';
import { toast } from 'sonner';

interface WishlistContextType {
  wishlist: WishlistItem[];
  isInWishlist: (productId: number) => boolean;
  addToWishlist: (product: Product) => void;
  removeFromWishlist: (productId: number) => void;
  loading: boolean;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export const WishlistProvider = ({ children }: { children: ReactNode }) => {
  const [wishlist, setWishlist] = useState<WishlistItem[]>([]);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      loadWishlist();
    } else {
      setWishlist([]);
    }
  }, [user]);

  const loadWishlist = async () => {
    try {
      setLoading(true);
      const data = await wishlistService.getWishlist();
      setWishlist(data);
    } catch (error) {
      console.error('Error loading wishlist:', error);
    } finally {
      setLoading(false);
    }
  };

  const isInWishlist = (productId: number) => {
    return wishlist.some(item => item.product.id === productId);
  };

  const addToWishlist = async (product: Product) => {
    if (!user) {
      toast.error('Inicia sesión para guardar favoritos');
      return;
    }

    try {
      const newItem = await wishlistService.addToWishlist(product.id);
      setWishlist(prev => [...prev, newItem]);
      toast.success('Añadido a favoritos');
    } catch (error) {
      console.error('Error adding to wishlist:', error);
      toast.error('Error al añadir a favoritos');
    }
  };

  const removeFromWishlist = async (productId: number) => {
    try {
      await wishlistService.removeFromWishlist(productId);
      setWishlist(prev => prev.filter(item => item.product.id !== productId));
      toast.success('Eliminado de favoritos');
    } catch (error) {
      console.error('Error removing from wishlist:', error);
      toast.error('Error al eliminar de favoritos');
    }
  };

  return (
    <WishlistContext.Provider value={{ wishlist, isInWishlist, addToWishlist, removeFromWishlist, loading }}>
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (context === undefined) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
};
