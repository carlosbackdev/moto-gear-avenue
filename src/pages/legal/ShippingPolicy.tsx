import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Truck } from 'lucide-react';

export default function ShippingPolicy() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <Card className="max-w-4xl mx-auto">
          <CardHeader>
            <div className="flex items-center gap-3 mb-2">
              <Truck className="h-8 w-8 text-primary" />
              <CardTitle className="text-3xl">Política de Envíos</CardTitle>
            </div>
            <p className="text-muted-foreground">Información sobre nuestros envíos y plazos de entrega</p>
          </CardHeader>
          <CardContent className="space-y-6 text-foreground">
            <section>
              <h2 className="text-xl font-semibold mb-3">Zonas de Envío</h2>
              <p className="text-muted-foreground">
                Realizamos envíos a toda España peninsular, Islas Baleares, Canarias, Ceuta y Melilla. 
                También enviamos a países de la Unión Europea.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">Plazos de Entrega</h2>
              <ul className="space-y-2 text-muted-foreground">
                <li>• <strong>España Peninsular:</strong> 2-7 días laborables</li>
                <li>• <strong>Islas Baleares:</strong> 2-7 días laborables</li>
                <li>• <strong>Canarias, Ceuta y Melilla:</strong> 5-7 días laborables</li>
              </ul>
              <p className="text-muted-foreground mt-3">
                Los plazos pueden variar según disponibilidad del producto y temporada.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">Costes de Envío</h2>
              <ul className="space-y-2 text-muted-foreground">
                <li>• Envío GRATIS en pedidos superiores a 50€ (España peninsular)</li>
                <li>• Envío estándar: 1,99€</li>
                <li>• Islas y resto de Europa: Consultar en checkout</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">Proceso de Envío</h2>
              <div className="space-y-2 text-muted-foreground">
                <p>1. Una vez confirmado tu pedido, lo preparamos en 24-48 horas.</p>
                <p>2. Recibirás un email con el número de seguimiento cuando el pedido sea enviado.</p>
                <p>3. Podrás hacer seguimiento en tiempo real desde tu área personal.</p>
                <p>4. El transportista te contactará para coordinar la entrega.</p>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">Productos en Almacen Internacional</h2>
              <p className="text-muted-foreground">
                Algunos productos se envían directamente desde nuestros proveedores internacionales. 
                En estos casos, el plazo de entrega puede ser de 10-15 días laborables. 
                Esta información se indica claramente en la ficha del producto.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">Problemas con el Envío</h2>
              <p className="text-muted-foreground">
                Si tu pedido no llega en el plazo estimado o hay algún problema con la entrega, 
                contacta con nuestro servicio de atención al cliente en{' '}
                <a href="mailto:soporte@motogearspain.com" className="text-primary hover:underline">
                  motogearspain@gmail.com
                </a>
              </p>
            </section>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
