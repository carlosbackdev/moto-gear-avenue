import { Link } from 'react-router-dom';
import { Trash2, Plus, Minus, ShoppingBag } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

export default function Cart() {
  const { cart, removeItem, updateQuantity, totalAmount, totalItems } = useCart();

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center space-y-4">
          <ShoppingBag className="h-24 w-24 mx-auto text-muted-foreground" />
          <h2 className="text-2xl font-bold">Tu carrito está vacío</h2>
          <p className="text-muted-foreground">¡Añade algunos accesorios para empezar!</p>
          <Link to="/catalog">
            <Button size="lg">Explorar Accesorios</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8">Carrito de Compra</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cart.map((item) => (
              <Card key={item.product.id}>
                <CardContent className="p-6">
                  <div className="flex gap-4">
                    <img
                      src={item.product.imageUrl}
                      alt={item.product.name}
                      className="w-24 h-24 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <h3 className="font-semibold mb-1">{item.product.name}</h3>
                      <p className="text-sm text-muted-foreground mb-2">{item.product.brand}</p>
                      <p className="text-lg font-bold text-primary">
                        {item.product.price.toFixed(2)}€
                      </p>
                    </div>
                    <div className="flex flex-col items-end justify-between">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => removeItem(item.product.id)}
                      >
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                      <div className="flex items-center border border-border rounded-lg">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                        >
                          <Minus className="h-4 w-4" />
                        </Button>
                        <span className="px-4 py-2 font-semibold">{item.quantity}</span>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                          disabled={item.quantity >= item.product.stock}
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Order Summary */}
          <div>
            <Card className="sticky top-24">
              <CardContent className="p-6 space-y-4">
                <h2 className="text-2xl font-bold">Resumen del Pedido</h2>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Productos ({totalItems})</span>
                    <span className="font-semibold">{totalAmount.toFixed(2)}€</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Envío</span>
                    <span className="font-semibold text-primary">GRATIS</span>
                  </div>
                  <div className="border-t pt-2 mt-2">
                    <div className="flex justify-between text-lg font-bold">
                      <span>Total</span>
                      <span className="text-primary">{totalAmount.toFixed(2)}€</span>
                    </div>
                  </div>
                </div>
                <Link to="/checkout" className="block">
                  <Button size="lg" className="w-full">
                    Proceder al Checkout
                  </Button>
                </Link>
                <Link to="/catalog" className="block">
                  <Button variant="outline" size="lg" className="w-full">
                    Seguir Comprando
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
