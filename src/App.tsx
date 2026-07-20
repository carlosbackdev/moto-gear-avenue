import { lazy, Suspense } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Navbar } from '@/components/shared/Navbar';
import { Footer } from '@/components/shared/Footer';
import { ScrollToTop } from '@/components/ScrollToTop';
import { ProtectedRoute } from '@/components/ProtectedRoute';
import { AuthProvider } from '@/contexts/AuthContext';
import { CartProvider } from '@/contexts/CartContext';
import { WishlistProvider } from '@/contexts/WishlistContext';
import { TooltipProvider } from '@/components/ui/tooltip';
import { Toaster } from '@/components/ui/toaster';
import { Toaster as Sonner } from '@/components/ui/sonner';
import Home from '@/pages/Home';
import Contact from '@/pages/Contact';
import Terms from '@/pages/legal/Terms';
import NotFound from '@/pages/NotFound';

const ProductDetail = lazy(() => import('@/pages/ProductDetail'));
const Catalog = lazy(() => import('@/pages/Catalog'));
const Cart = lazy(() => import('@/pages/Cart'));
const Checkout = lazy(() => import('@/pages/Checkout'));
const Login = lazy(() => import('@/pages/Login'));
const Register = lazy(() => import('@/pages/Register'));
const Account = lazy(() => import('@/pages/Account'));
const Orders = lazy(() => import('@/pages/Orders'));
const Order = lazy(() => import('@/pages/Order'));
const Track = lazy(() => import('@/pages/Track'));
const Success = lazy(() => import('@/pages/Success'));
const Wishlist = lazy(() => import('@/pages/Wishlist'));
const ShippingPolicy = lazy(() => import('@/pages/legal/ShippingPolicy'));
const Returns = lazy(() => import('@/pages/legal/Returns'));
const PaymentInfo = lazy(() => import('@/pages/legal/PaymentInfo'));
const BlogList = lazy(() => import('@/pages/blog/BlogList'));
const BlogPost = lazy(() => import('@/pages/blog/BlogPost'));

const queryClient = new QueryClient();
const googleClientId = import.meta.env.VITE_GOOGLE_CLIENT_ID || '';

const loadingFallback = (
  <div className="flex min-h-[50vh] items-center justify-center bg-background">
    <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
  </div>
);

const App = () => (
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <GoogleOAuthProvider clientId={googleClientId}>
        <TooltipProvider>
          <AuthProvider>
            <CartProvider>
              <WishlistProvider>
                <BrowserRouter>
                  <ScrollToTop />
                  <div className="flex min-h-screen flex-col">
                    <Navbar />
                    <main className="flex-1">
                      <Suspense fallback={loadingFallback}>
                        <Routes>
                          <Route path="/" element={<Home />} />
                          <Route path="/contact" element={<Contact />} />
                          <Route path="/terms" element={<Terms />} />
                          <Route path="/shipping" element={<ShippingPolicy />} />
                          <Route path="/returns" element={<Returns />} />
                          <Route path="/payment-info" element={<PaymentInfo />} />
                          <Route path="/catalog" element={<Catalog />} />
                          <Route path="/blog" element={<BlogList />} />
                          <Route path="/blog/:slug" element={<BlogPost />} />

              <Route path="/product/:id/:slug?" element={<ProductDetail />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
                          <Route path="/cart" element={<Cart />} />
              <Route path="/checkout" element={<ProtectedRoute><Checkout /></ProtectedRoute>} />
              <Route path="/wishlist" element={<ProtectedRoute><Wishlist /></ProtectedRoute>} />
              <Route path="/account" element={<ProtectedRoute><Account /></ProtectedRoute>} />
              <Route path="/orders" element={<ProtectedRoute><Orders /></ProtectedRoute>} />
              <Route path="/order/:orderId" element={<ProtectedRoute><Order /></ProtectedRoute>} />
              <Route path="/track/:orderId" element={<ProtectedRoute><Track /></ProtectedRoute>} />
              <Route path="/success" element={<ProtectedRoute><Success /></ProtectedRoute>} />
                          <Route path="*" element={<NotFound />} />
                        </Routes>
                      </Suspense>
                    </main>
                    <Footer />
                  </div>
                  <Toaster />
                  <Sonner />
                </BrowserRouter>
              </WishlistProvider>
            </CartProvider>
          </AuthProvider>
        </TooltipProvider>
      </GoogleOAuthProvider>
    </QueryClientProvider>
  </HelmetProvider>
);

export default App;
