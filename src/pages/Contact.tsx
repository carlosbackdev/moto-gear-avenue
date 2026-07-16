import { useEffect, useMemo, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';
import { ArrowRight, CheckCircle2, Mail, Radio, ShieldCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';

const EMAIL = 'motogearspain@gmail.com';

export default function Contact() {
  const location = useLocation();
  const querySubject = useMemo(() => new URLSearchParams(location.search).get('subject'), [location.search]);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    motorcycle: '',
    year: '',
    message: '',
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const subject = querySubject === 'early-access'
      ? 'Quiero seguir el desarrollo del ordenador de a bordo'
      : `Consulta de compatibilidad · ${formData.motorcycle || 'Kawasaki'}`;
    const body = [
      `Nombre: ${formData.name}`,
      `Email: ${formData.email}`,
      `Moto: ${formData.motorcycle}`,
      `Año: ${formData.year || 'No indicado'}`,
      '',
      formData.message || 'Quiero recibir información sobre el proyecto y la compatibilidad de mi moto.',
    ].join('\n');

    window.location.href = `mailto:${EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((current) => ({
      ...current,
      [event.target.name]: event.target.value,
    }));
  };

  return (
    <>
      <Helmet>
        <title>Compatibilidad y contacto | MotoGear</title>
        <meta
          name="description"
          content="Consulta la compatibilidad de tu Kawasaki con el ordenador de a bordo MotoGear y sigue el desarrollo del producto."
        />
        <link rel="canonical" href="https://motogear.es/contact" />
      </Helmet>

      <div className="min-h-screen bg-[#f4f3f0]">
        <section className="relative overflow-hidden bg-[#0a0b0b] py-20 text-white sm:py-24">
          <div className="absolute inset-0 circuit-grid opacity-25" />
          <div className="container relative px-4">
            <span className="eyebrow text-primary">Compatibilidad y acceso temprano</span>
            <h1 className="mt-5 max-w-4xl font-display text-5xl font-semibold leading-[0.98] tracking-[-0.05em] sm:text-6xl">
              Ayúdanos a saber qué Kawasaki deberíamos validar después.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/55">
              Dinos el modelo y el año de tu moto. Te responderemos con el estado real de compatibilidad, sin asumir que dos modelos usan exactamente los mismos datos.
            </p>
          </div>
        </section>

        <section className="py-16 sm:py-24">
          <div className="container grid gap-10 px-4 lg:grid-cols-[0.72fr_1.28fr]">
            <aside className="space-y-5">
              <div className="rounded-[1.75rem] border border-black/8 bg-white p-7 sm:p-8">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-black text-primary">
                  <Radio className="h-5 w-5" />
                </div>
                <h2 className="mt-7 font-display text-2xl font-semibold tracking-tight">Punto de partida</h2>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  La ER-6n es la plataforma de desarrollo actual. El protocolo Kawasaki KDS/KWP2000 ya se comunica en laboratorio; el equipo final directo por K-Line continúa en integración.
                </p>
              </div>

              <div className="rounded-[1.75rem] border border-black/8 bg-white p-7 sm:p-8">
                <h3 className="text-[10px] font-semibold uppercase tracking-[0.18em] text-black/35">Qué haremos con tu mensaje</h3>
                <ul className="mt-6 space-y-4">
                  {[
                    'Registrar el interés por modelo y año.',
                    'Responder con el estado real conocido.',
                    'Avisarte cuando haya novedades relevantes.',
                  ].map((item) => (
                    <li key={item} className="flex gap-3 text-sm leading-relaxed text-black/65">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <a
                href={`mailto:${EMAIL}`}
                className="flex items-center gap-3 rounded-2xl border border-black/8 bg-white px-6 py-5 text-sm font-semibold transition hover:border-primary/30 hover:text-primary"
              >
                <Mail className="h-4 w-4" />
                {EMAIL}
              </a>
            </aside>

            <div className="rounded-[2rem] border border-black/8 bg-white p-6 shadow-[0_24px_80px_rgba(15,15,15,0.06)] sm:p-10">
              <div className="mb-9">
                <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-primary">Tu moto</span>
                <h2 className="mt-3 font-display text-3xl font-semibold tracking-[-0.03em]">Consultar compatibilidad</h2>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  Al enviar, se abrirá tu aplicación de correo con el mensaje preparado. La web no guarda tus datos.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid gap-5 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="name">Nombre</Label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Tu nombre"
                      className="h-12 rounded-xl"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="tu@email.com"
                      className="h-12 rounded-xl"
                      required
                    />
                  </div>
                </div>

                <div className="grid gap-5 sm:grid-cols-[1fr_150px]">
                  <div className="space-y-2">
                    <Label htmlFor="motorcycle">Modelo de la moto</Label>
                    <Input
                      id="motorcycle"
                      name="motorcycle"
                      value={formData.motorcycle}
                      onChange={handleChange}
                      placeholder="Ej. Kawasaki ER-6n"
                      className="h-12 rounded-xl"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="year">Año</Label>
                    <Input
                      id="year"
                      name="year"
                      inputMode="numeric"
                      value={formData.year}
                      onChange={handleChange}
                      placeholder="Ej. 2009"
                      className="h-12 rounded-xl"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">¿Qué te gustaría saber?</Label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Cuéntanos qué datos o funciones te interesan..."
                    rows={6}
                    className="resize-none rounded-xl"
                  />
                </div>

                <Button type="submit" size="lg" className="h-[52px] w-full rounded-full text-base sm:w-auto sm:px-8">
                  Preparar email
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>

                <div className="flex gap-3 border-t border-black/8 pt-5 text-xs leading-relaxed text-muted-foreground">
                  <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                  No solicitamos pagos ni reservas mientras el producto siga en fase de validación.
                </div>
              </form>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
