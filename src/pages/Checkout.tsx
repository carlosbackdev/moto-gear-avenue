import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '@/contexts/CartContext';
import { useAuth } from '@/contexts/AuthContext';
import { checkoutService, type Checkout, type CreateCheckoutRequest } from '@/services/checkout.service';
import { orderService } from '@/services/order.service';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';
import { environment } from '@/config/environment';

export default function Checkout() {
  const navigate = useNavigate();
  const { cart, totalAmount } = useCart();
  const { isAuthenticated, user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [savedCheckouts, setSavedCheckouts] = useState<Checkout[]>([]);
  const [selectedCheckoutId, setSelectedCheckoutId] = useState<number | null>(null);
  
  // Calculate shipping cost: 1.99€ if total < 50€, free otherwise
  const shippingCost = totalAmount < 50 ? 1.99 : 0;
  const finalTotal = totalAmount + shippingCost;
  
  const [formData, setFormData] = useState({
    fullName: user?.name || '',
    address: '',
    city: '',
    postalCode: '',
    country: 'España',
    phone: '',
  });
  const [orderNotes, setOrderNotes] = useState('');

  useEffect(() => {
    window.scrollTo(0, 0);
    loadSavedCheckouts();
  }, []);

  const loadSavedCheckouts = async () => {
    try {
      const checkouts = await checkoutService.getUserCheckouts();
      setSavedCheckouts(checkouts);
    } catch (error) {
      console.error('Error loading saved checkouts:', error);
    }
  };

  const handleSelectCheckout = (checkout: Checkout) => {
    setSelectedCheckoutId(checkout.id);
    setFormData({
      fullName: checkout.customerName,
      address: checkout.address,
      city: checkout.city,
      postalCode: checkout.postalCode,
      country: checkout.country,
      phone: checkout.phoneNumber,
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isAuthenticated) {
      toast.error('Debes iniciar sesión para continuar');
      navigate('/login');
      return;
    }

    if (cart.length === 0) {
      toast.error('Tu carrito está vacío');
      return;
    }

    setLoading(true);

    try {
      // 1. Guardar/actualizar checkout
      const checkoutData: CreateCheckoutRequest = {
        customerName: formData.fullName,
        customerEmail: user?.email || '',
        address: formData.address,
        city: formData.city,
        country: formData.country,
        postalCode: formData.postalCode,
        phoneNumber: formData.phone,
      };

      let checkout: Checkout;
      
      if (selectedCheckoutId) {
        checkout = await checkoutService.updateCheckout(selectedCheckoutId, checkoutData);
      } else {
        checkout = await checkoutService.createCheckout(checkoutData);
      }

      // 2. Crear orden con los items del carrito
      const orderData = {
        checkoutId: checkout.id,
        cartItemIds: cart.map(item => item.id!),
        total: parseFloat(finalTotal.toFixed(2)),
        notes: orderNotes || undefined
      };

      const order = await orderService.createOrder(orderData);
      toast.success('Orden creada correctamente');

      // 3. Navegar a la página de pago con el ID de la orden
      navigate(`/payment/${order.id}`);
    } catch (error) {
      console.error('Error saving checkout:', error);
      toast.error('Error al guardar los datos. Inténtalo de nuevo.');
    } finally {
      setLoading(false);
    }
  };

  if (cart.length === 0) {
    navigate('/cart');
    return null;
  }

  // Fix image URL duplication
  const getImageUrl = (imageUrl: string) => {
    if (imageUrl.startsWith('http://') || imageUrl.startsWith('https://')) {
      return imageUrl;
    }
    return `${environment.imageBaseUrl}${imageUrl}`;
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8">Checkout</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Shipping Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Saved Checkouts */}
            {savedCheckouts.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle>Direcciones Guardadas</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {savedCheckouts.map((checkout) => (
                    <Card 
                      key={checkout.id} 
                      className={`cursor-pointer transition-all ${
                        selectedCheckoutId === checkout.id 
                          ? 'border-primary bg-primary/5' 
                          : 'hover:border-primary/50'
                      }`}
                    >
                      <CardContent className="p-4">
                        <div className="flex justify-between items-start">
                          <div className="space-y-1">
                            <p className="font-semibold">{checkout.customerName}</p>
                            <p className="text-sm text-muted-foreground">{checkout.address}</p>
                            <p className="text-sm text-muted-foreground">
                              {checkout.postalCode} {checkout.city}, {checkout.country}
                            </p>
                            <p className="text-sm text-muted-foreground">{checkout.phoneNumber}</p>
                          </div>
                          <Button
                            variant={selectedCheckoutId === checkout.id ? "default" : "outline"}
                            size="sm"
                            onClick={() => handleSelectCheckout(checkout)}
                          >
                            {selectedCheckoutId === checkout.id ? 'Seleccionada' : 'Usar esta dirección'}
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </CardContent>
              </Card>
            )}

            {/* Form */}
            <Card>
              <CardHeader>
                <CardTitle>
                  {selectedCheckoutId ? 'Editar Datos de Envío' : 'Nuevos Datos de Envío'}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="fullName">Nombre Completo *</Label>
                      <Input
                        id="fullName"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="phone">Teléfono *</Label>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="address">Dirección *</Label>
                    <Input
                      id="address"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <Label htmlFor="city">Ciudad *</Label>
                      <Input
                        id="city"
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="postalCode">Código Postal *</Label>
                      <Input
                        id="postalCode"
                        name="postalCode"
                        value={formData.postalCode}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="country">País *</Label>
                      <Input
                        id="country"
                        name="country"
                        value={formData.country}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="orderNotes">Notas del Pedido (Opcional)</Label>
                    <textarea
                      id="orderNotes"
                      value={orderNotes}
                      onChange={(e) => setOrderNotes(e.target.value)}
                      placeholder="Ej: Entregar por la mañana, llamar antes de entregar, etc."
                      className="w-full min-h-[100px] px-3 py-2 border border-input rounded-md bg-background text-foreground resize-y"
                    />
                  </div>

                  <div className="pt-4">
                    <Button type="submit" size="lg" className="w-full" disabled={loading}>
                      {loading ? 'Guardando...' : 'Guardar y Pagar'}
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Order Summary */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Resumen del Pedido</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  {cart.map((item) => (
                    <div key={`${item.product.id}-${item.variant || 'default'}`} className="flex gap-3 text-sm">
                      <img
                        src={getImageUrl(item.product.imageUrl)}
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
          </div>
        </div>
      </div>
    </div>
  );
}
