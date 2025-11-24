import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Order, BackendCartItem, Product } from '@/types/models';
import { orderService } from '@/services/order.service';
import { cartShadedService } from '@/services/cart-shaded.service';
import { productService } from '@/services/product.service';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Package, Search, Truck } from 'lucide-react';
import { toast } from 'sonner';
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

interface OrderWithProducts extends Order {
  products?: Array<{
    cartItem: BackendCartItem;
    product: Product;
  }>;
}

export default function Orders() {
  const navigate = useNavigate();
  const [orders, setOrders] = useState<OrderWithProducts[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState<number | null>(null);
  const [searchOrderId, setSearchOrderId] = useState('');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const data = await orderService.getUserOrders();
        
        // Obtener productos para cada pedido
        const ordersWithProducts = await Promise.all(
          data.map(async (order) => {
            try {
              const cartItems = await cartShadedService.getItems();
              const orderCartItems = cartItems.filter(item => 
                order.cartShadedIds.includes(item.id)
              );
              
              const products = await Promise.all(
                orderCartItems.map(async (cartItem) => {
                  try {
                    const product = await productService.getProductById(cartItem.productId);
                    return { cartItem, product };
                  } catch (error) {
                    console.error(`Error fetching product ${cartItem.productId}:`, error);
                    return null;
                  }
                })
              );
              
              return {
                ...order,
                products: products.filter(p => p !== null) as Array<{
                  cartItem: BackendCartItem;
                  product: Product;
                }>
              };
            } catch (error) {
              console.error(`Error fetching products for order ${order.id}:`, error);
              return { ...order, products: [] };
            }
          })
        );
        
        setOrders(ordersWithProducts);
      } catch (error) {
        console.error('Error fetching orders:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const handleCancelOrder = async (orderId: number) => {
    setDeleting(orderId);
    try {
      await orderService.deleteOrder(orderId);
      toast.success('Pedido cancelado correctamente');
      // Recargar la lista de pedidos desde el servidor
      const data = await orderService.getUserOrders();
      const ordersWithProducts = await Promise.all(
        data.map(async (order) => {
          try {
            const cartItems = await cartShadedService.getItems();
            const orderCartItems = cartItems.filter(item => 
              order.cartShadedIds.includes(item.id)
            );
            
            const products = await Promise.all(
              orderCartItems.map(async (cartItem) => {
                try {
                  const product = await productService.getProductById(cartItem.productId);
                  return { cartItem, product };
                } catch (error) {
                  console.error(`Error fetching product ${cartItem.productId}:`, error);
                  return null;
                }
              })
            );
            
            return {
              ...order,
              products: products.filter(p => p !== null) as Array<{
                cartItem: BackendCartItem;
                product: Product;
              }>
            };
          } catch (error) {
            console.error(`Error fetching products for order ${order.id}:`, error);
            return { ...order, products: [] };
          }
        })
      );
      setOrders(ordersWithProducts);
    } catch (error) {
      console.error('Error canceling order:', error);
      toast.error('Error al cancelar el pedido');
    } finally {
      setDeleting(null);
    }
  };

  const getStatusColor = (status: Order['status']) => {
    switch (status) {
      case 'PENDING':
        return 'bg-yellow-500';
      case 'PAID':
        return 'bg-green-500';
      case 'PROCESSING':
        return 'bg-blue-500';
      case 'SHIPPED':
        return 'bg-purple-500';
      case 'DELIVERED':
        return 'bg-green-600';
      case 'CANCELLED':
        return 'bg-red-500';
      default:
        return 'bg-gray-500';
    }
  };

  const getStatusText = (status: Order['status']) => {
    switch (status) {
      case 'PENDING':
        return 'Pendiente';
      case 'PAID':
        return 'Pagado';
      case 'PROCESSING':
        return 'En procesamiento';
      case 'SHIPPED':
        return 'Enviado';
      case 'DELIVERED':
        return 'Entregado';
      case 'CANCELLED':
        return 'Cancelado';
      default:
    return status;
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
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  const handleSearchTracking = () => {
    const orderId = searchOrderId.trim();
    if (!orderId) {
      toast.error('Por favor ingresa un número de pedido');
      return;
    }
    navigate(`/track/${orderId}`);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-6">Mis Pedidos</h1>
        
        {/* Buscador de seguimiento */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Search className="h-5 w-5" />
              Buscar Seguimiento
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex gap-2">
              <Input
                type="text"
                placeholder="Ingresa el número de pedido..."
                value={searchOrderId}
                onChange={(e) => setSearchOrderId(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSearchTracking()}
                className="flex-1"
              />
              <Button onClick={handleSearchTracking}>
                <Search className="h-4 w-4 mr-2" />
                Buscar
              </Button>
            </div>
          </CardContent>
        </Card>

        {orders.length === 0 ? (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12">
              <Package className="h-16 w-16 text-muted-foreground mb-4" />
              <p className="text-xl text-muted-foreground">No tienes pedidos todavía</p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {orders.map((order) => (
              <Card key={order.id}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-xl">Pedido #{order.id}</CardTitle>
                    <Badge className={getStatusColor(order.status)}>
                      {getStatusText(order.status)}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {new Date(order.createdAt).toLocaleDateString('es-ES', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </p>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {/* Productos del pedido */}
                    {order.products && order.products.length > 0 && (
                      <div className="space-y-3">
                        <h4 className="font-medium text-sm text-muted-foreground">Productos del pedido:</h4>
                        <div className="space-y-2">
                          {order.products.map(({ cartItem, product }) => (
                            <div key={cartItem.id} className="flex items-center gap-3 p-2 rounded-lg border bg-muted/50">
                              <img 
                                src={getImageUrl(product.imageUrl)} 
                                alt={product.name}
                                className="w-16 h-16 object-cover rounded"
                              />
                              <div className="flex-1 min-w-0">
                                <p className="font-medium text-sm truncate">{product.name}</p>
                                {cartItem.variant && (
                                  <p className="text-xs text-muted-foreground">
                                    Opción: {cartItem.variant}
                                  </p>
                                )}
                                <p className="text-xs text-muted-foreground">
                                  Cantidad: {cartItem.quantity}
                                </p>
                              </div>
                              <div className="text-right">
                                <p className="font-medium text-sm">
                                  {(product.sellPrice * cartItem.quantity).toFixed(2)}€
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    <div className="space-y-2 border-t pt-3">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Checkout ID:</span>
                        <span className="font-medium">#{order.checkoutId}</span>
                      </div>
                      {order.notes && (
                        <div className="text-sm">
                          <span className="text-muted-foreground">Notas:</span>
                          <p className="text-sm mt-1">{order.notes}</p>
                        </div>
                      )}
                    </div>
                    <div className="border-t pt-2 mt-2">
                      <div className="flex justify-between font-bold">
                        <span>Total</span>
                        <span className="text-primary">{order.total.toFixed(2)}€</span>
                      </div>
                    </div>
                    {order.status === 'PENDING' && (
                      <div className="pt-2 space-y-2">
                        <Button 
                          className="w-full" 
                          onClick={() => window.location.href = `/order/${order.id}`}
                        >
                          Completar Pago
                        </Button>
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button 
                              variant="outline" 
                              className="w-full"
                              disabled={deleting === order.id}
                            >
                              {deleting === order.id ? 'Cancelando...' : 'Cancelar Pedido'}
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>¿Estás seguro?</AlertDialogTitle>
                              <AlertDialogDescription>
                                Esta acción cancelará el pedido #{order.id}. Esta acción no se puede deshacer.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>No, mantener pedido</AlertDialogCancel>
                              <AlertDialogAction onClick={() => handleCancelOrder(order.id)}>
                                Sí, cancelar pedido
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                    )}
                    {order.status === 'SHIPPED' && (
                      <div className="pt-2">
                        <Button 
                          className="w-full" 
                          onClick={() => navigate(`/track/${order.id}`)}
                        >
                          <Truck className="h-4 w-4 mr-2" />
                          Ver Seguimiento
                        </Button>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
