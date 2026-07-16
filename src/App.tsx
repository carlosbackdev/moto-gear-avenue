import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { Navbar } from '@/components/shared/Navbar';
import { Footer } from '@/components/shared/Footer';
import { ScrollToTop } from '@/components/ScrollToTop';
import Home from '@/pages/Home';
import Contact from '@/pages/Contact';
import Terms from '@/pages/legal/Terms';
import NotFound from '@/pages/NotFound';

const pausedStoreRoutes = [
  '/catalog',
  '/product/:id/:slug?',
  '/cart',
  '/checkout',
  '/wishlist',
  '/login',
  '/register',
  '/account',
  '/orders',
  '/order/:orderId',
  '/track/:orderId',
  '/success',
  '/shipping',
  '/returns',
  '/payment-info',
  '/blog',
  '/blog/:slug',
];

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
