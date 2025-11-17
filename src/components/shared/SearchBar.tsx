import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Product } from '@/types/models';
import { productService } from '@/services/product.service';
import { cn } from '@/lib/utils';

export const SearchBar = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Product[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowResults(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    const searchProducts = async () => {
      if (query.trim().length < 2) {
        setResults([]);
        setShowResults(false);
        return;
      }

      setIsSearching(true);
      try {
        const { products } = await productService.searchProducts(query, 0, 5);
        setResults(products);
        setShowResults(true);
      } catch (error) {
        console.error('Error searching products:', error);
        setResults([]);
      } finally {
        setIsSearching(false);
      }
    };

    const debounce = setTimeout(searchProducts, 300);
    return () => clearTimeout(debounce);
  }, [query]);

  const handleProductClick = (productId: number) => {
    navigate(`/product/${productId}`);
    setQuery('');
    setShowResults(false);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim().length >= 2) {
      navigate(`/catalog?search=${encodeURIComponent(query.trim())}`);
      setQuery('');
      setShowResults(false);
    }
  };

  const clearSearch = () => {
    setQuery('');
    setResults([]);
    setShowResults(false);
  };

  return (
    <div ref={searchRef} className="relative w-full max-w-md">
      <form onSubmit={handleSearch} className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          type="text"
          placeholder="Buscar accesorios..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="pl-10 pr-10"
        />
        {query && (
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7"
            onClick={clearSearch}
          >
            <X className="h-4 w-4" />
          </Button>
        )}
      </form>

      {showResults && results.length > 0 && (
        <div className="absolute top-full mt-2 w-full bg-background border border-border rounded-lg shadow-lg z-50 max-h-96 overflow-y-auto">
          {results.map((product) => (
            <div
              key={product.id}
              onClick={() => handleProductClick(product.id)}
              className="flex items-center gap-3 p-3 hover:bg-accent cursor-pointer transition-colors border-b last:border-b-0"
            >
              <img
                src={product.imageUrl}
                alt={product.name}
                className="w-12 h-12 object-cover rounded"
              />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{product.name}</p>
                <p className="text-sm text-primary font-semibold">{product.price?.toFixed(2)}€</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {showResults && query.trim().length >= 2 && results.length === 0 && !isSearching && (
        <div className="absolute top-full mt-2 w-full bg-background border border-border rounded-lg shadow-lg z-50 p-4 text-center text-muted-foreground">
          No se encontraron productos
        </div>
      )}
    </div>
  );
};
