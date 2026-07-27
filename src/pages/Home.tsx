import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import {
  Activity,
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
  Thermometer,
  Wrench,
  Zap,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ProductCard } from '@/components/shared/ProductCard';
import { LeadCaptureModal } from '@/components/shared/LeadCaptureModal';
import { DEFAULT_SEO, getProductUrl } from '@/lib/seo';
import { productService } from '@/services/product.service';
import { Product } from '@/types/models';
import { LeadSource } from '@/types/lead';

const ONBOARD_COMPUTER_SLUG = 'ordenador-bordo-kawasaki';

const deviceFeatures = [
  {
    icon: LayoutDashboard,
    number: '01',
    title: 'Pantalla propia y perfiles de marcha',
    description:
      'El ESP32 lleva su propia pantalla. Puedes cambiar entre perfiles para priorizar marcha, RPM, temperaturas, batería o una vista equilibrada.',
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
    title: 'Avisa cuando la ECU guarda una avería',
    description:
      'La pantalla puede indicar que existen DTC almacenados para que sepas que la moto necesita una revisión, incluso sin abrir la app.',
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
  { model: 'Kawasaki ER-6n', years: 'Todos los años', detail: 'Telemetría y diagnóstico confirmados' },
  { model: 'Kawasaki ER-6f', years: 'Todos los años', detail: 'Telemetría y diagnóstico confirmados' },
  { model: 'Kawasaki Z750', years: 'Compatibilidad confirmada', detail: 'Plataforma Kawasaki KDS / KWP2000' },
];

const developmentSteps = [
  {
    status: 'validated',
    label: 'Validado',
    title: 'Comunicación directa Kawasaki KDS',
    description: 'Fast-init K-Line, sesión KWP2000 y lectura estable de datos sin depender de un ELM327.',
  },
  {
    status: 'validated',
    label: 'Validado',
    title: 'Telemetría, DTC y borrado',
    description: 'Marcha, RPM, velocidad, sensores, lectura de averías, freeze frames y borrado comprobado.',
  },
  {
    status: 'progress',
    label: 'En integración',
    title: 'ESP32, pantalla y carcasa final',
    description: 'Integración del firmware, perfiles de pantalla, electrónica protegida y diseño mecánico del producto.',
  },
  {
    status: 'next',
    label: 'Siguiente fase',
    title: 'Preserie y validación de fabricación',
    description: 'Pruebas térmicas, eléctricas, de montaje y uso continuado antes de abrir la primera serie.',
  },
];

const faqs = [
  {
    question: '¿Ya se puede comprar?',
    answer:
      'Todavía no. El producto sigue en integración del hardware final y no se aceptarán pedidos hasta validar el dispositivo completo sobre la moto.',
  },
  {
    question: '¿Con qué motos es compatible?',
    answer:
      'La compatibilidad está confirmada para Kawasaki ER-6n y ER-6f de todos los años, además de Kawasaki Z750. Otros modelos se publicarán únicamente después de probar conexión, PIDs y comportamiento real.',
  },
  {
    question: '¿Necesita el móvil para funcionar?',
    answer:
      'No. El producto principal es el dispositivo con ESP32 y pantalla integrada. La telemetría y los perfiles de marcha funcionan de forma autónoma; la app amplía el diagnóstico, la configuración y el mantenimiento.',
  },
  {
    question: '¿Es solo un indicador de marcha?',
    answer:
      'No. La marcha es solo uno de los datos. También puede mostrar RPM, velocidad, batería, temperaturas, acelerador, avisos de DTC y valores calculados como el consumo estimado.',
  },
  {
    question: '¿Hay suscripción o necesito crear una cuenta?',
    answer:
      'La V1 está planteada sin suscripción, sin nube y sin cuenta obligatoria. La comunicación con la app se realiza de forma local.',
  },
];

function ScreenPreview() {
  return (
    <div className="relative mx-auto w-full max-w-[590px] lg:ml-auto">
      <div className="absolute -inset-8 rounded-full bg-primary/20 blur-[90px]" />
      <div className="relative overflow-hidden rounded-[2.4rem] border border-white/15 bg-[#171818] p-3 shadow-[0_35px_90px_rgba(0,0,0,0.55)] sm:p-4">
        <div className="overflow-hidden rounded-[1.85rem] border border-white/10 bg-[#070909] p-4 sm:p-6">
          <div className="mb-5 flex items-center justify-between border-b border-white/10 pb-3 text-[10px] font-semibold uppercase tracking-[0.18em] text-white/45 sm:text-xs">
            <span>MotoGear / Ruta</span>
            <span className="flex items-center gap-2 text-emerald-400">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
              ECU conectada
            </span>
          </div>

          <div className="grid grid-cols-[1.25fr_0.75fr] gap-3 sm:gap-4">
            <div className="rounded-2xl border border-white/10 bg-white/[0.035] p-4 sm:p-5">
              <div className="mb-1 flex items-center justify-between text-[10px] uppercase tracking-[0.16em] text-white/40 sm:text-xs">
                <span>Motor</span>
                <Activity className="h-4 w-4 text-primary" />
              </div>
              <div className="font-display text-[3.4rem] font-semibold leading-none tracking-[-0.08em] text-white sm:text-[5.25rem]">
                4280
              </div>
              <div className="mt-1 text-xs font-medium uppercase tracking-[0.2em] text-primary">rpm</div>
              <div className="mt-5 h-1.5 overflow-hidden rounded-full bg-white/10">
                <div className="h-full w-[48%] rounded-full bg-gradient-to-r from-primary to-amber-300" />
              </div>
            </div>

            <div className="flex flex-col items-center justify-center rounded-2xl border border-primary/25 bg-primary/[0.07] p-3 text-center">
              <span className="text-[10px] uppercase tracking-[0.18em] text-white/45 sm:text-xs">Marcha</span>
              <span className="font-display text-6xl font-semibold leading-none text-primary sm:text-7xl">4</span>
              <span className="mt-2 text-[9px] uppercase tracking-[0.16em] text-emerald-400 sm:text-[10px]">Perfil ruta</span>
            </div>
          </div>

          <div className="mt-3 grid grid-cols-3 gap-2 sm:mt-4 sm:gap-4">
            <div className="rounded-xl border border-white/10 bg-white/[0.035] p-3 sm:p-4">
              <Thermometer className="mb-3 h-4 w-4 text-sky-400" />
              <div className="font-display text-xl font-semibold text-white sm:text-2xl">86°</div>
              <div className="mt-1 text-[9px] uppercase tracking-[0.12em] text-white/35 sm:text-[10px]">Refrigerante</div>
            </div>
            <div className="rounded-xl border border-white/10 bg-white/[0.035] p-3 sm:p-4">
              <Zap className="mb-3 h-4 w-4 text-amber-300" />
              <div className="font-display text-xl font-semibold text-white sm:text-2xl">14.2</div>
              <div className="mt-1 text-[9px] uppercase tracking-[0.12em] text-white/35 sm:text-[10px]">Batería</div>
            </div>
            <div className="rounded-xl border border-white/10 bg-white/[0.035] p-3 sm:p-4">
              <Gauge className="mb-3 h-4 w-4 text-primary" />
              <div className="font-display text-xl font-semibold text-white sm:text-2xl">4.8</div>
              <div className="mt-1 text-[9px] uppercase tracking-[0.12em] text-white/35 sm:text-[10px]">l/100 km est.</div>
            </div>
          </div>
        </div>
      </div>
      <div className="relative mx-auto mt-4 flex w-fit items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.14em] text-white/45">
        <CheckCircle2 className="h-3.5 w-3.5 text-primary" />
        Pantalla del dispositivo · no es la app
      </div>
    </div>
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
  const displayedFaqs = faqs.map((faq, index) =>
    index === 0 && isAvailable
      ? {
          ...faq,
          answer:
            'Sí. Cuando la ficha indica “Disponible”, puedes añadirlo al carrito, pagar de forma segura y seguir el pedido desde tu cuenta.',
        }
      : faq,
  );

  const productSchema = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: 'Ordenador de a bordo MotoGear para Kawasaki',
    description: DEFAULT_SEO.defaultDescription,
    image: `${DEFAULT_SEO.siteUrl}/onboard-computer-prototype.svg`,
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
        <meta property="og:image" content={`${DEFAULT_SEO.siteUrl}/onboard-computer-prototype.svg`} />
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
                ? 'Disponible · ER-6n / ER-6f / Z750'
                : isOutOfStock
                  ? 'Temporalmente sin stock · ER-6n / ER-6f / Z750'
                  : 'Producto en desarrollo · compatibilidad Kawasaki confirmada'}
            </div>
          </div>

          <div className="container relative mx-auto grid min-h-[720px] items-center gap-16 px-4 py-20 lg:grid-cols-[0.92fr_1.08fr] lg:py-24 xl:min-h-[780px]">
            <div className="relative z-10 max-w-2xl">
              <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-primary">
                <Radio className="h-3.5 w-3.5" />
                Pantalla propia · app complementaria
              </div>

              <h1 className="font-display text-5xl font-semibold leading-[0.95] tracking-[-0.055em] sm:text-6xl lg:text-[5.15rem]">
                Mucho más que
                <span className="mt-2 block text-primary">un indicador de marcha.</span>
              </h1>

              <p className="mt-7 max-w-xl text-lg leading-relaxed text-white/62 sm:text-xl">
                Un ordenador de a bordo autónomo para tu Kawasaki: muestra telemetría, perfiles de conducción y avisos de
                avería directamente en su pantalla. El móvil solo amplía lo que ya funciona en la moto.
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
                    {isAvailable ? 'Disponible' : isOutOfStock ? 'Sin stock' : 'Próximamente'}
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
                    <Link to={getProductUrl(showcaseProduct.id, showcaseProduct.name)}>
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
                  <Check className="h-4 w-4 text-primary" /> Funciona sin móvil
                </span>
                <span className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-primary" /> Sin suscripción
                </span>
                <span className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-primary" /> Conexión local
                </span>
              </div>
            </div>

            <ScreenPreview />
          </div>

          <div className="border-y border-white/10 bg-white/[0.025]">
            <div className="container grid grid-cols-2 gap-px bg-white/10 px-0 sm:grid-cols-4">
              {[
                ['Pantalla integrada', 'Producto principal'],
                ['KDS / KWP2000', 'Protocolo'],
                ['ESP32-S3', 'Procesamiento'],
                ['WiFi local', 'App opcional'],
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
                <img
                  src="/onboard-computer-prototype.svg"
                  alt="Render 3D del prototipo actual del ordenador de a bordo MotoGear"
                  className="h-auto w-full"
                  loading="eager"
                />
              </div>

              <div>
                <span className="eyebrow">El producto real</span>
                <h2 className="mt-5 font-display text-4xl font-semibold leading-[1.03] tracking-[-0.045em] sm:text-5xl lg:text-6xl">
                  Un dispositivo en la moto. No una app disfrazada.
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
                  Render generado a partir del STL actual del prototipo. La forma exterior, el botón y pequeños detalles de
                  fabricación pueden cambiar antes de la versión comercial.
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
                El móvil amplía el producto. No lo sustituye.
              </h2>
              <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
                La pantalla integrada se ocupa de lo necesario durante la conducción. Cuando quieres más detalle, conectas
                la app por WiFi local, sin cuenta obligatoria ni depender de servidores externos.
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
                  <span className="text-xs font-semibold uppercase tracking-[0.18em] text-white/40">Arquitectura local</span>
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
                <span className="eyebrow text-primary">Compatibilidad confirmada</span>
                <h2 className="mt-5 font-display text-4xl font-semibold leading-[1.04] tracking-[-0.045em] sm:text-5xl">
                  Modelos probados, no una lista genérica.
                </h2>
                <p className="mt-6 leading-relaxed text-white/50">
                  Publicamos como compatible únicamente lo que ya se ha comprobado con el protocolo Kawasaki KDS /
                  KWP2000. Para otros modelos, primero validamos conector, PIDs, fórmulas y diagnóstico.
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
                        Confirmada
                      </span>
                    </div>
                  ))}
                </div>
                <div className="border-t border-white/10 px-6 py-4 text-xs leading-relaxed text-white/35 sm:px-7">
                  ER-6n y ER-6f: compatibilidad confirmada para todos los años. Z750: plataforma confirmada; la ficha del
                  pedido podrá solicitar el año para verificar el conector del kit.
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
                    El ordenador de a bordo es el producto propio de MotoGear. El resto del catálogo continúa integrado con
                    el mismo backend, stock y proceso de compra.
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

        <section id="desarrollo" className="scroll-mt-24 bg-[#f4f3f0] py-24 sm:py-32">
          <div className="container px-4">
            <div className="mx-auto max-w-3xl text-center">
              <span className="eyebrow">Estado del proyecto</span>
              <h2 className="mt-5 font-display text-4xl font-semibold leading-[1.05] tracking-[-0.045em] sm:text-5xl">
                Del protocolo validado a una primera serie fiable.
              </h2>
              <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
                Diferenciamos lo que ya funciona de lo que todavía está en integración para no vender una promesa como si
                fuera un producto terminado.
              </p>
            </div>

            <div className="mx-auto mt-16 max-w-4xl">
              {developmentSteps.map((step, index) => (
                <div
                  key={step.title}
                  className="relative grid gap-4 pb-10 pl-12 sm:grid-cols-[150px_1fr] sm:gap-8 sm:pl-16"
                >
                  {index < developmentSteps.length - 1 && (
                    <div className="absolute left-[15px] top-8 h-[calc(100%-8px)] w-px bg-black/12 sm:left-[23px]" />
                  )}
                  <span
                    className={`absolute left-0 top-0 flex h-8 w-8 items-center justify-center rounded-full border sm:h-12 sm:w-12 ${
                      step.status === 'validated'
                        ? 'border-emerald-500/30 bg-emerald-500 text-white'
                        : step.status === 'progress'
                          ? 'border-primary/30 bg-primary text-white shadow-[0_0_0_8px_rgba(255,78,0,0.08)]'
                          : 'border-black/15 bg-white text-black/35'
                    }`}
                  >
                    {step.status === 'validated' ? (
                      <Check className="h-4 w-4 sm:h-5 sm:w-5" />
                    ) : step.status === 'progress' ? (
                      <Wrench className="h-4 w-4 sm:h-5 sm:w-5" />
                    ) : (
                      <span className="h-2 w-2 rounded-full bg-current" />
                    )}
                  </span>
                  <div
                    className={`pt-1 text-[10px] font-semibold uppercase tracking-[0.16em] sm:pt-4 ${
                      step.status === 'validated'
                        ? 'text-emerald-600'
                        : step.status === 'progress'
                          ? 'text-primary'
                          : 'text-black/35'
                    }`}
                  >
                    {step.label}
                  </div>
                  <div className="rounded-2xl border border-black/8 bg-white p-6 sm:p-7">
                    <h3 className="font-display text-xl font-semibold">{step.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
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
                  ER-6n, ER-6f o Z750
                </div>
                <h2 className="mt-5 font-display text-4xl font-semibold leading-[1.02] tracking-[-0.045em] sm:text-5xl lg:text-6xl">
                  Apúntate al lanzamiento del ordenador de a bordo MotoGear.
                </h2>
              </div>
              <Button
                size="lg"
                className="h-14 shrink-0 rounded-full bg-black px-8 text-base text-white hover:bg-black/85"
                onClick={() => openLeadModal('EARLY_ACCESS')}
              >
                Avisarme del lanzamiento
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
            <div className="mt-12 flex items-center gap-3 border-t border-white/25 pt-6 text-xs text-white/65">
              <ShieldCheck className="h-4 w-4" />
              {isAvailable
                ? 'Producto publicado con precio y stock real. El pago y el seguimiento se gestionan desde tu cuenta.'
                : 'No se aceptarán pagos ni reservas hasta que el producto esté validado para venta.'}
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
