import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  Cable,
  Check,
  CheckCircle2,
  ChevronRight,
  CircleDot,
  Cpu,
  Gauge,
  LayoutDashboard,
  Radio,
  ShieldCheck,
  Smartphone,
  Stethoscope,
  Zap,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ProductCard } from '@/components/shared/ProductCard';
import { LeadCaptureModal } from '@/components/shared/LeadCaptureModal';
import { DEFAULT_SEO } from '@/lib/seo';
import { productService } from '@/services/product.service';
import { Product } from '@/types/models';
import { LeadSource } from '@/types/lead';

import { ONBOARD_COMPUTER_PATH, ONBOARD_COMPUTER_SLUG } from '@/lib/onboard-computer';

const deviceFeatures = [
  {
    icon: LayoutDashboard,
    number: '01',
    title: 'La información que quieres, de un vistazo',
    description:
      'Consulta la marcha, la temperatura del refrigerante y el voltaje de la batería en una pantalla dedicada. Cambia de vista con el botón del dispositivo.',
    note: 'Funciona aunque no conectes el móvil.',
  },
  {
    icon: Gauge,
    number: '02',
    title: 'Mucho más que un indicador de marcha',
    description:
      'Además de la marcha engranada, muestra datos reales de la ECU y valores calculados: RPM, velocidad, voltaje, temperaturas, acelerador y consumo estimado.',
    note: 'Los datos exactos disponibles dependen del modelo.',
  },
  {
    icon: Stethoscope,
    number: '03',
    title: 'Consulta si hay averías registradas',
    description:
      'El indicador de averías muestra el resultado del último escaneo de la ECU. Con la app puedes consultar los códigos y orientar el diagnóstico.',
    note: 'La lectura detallada y el borrado se realizan desde la app.',
  },
];

const appFeatures = [
  'Leer los códigos DTC y ver una explicación comprensible.',
  'Borrar averías y comprobar que realmente han desaparecido.',
  'Consultar el contexto del fallo y posibles pasos de diagnóstico.',
  'Configurar pantallas, datos visibles y perfiles del dispositivo.',
  'Gestionar mantenimientos y recordatorios por fecha o kilometraje.',
  'Ver análisis e históricos con más detalle que en la pantalla de la moto.',
];

const compatibleModels = [
  { model: 'Kawasaki ER-6n', years: 'Todos los años', detail: 'Confirma el tipo de conector' },
  { model: 'Kawasaki ER-6f', years: 'Todos los años', detail: 'Confirma el tipo de conector' },
  { model: 'Kawasaki Z750', years: 'Modelos 2005-2012', detail: 'Confirma el tipo de conector' },
];

const ownershipSteps = [
  { title: 'Comprueba tu modelo', description: 'Indícanos el modelo, el año y el conector de tu Kawasaki para confirmar el kit adecuado antes de comprar.' },
  { title: 'Conecta y coloca la pantalla', description: 'El dispositivo se alimenta desde la moto. Revisa las instrucciones de montaje y coloca el cable sin interferir con la dirección ni los mandos.' },
  { title: 'Disfruta de la información', description: 'Usa la pantalla sin depender del teléfono. La app complementa el equipo con diagnóstico y configuración cuando la moto está detenida.' },
];

const faqs = [
  {
    question: '¿Dónde consigo la app?',
    answer: 'La publicación en Google Play y App Store está pendiente. Antes de comprar, consúltanos el acceso disponible para tu teléfono. La pantalla del dispositivo funciona de forma autónoma; el diagnóstico detallado y la configuración desde el móvil requieren la app.',
  },
  {
    question: '¿Cómo puedo comprarlo?',
    answer:
      'Consulta el precio y la disponibilidad en la ficha del producto. Si no hay unidades, puedes pedir un aviso de reposición. Confirma primero la compatibilidad con tu moto.',
  },
  {
    question: '¿Con qué motos es compatible?',
    answer:
      'El equipo es compatible con Kawasaki ER-6n y ER-6f de todos los años, y con Kawasaki Z750 de los modelos 2005 a 2012. Confirma el tipo de conector antes de comprar.',
  },
  {
    question: '¿Necesita el móvil para funcionar?',
    answer:
      'No. El producto principal es el dispositivo con pantalla integrada. La telemetría y los perfiles de marcha funcionan de forma autónoma; la app amplía el diagnóstico, la configuración y el mantenimiento.',
  },
  {
    question: '¿Es solo un indicador de marcha?',
    answer:
      'No. La marcha es solo uno de los datos. También puede mostrar RPM, velocidad, batería, temperaturas, acelerador, avisos de DTC y valores calculados como el consumo estimado.',
  },
  {
    question: '¿Necesito una cuenta para usar el dispositivo?',
    answer:
      'El dispositivo funciona sin cuenta y sin suscripción. La app se conecta por WiFi o Bluetooth. La cuenta de la tienda sirve para gestionar compras y pedidos; es independiente del uso del lector.',
  },
];

function ProductPhoto() {
  return (
    <figure className="relative mx-auto w-full max-w-[650px] lg:ml-auto">
      <div className="absolute inset-8 rounded-full bg-primary/15 blur-[80px]" />
      <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-[#151414] shadow-[0_35px_90px_rgba(0,0,0,0.4)]">
        <img
          src="/media/motogear-producto.webp"
          alt="Ordenador de a bordo MotoGear con carcasa negra y pantalla de marcha, voltaje y temperatura"
          width={1774}
          height={887}
          fetchPriority="high"
          className="aspect-[6/5] w-full object-cover object-[100%_center]"
        />
      </div>
      <figcaption className="relative mt-5 flex items-center justify-center gap-2 text-xs font-medium tracking-wide text-white/60">
        <CheckCircle2 className="h-4 w-4 text-primary" />
        MotoGear. Pantalla propia, información al instante.
      </figcaption>
    </figure>
  );
}

export default function Home() {
  const [showcaseProduct, setShowcaseProduct] = useState<Product | null>(null);
  const [otherProducts, setOtherProducts] = useState<Product[]>([]);
  const [leadModalOpen, setLeadModalOpen] = useState(false);
  const [leadSource, setLeadSource] = useState<LeadSource>('EARLY_ACCESS');

  const openLeadModal = (source: LeadSource) => {
    setLeadSource(source);
    setLeadModalOpen(true);
  };

  useEffect(() => {
    productService
      .getProductBySlug(ONBOARD_COMPUTER_SLUG)
      .then(setShowcaseProduct)
      .catch(() => setShowcaseProduct(null));

    productService
      .getProducts(0, 8)
      .then((products) =>
        setOtherProducts(products.filter((product) => product.slug !== ONBOARD_COMPUTER_SLUG).slice(0, 4)),
      )
      .catch(() => setOtherProducts([]));
  }, []);

  const formattedPrice = showcaseProduct?.sellPrice
    ? new Intl.NumberFormat('es-ES', {
        style: 'currency',
        currency: showcaseProduct.currency || 'EUR',
      }).format(showcaseProduct.sellPrice)
    : null;
  const isAvailable = showcaseProduct?.status === 'AVAILABLE' && showcaseProduct.purchasable;
  const isOutOfStock = showcaseProduct?.status === 'OUT_OF_STOCK';
  const displayedFaqs = faqs.map((faq) =>
    faq.question === '¿Cómo puedo comprarlo?' && isAvailable
      ? {
          ...faq,
          answer:
            'Cuando la ficha indica “Disponible”, puedes añadirlo al carrito, pagar de forma segura y seguir el pedido desde tu cuenta.',
        }
      : faq,
  );

  const productSchema = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: 'Ordenador de a bordo MotoGear para Kawasaki',
    description: DEFAULT_SEO.defaultDescription,
    image: `${DEFAULT_SEO.siteUrl}/media/motogear-producto.webp`,
    brand: { '@type': 'Brand', name: 'MotoGear' },
    category: 'Electrónica para motocicletas',
    ...(formattedPrice && showcaseProduct
      ? {
          offers: {
            '@type': 'Offer',
            price: showcaseProduct.sellPrice,
            priceCurrency: showcaseProduct.currency || 'EUR',
            availability: isAvailable ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock',
          },
        }
      : {}),
  };

  return (
    <>
      <Helmet>
        <title>{DEFAULT_SEO.defaultTitle}</title>
        <meta name="description" content={DEFAULT_SEO.defaultDescription} />
        <meta
          name="keywords"
          content="ordenador de a bordo Kawasaki, Kawasaki ER-6n, Kawasaki ER-6f, Kawasaki Z750, indicador de marcha, telemetría moto, lector DTC Kawasaki, pantalla ESP32"
        />
        <link rel="canonical" href={DEFAULT_SEO.siteUrl} />
        <meta property="og:title" content={DEFAULT_SEO.defaultTitle} />
        <meta property="og:description" content={DEFAULT_SEO.defaultDescription} />
        <meta property="og:image" content={`${DEFAULT_SEO.siteUrl}/media/motogear-producto.webp`} />
        <script type="application/ld+json">{JSON.stringify(productSchema)}</script>
      </Helmet>

      <div className="overflow-hidden bg-background">
        <section className="relative isolate bg-[#080909] text-white">
          <div className="absolute inset-0 circuit-grid opacity-35" />
          <div className="absolute left-1/2 top-0 h-px w-[72%] -translate-x-1/2 bg-gradient-to-r from-transparent via-primary/70 to-transparent" />

          <div className="border-b border-white/10 bg-white/[0.025]">
            <div className="container flex min-h-10 items-center justify-center gap-2 px-4 py-2 text-center text-[11px] font-semibold uppercase tracking-[0.14em] text-white/60 sm:text-xs">
              <CircleDot className="h-3.5 w-3.5 text-primary" />
              {isAvailable
                ? 'Disponible · Nuevo lanzamiento para tu Moto'
                : isOutOfStock
                  ? 'Temporalmente sin stock · solicita un aviso de reposición'
                  : 'MotoGear para Kawasaki · pantalla autónoma y diagnóstico'}
            </div>
          </div>

          <div className="container relative mx-auto grid min-h-[720px] items-center gap-16 px-4 py-20 lg:grid-cols-[0.92fr_1.08fr] lg:py-24 xl:min-h-[780px]">
            <div className="relative z-10 max-w-2xl">
              <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-primary">
                <Radio className="h-3.5 w-3.5" />
                Pantalla propia · app complementaria
              </div>

              <h1 className="font-display text-5xl font-semibold leading-[0.95] tracking-[-0.055em] sm:text-6xl lg:text-[5.15rem]">
               Conoce mejor
                <span className="mt-2 block text-primary">tu Kawasaki.</span>
              </h1>

              <p className="mt-7 max-w-xl text-lg leading-relaxed text-white/62 sm:text-xl">
                Marcha engranada, temperatura y batería en una pantalla que funciona sin el móvil. Y, cuando necesitas más información, diagnóstico de averías y configuración desde la app complementaria.
              </p>

              {showcaseProduct && (
                <div className="mt-7 flex flex-wrap items-center gap-3">
                  <span
                    className={`rounded-full border px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.14em] ${
                      isAvailable
                        ? 'border-emerald-400/30 bg-emerald-400/10 text-emerald-400'
                        : isOutOfStock
                          ? 'border-red-400/30 bg-red-400/10 text-red-300'
                          : 'border-amber-300/30 bg-amber-300/10 text-amber-300'
                    }`}
                  >
                    {isAvailable ? 'Disponible' : isOutOfStock ? 'Sin stock' : 'Consultar disponibilidad'}
                  </span>
                  {formattedPrice && <span className="font-display text-xl font-semibold text-white">{formattedPrice}</span>}
                  {showcaseProduct.lowStock && isAvailable && (
                    <span className="text-xs text-amber-300">Últimas {showcaseProduct.stockQuantity} unidades</span>
                  )}
                </div>
              )}

              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                {isAvailable && showcaseProduct ? (
                  <Button
                    asChild
                    size="lg"
                    className="h-[52px] rounded-full px-7 text-base font-semibold shadow-[0_12px_35px_rgba(255,78,0,0.25)]"
                  >
                    <Link to={ONBOARD_COMPUTER_PATH}>
                      Comprar {formattedPrice}
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                ) : (
                  <Button
                    size="lg"
                    className="h-[52px] rounded-full px-7 text-base font-semibold shadow-[0_12px_35px_rgba(255,78,0,0.25)]"
                    onClick={() => openLeadModal(isOutOfStock ? 'EARLY_ACCESS' : 'COMPATIBILITY')}
                  >
                    {isOutOfStock ? 'Avisarme cuando vuelva' : 'Consultar compatibilidad'}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                )}
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="h-[52px] rounded-full border-white/20 bg-white/5 px-7 text-base text-white hover:bg-white/10 hover:text-white"
                >
                  <a href="#producto">Ver el dispositivo</a>
                </Button>
              </div>

              <div className="mt-10 flex flex-wrap gap-x-6 gap-y-3 text-xs font-medium uppercase tracking-[0.12em] text-white/45">
                <span className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-primary" /> Plug & Play
                </span>
                <span className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-primary" /> Lectura directa de ECU
                </span>
                <span className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-primary" /> Escáner de averías FI
                </span>
              </div>
            </div>

            <ProductPhoto />
          </div>

          <div className="border-y border-white/10 bg-white/[0.025]">
            <div className="container grid grid-cols-2 gap-px bg-white/10 px-0 sm:grid-cols-4">
              {[
                ['Pantalla integrada', 'TFT en color'],
                ['Lector ECU', 'KWP2000'],
                ['ESP32-S3', 'Procesamiento'],
                ['Conexión WiFi / Bluetooth', 'App complementaria'],
              ].map(([value, label]) => (
                <div key={label} className="bg-[#0b0c0c] px-5 py-6 text-center">
                  <div className="font-display text-lg font-semibold text-white sm:text-xl">{value}</div>
                  <div className="mt-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-white/35">{label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="producto" className="scroll-mt-24 bg-[#f4f3f0] py-24 sm:py-32">
          <div className="container px-4">
            <div className="grid items-center gap-14 lg:grid-cols-[1.08fr_0.92fr]">
              <div className="overflow-hidden rounded-[2rem] border border-black/10 bg-[#101111] shadow-[0_30px_90px_rgba(0,0,0,0.16)]">
                <video
                  controls
                  playsInline
                  preload="none"
                  poster="/media/motogear-demo-poster.webp"
                  aria-label="Demostración de MotoGear y su app en una Kawasaki"
                  className="aspect-video w-full bg-black object-contain"
                >
                  <source src="/media/motogear-demo.mp4" type="video/mp4" />
                  <a href="/media/motogear-demo.mp4">Ver la demostración de MotoGear</a>
                </video>
                <div className="flex items-center gap-2 border-t border-white/10 px-5 py-4 text-xs text-white/60">
                  <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                  Dispositivo y app en acción
                </div>
              </div>

              <div>
                <span className="eyebrow">Diseñado para tu Kawasaki</span>
                <h2 className="mt-5 font-display text-4xl font-semibold leading-[1.03] tracking-[-0.045em] sm:text-5xl lg:text-6xl">
                  Más información en tu cuadro.
                </h2>
                <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
                  El equipo se conecta al diagnóstico Kawasaki, lee la ECU, procesa los datos y los muestra en su propia
                  pantalla. Puedes conducir, cambiar de perfil y detectar que existe una avería sin sacar el teléfono.
                </p>

                <div className="mt-8 grid gap-3 sm:grid-cols-2">
                  {[
                    'Perfiles de pantalla para ruta, diagnóstico o datos esenciales.',
                    'Marcha, RPM, velocidad, batería, temperaturas y acelerador.',
                    'Consumo estimado y otros valores calculados por el dispositivo.',
                    'Aviso visual cuando la ECU tiene códigos DTC almacenados.',
                  ].map((item) => (
                    <div key={item} className="flex gap-3 rounded-2xl border border-black/8 bg-white p-4 text-sm leading-relaxed">
                      <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                      {item}
                    </div>
                  ))}
                </div>

                <p className="mt-5 text-xs leading-relaxed text-black/45">
                  Mira cómo funciona en una Kawasaki real. Consulta las características y el contenido del kit en la ficha del producto.
                </p>
              </div>
            </div>

            <div className="mt-20 grid gap-5 lg:grid-cols-3">
              {deviceFeatures.map((feature) => (
                <article
                  key={feature.title}
                  className="group flex min-h-[390px] flex-col rounded-[1.75rem] border border-black/8 bg-white p-7 shadow-[0_16px_55px_rgba(15,15,15,0.05)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_24px_65px_rgba(15,15,15,0.09)] sm:p-9"
                >
                  <div className="flex items-start justify-between">
                    <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-black text-primary">
                      <feature.icon className="h-6 w-6" />
                    </span>
                    <span className="font-display text-sm font-semibold tracking-[0.16em] text-black/20">{feature.number}</span>
                  </div>
                  <h3 className="mt-10 font-display text-2xl font-semibold tracking-[-0.025em]">{feature.title}</h3>
                  <p className="mt-4 text-base leading-relaxed text-muted-foreground">{feature.description}</p>
                  <p className="mt-auto border-t border-black/8 pt-6 text-xs leading-relaxed text-black/45">{feature.note}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="app" className="scroll-mt-24 bg-white py-24 sm:py-32">
          <div className="container grid items-center gap-16 px-4 lg:grid-cols-[0.85fr_1.15fr]">
            <div>
              <span className="eyebrow">App complementaria</span>
              <h2 className="mt-5 font-display text-4xl font-semibold leading-[1.04] tracking-[-0.045em] sm:text-5xl">
                Entiende los códigos de avería. Configura tu pantalla.
              </h2>
              <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
                La pantalla integrada se ocupa de lo necesario durante la conducción. Cuando quieres más detalles, conectas
                la app por WiFi, obteniendo acceso a diagnósticos, configuración, mantenimiento y mas.
              </p>

              <ul className="mt-8 space-y-4">
                {appFeatures.map((item) => (
                  <li key={item} className="flex gap-3 text-sm leading-relaxed text-foreground/75">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="relative">
              <div className="absolute -inset-12 rounded-full bg-primary/5 blur-3xl" />
              <div className="relative overflow-hidden rounded-[2rem] border border-black/10 bg-[#0a0b0b] p-6 text-white shadow-[0_30px_90px_rgba(0,0,0,0.17)] sm:p-9">
                <div className="mb-10 flex items-center justify-between">
                  <span className="text-xs font-semibold uppercase tracking-[0.18em] text-white/40">Así funciona</span>
                  <span className="flex items-center gap-2 text-xs text-emerald-400">
                    <span className="h-2 w-2 rounded-full bg-emerald-400" /> Sin nube
                  </span>
                </div>

                {[
                  { icon: Cable, label: 'Conector de diagnóstico', detail: 'K-Line de la motocicleta' },
                  { icon: Cpu, label: 'Dispositivo MotoGear', detail: 'Lee, interpreta y calcula' },
                  { icon: LayoutDashboard, label: 'Pantalla integrada', detail: 'Producto principal en la moto' },
                  { icon: Smartphone, label: 'App complementaria', detail: 'Diagnóstico, configuración y mantenimiento' },
                ].map((step, index, array) => (
                  <div key={step.label}>
                    <div className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.04] p-4 sm:p-5">
                      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/15 text-primary">
                        <step.icon className="h-5 w-5" />
                      </span>
                      <div>
                        <div className="font-display font-semibold">{step.label}</div>
                        <div className="mt-1 text-xs text-white/40">{step.detail}</div>
                      </div>
                      <span className="ml-auto font-display text-xs text-white/20">0{index + 1}</span>
                    </div>
                    {index < array.length - 1 && (
                      <div className="ml-[2.15rem] h-5 w-px bg-gradient-to-b from-primary/70 to-white/15" />
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="compatibilidad" className="scroll-mt-24 bg-[#101111] py-24 text-white sm:py-32">
          <div className="container px-4">
            <div className="grid gap-12 lg:grid-cols-[0.7fr_1.3fr]">
              <div>
                <span className="eyebrow text-primary">Compatibilidad</span>
                <h2 className="mt-5 font-display text-4xl font-semibold leading-[1.04] tracking-[-0.045em] sm:text-5xl">
                  Tu modelo y tu año importan.
                </h2>
                <p className="mt-6 leading-relaxed text-white/50">
                  Antes de pedir tu equipo, confirma la versión de tu moto. Te ayudamos a comprobar el año, el conector y las funciones disponibles para evitar una compra equivocada.
                </p>
                <Button
                  variant="outline"
                  className="mt-8 rounded-full border-white/20 bg-white/5 text-white hover:bg-white/10 hover:text-white"
                  onClick={() => openLeadModal('COMPATIBILITY')}
                >
                  Consultar otro modelo <ChevronRight className="ml-1 h-4 w-4" />
                </Button>
              </div>

              <div className="overflow-hidden rounded-[1.75rem] border border-white/10 bg-white/[0.035]">
                <div className="grid gap-px bg-white/10">
                  {compatibleModels.map((item) => (
                    <div
                      key={item.model}
                      className="grid gap-5 bg-[#151616] p-6 sm:grid-cols-[1fr_0.8fr_auto] sm:items-center sm:p-7"
                    >
                      <div>
                        <div className="text-[10px] font-semibold uppercase tracking-[0.18em] text-white/35">Modelo</div>
                        <div className="mt-2 font-display text-xl font-semibold">{item.model}</div>
                      </div>
                      <div>
                        <div className="text-[10px] font-semibold uppercase tracking-[0.18em] text-white/35">Cobertura</div>
                        <div className="mt-2 text-sm text-white/65">{item.years}</div>
                        <div className="mt-1 text-xs text-white/35">{item.detail}</div>
                      </div>
                      <span className="w-fit rounded-full border border-emerald-400/25 bg-emerald-400/10 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.13em] text-emerald-400">
                        Consultar
                      </span>
                    </div>
                  ))}
                </div>
                <div className="border-t border-white/10 px-6 py-4 text-xs leading-relaxed text-white/35 sm:px-7">
                  Envíanos el modelo y, si puedes, una foto del conector para confirmar el cableado adecuado.
                </div>
              </div>
            </div>
          </div>
        </section>

        {otherProducts.length > 0 && (
          <section id="tienda" className="scroll-mt-24 border-y border-black/8 bg-white py-20 sm:py-24">
            <div className="container px-4">
              <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
                <div className="max-w-2xl">
                  <span className="eyebrow">La tienda MotoGear</span>
                  <h2 className="mt-5 font-display text-4xl font-semibold tracking-[-0.045em] sm:text-5xl">
                    Equipamiento y accesorios seleccionados.
                  </h2>
                  <p className="mt-4 text-muted-foreground">
                    Compra nuestro ordenador de a bordo de MotoGear. O explora mas productos de nuestra tienda.
                  </p>
                </div>
                <Button asChild variant="outline" className="rounded-full">
                  <Link to="/catalog">
                    Explorar catálogo <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>

              <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {otherProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </div>
          </section>
        )}

        <section id="como-funciona" className="scroll-mt-24 bg-[#f4f3f0] py-24">
          <div className="container px-4">
            <span className="eyebrow">De la compra a tu moto</span>
            <h2 className="mt-5 font-display text-4xl font-semibold">Sabes qué compras. Sabes cómo empezar.</h2>
            <div className="mt-10 grid gap-6 md:grid-cols-3">
              {ownershipSteps.map((step, index) => (
                <article key={step.title} className="rounded-2xl border border-black/10 bg-white p-7">
                  <span className="text-sm font-semibold text-primary">0{index + 1}</span>
                  <h3 className="mt-4 font-display text-xl font-semibold">{step.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{step.description}</p>
                </article>
              ))}
            </div>
            <p className="mt-8 text-sm text-muted-foreground">¿Tienes dudas antes o después de comprar? <Link to="/contact" className="font-semibold text-primary underline">Contacta directamente con MotoGear.</Link></p>
          </div>
        </section>

        <section id="faq" className="scroll-mt-24 bg-white py-24 sm:py-32">
          <div className="container grid gap-14 px-4 lg:grid-cols-[0.7fr_1.3fr]">
            <div>
              <span className="eyebrow">Preguntas frecuentes</span>
              <h2 className="mt-5 font-display text-4xl font-semibold leading-[1.04] tracking-[-0.045em] sm:text-5xl">
                Lo importante, sin letra pequeña.
              </h2>
            </div>
            <div className="divide-y divide-black/10 border-y border-black/10">
              {displayedFaqs.map((faq) => (
                <details key={faq.question} className="group py-6">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-6 font-display text-lg font-semibold [&::-webkit-details-marker]:hidden">
                    {faq.question}
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-black/10 text-primary transition group-open:rotate-45">
                      +
                    </span>
                  </summary>
                  <p className="max-w-2xl pr-12 pt-4 text-sm leading-relaxed text-muted-foreground">{faq.answer}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-primary py-20 text-white sm:py-24">
          <div className="container px-4">
            <div className="flex flex-col items-start justify-between gap-10 lg:flex-row lg:items-end">
              <div className="max-w-3xl">
                <div className="text-xs font-semibold uppercase tracking-[0.18em] text-white/65">
                  Para tu Kawasaki
                </div>
                <h2 className="mt-5 font-display text-4xl font-semibold leading-[1.02] tracking-[-0.045em] sm:text-5xl lg:text-6xl">
                  Dale a tu Kawasaki una nueva forma de mostrarte lo que pasa.
                </h2>
              </div>
              {isAvailable && showcaseProduct ? (
                <Button asChild size="lg" className="h-14 shrink-0 rounded-full bg-black px-8 text-base text-white hover:bg-black/85">
                  <Link to={ONBOARD_COMPUTER_PATH}>Comprar {formattedPrice}<ArrowRight className="ml-2 h-5 w-5" /></Link>
                </Button>
              ) : (
                <Button size="lg" className="h-14 shrink-0 rounded-full bg-black px-8 text-base text-white hover:bg-black/85" onClick={() => openLeadModal('EARLY_ACCESS')}>
                  Avisarme cuando haya unidades<ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              )}
            </div>
            <div className="mt-12 flex items-center gap-3 border-t border-white/25 pt-6 text-xs text-white/65">
              <ShieldCheck className="h-4 w-4" />
              {isAvailable
                ? 'Consulta tu pedido desde tu cuenta. Tienes información de envío, devoluciones y contacto a tu disposición.'
                : 'El aviso de disponibilidad no implica una compra ni requiere un pago.'}
            </div>
          </div>
        </section>
      </div>

      <LeadCaptureModal
        open={leadModalOpen}
        onOpenChange={setLeadModalOpen}
        source={leadSource}
        productSlug={showcaseProduct?.slug ?? ONBOARD_COMPUTER_SLUG}
      />
    </>
  );
}
