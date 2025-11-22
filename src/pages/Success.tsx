import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { orderService } from '@/services/order.service';
import { checkoutService, Checkout } from '@/services/checkout.service';
import { cartShadedService } from '@/services/cart-shaded.service';
import { productService } from '@/services/product.service';
import { type Order } from '@/types/models';
import { toast } from 'sonner';
import { Loader2, CheckCircle, Package, Truck } from 'lucide-react';
import { environment } from '@/config/environment';

export default function Success() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [order, setOrder] = useState<Order | null>(null);
  const [checkout, setCheckout] = useState<Checkout | null>(null);
  const [shadedCartItems, setShadedCartItems] = useState<any[]>([]);

  useEffect(() => {
    window.scrollTo(0, 0);
    const orderId = searchParams.get('orderId');

    if (!orderId) {
      toast.error('No se encontró el ID del pedido');
      navigate('/');
      return;
    }

    loadOrderData(Number(orderId));
  }, [searchParams, navigate]);

  const loadOrderData = async (orderId: number) => {
    try {
      setLoading(true);
      const orderData = await orderService.getOrderById(orderId);
      setOrder(orderData);

      // Cargar datos del checkout
      const checkoutData = await checkoutService.getCheckoutById(orderData.checkoutId);
      setCheckout(checkoutData);

      // Cargar items del carrito sombreado
      const shadedItems = await cartShadedService.getItems();
      
      // Filtrar solo los items que pertenecen a esta orden
      const orderItems = shadedItems.filter(item => 
        orderData.cartShadedIds.includes(item.id)
      );

      // Cargar detalles completos de cada producto
      const itemsWithProducts = await Promise.all(
        orderItems.map(async (item) => {
          const product = await productService.getProductById(item.productId);
          return {
            id: item.id,
            product,
            quantity: item.quantity,
            variant: item.variant
          };
        })
      );

      setShadedCartItems(itemsWithProducts);
    } catch (error) {
      console.error('Error al cargar los datos:', error);
      toast.error('Error al cargar los datos del pedido');
      navigate('/');
    } finally {
      setLoading(false);
    }
  };

  const getImageUrl = (imageUrl: string): string => {
    if (!imageUrl) return '';
    if (imageUrl.startsWith('http://') || imageUrl.startsWith('https://')) {
      return imageUrl;
    }
    return `${environment.imageBaseUrl}${imageUrl}`;
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (!order || !checkout) {
    return null;
  }

  // Calcular totales basados en los items del carrito sombreado
  const subtotal = shadedCartItems.reduce((sum, item) => {
    const price = item.product.sellPrice || item.product.price;
    return sum + (price * item.quantity);
  }, 0);
  const shippingCost = subtotal >= 50 ? 0 : 1.99;

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      {/* Success Header */}
      <div className="text-center mb-8">
        <div className="flex justify-center mb-4">
          <div className="rounded-full bg-green-100 p-6">
            <CheckCircle className="h-16 w-16 text-green-600" />
          </div>
        </div>
        <h1 className="text-3xl font-bold mb-2">¡Pago Exitoso!</h1>
        <p className="text-muted-foreground text-lg">
          Tu pedido ha sido confirmado y está siendo procesado
        </p>
        <div className="mt-4">
          <Badge variant="default" className="text-lg px-4 py-2">
            Pedido #{order.id}
          </Badge>
        </div>
      </div>

      <div className="grid gap-8">
        {/* Estado y Tracking */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Package className="h-5 w-5" />
              Estado del Pedido
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Estado Actual:</span>
                <Badge variant="default">Pagado</Badge>
              </div>
              <Separator />
              <div className="flex items-start gap-3 p-4 bg-muted/50 rounded-lg">
                <Truck className="h-5 w-5 text-primary mt-1" />
                <div>
                  <p className="font-semibold">Preparando envío</p>
                  <p className="text-sm text-muted-foreground">
                    Tu pedido será procesado y enviado en los próximos 2-7 días hábiles
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Dirección de Envío */}
        <Card>
          <CardHeader>
            <CardTitle>Dirección de Envío</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div>
              <p className="font-semibold">{checkout.customerName}</p>
              <p className="text-sm text-muted-foreground">{checkout.customerEmail}</p>
            </div>
            <Separator />
            <div className="text-sm">
              <p>{checkout.address}</p>
              <p>
                {checkout.city}, {checkout.postalCode}
              </p>
              <p>{checkout.country}</p>
              <p className="mt-2">Tel: {checkout.phoneNumber}</p>
            </div>
          </CardContent>
        </Card>

        {/* Resumen del Pedido */}
        <Card>
          <CardHeader>
            <CardTitle>Resumen del Pedido</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              {shadedCartItems.map((item) => {
                const price = item.product.sellPrice || item.product.price;
                return (
                  <div key={item.id} className="flex gap-3 text-sm">
                    <img
                      src={getImageUrl(item.product.imageUrl || '')}
                      alt={item.product.name}
                      className="w-16 h-16 object-cover rounded-md"
                    />
                    <div className="flex-1 flex justify-between items-start">
                      <div>
                        <p className="text-foreground font-medium">
                          {item.product.name}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Cantidad: {item.quantity}
                        </p>
                        {item.variant && (
                          <p className="text-xs text-muted-foreground">
                            Opción: {item.variant}
                          </p>
                        )}
                      </div>
                      <span className="font-semibold">
                        {(price * item.quantity).toFixed(2)}€
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="border-t pt-4 space-y-2">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Subtotal</span>
                <span className="font-semibold">{subtotal.toFixed(2)}€</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Envío</span>
                <span className="font-semibold">
                  {shippingCost === 0 ? 'GRATIS' : `${shippingCost.toFixed(2)}€`}
                </span>
              </div>
              <div className="border-t pt-2">
                <div className="flex justify-between text-lg font-bold">
                  <span>Total Pagado</span>
                  <span className="text-primary">{order.total.toFixed(2)}€</span>
                </div>
              </div>
            </div>

            {order.notes && (
              <div className="border-t pt-4">
                <p className="text-sm font-semibold text-muted-foreground mb-1">Notas del Pedido:</p>
                <p className="text-sm">{order.notes}</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Botones de Acción */}
        <div className="flex flex-col sm:flex-row gap-4">
          <Button
            onClick={() => navigate('/orders')}
            className="flex-1"
            size="lg"
          >
            Ver Mis Pedidos
          </Button>
          <Button
            onClick={() => navigate('/')}
            variant="outline"
            className="flex-1"
            size="lg"
          >
            Volver al Inicio
          </Button>
        </div>
      </div>
    </div>
  );
}
