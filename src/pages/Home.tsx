import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Shield, Truck, HeadphonesIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ProductCard } from '@/components/shared/ProductCard';
import { Product, Category } from '@/types/models';
import { productService } from '@/services/product.service';
import { categoryService } from '@/services/category.service';
import { mockProducts, mockCategories } from '@/lib/mockData';
import heroImage from '@/assets/hero-moto.jpg';

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
      {/* Hero Section */}
      <section className="relative h-[600px] flex items-center justify-center overflow-hidden">
        <img src={heroImage} alt="Motorista en carretera" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/40" />
        <div className="relative z-10 container mx-auto px-4 text-center text-white">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-fade-in">
            Equipamiento de<br />Alta Velocidad
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto">
            Accesorios premium para motoristas que buscan rendimiento, seguridad y estilo
          </p>
          <Link to="/catalog">
            <Button size="lg" variant="secondary" className="gap-2 text-lg px-8 py-6">
              Ver Accesorios
              <ArrowRight className="h-5 w-5" />
            </Button>
          </Link>
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
                  <div className="absolute inset-0 flex items-center justify-center">
                    <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                      {category.name}
                    </h3>
                  </div>
                </Link>
              ))
            )}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-12">
            <h2 className="text-3xl md:text-4xl font-bold">Productos Destacados</h2>
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

      {/* Features */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <Truck className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Envío Rápido</h3>
              <p className="text-muted-foreground">Recibe tu pedido en 24-48h</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <Shield className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Garantía Total</h3>
              <p className="text-muted-foreground">2 años de garantía en todos los productos</p>
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
