import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useCart } from '@/contexts/CartContext';
import { useAuth } from '@/contexts/AuthContext';
import { checkoutService, Checkout } from '@/services/checkout.service';
import { orderService } from '@/services/order.service';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';
import { environment } from '@/config/environment';
import { Loader2 } from 'lucide-react';

export default function Payment() {
  const navigate = useNavigate();
  const { checkoutId } = useParams<{ checkoutId: string }>();
  const { cart, totalAmount, clearCart } = useCart();
  const { isAuthenticated } = useAuth();
  const [loading, setLoading] = useState(true);
  const [processingPayment, setProcessingPayment] = useState(false);
  const [checkout, setCheckout] = useState<Checkout | null>(null);

  // Calculate shipping cost
  const shippingCost = totalAmount < 50 ? 1.99 : 0;
  const finalTotal = totalAmount + shippingCost;

  useEffect(() => {
    window.scrollTo(0, 0);
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    loadCheckoutData();
  }, [checkoutId, isAuthenticated]);

  const loadCheckoutData = async () => {
    if (!checkoutId) {
      toast.error('ID de checkout inválido');
      navigate('/checkout');
      return;
    }

    try {
      const data = await checkoutService.getCheckoutById(parseInt(checkoutId));
      setCheckout(data);
    } catch (error) {
      console.error('Error loading checkout:', error);
      toast.error('Error al cargar los datos de envío');
      navigate('/checkout');
    } finally {
      setLoading(false);
    }
  };

  const handleConfirmPayment = async () => {
    if (!checkout) return;

    setProcessingPayment(true);

    try {
      const orderPayload = {
        items: cart.map((item) => ({
          productId: item.product.id,
          quantity: item.quantity,
        })),
        shippingAddress: {
          fullName: checkout.customerName,
          address: checkout.address,
          city: checkout.city,
          postalCode: checkout.postalCode,
          country: checkout.country,
          phone: checkout.phoneNumber,
        },
      };

      await orderService.createOrder(orderPayload);
      await clearCart();
      toast.success('¡Pago confirmado! Tu pedido ha sido creado con éxito.');
      navigate('/account/orders');
    } catch (error) {
      console.error('Error processing payment:', error);
      toast.error('Error al procesar el pago. Inténtalo de nuevo.');
    } finally {
      setProcessingPayment(false);
    }
  };

  const getImageUrl = (imageUrl: string) => {
    if (imageUrl.startsWith('http://') || imageUrl.startsWith('https://')) {
      return imageUrl;
    }
    return `${environment.imageBaseUrl}${imageUrl}`;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!checkout) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8">Confirmar Pago</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Payment Info & Shipping Address */}
          <div className="lg:col-span-2 space-y-6">
            {/* Payment Method Placeholder */}
            <Card>
              <CardHeader>
                <CardTitle>Método de Pago</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-muted/50 border-2 border-dashed border-muted-foreground/20 rounded-lg p-8 text-center">
                  <p className="text-muted-foreground mb-2">
                    La integración de pasarelas de pago (Stripe/PayPal) se implementará próximamente.
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Por ahora, puedes simular el proceso de pago haciendo clic en "Confirmar Pago (Simulado)".
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Shipping Address */}
            <Card>
              <CardHeader>
                <CardTitle>Dirección de Envío</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <p className="font-semibold text-lg">{checkout.customerName}</p>
                  <p className="text-muted-foreground">{checkout.address}</p>
                  <p className="text-muted-foreground">
                    {checkout.postalCode} {checkout.city}, {checkout.country}
                  </p>
                  <p className="text-muted-foreground">Tel: {checkout.phoneNumber}</p>
                  <p className="text-sm text-muted-foreground">Email: {checkout.customerEmail}</p>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  className="mt-4"
                  onClick={() => navigate('/checkout')}
                >
                  Cambiar dirección
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Order Summary */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Resumen del Pedido</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3 max-h-96 overflow-y-auto">
                  {cart.map((item) => (
                    <div key={`${item.product.id}-${item.variant || 'default'}`} className="flex gap-3 text-sm">
                      <img
                        src={getImageUrl(item.product.imageUrl)}
                        alt={item.product.name}
                        className="w-16 h-16 object-cover rounded-md flex-shrink-0"
                      />
                      <div className="flex-1 flex justify-between items-start">
                        <div>
                          <p className="font-medium line-clamp-2">
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
                        <span className="font-semibold flex-shrink-0">
                          {(item.product.price * item.quantity).toFixed(2)}€
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="border-t pt-4 space-y-2">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span className="font-semibold">{totalAmount.toFixed(2)}€</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Envío</span>
                    {shippingCost === 0 ? (
                      <span className="font-semibold text-primary">GRATIS</span>
                    ) : (
                      <span className="font-semibold">{shippingCost.toFixed(2)}€</span>
                    )}
                  </div>
                  <div className="border-t pt-2">
                    <div className="flex justify-between text-lg font-bold">
                      <span>Total</span>
                      <span className="text-primary">{finalTotal.toFixed(2)}€</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Confirm Payment Button */}
            <Button
              size="lg"
              className="w-full"
              onClick={handleConfirmPayment}
              disabled={processingPayment}
            >
              {processingPayment ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Procesando...
                </>
              ) : (
                'Confirmar Pago (Simulado)'
              )}
            </Button>
            <p className="text-xs text-muted-foreground text-center">
              Al confirmar, tu pedido será creado y recibirás un correo de confirmación.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
