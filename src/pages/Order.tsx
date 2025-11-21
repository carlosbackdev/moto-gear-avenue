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
import { cartShadedService } from '@/services/cart-shaded.service';
import { paymentService } from '@/services/payment.service';
import { productService } from '@/services/product.service';
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
  const { clearCart: clearCartContext } = useCart();
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [order, setOrder] = useState<Order | null>(null);
  const [checkout, setCheckout] = useState<Checkout | null>(null);
  const [shadedCartItems, setShadedCartItems] = useState<any[]>([]);

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
      navigate('/cart');
    } finally {
      setLoading(false);
    }
  };

  const handleConfirmPayment = async () => {
    if (!order) return;

    setProcessing(true);
    try {
      // Crear sesión de Stripe Checkout con la orden completa
      const { url } = await paymentService.createCheckoutSession(order);

      // Redirigir a Stripe Checkout
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

  // Calcular totales basados en los items del carrito sombreado
  const subtotal = shadedCartItems.reduce((sum, item) => {
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
        {/* Método de Pago */}
        <Card>
          <CardHeader>
            <CardTitle>Método de Pago</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-3 p-4 border rounded-lg bg-muted/50">
              <div className="flex-1">
                <p className="font-semibold">Pago con Tarjeta</p>
                <p className="text-sm text-muted-foreground">
                  Procesado de forma segura por Stripe
                </p>
              </div>
              <svg className="h-8 w-auto" viewBox="0 0 60 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M59.6 12.5c0-6.4-5.2-11.6-11.6-11.6S36.4 6.1 36.4 12.5 41.6 24.1 48 24.1 59.6 18.9 59.6 12.5z" fill="#EB001B"/>
                <path d="M48 .9c-3.3 0-6.3 1.4-8.4 3.6 2.1 2.2 3.4 5.2 3.4 8.5s-1.3 6.3-3.4 8.5c2.1 2.2 5.1 3.6 8.4 3.6 6.4 0 11.6-5.2 11.6-11.6S54.4.9 48 .9z" fill="#F79E1B"/>
                <path d="M12 .9C5.6.9.4 6.1.4 12.5S5.6 24.1 12 24.1c3.3 0 6.3-1.4 8.4-3.6-2.1-2.2-3.4-5.2-3.4-8.5s1.3-6.3 3.4-8.5C18.3 2.3 15.3.9 12 .9z" fill="#00A1DF"/>
              </svg>
            </div>

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
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
