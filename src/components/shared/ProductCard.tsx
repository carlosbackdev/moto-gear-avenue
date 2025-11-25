import { Link } from 'react-router-dom';
import { ShoppingCart } from 'lucide-react';
import { Product, ProductVariantGroup } from '@/types/models';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { useCart } from '@/contexts/CartContext';
import { imageService } from '@/services/image.service';
import { toast } from 'sonner';

interface ProductCardProps {
  product: Product;
}

export const ProductCard = ({ product }: ProductCardProps) => {
  const { addItem } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    
    // Si el producto tiene variantes, seleccionar la primera opción
    let variantString: string | undefined;
    
    try {
      if (product.variant) {
        const variantGroups = JSON.parse(product.variant) as ProductVariantGroup[];
        
        if (variantGroups.length > 0 && variantGroups[0].options && variantGroups[0].options.length > 0) {
          // Guardar solo el valor de la primera opción del primer grupo
          variantString = variantGroups[0].options[0].value;
        }
      }
    } catch (error) {
      console.error('Error parsing variants:', error);
    }
    
    addItem(product, 1, variantString);
    toast.success('Producto añadido al carrito');
  };

  return (
    <Link to={`/product/${product.id}`}>
      <Card className="group relative overflow-hidden border-border hover:shadow-xl hover:border-primary/50 transition-all duration-500 hover:-translate-y-1">
        <CardContent className="p-0">
          <div className="aspect-square overflow-hidden bg-muted relative">
            {product.discount > 0 && (
              <div className="absolute top-2 right-2 z-10 bg-destructive text-destructive-foreground px-3 py-1 rounded-full text-xs font-bold shadow-lg animate-pulse">
                -{product.discount}%
              </div>
            )}
            <img
              src={imageService.getFullImageUrl(product.imageUrl)}
              alt={product.name}
              className="h-full w-full object-cover transition-all duration-500 group-hover:scale-110 group-hover:rotate-1"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>
        </CardContent>
        <CardFooter className="flex flex-col items-start p-4 space-y-3 bg-card">
          <div className="w-full">
            <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">{product.brand}</p>
            <h3 className="font-semibold text-sm line-clamp-2 group-hover:text-primary transition-colors duration-300 mt-1">
              {product.name}
            </h3>
          </div>
          <div className="flex items-center justify-between w-full">
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <span className="text-xl font-bold text-primary group-hover:scale-110 transition-transform duration-300 inline-block">
                  {product.sellPrice.toFixed(2)}€
                </span>
              </div>
              {product.discount > 0 && (
                <span className="text-sm text-muted-foreground line-through opacity-70">
                  {product.originalPrice.toFixed(2)}€
                </span>
              )}
            </div>
            <Button
              size="sm"
              onClick={handleAddToCart}
              className="gap-2 group-hover:shadow-lg group-hover:scale-105 transition-all duration-300"
            >
              <ShoppingCart className="h-4 w-4 group-hover:animate-bounce" />
              Añadir
            </Button>
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
};
