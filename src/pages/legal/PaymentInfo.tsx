import { CreditCard, Mail, Package, Truck, MapPin, Shield, CheckCircle } from 'lucide-react';

export default function PaymentInfo() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center">Información de Pago</h1>
        
        {/* Stripe Security Section */}
        <section className="mb-12 bg-gradient-to-br from-primary/10 to-primary/5 rounded-2xl p-8 border border-primary/20">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center">
              <Shield className="h-8 w-8 text-primary" />
            </div>
            <div>
              <h2 className="text-2xl font-bold">Pago 100% Seguro con Stripe</h2>
              <p className="text-muted-foreground">Tu información de pago está protegida</p>
            </div>
          </div>
          <p className="text-muted-foreground mb-6">
            Utilizamos <strong>Stripe</strong>, uno de los procesadores de pago más seguros del mundo, 
            utilizado por empresas como Amazon, Google y Shopify. Tus datos bancarios nunca se almacenan 
            en nuestros servidores y están protegidos con encriptación de nivel bancario (SSL/TLS).
          </p>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="flex items-center gap-3 bg-background/50 rounded-lg p-4">
              <CheckCircle className="h-5 w-5 text-green-500" />
              <span className="text-sm">Encriptación SSL 256-bit</span>
            </div>
            <div className="flex items-center gap-3 bg-background/50 rounded-lg p-4">
              <CheckCircle className="h-5 w-5 text-green-500" />
              <span className="text-sm">Certificado PCI DSS</span>
            </div>
            <div className="flex items-center gap-3 bg-background/50 rounded-lg p-4">
              <CheckCircle className="h-5 w-5 text-green-500" />
              <span className="text-sm">Protección antifraude</span>
            </div>
          </div>
        </section>

        {/* Payment Process Steps */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-8 text-center">¿Cómo funciona el proceso de compra?</h2>
          
          <div className="space-y-8">
            {/* Step 1 */}
            <div className="flex gap-6 items-start">
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold text-lg">
                1
              </div>
              <div className="flex-1 bg-muted/30 rounded-xl p-6">
                <div className="flex items-center gap-3 mb-3">
                  <CreditCard className="h-6 w-6 text-primary" />
                  <h3 className="text-xl font-semibold">Pago con Stripe</h3>
                </div>
                <p className="text-muted-foreground">
                  Al finalizar tu compra, serás redirigido a la pasarela de pago segura de Stripe. 
                  Puedes pagar con tarjeta de crédito o débito (Visa, Mastercard, American Express). 
                  Tu información de pago está completamente protegida y nosotros nunca tenemos acceso 
                  a los datos de tu tarjeta.
                </p>
              </div>
            </div>

            {/* Step 2 */}
            <div className="flex gap-6 items-start">
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold text-lg">
                2
              </div>
              <div className="flex-1 bg-muted/30 rounded-xl p-6">
                <div className="flex items-center gap-3 mb-3">
                  <Mail className="h-6 w-6 text-primary" />
                  <h3 className="text-xl font-semibold">Recibo por Email</h3>
                </div>
                <p className="text-muted-foreground">
                  Una vez completado el pago, recibirás automáticamente un email de confirmación 
                  con el recibo de tu compra. Este email incluye todos los detalles de tu pedido: 
                  productos, cantidades, precio total y dirección de envío. Guárdalo como comprobante 
                  de tu compra.
                </p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="flex gap-6 items-start">
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold text-lg">
                3
              </div>
              <div className="flex-1 bg-muted/30 rounded-xl p-6">
                <div className="flex items-center gap-3 mb-3">
                  <Package className="h-6 w-6 text-primary" />
                  <h3 className="text-xl font-semibold">Procesamiento del Pedido</h3>
                </div>
                <p className="text-muted-foreground">
                  Nuestro equipo procesará tu pedido en las siguientes 24-48 horas laborables. 
                  Durante este tiempo, preparamos cuidadosamente tus productos para el envío, 
                  verificamos el stock y coordinamos con nuestros proveedores para garantizar 
                  la mejor experiencia de compra.
                </p>
              </div>
            </div>

            {/* Step 4 */}
            <div className="flex gap-6 items-start">
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold text-lg">
                4
              </div>
              <div className="flex-1 bg-muted/30 rounded-xl p-6">
                <div className="flex items-center gap-3 mb-3">
                  <Truck className="h-6 w-6 text-primary" />
                  <h3 className="text-xl font-semibold">Envío de tu Pedido</h3>
                </div>
                <p className="text-muted-foreground">
                  Una vez procesado, tu pedido será enviado a través de transportistas de confianza. 
                  El tiempo de entrega estimado es de <strong>2 a 7 días laborables</strong> dependiendo 
                  de tu ubicación. Para pedidos superiores a 50€, el envío es completamente gratuito. 
                  Para pedidos inferiores, el coste de envío es de solo 1,99€.
                </p>
              </div>
            </div>

            {/* Step 5 */}
            <div className="flex gap-6 items-start">
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold text-lg">
                5
              </div>
              <div className="flex-1 bg-muted/30 rounded-xl p-6">
                <div className="flex items-center gap-3 mb-3">
                  <MapPin className="h-6 w-6 text-primary" />
                  <h3 className="text-xl font-semibold">Seguimiento del Paquete</h3>
                </div>
                <p className="text-muted-foreground mb-4">
                  Podrás seguir el estado de tu envío en tiempo real de dos formas:
                </p>
                <ul className="space-y-3 text-muted-foreground">
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong>En nuestra web:</strong> Accede a tu cuenta, ve a "Mis Pedidos" y 
                      pulsa "Ver seguimiento" para ver el estado actualizado de tu envío con la 
                      línea temporal completa del transporte.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong>Web del transportista:</strong> También puedes usar el número de 
                      seguimiento proporcionado para rastrear tu paquete directamente en la 
                      página web de la empresa de mensajería.
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="bg-muted/30 rounded-2xl p-8">
          <h2 className="text-2xl font-bold mb-6">Preguntas Frecuentes</h2>
          <div className="space-y-6">
            <div>
              <h3 className="font-semibold mb-2">¿Es seguro pagar con tarjeta?</h3>
              <p className="text-muted-foreground text-sm">
                Sí, completamente. Stripe cumple con los más altos estándares de seguridad (PCI DSS Nivel 1) 
                y utiliza encriptación de grado bancario. Nunca almacenamos tus datos de tarjeta en nuestros servidores.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">¿Puedo cancelar mi pedido?</h3>
              <p className="text-muted-foreground text-sm">
                Puedes cancelar tu pedido mientras esté en estado "Pendiente". Una vez procesado o enviado, 
                deberás solicitar una devolución cuando recibas el producto.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">¿Qué hago si no recibo el email de confirmación?</h3>
              <p className="text-muted-foreground text-sm">
                Revisa tu carpeta de spam o correo no deseado. Si no lo encuentras, accede a tu cuenta en 
                nuestra web y verifica el estado de tu pedido en "Mis Pedidos". También puedes contactar 
                con nuestro soporte.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">¿Cuánto tarda en llegar mi pedido?</h3>
              <p className="text-muted-foreground text-sm">
                El tiempo de entrega estimado es de 2 a 7 días laborables dependiendo de tu ubicación 
                y la disponibilidad del producto.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
