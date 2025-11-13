import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { ProductCard } from '@/components/shared/ProductCard';
import { Product, Category } from '@/types/models';
import { productService } from '@/services/product.service';
import { categoryService } from '@/services/category.service';
import { Button } from '@/components/ui/button';
import { mockProducts, mockCategories } from '@/lib/mockData';

export default function Catalog() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<number | null>(
    searchParams.get('category') ? Number(searchParams.get('category')) : null
  );

  useEffect(() => {
    // TODO: Descomentar cuando el backend esté listo
    // const fetchCategories = async () => {
    //   try {
    //     const cats = await categoryService.getCategories();
    //     setCategories(cats);
    //   } catch (error) {
    //     console.error('Error fetching categories:', error);
    //   }
    // };
    
    setCategories(mockCategories);
  }, []);

  useEffect(() => {
    setLoading(true);
    // TODO: Descomentar cuando el backend esté listo
    // const fetchProducts = async () => {
    //   try {
    //     const data = selectedCategory
    //       ? await productService.getProductsByCategory(selectedCategory)
    //       : await productService.getProducts();
    //     setProducts(data);
    //   } catch (error) {
    //     console.error('Error fetching products:', error);
    //   } finally {
    //     setLoading(false);
    //   }
    // };
    
    const filteredProducts = selectedCategory
      ? mockProducts.filter(p => p.categoryId === selectedCategory)
      : mockProducts;
    setProducts(filteredProducts);
    setLoading(false);
  }, [selectedCategory]);

  const handleCategoryChange = (categoryId: number | null) => {
    setSelectedCategory(categoryId);
    if (categoryId) {
      setSearchParams({ category: categoryId.toString() });
    } else {
      setSearchParams({});
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8">Catálogo de Accesorios</h1>

        {/* Category Filter */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-2">
            <Button
              variant={selectedCategory === null ? 'default' : 'outline'}
              onClick={() => handleCategoryChange(null)}
            >
              Todos
            </Button>
            {categories.map((category) => (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? 'default' : 'outline'}
                onClick={() => handleCategoryChange(category.id)}
              >
                {category.name}
              </Button>
            ))}
          </div>
        </div>

        {/* Products Grid */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="h-80 bg-muted animate-pulse rounded-lg" />
            ))}
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-xl text-muted-foreground">
              No se encontraron productos en esta categoría
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
