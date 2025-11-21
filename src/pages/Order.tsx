import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { useCart } from '@/contexts/CartContext';
import { useAuth } from '@/contexts/AuthContext';
import { orderService } from '@/services/order.service';
import { checkoutService, Checkout } from '@/services/checkout.service';
import { cartService } from '@/services/cart.service';
import { paymentService } from '@/services/payment.service';
import { type Order } from '@/types/models';
import { toast } from 'sonner';
import { Loader2, Trash2 } from 'lucide-react';
import { environment } from '@/config/environment';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';

export default function Order() {
  const { orderId } = useParams<{ orderId: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { clearCart: clearCartContext, cart } = useCart();
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false);
  const [deleting, setDeleting] = useState(false);
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
      const currentUrl = window.location.origin;
      const successUrl = `${currentUrl}/account/orders`;
      const cancelUrl = `${currentUrl}/order/${order.id}`;

      // Create Stripe Checkout Session
      const { url } = await paymentService.createCheckoutSession({
        orderId: order.id,
        successUrl,
        cancelUrl,
      });

      // Redirect to Stripe
      window.location.href = url;
    } catch (error) {
      console.error('Error al crear la sesión de pago:', error);
      toast.error('Error al iniciar el pago. Por favor, inténtalo de nuevo.');
      setProcessing(false);
    }
  };

  const handleDeleteOrder = async () => {
    if (!order) return;

    setDeleting(true);
    try {
      await orderService.deleteOrder(order.id);
      toast.success('Pedido eliminado correctamente');
      navigate(-1); // Volver a la página anterior
    } catch (error) {
      console.error('Error al eliminar el pedido:', error);
      toast.error('Error al eliminar el pedido');
    } finally {
      setDeleting(false);
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

  const getStatusBadge = (status: string) => {
    const statusConfig: Record<string, { label: string; variant: 'default' | 'secondary' | 'destructive' | 'outline' }> = {
      PENDING: { label: 'Pendiente', variant: 'outline' },
      PAID: { label: 'Pagado', variant: 'default' },
      PROCESSING: { label: 'Procesando', variant: 'secondary' },
      SHIPPED: { label: 'Enviado', variant: 'secondary' },
      DELIVERED: { label: 'Entregado', variant: 'default' },
      CANCELLED: { label: 'Cancelado', variant: 'destructive' },
    };
    const config = statusConfig[status] || { label: status, variant: 'outline' };
    return <Badge variant={config.variant}>{config.label}</Badge>;
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Confirmar Pago</h1>
        {order && getStatusBadge(order.status)}
      </div>

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

            {order.notes && (
              <div className="border-t pt-4">
                <p className="text-sm font-semibold text-muted-foreground mb-1">Notas del Pedido:</p>
                <p className="text-sm">{order.notes}</p>
              </div>
            )}

            <div className="flex gap-3">
              <Button
                onClick={handleConfirmPayment}
                disabled={processing || order.status !== 'PENDING'}
                className="flex-1"
                size="lg"
              >
                {processing ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Procesando...
                  </>
                ) : (
                  'Pagar con Tarjeta'
                )}
              </Button>

              {order.status === 'PENDING' && (
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button
                      variant="destructive"
                      size="lg"
                      disabled={deleting}
                    >
                      {deleting ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        <Trash2 className="h-4 w-4" />
                      )}
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>¿Eliminar pedido?</AlertDialogTitle>
                      <AlertDialogDescription>
                        Esta acción no se puede deshacer. El pedido será eliminado permanentemente.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancelar</AlertDialogCancel>
                      <AlertDialogAction onClick={handleDeleteOrder}>
                        Eliminar
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
