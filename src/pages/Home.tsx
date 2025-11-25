import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Shield, Truck, HeadphonesIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ProductCard } from '@/components/shared/ProductCard';
import { Product, Category } from '@/types/models';
import { productService } from '@/services/product.service';
import { categoryService } from '@/services/category.service';
import { imageService } from '@/services/image.service';
import { mockProducts, mockCategories } from '@/lib/mockData';
import heroImage from '@/assets/hero-moto.jpg';
import heroBlackFriday from '@/assets/hero-blackfriday.jpg';
import heroBlackFridaySale from '@/assets/hero-blackfriday-sale.jpg';
import heroSafety from '@/assets/hero-safety.jpg';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import Autoplay from 'embla-carousel-autoplay';

const heroSlides = [
  {
    image: heroBlackFridaySale,
    title: 'Black Friday\nDescuentos en Toda la Web',
    description: 'Aprovecha los mejores descuentos del año en todo nuestro catálogo de accesorios para moto',
  },
  {
    image: heroImage,
    title: 'Equipamiento de\nAlta Velocidad',
    description: 'Accesorios premium para motoristas que buscan rendimiento, seguridad y estilo',
  },
  {
    image: heroBlackFriday,
    title: 'Descuentos en\nAccesorios Moto',
    description: 'Ofertas especiales en cascos, guantes y equipamiento de protección premium',
  },
  {
    image: heroSafety,
    title: 'Seguridad y\nProtección Total',
    description: 'Equipamiento certificado para tu máxima protección en cada viaje',
  },
];

export default function Home() {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [products, cats] = await Promise.all([
          productService.getProducts(),
          categoryService.getCategories(),
        ]);
        
        setFeaturedProducts(products.slice(0, 8));
        setCategories(cats);
      } catch (error) {
        console.error('Error fetching data:', error);
        // Fallback a datos mock si falla
        setFeaturedProducts(mockProducts.slice(0, 8));
        setCategories(mockCategories);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Carousel Section */}
      <section className="relative h-[600px]">
        <Carousel
          opts={{
            align: 'start',
            loop: true,
          }}
          plugins={[
            Autoplay({
              delay: 5000,
            }),
          ]}
          className="w-full h-full"
        >
          <CarouselContent className="h-[600px]">
            {heroSlides.map((slide, index) => (
              <CarouselItem key={index} className="h-[600px]">
                <div className="relative h-full flex items-center justify-center overflow-hidden">
                  <img 
                    src={slide.image} 
                    alt={`Hero ${index + 1}`} 
                    className="absolute inset-0 w-full h-full object-cover" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/40" />
                  <div className="relative z-10 container mx-auto px-4 text-center text-white">
                    <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-fade-in whitespace-pre-line">
                      {slide.title}
                    </h1>
                    <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto">
                      {slide.description}
                    </p>
                    <Link to="/catalog">
                      <Button size="lg" variant="secondary" className="gap-2 text-lg px-8 py-6">
                        Ver Accesorios
                        <ArrowRight className="h-5 w-5" />
                      </Button>
                    </Link>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="left-4" />
          <CarouselNext className="right-4" />
        </Carousel>
      </section>

      {/* Featured Products */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-12">
            <h2 className="text-3xl md:text-4xl font-bold">
              Ofertas Destacadas <span className="text-primary">Black Friday</span>
            </h2>
            <Link to="/catalog">
              <Button variant="outline" className="gap-2">
                Ver Todos
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {loading ? (
              Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="h-80 bg-muted animate-pulse rounded-lg" />
              ))
            ) : (
              featuredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))
            )}
          </div>
        </div>
      </section>
      
      {/* Categories Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Categorías Destacadas
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {loading ? (
              Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="h-40 bg-muted animate-pulse rounded-lg" />
              ))
            ) : categories.length === 0 ? (
              <div className="col-span-full text-center text-muted-foreground py-8">
                No hay categorías disponibles
              </div>
            ) : (
              categories.map((category) => (
                <Link
                  key={category.id}
                  to={`/catalog?category=${category.id}`}
                  className="group relative h-40 rounded-lg overflow-hidden border border-border bg-gradient-to-br from-primary/10 to-primary/5 hover:shadow-hover transition-all duration-300"
                >
                  <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 p-4">
                    {category.logo && (
                      <img
                        src={imageService.getFullImageUrl(category.logo)}
                        alt={category.name}
                        className="h-16 w-16 object-contain transition-transform duration-300 group-hover:scale-110"
                      />
                    )}
                    <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors text-center">
                      {category.name}
                    </h3>
                  </div>
                </Link>
              ))
            )}
          </div>
        </div>
      </section>


      {/* Features */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <Truck className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Envío Rápido</h3>
              <p className="text-muted-foreground">Recibe tu pedido en 2-7 días</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <Shield className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Devolución Gratis</h3>
              <p className="text-muted-foreground">Devoluciones sin coste en todos los productos</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <HeadphonesIcon className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Soporte 24/7</h3>
              <p className="text-muted-foreground">Atención personalizada siempre disponible</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
