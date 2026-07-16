import { Helmet } from 'react-helmet-async';
import { FileText, Info } from 'lucide-react';

export default function Terms() {
  return (
    <>
      <Helmet>
        <title>Condiciones de uso | MotoGear</title>
        <meta name="description" content="Condiciones de uso de la web y estado comercial del ordenador de a bordo MotoGear." />
        <link rel="canonical" href="https://motogear.es/terms" />
      </Helmet>

      <div className="min-h-screen bg-[#f4f3f0] py-16 sm:py-24">
        <article className="container max-w-4xl px-4">
          <div className="rounded-[2rem] border border-black/8 bg-white p-7 shadow-[0_24px_80px_rgba(15,15,15,0.05)] sm:p-12">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-black text-primary">
              <FileText className="h-5 w-5" />
            </div>
            <h1 className="mt-7 font-display text-4xl font-semibold tracking-[-0.04em]">Condiciones de uso</h1>
            <p className="mt-3 text-sm text-muted-foreground">Información aplicable a la fase actual de motogear.es.</p>

            <div className="mt-9 flex gap-3 rounded-2xl border border-amber-500/20 bg-amber-500/8 p-5 text-sm leading-relaxed text-black/65">
              <Info className="mt-0.5 h-5 w-5 shrink-0 text-amber-600" />
              El ordenador de a bordo MotoGear está en desarrollo. La web no acepta todavía compras, pagos ni reservas del producto.
            </div>

            <div className="mt-10 space-y-9 text-sm leading-relaxed text-muted-foreground">
              <section>
                <h2 className="font-display text-xl font-semibold text-foreground">1. Finalidad de la web</h2>
                <p className="mt-3">
                  motogear.es presenta el desarrollo de un ordenador de a bordo para motocicletas y permite consultar el estado de compatibilidad por modelo. La información técnica se actualiza a medida que avanza la validación.
                </p>
              </section>

              <section>
                <h2 className="font-display text-xl font-semibold text-foreground">2. Estado de las funciones y compatibilidad</h2>
                <p className="mt-3">
                  Las funciones marcadas como validadas se refieren al entorno de pruebas indicado en la propia web. La compatibilidad comercial solo se considerará confirmada cuando se publique expresamente para un modelo y año concretos.
                </p>
              </section>

              <section>
                <h2 className="font-display text-xl font-semibold text-foreground">3. Consultas enviadas por email</h2>
                <p className="mt-3">
                  El formulario de contacto prepara un correo en la aplicación del usuario. La web no almacena el contenido del formulario. Al enviarlo, los datos se recibirán en el buzón de MotoGear únicamente para responder a la consulta y conocer el interés por cada modelo.
                </p>
              </section>

              <section>
                <h2 className="font-display text-xl font-semibold text-foreground">4. Propiedad intelectual</h2>
                <p className="mt-3">
                  La identidad MotoGear, el diseño del sitio y los contenidos propios no pueden reproducirse con fines comerciales sin autorización. Las marcas de fabricantes citadas pertenecen a sus respectivos titulares y se usan solo para identificar compatibilidad.
                </p>
              </section>

              <section>
                <h2 className="font-display text-xl font-semibold text-foreground">5. Condiciones comerciales futuras</h2>
                <p className="mt-3">
                  Antes de abrir pedidos se publicarán el precio, el contenido del producto, los modelos compatibles, la garantía, los plazos, los métodos de pago y las condiciones de envío, devolución y soporte aplicables.
                </p>
              </section>

              <section>
                <h2 className="font-display text-xl font-semibold text-foreground">6. Contacto</h2>
                <p className="mt-3">
                  Para consultas sobre la web o el proyecto, escribe a{' '}
                  <a href="mailto:motogearspain@gmail.com" className="font-semibold text-primary hover:underline">
                    motogearspain@gmail.com
                  </a>.
                </p>
              </section>
            </div>

            <p className="mt-10 border-t border-black/8 pt-6 text-xs text-muted-foreground">
              Última actualización: 16 de julio de 2026
            </p>
          </div>
        </article>
      </div>
    </>
  );
}
