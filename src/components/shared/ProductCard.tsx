import { Link } from 'react-router-dom';
import { ShoppingCart } from 'lucide-react';
import { Product } from '@/types/models';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { useCart } from '@/contexts/CartContext';
import { toast } from 'sonner';

interface ProductCardProps {
  product: Product;
}

export const ProductCard = ({ product }: ProductCardProps) => {
  const { addItem } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addItem(product, 1);
    toast.success('Producto añadido al carrito');
  };

  return (
    <Link to={`/product/${product.id}`}>
      <Card className="group overflow-hidden border-border hover:shadow-hover transition-all duration-300">
        <CardContent className="p-0">
          <div className="aspect-square overflow-hidden bg-muted">
            <img
              src={product.imageUrl}
              alt={product.name}
              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </div>
        </CardContent>
        <CardFooter className="flex flex-col items-start p-4 space-y-2">
          <div className="w-full">
            <p className="text-xs text-muted-foreground font-medium uppercase">{product.brand}</p>
            <h3 className="font-semibold text-sm line-clamp-2 group-hover:text-primary transition-colors">
              {product.name}
            </h3>
          </div>
          <div className="flex items-center justify-between w-full">
            <span className="text-xl font-bold text-primary">{product.price.toFixed(2)}€</span>
            <Button
              size="sm"
              onClick={handleAddToCart}
              className="gap-2"
            >
              <ShoppingCart className="h-4 w-4" />
              Añadir
            </Button>
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
};
