import { Outlet } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider } from '@/contexts/AuthContext';
import { CartProvider } from '@/contexts/CartContext';
import { WishlistProvider } from '@/contexts/WishlistContext';
import { TooltipProvider } from '@/components/ui/tooltip';
import { Toaster } from '@/components/ui/toaster';
import { Toaster as Sonner } from '@/components/ui/sonner';

const queryClient = new QueryClient();
const googleClientId = import.meta.env.VITE_GOOGLE_CLIENT_ID || '';

export default function CommerceProviders() {
  return (
    <QueryClientProvider client={queryClient}>
      <GoogleOAuthProvider clientId={googleClientId}>
        <TooltipProvider>
          <AuthProvider>
            <CartProvider>
              <WishlistProvider>
                <Toaster />
                <Sonner />
                <Outlet />
              </WishlistProvider>
            </CartProvider>
          </AuthProvider>
        </TooltipProvider>
      </GoogleOAuthProvider>
    </QueryClientProvider>
  );
}
