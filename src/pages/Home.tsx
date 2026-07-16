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
  Radio,
  ShieldCheck,
  Smartphone,
  Stethoscope,
  Thermometer,
  Wrench,
  Zap,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { DEFAULT_SEO } from '@/lib/seo';

const features = [
  {
    icon: Gauge,
    number: '01',
    title: 'Telemetría que sí entiendes',
    description:
      'RPM, velocidad, temperaturas, acelerador, marcha y más datos de la ECU reunidos en una pantalla pensada para conducir.',
    note: 'Los parámetros disponibles dependen del modelo de moto.',
  },
  {
    icon: Stethoscope,
    number: '02',
    title: 'Diagnóstico sin adivinar',
    description:
      'Lee los códigos de avería almacenados, consulta su contexto y confirma si se han eliminado después del borrado.',
    note: 'El borrado se realiza con confirmación, contacto ON y motor parado.',
  },
  {
    icon: Smartphone,
    number: '03',
    title: 'La información, también en tu móvil',
    description:
      'El dispositivo comparte los datos con una app complementaria cuando la necesitas, sin convertir el teléfono en la pantalla principal.',
    note: 'Conexión local: la V1 no necesita cuenta ni nube.',
  },
];

const developmentSteps = [
  {
    status: 'validated',
    label: 'Validado',
    title: 'Comunicación Kawasaki KDS',
    description: 'Sesión KWP2000, telemetría y diagnóstico probados en el laboratorio con ELM327.',
  },
  {
    status: 'validated',
    label: 'Validado',
    title: 'Lectura y borrado de DTC',
    description: 'Flujo seguro de lectura, confirmación, borrado y nueva lectura de comprobación.',
  },
  {
    status: 'progress',
    label: 'En integración',
    title: 'Hardware directo K-Line',
    description: 'Migración a ESP32 + L9637D para eliminar el adaptador de pruebas y crear un único equipo.',
  },
  {
    status: 'next',
    label: 'Siguiente fase',
    title: 'Pruebas en moto y preserie',
    description: 'Validación eléctrica, térmica y mecánica antes de abrir pedidos comerciales.',
  },
];

const faqs = [
  {
    question: '¿Ya se puede comprar?',
    answer:
      'Todavía no. El producto está en fase de integración del hardware final y no queremos aceptar pedidos hasta validar el dispositivo completo sobre la moto.',
  },
  {
    question: '¿Con qué motos será compatible?',
    answer:
      'La primera plataforma es Kawasaki con diagnóstico KDS/KWP2000 y la ER-6n es la moto de desarrollo. Cada modelo y año se confirmará individualmente antes de anunciar compatibilidad comercial.',
  },
  {
    question: '¿Necesita el móvil para funcionar?',
    answer:
      'No. El objetivo es que la pantalla y la lectura de la ECU funcionen como un único dispositivo. El móvil será una extensión para diagnóstico, configuración y datos más detallados.',
  },
  {
    question: '¿Hay suscripción o necesito crear una cuenta?',
    answer:
      'La V1 está planteada sin suscripción, sin nube y sin cuenta obligatoria. La comunicación con la app se realiza de forma local.',
  },
];

function DashboardPreview() {
  return (
    <div className="relative mx-auto w-full max-w-[590px] lg:ml-auto">
      <div className="absolute -inset-8 rounded-full bg-primary/20 blur-[90px]" />
      <div className="absolute -left-8 top-12 hidden h-28 w-28 rounded-full border border-white/10 lg:block" />
      <div className="absolute -right-4 bottom-4 hidden h-16 w-16 rounded-full border border-primary/30 lg:block" />

      <div className="relative rotate-[1.5deg] rounded-[2.4rem] border border-white/15 bg-[#202020] p-2.5 shadow-[0_35px_90px_rgba(0,0,0,0.55)] sm:p-4">
        <div className="absolute left-8 top-1/2 h-2.5 w-2.5 -translate-y-1/2 rounded-full border border-white/20 bg-black shadow-inner" />
        <div className="absolute right-8 top-1/2 h-2.5 w-2.5 -translate-y-1/2 rounded-full border border-white/20 bg-black shadow-inner" />

        <div className="overflow-hidden rounded-[1.75rem] border border-white/10 bg-[#070909] p-4 sm:p-6">
          <div className="mb-5 flex items-center justify-between border-b border-white/10 pb-3 text-[10px] font-semibold uppercase tracking-[0.18em] text-white/45 sm:text-xs">
            <span>MotoGear / Live</span>
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
                1280
              </div>
              <div className="mt-1 text-xs font-medium uppercase tracking-[0.2em] text-primary">rpm</div>
              <div className="mt-5 h-1.5 overflow-hidden rounded-full bg-white/10">
                <div className="h-full w-[36%] rounded-full bg-gradient-to-r from-primary to-amber-300" />
              </div>
              <div className="mt-2 flex justify-between text-[9px] text-white/25 sm:text-[10px]">
                <span>0</span>
                <span>4</span>
                <span>8</span>
                <span>12k</span>
              </div>
            </div>

            <div className="flex flex-col items-center justify-center rounded-2xl border border-primary/25 bg-primary/[0.07] p-3 text-center">
              <span className="text-[10px] uppercase tracking-[0.18em] text-white/45 sm:text-xs">Marcha</span>
              <span className="font-display text-6xl font-semibold leading-none text-primary sm:text-7xl">N</span>
              <span className="mt-2 text-[9px] uppercase tracking-[0.16em] text-emerald-400 sm:text-[10px]">Punto muerto</span>
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
              <div className="mt-1 text-[9px] uppercase tracking-[0.12em] text-white/35 sm:text-[10px]">Voltios</div>
            </div>
            <div className="rounded-xl border border-white/10 bg-white/[0.035] p-3 sm:p-4">
              <Gauge className="mb-3 h-4 w-4 text-primary" />
              <div className="font-display text-xl font-semibold text-white sm:text-2xl">2%</div>
              <div className="mt-1 text-[9px] uppercase tracking-[0.12em] text-white/35 sm:text-[10px]">Acelerador</div>
            </div>
          </div>
        </div>
      </div>

      <div className="relative mx-auto h-9 w-40 bg-gradient-to-b from-[#1d1d1d] to-[#0b0b0b] [clip-path:polygon(12%_0,88%_0,100%_100%,0_100%)]" />
      <div className="relative mx-auto h-3 w-56 rounded-full bg-[#171717] shadow-xl" />
    </div>
  );
}

export default function Home() {
  const productSchema = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: 'Ordenador de a bordo MotoGear para Kawasaki',
    description: DEFAULT_SEO.defaultDescription,
    brand: { '@type': 'Brand', name: 'MotoGear' },
    category: 'Electrónica para motocicletas',
    releaseDate: 'En desarrollo',
  };

  return (
    <>
      <Helmet>
        <title>{DEFAULT_SEO.defaultTitle}</title>
        <meta name="description" content={DEFAULT_SEO.defaultDescription} />
        <meta
          name="keywords"
          content="ordenador de a bordo moto, Kawasaki KDS, diagnóstico Kawasaki, telemetría moto, lector DTC Kawasaki, pantalla moto"
        />
        <link rel="canonical" href={DEFAULT_SEO.siteUrl} />
        <meta property="og:title" content={DEFAULT_SEO.defaultTitle} />
        <meta property="og:description" content={DEFAULT_SEO.defaultDescription} />
        <script type="application/ld+json">{JSON.stringify(productSchema)}</script>
      </Helmet>

      <div className="overflow-hidden bg-background">
        <section className="relative isolate bg-[#080909] text-white">
          <div className="absolute inset-0 circuit-grid opacity-35" />
          <div className="absolute left-1/2 top-0 h-px w-[72%] -translate-x-1/2 bg-gradient-to-r from-transparent via-primary/70 to-transparent" />

          <div className="border-b border-white/10 bg-white/[0.025]">
            <div className="container flex min-h-10 items-center justify-center gap-2 px-4 py-2 text-center text-[11px] font-semibold uppercase tracking-[0.14em] text-white/60 sm:text-xs">
              <CircleDot className="h-3.5 w-3.5 text-primary" />
              Producto en desarrollo · Primera plataforma: Kawasaki
            </div>
          </div>

          <div className="container relative mx-auto grid min-h-[720px] items-center gap-16 px-4 py-20 lg:grid-cols-[0.9fr_1.1fr] lg:py-24 xl:min-h-[780px]">
            <div className="relative z-10 max-w-2xl">
              <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-primary">
                <Radio className="h-3.5 w-3.5" />
                Datos reales. Sin suposiciones.
              </div>

              <h1 className="font-display text-5xl font-semibold leading-[0.95] tracking-[-0.055em] sm:text-6xl lg:text-[5.3rem]">
                Tu Kawasaki,
                <span className="mt-2 block text-primary">por fin, habla claro.</span>
              </h1>

              <p className="mt-7 max-w-xl text-lg leading-relaxed text-white/62 sm:text-xl">
                Un ordenador de a bordo que convierte los datos de la ECU en información útil para conducir,
                entender tu moto y detectar averías.
              </p>

              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <Button asChild size="lg" className="h-[52px] rounded-full px-7 text-base font-semibold shadow-[0_12px_35px_rgba(255,78,0,0.25)]">
                  <Link to="/contact?subject=compatibility">
                    Consultar compatibilidad
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="h-[52px] rounded-full border-white/20 bg-white/5 px-7 text-base text-white hover:bg-white/10 hover:text-white">
                  <a href="#como-funciona">Ver cómo funciona</a>
                </Button>
              </div>

              <div className="mt-10 flex flex-wrap gap-x-6 gap-y-3 text-xs font-medium uppercase tracking-[0.12em] text-white/45">
                <span className="flex items-center gap-2"><Check className="h-4 w-4 text-primary" /> Sin suscripción</span>
                <span className="flex items-center gap-2"><Check className="h-4 w-4 text-primary" /> Sin nube obligatoria</span>
                <span className="flex items-center gap-2"><Check className="h-4 w-4 text-primary" /> Diseñado en España</span>
              </div>
            </div>

            <DashboardPreview />
          </div>

          <div className="border-y border-white/10 bg-white/[0.025]">
            <div className="container grid grid-cols-2 gap-px bg-white/10 px-0 sm:grid-cols-4">
              {[
                ['KDS / KWP2000', 'Protocolo'],
                ['ESP32', 'Procesamiento'],
                ['K-Line', 'Conexión ECU'],
                ['WebSocket', 'App local'],
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
            <div className="grid items-end gap-10 lg:grid-cols-[0.9fr_1.1fr]">
              <div>
                <span className="eyebrow">Una sola pieza. Un objetivo.</span>
                <h2 className="mt-5 max-w-xl font-display text-4xl font-semibold leading-[1.03] tracking-[-0.045em] sm:text-5xl lg:text-6xl">
                  Saber qué ocurre en tu moto, mientras ocurre.
                </h2>
              </div>
              <div className="lg:pb-2">
                <p className="max-w-2xl text-lg leading-relaxed text-muted-foreground">
                  No es otro adaptador OBD genérico. MotoGear está construyendo un dispositivo específico que se conecta
                  al diagnóstico Kawasaki, interpreta su protocolo y presenta solo lo que aporta valor en ruta o en el garaje.
                </p>
                <div className="mt-6 flex items-center gap-3 text-sm font-semibold">
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-white"><Cable className="h-4 w-4" /></span>
                  Conecta · interpreta · muestra · comparte
                </div>
              </div>
            </div>

            <div className="mt-16 grid gap-5 lg:grid-cols-3">
              {features.map((feature) => (
                <article key={feature.title} className="group flex min-h-[390px] flex-col rounded-[1.75rem] border border-black/8 bg-white p-7 shadow-[0_16px_55px_rgba(15,15,15,0.05)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_24px_65px_rgba(15,15,15,0.09)] sm:p-9">
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

        <section id="como-funciona" className="scroll-mt-24 bg-white py-24 sm:py-32">
          <div className="container grid items-center gap-16 px-4 lg:grid-cols-2">
            <div className="relative order-2 lg:order-1">
              <div className="absolute -inset-12 rounded-full bg-primary/5 blur-3xl" />
              <div className="relative overflow-hidden rounded-[2rem] border border-black/10 bg-[#0a0b0b] p-6 text-white shadow-[0_30px_90px_rgba(0,0,0,0.17)] sm:p-9">
                <div className="mb-10 flex items-center justify-between">
                  <span className="text-xs font-semibold uppercase tracking-[0.18em] text-white/40">Flujo del dispositivo</span>
                  <span className="flex items-center gap-2 text-xs text-emerald-400"><span className="h-2 w-2 rounded-full bg-emerald-400" /> Local</span>
                </div>

                {[
                  { icon: Cable, label: 'Conector de diagnóstico', detail: 'K-Line de la motocicleta' },
                  { icon: Cpu, label: 'Dispositivo MotoGear', detail: 'Interpreta KDS / KWP2000' },
                  { icon: Gauge, label: 'Pantalla integrada', detail: 'Información esencial en ruta' },
                  { icon: Smartphone, label: 'App complementaria', detail: 'Diagnóstico y detalle cuando lo pides' },
                ].map((step, index, array) => (
                  <div key={step.label}>
                    <div className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.04] p-4 sm:p-5">
                      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/15 text-primary"><step.icon className="h-5 w-5" /></span>
                      <div>
                        <div className="font-display font-semibold">{step.label}</div>
                        <div className="mt-1 text-xs text-white/40">{step.detail}</div>
                      </div>
                      <span className="ml-auto font-display text-xs text-white/20">0{index + 1}</span>
                    </div>
                    {index < array.length - 1 && <div className="ml-[2.15rem] h-5 w-px bg-gradient-to-b from-primary/70 to-white/15" />}
                  </div>
                ))}
              </div>
            </div>

            <div className="order-1 lg:order-2">
              <span className="eyebrow">Arquitectura local</span>
              <h2 className="mt-5 font-display text-4xl font-semibold leading-[1.04] tracking-[-0.045em] sm:text-5xl">
                Funciona como parte de la moto, no como un servicio externo.
              </h2>
              <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
                La pantalla recibe los datos directamente del dispositivo. Si conectas el móvil, ambos consumen la misma
                información sin interrumpir las peticiones a la ECU.
              </p>

              <ul className="mt-8 space-y-4">
                {[
                  'La telemetría continúa aunque no haya móvil conectado.',
                  'La app recibe los datos por conexión local.',
                  'Las funciones de diagnóstico quedan separadas de la vista de conducción.',
                  'Sin cuenta obligatoria ni dependencia de servidores externos en la V1.',
                ].map((item) => (
                  <li key={item} className="flex gap-3 text-sm leading-relaxed text-foreground/75">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section id="compatibilidad" className="scroll-mt-24 bg-[#101111] py-24 text-white sm:py-32">
          <div className="container px-4">
            <div className="grid gap-12 lg:grid-cols-[0.75fr_1.25fr]">
              <div>
                <span className="eyebrow text-primary">Compatibilidad responsable</span>
                <h2 className="mt-5 font-display text-4xl font-semibold leading-[1.04] tracking-[-0.045em] sm:text-5xl">
                  Primero se prueba. Después se promete.
                </h2>
                <p className="mt-6 leading-relaxed text-white/50">
                  Kawasaki reutiliza parte del protocolo entre modelos, pero eso no significa que todos compartan mapas,
                  conectores o fórmulas. La compatibilidad se publicará por modelo y año, con evidencia.
                </p>
                <Button asChild variant="outline" className="mt-8 rounded-full border-white/20 bg-white/5 text-white hover:bg-white/10 hover:text-white">
                  <Link to="/contact?subject=compatibility">Consultar mi Kawasaki <ChevronRight className="ml-1 h-4 w-4" /></Link>
                </Button>
              </div>

              <div className="overflow-hidden rounded-[1.75rem] border border-white/10 bg-white/[0.035]">
                <div className="grid grid-cols-[1fr_auto] gap-4 border-b border-white/10 p-6 sm:grid-cols-[0.9fr_1fr_auto] sm:p-7">
                  <div>
                    <div className="text-[10px] font-semibold uppercase tracking-[0.18em] text-white/35">Moto de desarrollo</div>
                    <div className="mt-2 font-display text-xl font-semibold">Kawasaki ER-6n</div>
                  </div>
                  <div className="hidden sm:block">
                    <div className="text-[10px] font-semibold uppercase tracking-[0.18em] text-white/35">Sistema</div>
                    <div className="mt-2 font-display text-xl font-semibold">KDS · KWP2000</div>
                  </div>
                  <div className="flex items-center">
                    <span className="rounded-full border border-amber-300/25 bg-amber-300/10 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.13em] text-amber-300">En validación</span>
                  </div>
                </div>
                <div className="grid gap-4 p-6 sm:grid-cols-3 sm:p-7">
                  {[
                    ['Telemetría', 'Probada en laboratorio', Activity],
                    ['Diagnóstico', 'Lectura y borrado', Stethoscope],
                    ['Equipo final', 'Integración K-Line', Wrench],
                  ].map(([title, text, Icon]) => {
                    const ItemIcon = Icon as typeof Activity;
                    return (
                      <div key={title as string} className="rounded-2xl border border-white/10 bg-black/20 p-5">
                        <ItemIcon className="h-5 w-5 text-primary" />
                        <div className="mt-5 font-display text-sm font-semibold">{title as string}</div>
                        <div className="mt-1 text-xs text-white/35">{text as string}</div>
                      </div>
                    );
                  })}
                </div>
                <div className="border-t border-white/10 px-6 py-4 text-xs leading-relaxed text-white/35 sm:px-7">
                  Otros modelos Kawasaki se añadirán solo después de validar conexión, PIDs y comportamiento real.
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="desarrollo" className="scroll-mt-24 bg-[#f4f3f0] py-24 sm:py-32">
          <div className="container px-4">
            <div className="mx-auto max-w-3xl text-center">
              <span className="eyebrow">Estado del proyecto</span>
              <h2 className="mt-5 font-display text-4xl font-semibold leading-[1.05] tracking-[-0.045em] sm:text-5xl">
                Del laboratorio a una primera serie fiable.
              </h2>
              <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
                Compartimos el punto real del desarrollo para que sepas qué está probado y qué sigue en ingeniería.
              </p>
            </div>

            <div className="mx-auto mt-16 max-w-4xl">
              {developmentSteps.map((step, index) => (
                <div key={step.title} className="relative grid gap-4 pb-10 pl-12 sm:grid-cols-[150px_1fr] sm:gap-8 sm:pl-16">
                  {index < developmentSteps.length - 1 && <div className="absolute left-[15px] top-8 h-[calc(100%-8px)] w-px bg-black/12 sm:left-[23px]" />}
                  <span className={`absolute left-0 top-0 flex h-8 w-8 items-center justify-center rounded-full border sm:h-12 sm:w-12 ${
                    step.status === 'validated'
                      ? 'border-emerald-500/30 bg-emerald-500 text-white'
                      : step.status === 'progress'
                        ? 'border-primary/30 bg-primary text-white shadow-[0_0_0_8px_rgba(255,78,0,0.08)]'
                        : 'border-black/15 bg-white text-black/35'
                  }`}>
                    {step.status === 'validated' ? <Check className="h-4 w-4 sm:h-5 sm:w-5" /> : step.status === 'progress' ? <Wrench className="h-4 w-4 sm:h-5 sm:w-5" /> : <span className="h-2 w-2 rounded-full bg-current" />}
                  </span>
                  <div className={`pt-1 text-[10px] font-semibold uppercase tracking-[0.16em] sm:pt-4 ${step.status === 'validated' ? 'text-emerald-600' : step.status === 'progress' ? 'text-primary' : 'text-black/35'}`}>
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
              {faqs.map((faq) => (
                <details key={faq.question} className="group py-6">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-6 font-display text-lg font-semibold [&::-webkit-details-marker]:hidden">
                    {faq.question}
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-black/10 text-primary transition group-open:rotate-45">+</span>
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
                <div className="text-xs font-semibold uppercase tracking-[0.18em] text-white/65">¿Tienes una Kawasaki?</div>
                <h2 className="mt-5 font-display text-4xl font-semibold leading-[1.02] tracking-[-0.045em] sm:text-5xl lg:text-6xl">
                  Cuéntanos el modelo y el año. Puede ayudarnos a decidir qué validar después.
                </h2>
              </div>
              <Button asChild size="lg" className="h-14 shrink-0 rounded-full bg-black px-8 text-base text-white hover:bg-black/85">
                <Link to="/contact?subject=early-access">
                  Quiero seguir el proyecto
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
            <div className="mt-12 flex items-center gap-3 border-t border-white/25 pt-6 text-xs text-white/65">
              <ShieldCheck className="h-4 w-4" />
              No se aceptarán pagos ni reservas hasta que el producto esté validado para venta.
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
