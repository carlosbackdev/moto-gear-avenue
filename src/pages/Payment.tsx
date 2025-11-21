import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { useCart } from '@/contexts/CartContext';
import { useAuth } from '@/contexts/AuthContext';
import { orderService } from '@/services/order.service';
import { checkoutService, Checkout } from '@/services/checkout.service';
import { cartService } from '@/services/cart.service';
import { Order } from '@/types/models';
import { toast } from 'sonner';
import { Loader2 } from 'lucide-react';
import { environment } from '@/config/environment';

export default function Payment() {
  const { orderId } = useParams<{ orderId: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { clearCart: clearCartContext, cart } = useCart();
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false);
  const [order, setOrder] = useState<Order | null>(null);
  const [checkout, setCheckout] = useState<Checkout | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (!user) {
      navigate('/login');
      return;
    }

    if (!orderId) {
      navigate('/cart');
      return;
    }

    loadOrderData();
  }, [orderId, user, navigate]);

  const loadOrderData = async () => {
    try {
      setLoading(true);
      const orderData = await orderService.getOrderById(Number(orderId));
      setOrder(orderData);

      // Cargar datos del checkout
      const checkoutData = await checkoutService.getCheckoutById(orderData.checkoutId);
      setCheckout(checkoutData);
    } catch (error) {
      console.error('Error al cargar los datos:', error);
      toast.error('Error al cargar los datos del pedido');
      navigate('/cart');
    } finally {
      setLoading(false);
    }
  };

  const handleConfirmPayment = async () => {
    if (!order) return;

    setProcessing(true);
    try {
      // Actualizar estado de la orden a PAID
      await orderService.updateOrderStatus(order.id, {
        status: 'PAID',
        notes: 'Pago confirmado (simulado)'
      });

      // Limpiar el carrito
      await cartService.clearCart();
      clearCartContext();

      toast.success('¡Pago confirmado! Tu pedido ha sido procesado');
      navigate('/account/orders');
    } catch (error) {
      console.error('Error al confirmar el pago:', error);
      toast.error('Error al procesar el pago');
    } finally {
      setProcessing(false);
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

  // Calcular totales basados en los items del carrito
  const cartItems = cart.filter(item => order.cartItemIds.includes(item.id!));
  const subtotal = cartItems.reduce((sum, item) => {
    const price = item.product.sellPrice || item.product.price;
    return sum + (price * item.quantity);
  }, 0);
  const shippingCost = subtotal >= 50 ? 0 : 1.99;

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-3xl font-bold mb-8">Confirmar Pago</h1>

      <div className="grid gap-8">
        {/* Método de Pago (Placeholder) */}
        <Card>
          <CardHeader>
            <CardTitle>Método de Pago</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              La integración de pasarela de pago se agregará próximamente.
            </p>
            <p className="text-sm text-muted-foreground mt-2">
              Por ahora, puedes simular el pago presionando el botón de confirmación.
            </p>
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
              {cartItems.map((item) => {
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
                        <p className="text-muted-foreground font-medium">
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
                  <span>Total</span>
                  <span className="text-primary">{order.total.toFixed(2)}€</span>
                </div>
              </div>
            </div>

            <Button
              onClick={handleConfirmPayment}
              disabled={processing}
              className="w-full"
              size="lg"
            >
              {processing ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Procesando...
                </>
              ) : (
                'Confirmar Pago (Simulado)'
              )}
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
