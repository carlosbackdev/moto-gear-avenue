import {
  BatteryCharging,
  Cable,
  CheckCircle2,
  Cpu,
  Gauge,
  LayoutDashboard,
  ShieldCheck,
  Smartphone,
  Stethoscope,
  Wrench,
  Zap,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export const ONBOARD_COMPUTER_SLUG = 'ordenador-bordo-kawasaki';

const SPEC_ROWS: Array<[string, string]> = [
  ['Conexión', 'Directa al conector de diagnóstico Kawasaki de 4 pines, sin cortar cables ni modificar la instalación.'],
  ['Procesador', 'ESP32-S3 con WiFi para la conexión local con la app complementaria.'],
  ['Pantalla', 'Pantalla integrada de 1,47 pulgadas para perfiles de conducción y avisos.'],
  ['Protocolo', 'Kawasaki KDS / KWP2000 sobre K-Line.'],
  ['Alimentación', 'Desde la propia moto a través del conector de diagnóstico.'],
  ['Protección eléctrica', 'Fusible, diodo y supresor TVS para el entorno eléctrico de una motocicleta.'],
  ['Respaldo', 'Supercondensador para reducir reinicios ante microcaídas de tensión durante el arranque.'],
  ['Funcionamiento', 'Autónomo: la telemetría continúa aunque no haya un móvil conectado.'],
];

const HIGHLIGHTS = [
  { icon: LayoutDashboard, label: 'Pantalla propia', detail: 'El móvil no es obligatorio' },
  { icon: Cable, label: 'Plug & play', detail: 'Conector Kawasaki de 4 pines' },
  { icon: Cpu, label: 'ESP32-S3', detail: 'Procesamiento dentro del equipo' },
  { icon: BatteryCharging, label: 'Protegido', detail: 'TVS, fusible y respaldo' },
];

const DEVICE_FUNCTIONS = [
  'Perfiles de marcha y telemetría configurados para distintos usos.',
  'Marcha engranada, RPM, velocidad, voltaje de batería y acelerador.',
  'Temperatura de refrigerante, admisión y otros sensores disponibles.',
  'Valores calculados como consumo estimado, sin bloquear las peticiones a la ECU.',
  'Aviso visible cuando la ECU tiene códigos de avería almacenados.',
];

const APP_FUNCTIONS = [
  'Lectura completa de DTC con descripción y contexto del fallo.',
  'Borrado de DTC y nueva lectura para confirmar el resultado.',
  'Acceso a recomendaciones de diagnóstico y documentación asociada.',
  'Configuración de pantallas, perfiles y datos visibles en el dispositivo.',
  'Mantenimientos, recordatorios, históricos y analítica ampliada.',
];

const COMPATIBILITY = [
  ['Kawasaki ER-6n', 'Todos los años', 'Confirmada'],
  ['Kawasaki ER-6f', 'Todos los años', 'Confirmada'],
  ['Kawasaki Z750', 'Compatibilidad de plataforma', 'Confirmada'],
];

function FeatureList({ items }: { items: string[] }) {
  return (
    <ul className="space-y-3">
      {items.map((item) => (
        <li key={item} className="flex gap-3 text-sm leading-relaxed text-foreground/75">
          <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
          {item}
        </li>
      ))}
    </ul>
  );
}

export function OnboardComputerSpecs() {
  return (
    <div className="space-y-6">
      <Card className="overflow-hidden border-black/8 bg-[#101111] text-white">
        <div className="grid lg:grid-cols-[1.08fr_0.92fr]">
          <img
            src="/onboard-computer-prototype.svg"
            alt="Render 3D del prototipo actual del ordenador de a bordo MotoGear"
            className="h-full min-h-[320px] w-full object-cover"
          />
          <div className="flex flex-col justify-center p-7 sm:p-9">
            <div className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">Producto autónomo</div>
            <h2 className="mt-4 font-display text-3xl font-semibold leading-tight">
              El ordenador de a bordo funciona sin la app.
            </h2>
            <p className="mt-5 text-sm leading-relaxed text-white/60">
              La pantalla integrada es la interfaz principal durante la conducción. La app se conecta solo cuando quieres
              diagnóstico detallado, configuración, mantenimiento o históricos.
            </p>
            <div className="mt-7 flex flex-wrap gap-2">
              {['Pantalla integrada', 'Perfiles de marcha', 'Aviso de DTC', 'App opcional'].map((item) => (
                <span
                  key={item}
                  className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.12em] text-white/65"
                >
                  {item}
                </span>
              ))}
            </div>
            <p className="mt-6 text-[11px] leading-relaxed text-white/35">
              Render generado desde el STL actual. El diseño exterior y la posición final del botón pueden recibir pequeños
              ajustes antes de fabricación.
            </p>
          </div>
        </div>
      </Card>

      <Card className="border-black/8 bg-[#f4f3f0]">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-xl">
            <Gauge className="h-5 w-5 text-primary" />
            Mucho más que un indicador de marcha
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            La marcha es una de las funciones; el producto reúne telemetría, avisos y valores calculados en la propia moto.
          </p>
        </CardHeader>
        <CardContent className="space-y-7">
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {HIGHLIGHTS.map((item) => (
              <div key={item.label} className="rounded-xl border border-black/8 bg-white p-3 text-center">
                <item.icon className="mx-auto h-5 w-5 text-primary" />
                <div className="mt-2 text-sm font-semibold">{item.label}</div>
                <div className="mt-0.5 text-[11px] leading-tight text-muted-foreground">{item.detail}</div>
              </div>
            ))}
          </div>

          <div className="grid gap-5 lg:grid-cols-2">
            <div className="rounded-2xl border border-black/8 bg-white p-5 sm:p-6">
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-black text-primary">
                  <LayoutDashboard className="h-5 w-5" />
                </span>
                <div>
                  <h3 className="font-display text-lg font-semibold">En la pantalla del dispositivo</h3>
                  <p className="mt-0.5 text-xs text-muted-foreground">Disponible sin conectar el móvil</p>
                </div>
              </div>
              <div className="mt-5">
                <FeatureList items={DEVICE_FUNCTIONS} />
              </div>
            </div>

            <div className="rounded-2xl border border-primary/15 bg-primary/[0.035] p-5 sm:p-6">
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-white">
                  <Smartphone className="h-5 w-5" />
                </span>
                <div>
                  <h3 className="font-display text-lg font-semibold">En la app complementaria</h3>
                  <p className="mt-0.5 text-xs text-muted-foreground">Más detalle, configuración y mantenimiento</p>
                </div>
              </div>
              <div className="mt-5">
                <FeatureList items={APP_FUNCTIONS} />
              </div>
            </div>
          </div>

          <div className="flex items-start gap-3 rounded-xl border border-primary/20 bg-primary/5 p-4 text-sm leading-relaxed text-foreground/80">
            <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
            El móvil no sustituye la pantalla: si no está conectado, el dispositivo continúa leyendo la ECU y mostrando la
            telemetría con normalidad.
          </div>
        </CardContent>
      </Card>

      <Card className="border-black/8">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-xl">
            <Stethoscope className="h-5 w-5 text-primary" />
            Compatibilidad confirmada
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            Solo se anuncian modelos después de validar el protocolo, los datos y las funciones de diagnóstico.
          </p>
        </CardHeader>
        <CardContent>
          <div className="overflow-hidden rounded-xl border border-black/8">
            <div className="hidden grid-cols-[1fr_0.8fr_auto] gap-4 bg-[#f4f3f0] px-4 py-3 text-[10px] font-semibold uppercase tracking-[0.14em] text-black/45 sm:grid">
              <span>Modelo</span>
              <span>Cobertura</span>
              <span>Estado</span>
            </div>
            {COMPATIBILITY.map(([model, years, status]) => (
              <div
                key={model}
                className="grid gap-2 border-t border-black/8 px-4 py-4 first:border-t-0 sm:grid-cols-[1fr_0.8fr_auto] sm:items-center sm:gap-4"
              >
                <div className="font-semibold">{model}</div>
                <div className="text-sm text-muted-foreground">{years}</div>
                <span className="w-fit rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.12em] text-emerald-700">
                  {status}
                </span>
              </div>
            ))}
          </div>
          <p className="mt-4 text-xs leading-relaxed text-muted-foreground">
            Para la Z750 se solicitará el año en el pedido o consulta de compatibilidad para entregar el cableado adecuado
            al conector de la unidad.
          </p>
        </CardContent>
      </Card>

      <Card className="border-black/8">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-xl">
            <Wrench className="h-5 w-5 text-primary" />
            Ficha técnica del prototipo
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            Datos del diseño actual, no especificaciones genéricas importadas del catálogo.
          </p>
        </CardHeader>
        <CardContent className="space-y-6">
          <dl className="divide-y divide-black/8 rounded-xl border border-black/8 bg-white">
            {SPEC_ROWS.map(([label, value]) => (
              <div key={label} className="grid gap-1 p-4 sm:grid-cols-[175px_1fr] sm:gap-4">
                <dt className="text-sm font-semibold text-foreground">{label}</dt>
                <dd className="text-sm leading-relaxed text-muted-foreground">{value}</dd>
              </div>
            ))}
          </dl>

          <div className="grid gap-3 sm:grid-cols-3">
            {[
              { icon: Zap, title: 'Telemetría', text: 'Lectura continua sin bloquear diagnóstico o app.' },
              { icon: Stethoscope, title: 'Diagnóstico', text: 'DTC, contexto, borrado y confirmación.' },
              { icon: Smartphone, title: 'Conexión local', text: 'Sin cuenta ni nube obligatoria en la V1.' },
            ].map((item) => (
              <div key={item.title} className="rounded-xl border border-black/8 bg-[#f4f3f0] p-4">
                <item.icon className="h-5 w-5 text-primary" />
                <div className="mt-3 text-sm font-semibold">{item.title}</div>
                <div className="mt-1 text-xs leading-relaxed text-muted-foreground">{item.text}</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
