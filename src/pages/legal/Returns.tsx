import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { RotateCcw } from 'lucide-react';

export default function Returns() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <Card className="max-w-4xl mx-auto">
          <CardHeader>
            <div className="flex items-center gap-3 mb-2">
              <RotateCcw className="h-8 w-8 text-primary" />
              <CardTitle className="text-3xl">Política de Devoluciones</CardTitle>
            </div>
            <p className="text-muted-foreground">Información sobre devoluciones y cambios</p>
          </CardHeader>
          <CardContent className="space-y-6 text-foreground">
            <section>
              <h2 className="text-xl font-semibold mb-3">Derecho de Desistimiento</h2>
              <p className="text-muted-foreground">
                Tienes derecho a devolver tu pedido en un plazo de 14 días naturales desde la recepción del producto, 
                sin necesidad de justificación y sin penalización alguna, según lo establecido en la Ley General para 
                la Defensa de los Consumidores y Usuarios.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">Condiciones para Devoluciones</h2>
              <p className="text-muted-foreground mb-3">Para que podamos aceptar una devolución, el producto debe cumplir:</p>
              <ul className="space-y-2 text-muted-foreground">
                <li>• El producto debe estar sin usar y en perfecto estado</li>
                <li>• Conservar el embalaje original y etiquetas</li>
                <li>• Incluir todos los accesorios y documentación</li>
                <li>• No mostrar señales de uso o desgaste</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">Productos No Retornables</h2>
              <p className="text-muted-foreground mb-3">Por razones de higiene y seguridad, no se aceptan devoluciones de:</p>
              <ul className="space-y-2 text-muted-foreground">
                <li>• Cascos que hayan sido usados o probados sin protección higiénica</li>
                <li>• Productos personalizados o hechos a medida</li>
                <li>• Artículos en liquidación o con descuento superior al 40%</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">Cómo Realizar una Devolución</h2>
              <div className="space-y-2 text-muted-foreground">
                <p>1. Accede a tu cuenta y ve a "Mis Pedidos"</p>
                <p>2. Selecciona el pedido 'YA ENTRGADO' que deseas devolver</p>
                <p>3. Indica el motivo de la devolución</p>
                <p>4. Recibirás una etiqueta de devolución por email</p>
                <p>5. Empaqueta el producto con todos sus accesorios</p>
                <p>6. Pega la etiqueta y envía el paquete</p>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">Reembolsos</h2>
              <p className="text-muted-foreground">
                Una vez recibamos y verifiquemos el estado del producto devuelto, procesaremos el reembolso en un 
                plazo máximo de 14 días naturales. El importe se abonará utilizando el mismo método de pago que usaste 
                en la compra original.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">Cambios</h2>
              <p className="text-muted-foreground">
                Si deseas cambiar un producto por otro (talla, color, modelo), deberás realizar una devolución del 
                producto original y hacer un nuevo pedido. De esta forma garantizamos la disponibilidad del producto que deseas.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">Productos Defectuosos</h2>
              <p className="text-muted-foreground">
                Si recibes un producto defectuoso o con daños, contacta inmediatamente con nuestro servicio de atención 
                al cliente en{' '}
                <a href="mailto:soporte@motoaccesorios.com" className="text-primary hover:underline">
                  motogearspain@gmail.com
                </a>
                {' '}adjuntando fotos del producto. Nos haremos cargo de y te enviaremos 
                un reemplazo sin coste adicional.
              </p>
            </section>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
