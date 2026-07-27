import { BatteryCharging, Cable, Cpu, Gauge, ShieldCheck, Zap } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

/**
 * Ficha técnica del ordenador de a bordo, con datos reales tomados del BOM
 * y del STL del PCB (no las specs genéricas heredadas del scraper de AliExpress).
 * Solo se muestra en la ficha del producto propio, identificado por su slug.
 */
export const ONBOARD_COMPUTER_SLUG = 'ordenador-bordo-kawasaki';

const SPEC_ROWS: Array<[string, string]> = [
  ['Conexión', 'Directa al conector de diagnóstico Kawasaki de 4 pines. Sin cables sueltos ni empalmes.'],
  ['Instalación', 'Ninguna. Se enchufa y funciona.'],
  ['Alimentación', 'Toma la corriente de la propia batería de la moto a través del conector de diagnóstico.'],
  ['Protección eléctrica', 'Fusible + supresor de picos (TVS), pensados para el entorno eléctrico real de una moto.'],
  ['Respaldo de energía', 'Supercondensador integrado: no se reinicia ante micro-caídas de tensión (p. ej. al arrancar).'],
  ['Procesador', 'ESP32-S3 con WiFi y Bluetooth integrados para la app complementaria.'],
  ['Pantalla', 'Integrada, 2 pulgadas.'],
  ['Protocolo', 'KDS / KWP2000 sobre K-Line.'],
];

const HIGHLIGHTS = [
  { icon: Cable, label: 'Plug & play', detail: 'Un solo conector, sin herramientas' },
  { icon: Cpu, label: 'ESP32-S3', detail: 'WiFi + Bluetooth integrados' },
  { icon: Zap, label: 'Protegido', detail: 'Fusible + TVS ante picos de tensión' },
  { icon: BatteryCharging, label: 'Sin reinicios', detail: 'Supercondensador de respaldo' },
];

export function OnboardComputerSpecs() {
  return (
    <Card className="border-black/8 bg-[#f4f3f0]">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-xl">
          <Gauge className="h-5 w-5 text-primary" />
          Ficha técnica
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Datos reales del prototipo actual, no una plantilla genérica.
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {HIGHLIGHTS.map((item) => (
            <div key={item.label} className="rounded-xl border border-black/8 bg-white p-3 text-center">
              <item.icon className="mx-auto h-5 w-5 text-primary" />
              <div className="mt-2 text-sm font-semibold">{item.label}</div>
              <div className="mt-0.5 text-[11px] leading-tight text-muted-foreground">{item.detail}</div>
            </div>
          ))}
        </div>

        <dl className="divide-y divide-black/8 rounded-xl border border-black/8 bg-white">
          {SPEC_ROWS.map(([label, value]) => (
            <div key={label} className="grid gap-1 p-4 sm:grid-cols-[160px_1fr] sm:gap-4">
              <dt className="text-sm font-semibold text-foreground">{label}</dt>
              <dd className="text-sm leading-relaxed text-muted-foreground">{value}</dd>
            </div>
          ))}
        </dl>

        <div className="flex items-start gap-3 rounded-xl border border-primary/20 bg-primary/5 p-4 text-sm leading-relaxed text-foreground/80">
          <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
          No hay que tocar la instalación eléctrica de la moto ni cortar ningún cable: el dispositivo se conecta
          únicamente al conector de diagnóstico de 4 pines ya existente en tu Kawasaki.
        </div>
      </CardContent>
    </Card>
  );
}
