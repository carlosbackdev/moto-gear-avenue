import { lazy, Suspense } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { Navbar } from '@/components/shared/Navbar';
import { Footer } from '@/components/shared/Footer';
import { ScrollToTop } from '@/components/ScrollToTop';
import { ProtectedRoute } from '@/components/ProtectedRoute';
import Home from '@/pages/Home';
import Contact from '@/pages/Contact';
import Terms from '@/pages/legal/Terms';
import NotFound from '@/pages/NotFound';

const CommerceProviders = lazy(() => import('@/components/commerce/CommerceProviders'));
const ProductDetail = lazy(() => import('@/pages/ProductDetail'));
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

const pausedStoreRoutes = [
  '/catalog',
  '/shipping',
  '/returns',
  '/payment-info',
  '/blog',
  '/blog/:slug',
];

const loadingFallback = (
  <div className="flex min-h-[50vh] items-center justify-center bg-background">
    <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
  </div>
);

const App = () => (
  <HelmetProvider>
    <BrowserRouter>
      <ScrollToTop />
      <div className="flex min-h-screen flex-col">
        <Navbar />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/terms" element={<Terms />} />

            <Route element={<Suspense fallback={loadingFallback}><CommerceProviders /></Suspense>}>
              <Route path="/product/:id/:slug?" element={<ProductDetail />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/cart" element={<ProtectedRoute><Cart /></ProtectedRoute>} />
              <Route path="/checkout" element={<ProtectedRoute><Checkout /></ProtectedRoute>} />
              <Route path="/wishlist" element={<ProtectedRoute><Wishlist /></ProtectedRoute>} />
              <Route path="/account" element={<ProtectedRoute><Account /></ProtectedRoute>} />
              <Route path="/orders" element={<ProtectedRoute><Orders /></ProtectedRoute>} />
              <Route path="/order/:orderId" element={<ProtectedRoute><Order /></ProtectedRoute>} />
              <Route path="/track/:orderId" element={<ProtectedRoute><Track /></ProtectedRoute>} />
              <Route path="/success" element={<ProtectedRoute><Success /></ProtectedRoute>} />
            </Route>

            {pausedStoreRoutes.map((path) => (
              <Route key={path} path={path} element={<Navigate to="/" replace />} />
            ))}

            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  </HelmetProvider>
);

export default App;
