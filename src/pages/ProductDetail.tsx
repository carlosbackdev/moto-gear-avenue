import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, ShoppingCart, Minus, Plus, Heart, Package, Truck, Shield } from 'lucide-react';
import { Product } from '@/types/models';
import { productService } from '@/services/product.service';
import { useCart } from '@/contexts/CartContext';
import { useWishlist } from '@/contexts/WishlistContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ProductGallery } from '@/components/product/ProductGallery';
import { ProductReviews } from '@/components/product/ProductReviews';
import { toast } from 'sonner';
import { mockProducts } from '@/lib/mockData';

export default function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addItem } = useCart();
  const { isInWishlist, addToWishlist, removeFromWishlist } = useWishlist();
  const [product, setProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    
    // TODO: Descomentar cuando el backend esté listo
    // const fetchProduct = async () => {
    //   try {
    //     const data = await productService.getProductById(Number(id));
    //     setProduct(data);
    //   } catch (error) {
    //     console.error('Error fetching product:', error);
    //     toast.error('Error al cargar el producto');
    //   } finally {
    //     setLoading(false);
    //   }
    // };
    
    const foundProduct = mockProducts.find(p => p.id === Number(id));
    setProduct(foundProduct || null);
    setLoading(false);
  }, [id]);

  const handleAddToCart = () => {
    if (!product) return;
    addItem(product, quantity);
    toast.success(`${quantity} ${quantity === 1 ? 'producto añadido' : 'productos añadidos'} al carrito`);
  };

  const handleToggleWishlist = () => {
    if (!product) return;
    
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  const productImages = product?.images || [product?.imageUrl || ''];

  const incrementQuantity = () => {
    if (product && quantity < product.stock) {
      setQuantity(quantity + 1);
    }
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <p className="text-xl text-muted-foreground mb-4">Producto no encontrado</p>
        <Button onClick={() => navigate('/catalog')}>Volver al catálogo</Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <Button
          variant="ghost"
          onClick={() => navigate(-1)}
          className="mb-6 gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Volver
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
          {/* Product Gallery */}
          <div>
            <ProductGallery images={productImages} productName={product.name} />
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <p className="text-sm text-muted-foreground font-medium uppercase mb-2">
                {product.brand}
              </p>
              <h1 className="text-4xl font-bold mb-4">{product.name}</h1>
              <p className="text-5xl font-bold text-primary mb-4">
                {product.price.toFixed(2)}€
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-2">Descripción</h2>
              <p className="text-muted-foreground leading-relaxed">
                {product.description}
              </p>
            </div>

            {product.specifications && (
              <div>
                <h2 className="text-xl font-semibold mb-2">Especificaciones</h2>
                <div className="text-muted-foreground">
                  {(() => {
                    try {
                      const specs = JSON.parse(product.specifications);
                      return (
                        <ul className="space-y-1">
                          {Object.entries(specs).map(([key, value]) => (
                            <li key={key}>
                              <strong>{key}:</strong> {String(value)}
                            </li>
                          ))}
                        </ul>
                      );
                    } catch {
                      return <p>{product.specifications}</p>;
                    }
                  })()}
                </div>
              </div>
            )}

            <div>
              <p className="text-sm text-muted-foreground mb-4">
                Stock disponible: {product.stock} unidades
              </p>

              {/* Quantity Selector */}
              <div className="flex items-center space-x-4 mb-6">
                <span className="text-sm font-medium">Cantidad:</span>
                <div className="flex items-center border border-border rounded-lg">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={decrementQuantity}
                    disabled={quantity <= 1}
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span className="px-6 py-2 font-semibold">{quantity}</span>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={incrementQuantity}
                    disabled={quantity >= product.stock}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Add to Cart and Wishlist Buttons */}
              <div className="flex gap-3">
                <Button
                  size="lg"
                  className="flex-1 gap-2"
                  onClick={handleAddToCart}
                  disabled={product.stock === 0}
                >
                  <ShoppingCart className="h-5 w-5" />
                  {product.stock === 0 ? 'Sin Stock' : 'Añadir al Carrito'}
                </Button>
                <Button
                  size="lg"
                  variant={isInWishlist(product.id) ? 'default' : 'outline'}
                  onClick={handleToggleWishlist}
                >
                  <Heart className={`h-5 w-5 ${isInWishlist(product.id) ? 'fill-current' : ''}`} />
                </Button>
              </div>

              {/* Trust Badges */}
              <Card className="mt-6">
                <CardContent className="p-4 space-y-3">
                  <div className="flex items-center gap-3 text-sm">
                    <Package className="h-5 w-5 text-primary" />
                    <span>Envío gratis en pedidos +50€</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <Truck className="h-5 w-5 text-primary" />
                    <span>Entrega en 2-4 días laborables</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <Shield className="h-5 w-5 text-primary" />
                    <span>Garantía de 2 años</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        {/* Reviews Section */}
        <ProductReviews productId={product.id} />
      </div>
    </div>
  );
}
