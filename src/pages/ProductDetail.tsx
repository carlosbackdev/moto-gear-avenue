import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, ShoppingCart, Minus, Plus, Heart, Package, Truck, Shield, Calendar } from 'lucide-react';
import { Product, ProductVariantGroup, ProductVariantOption } from '@/types/models';
import { productService } from '@/services/product.service';
import { imageService } from '@/services/image.service';
import { useCart } from '@/contexts/CartContext';
import { useWishlist } from '@/contexts/WishlistContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
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
  const [selectedVariants, setSelectedVariants] = useState<Record<string, string>>({});
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    if (!id) return;
    
    const fetchProduct = async () => {
      try {
        const data = await productService.getProductById(Number(id));
        
        // Obtener TODAS las imágenes del producto
        const allImages = await imageService.getProductImages(Number(id));
        
        if (allImages && allImages.length > 0) {
          // Procesar todas las imágenes con la URL completa
          const processedImages = allImages.map(img => imageService.getFullImageUrl(img.imageUrl));
          data.images = processedImages;
          data.imageUrl = processedImages[0];
        }
        
        setProduct(data);
      } catch (error) {
        console.error('Error fetching product:', error);
        // Fallback a mock data si falla
        const foundProduct = mockProducts.find(p => p.id === Number(id));
        setProduct(foundProduct || null);
        toast.error('Error al cargar el producto desde el backend');
      } finally {
        setLoading(false);
      }
    };
    
    fetchProduct();
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

  const parseVariants = (): ProductVariantGroup[] => {
    if (!product?.variant) return [];
    try {
      const variants = JSON.parse(product.variant);
      return variants.map((v: ProductVariantGroup) => ({
        ...v,
        options: v.options.slice(0, 12) // Máximo 12 opciones para permitir más variantes
      }));
    } catch {
      return [];
    }
  };

  const handleVariantSelect = (groupName: string, option: ProductVariantOption) => {
    setSelectedVariants(prev => ({
      ...prev,
      [groupName]: option.value
    }));

    // Si la variante tiene imagen, cambiar a esa imagen en la galería
    if (option.image && product?.images) {
      const fullImageUrl = imageService.getFullImageUrl(option.image);
      const imageIndex = product.images.findIndex(img => img === fullImageUrl);
      if (imageIndex !== -1) {
        setCurrentImageIndex(imageIndex);
      }
    }
  };

  const parseDeliveryDates = (): string => {
    if (!product?.deliveryEstimateDays) return '';
    
    const match = product.deliveryEstimateDays.match(/(\d+)-(\d+)\s*días/);
    if (!match) return product.deliveryEstimateDays;
    
    const [_, startDay, endDay] = match;
    const today = new Date();
    const currentMonth = today.toLocaleString('es-ES', { month: 'long' });
    
    return `${startDay}-${endDay} de ${currentMonth}`;
  };

  const cleanSpecifications = () => {
    if (!product?.specifications) return null;
    try {
      const specs = JSON.parse(product.specifications);
      // Filtrar "Producto químico de alta preocupación"
      const filtered = Object.entries(specs).filter(([key]) => 
        !key.toLowerCase().includes('químico') && 
        !key.toLowerCase().includes('preocupación')
      );
      return filtered.length > 0 ? Object.fromEntries(filtered) : null;
    } catch {
      return null;
    }
  };

  const productImages = product?.images && product.images.length > 0
    ? product.images
    : [product?.imageUrl || '/placeholder.svg'];

  const variants = parseVariants();
  const deliveryDateRange = parseDeliveryDates();
  const cleanedSpecs = cleanSpecifications();

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
        <div className="space-y-6">
          <ProductGallery 
            images={productImages} 
            productName={product.name}
            initialIndex={currentImageIndex}
          />
          
          {/* Specifications below images */}
          {cleanedSpecs && Object.keys(cleanedSpecs).length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Especificaciones Técnicas</CardTitle>
              </CardHeader>
              <CardContent>
                <dl className="space-y-2">
                  {Object.entries(cleanedSpecs).map(([key, value], index) => (
                    <div key={index} className="flex justify-between py-2 border-b border-border last:border-0">
                      <dt className="font-medium text-muted-foreground">{key}</dt>
                      <dd className="text-foreground">{String(value)}</dd>
                    </div>
                  ))}
                </dl>
              </CardContent>
            </Card>
          )}
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

            {/* Delivery Info - Destacado */}
            <Card className="bg-primary/5 border-primary/20">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <Calendar className="h-6 w-6 text-primary" />
                  <div>
                    <p className="text-sm font-medium">Fecha estimada de entrega</p>
                    <p className="text-lg font-bold text-primary">{deliveryDateRange}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div>
              <h2 className="text-xl font-semibold mb-2">Descripción</h2>
              <p className="text-muted-foreground leading-relaxed">
                {product.description}
              </p>
              
              {product.keywords && (
                <div className="mt-3 flex flex-wrap gap-1">
                  {product.keywords.split(',').slice(0, 6).map((keyword, idx) => (
                    <Badge key={idx} variant="outline" className="text-xs">
                      {keyword.trim()}
                    </Badge>
                  ))}
                </div>
              )}
            </div>

            {/* Variantes del Producto */}
            {variants.length > 0 && (
              <div>
                <h2 className="text-xl font-semibold mb-3">Opciones disponibles</h2>
                {variants.map((variantGroup, idx) => (
                  <div key={idx} className="mb-4">
                    <p className="text-sm font-medium mb-2">{variantGroup.groupName}</p>
                    <div className="flex flex-wrap gap-2">
                      {variantGroup.options.map((option, optIdx) => (
                        <Button
                          key={optIdx}
                          variant={selectedVariants[variantGroup.groupName] === option.value ? 'default' : 'outline'}
                          size="sm"
                          onClick={() => handleVariantSelect(variantGroup.groupName, option)}
                          className="flex items-center gap-2"
                        >
                          {option.image && (
                            <img 
                              src={imageService.getFullImageUrl(option.image)}
                              alt={option.value}
                              className="w-6 h-6 object-cover rounded"
                            />
                          )}
                          {option.value}
                          {option.extraPrice > 0 && ` (+${option.extraPrice.toFixed(2)}€)`}
                        </Button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {cleanedSpecs && (
              <div>
                <h2 className="text-xl font-semibold mb-2">Especificaciones</h2>
                <div className="text-muted-foreground">
                  <ul className="space-y-1">
                    {Object.entries(cleanedSpecs).map(([key, value]) => (
                      <li key={key}>
                        <strong>{key}:</strong> {String(value)}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            <div>

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
              <Card>
                <CardContent className="p-4 space-y-3">
                  <div className="flex items-center gap-3 text-sm">
                    <Package className="h-5 w-5 text-primary" />
                    <span>Envío: {product.shippingCost?.toFixed(2)}€ (Gratis en pedidos +50€)</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <Truck className="h-5 w-5 text-primary" />
                    <span>Entrega estimada: {deliveryDateRange}</span>
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
