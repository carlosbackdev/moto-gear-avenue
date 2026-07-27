import { useState } from 'react';
import { CheckCircle2, Loader2 } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import { leadService } from '@/services/lead.service';
import { LeadSource } from '@/types/lead';

interface LeadCaptureModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  /** Determina el copy y el email de notificación al equipo. */
  source: LeadSource;
  /** Slug del producto sobre el que se registra el interés. */
  productSlug?: string;
}

const COPY: Record<LeadSource, { title: string; description: string; cta: string }> = {
  EARLY_ACCESS: {
    title: 'Reserva tu plaza en el lanzamiento',
    description:
      'Te avisamos en cuanto el ordenador de a bordo esté validado y disponible para comprar. Sin pagos ni compromiso ahora.',
    cta: 'Reservar mi plaza',
  },
  COMPATIBILITY: {
    title: 'Consultar compatibilidad de mi Kawasaki',
    description:
      'Dinos el modelo y el año de tu moto. Te confirmamos el estado real de compatibilidad en cuanto lo sepamos.',
    cta: 'Consultar compatibilidad',
  },
};

export function LeadCaptureModal({ open, onOpenChange, source, productSlug }: LeadCaptureModalProps) {
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    motorcycleModel: '',
    motorcycleYear: '',
    message: '',
  });

  const copy = COPY[source];

  const resetAndClose = () => {
    setSubmitted(false);
    setFormData({ name: '', email: '', motorcycleModel: '', motorcycleYear: '', message: '' });
    onOpenChange(false);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((current) => ({ ...current, [event.target.name]: event.target.value }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setSubmitting(true);

    try {
      await leadService.createLead({
        name: formData.name,
        email: formData.email,
        motorcycleModel: formData.motorcycleModel,
        motorcycleYear: formData.motorcycleYear || undefined,
        message: formData.message || undefined,
        source,
        productSlug,
      });
      setSubmitted(true);
    } catch (error) {
      console.error('Error registrando el lead:', error);
      toast.error('No hemos podido registrar tu interés. Inténtalo de nuevo en unos minutos.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={(next) => (next ? onOpenChange(next) : resetAndClose())}>
      <DialogContent className="sm:max-w-md">
        {submitted ? (
          <div className="flex flex-col items-center gap-4 py-6 text-center">
            <span className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary">
              <CheckCircle2 className="h-7 w-7" />
            </span>
            <div>
              <h3 className="font-display text-xl font-semibold">Interés registrado</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                Gracias, {formData.name.split(' ')[0] || ''}. Te escribiremos a {formData.email} en cuanto haya novedades.
              </p>
            </div>
            <Button className="mt-2 rounded-full" onClick={resetAndClose}>
              Cerrar
            </Button>
          </div>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle>{copy.title}</DialogTitle>
              <DialogDescription>{copy.description}</DialogDescription>
            </DialogHeader>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="lead-name">Nombre</Label>
                  <Input
                    id="lead-name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Tu nombre"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lead-email">Email</Label>
                  <Input
                    id="lead-email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="tu@email.com"
                    required
                  />
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-[1fr_120px]">
                <div className="space-y-2">
                  <Label htmlFor="lead-model">Modelo de la moto</Label>
                  <Input
                    id="lead-model"
                    name="motorcycleModel"
                    value={formData.motorcycleModel}
                    onChange={handleChange}
                    placeholder="Ej. Kawasaki ER-6n"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lead-year">Año</Label>
                  <Input
                    id="lead-year"
                    name="motorcycleYear"
                    inputMode="numeric"
                    value={formData.motorcycleYear}
                    onChange={handleChange}
                    placeholder="2009"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="lead-message">Mensaje (opcional)</Label>
                <Textarea
                  id="lead-message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Cuéntanos qué datos o funciones te interesan..."
                  rows={3}
                  className="resize-none"
                />
              </div>

              <Button type="submit" size="lg" className="w-full rounded-full" disabled={submitting}>
                {submitting ? <Loader2 className="h-4 w-4 animate-spin" /> : copy.cta}
              </Button>

              <p className="text-center text-xs leading-relaxed text-muted-foreground">
                No se aceptan pagos ni reservas de compra. Solo guardamos tus datos para avisarte.
              </p>
            </form>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
