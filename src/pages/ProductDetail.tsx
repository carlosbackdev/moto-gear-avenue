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
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ProductGallery } from '@/components/product/ProductGallery';
import { ProductReviews } from '@/components/product/ProductReviews';
import { toast } from 'sonner';
import { mockProducts } from '@/lib/mockData';

export default function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addItem, isInCart } = useCart();
  const { isInWishlist, addToWishlist, removeFromWishlist } = useWishlist();
  const [product, setProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [selectedVariants, setSelectedVariants] = useState<Record<string, string>>({});
  const [variantError, setVariantError] = useState<string | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Scroll to top when entering product page
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

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
    
    const parsedVariants = parseVariants();
    
    // Validar que se hayan seleccionado todas las variantes si existen
    if (parsedVariants.length > 0) {
      const missingVariants = parsedVariants.filter(
        (group) => !selectedVariants[group.groupName]
      );
      
      if (missingVariants.length > 0) {
        setVariantError(`Por favor selecciona: ${missingVariants.map(g => g.groupName).join(', ')}`);
        return;
      }
    }
    
    // Crear string de variante seleccionada
    const variantString = Object.entries(selectedVariants)
      .map(([key, value]) => `${value}`)
      .join(', ');
    
    setVariantError(null);
    addItem(product, quantity, variantString || undefined);
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
    
    setVariantError(null);

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
    if (!product) return '';

    const { deliveryMinDate, deliveryMaxDate, deliveryEstimateDays } = product;

    // 1) Si tenemos fechas ISO del backend, usamos esas
    if (deliveryMinDate && deliveryMaxDate) {
      const minDate = new Date(deliveryMinDate);
      const maxDate = new Date(deliveryMaxDate);

      if (isNaN(minDate.getTime()) || isNaN(maxDate.getTime())) {
        // Si algo viene mal, usamos el string antiguo si existe
        return deliveryEstimateDays || '';
      }

      const dayMin = minDate.getDate();
      const dayMax = maxDate.getDate();

      const monthMin = minDate.toLocaleString('es-ES', { month: 'long' });
      const monthMax = maxDate.toLocaleString('es-ES', { month: 'long' });

      const yearMin = minDate.getFullYear();
      const yearMax = maxDate.getFullYear();

      // Mismo mes y año → "19-23 de noviembre"
      if (monthMin === monthMax && yearMin === yearMax) {
        return `${dayMin}-${dayMax} de ${monthMin}`;
      }

      // Mes o año distinto → "30 de noviembre - 3 de diciembre"
      return `${dayMin} de ${monthMin} - ${dayMax} de ${monthMax}`;
    }

    // 2) Compatibilidad: si no hay fechas ISO, usamos el formato viejo "19-23 días"
    if (deliveryEstimateDays) {
      const match = deliveryEstimateDays.match(/(\d+)-(\d+)\s*días/);
      if (!match) return deliveryEstimateDays;

      const [, startDay, endDay] = match;
      const today = new Date();
      const currentMonth = today.toLocaleString('es-ES', { month: 'long' });

      return `${startDay}-${endDay} de ${currentMonth}`;
    }

    // 3) No hay info
    return '';
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
          
          {/* Specifications and Details Tabs */}
          {((cleanedSpecs && Object.keys(cleanedSpecs).length > 0) || product.description) && (
            <Card>
              <CardHeader>
                <CardTitle>Información del Producto</CardTitle>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="details" className="w-full">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="details">Detalles</TabsTrigger>
                    <TabsTrigger value="specifications">Especificaciones</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="specifications" className="mt-4">
                    {cleanedSpecs && Object.keys(cleanedSpecs).length > 0 ? (
                      <dl className="space-y-2">
                        {Object.entries(cleanedSpecs).map(([key, value], index) => (
                          <div key={index} className="flex justify-between py-2 border-b border-border last:border-0">
                            <dt className="font-medium text-muted-foreground">{key}</dt>
                            <dd className="text-foreground">{String(value)}</dd>
                          </div>
                        ))}
                      </dl>
                    ) : (
                      <p className="text-sm text-muted-foreground">No hay especificaciones disponibles</p>
                    )}
                  </TabsContent>
                  
                  <TabsContent value="details" className="mt-4">
                    <div className="text-muted-foreground leading-relaxed">
                      {product.description || 'No hay detalles disponibles'}
                    </div>
                  </TabsContent>
                </Tabs>
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

            {product.keywords && (
              <div>
                <h3 className="text-sm font-semibold mb-2">Relacionado</h3>
                <div className="flex flex-wrap gap-1">
                  {product.keywords.split(',').slice(0, 6).map((keyword, idx) => (
                    <Badge 
                      key={idx} 
                      variant="outline" 
                      className="text-xs cursor-pointer hover:bg-primary/10 transition-colors"
                      onClick={() => navigate(`/catalog?search=${encodeURIComponent(keyword.trim())}`)}
                    >
                      {keyword.trim()}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

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
                
                {variantError && (
                  <div className="text-sm text-destructive bg-destructive/10 p-3 rounded-lg mt-2">
                    {variantError}
                  </div>
                )}
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
              <div className="space-y-3">
                <div className="flex gap-3">
                  <Button
                    size="lg"
                    className="flex-1 gap-2"
                    onClick={handleAddToCart}
                    disabled={product.stock === 0}
                  >
                    <ShoppingCart className="h-5 w-5" />
                    {product.stock === 0 ? 'Sin Stock' : (isInCart(product.id) ? 'Añadir más al Carrito' : 'Añadir al Carrito')}
                  </Button>
                </div>
                
                {isInCart(product.id) && (
                  <div className="text-sm text-green-600 bg-green-50 dark:bg-green-950/20 p-2 rounded-lg text-center font-medium">
                    ✓ Este producto ya está en tu carrito
                  </div>
                )}
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
                    <span>Devolución Gratis - Devoluciones sin coste en todos los productos</span>
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
