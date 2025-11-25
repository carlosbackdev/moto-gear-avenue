import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText } from 'lucide-react';

export default function Terms() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <Card className="max-w-4xl mx-auto">
          <CardHeader>
            <div className="flex items-center gap-3 mb-2">
              <FileText className="h-8 w-8 text-primary" />
              <CardTitle className="text-3xl">Términos y Condiciones</CardTitle>
            </div>
            <p className="text-muted-foreground">Condiciones generales de uso y contratación</p>
          </CardHeader>
          <CardContent className="space-y-6 text-foreground">
            <section>
              <h2 className="text-xl font-semibold mb-3">1. Información General</h2>
              <p className="text-muted-foreground">
                Este sitio web es operado por MotoGearSpain S.L.,  domicilio social en 
                Calle avenida vinateros 28, 28030 Madrid, España. Al acceder y utilizar este sitio web, aceptas estar 
                vinculado por estos términos y condiciones.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">2. Objeto</h2>
              <p className="text-muted-foreground">
                Las presentes condiciones regulan la compraventa de accesorios y equipamiento para motocicletas 
                a través de nuestra tienda online. Algunos productos son enviados directamente desde proveedores 
                internacionales en régimen de dropshipping.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">3. Proceso de Compra</h2>
              <div className="space-y-2 text-muted-foreground">
                <p>• Selecciona los productos y añádelos al carrito</p>
                <p>• Revisa tu pedido y procede al checkout</p>
                <p>• Completa tus datos de envío y pago</p>
                <p>• Recibirás un email de confirmación con los detalles del pedido</p>
                <p>• El contrato se perfecciona cuando recibes el email de confirmación</p>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">4. Precios y Pagos</h2>
              <p className="text-muted-foreground">
                Todos los precios están expresados en euros (€) e incluyen IVA. Los gastos de envío se calculan 
                en función del destino y se muestran antes de confirmar la compra. Aceptamos pagos mediante tarjeta 
                de crédito/débito, PayPal y transferencia bancaria.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">5. Disponibilidad de Productos</h2>
              <p className="text-muted-foreground">
                Toda nuestra oferta de productos se realiza bajo reserva de disponibilidad. En caso de no 
                disponibilidad de algún producto tras realizar el pedido, nos pondremos en contacto contigo 
                para ofrecerte alternativas o proceder al reembolso.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">6. Garantías</h2>
              <p className="text-muted-foreground">
                Todos los productos tienen una garantía legal de 2 años según la legislación española y europea. 
                Además, algunos fabricantes ofrecen garantías comerciales adicionales. Los defectos de fabricación 
                están cubiertos por la garantía, pero no el desgaste normal por uso o daños accidentales.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">7. Protección de Datos</h2>
              <p className="text-muted-foreground">
                Tus datos personales serán tratados conforme al RGPD y la LOPD-GDD. Los datos recabados se 
                utilizarán exclusivamente para gestionar tu pedido y enviarte información comercial si has dado 
                tu consentimiento. Puedes ejercer tus derechos ARCO contactando con{' '}
                <a href="mailto:privacidad@motoaccesorios.com" className="text-primary hover:underline">
                  privacidad@motoaccesorios.com
                </a>
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">8. Propiedad Intelectual</h2>
              <p className="text-muted-foreground">
                Todos los contenidos de este sitio web (textos, imágenes, logotipos, diseño) son propiedad de 
                MotoGearSpain S.L. o de sus proveedores y están protegidos por las leyes de propiedad intelectual. 
                Queda prohibida su reproducción sin autorización expresa.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">9. Ley Aplicable y Jurisdicción</h2>
              <p className="text-muted-foreground">
                Estas condiciones se rigen por la legislación española. Para la resolución de cualquier controversia, 
                las partes se someten a los Juzgados y Tribunales de Madrid, salvo que la ley disponga otra cosa.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">10. Contacto</h2>
              <p className="text-muted-foreground">
                Para cualquier consulta sobre estos términos y condiciones, puedes contactarnos en{' '}
                <a href="mailto:info@motoaccesorios.com" className="text-primary hover:underline">
                  info@motoaccesorios.com
                </a>{' '}
                o llamando al +34 67 996 708.
              </p>
            </section>

            <p className="text-sm text-muted-foreground pt-6 border-t">
              Última actualización: {new Date().toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
