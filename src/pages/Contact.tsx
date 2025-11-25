import { useState, useEffect } from 'react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement contact form submission to backend
    toast.success('Mensaje enviado correctamente. Te responderemos pronto.');
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-4xl font-bold mb-8">Contacto y Soporte</h1>

          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <Card>
              <CardContent className="flex flex-col items-center text-center p-6">
                <Mail className="h-10 w-10 text-primary mb-3" />
                <h3 className="font-semibold mb-2">Email</h3>
                <a href="mailto:soporte@motoaccesorios.com" className="text-sm text-muted-foreground hover:text-primary">
                  motogearspain@gmail.com
                </a>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="flex flex-col items-center text-center p-6">
                <Phone className="h-10 w-10 text-primary mb-3" />
                <h3 className="font-semibold mb-2">Teléfono</h3>
                <a href="tel:+34912345678" className="text-sm text-muted-foreground hover:text-primary">
                  +34 67 996 708
                </a>
                <p className="text-xs text-muted-foreground mt-1">L-V: 9:00 - 18:00</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="flex flex-col items-center text-center p-6">
                <MapPin className="h-10 w-10 text-primary mb-3" />
                <h3 className="font-semibold mb-2">Dirección</h3>
                <p className="text-sm text-muted-foreground">
                  28030 Madrid, España
                </p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Envíanos un mensaje</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Nombre completo</Label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Tu nombre"
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
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="subject">Asunto</Label>
                  <Input
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="¿En qué podemos ayudarte?"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">Mensaje</Label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Escribe tu mensaje aquí..."
                    rows={6}
                    required
                  />
                </div>

                <Button type="submit" className="w-full gap-2">
                  <Send className="h-4 w-4" />
                  Enviar mensaje
                </Button>
              </form>
            </CardContent>
          </Card>

          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Preguntas Frecuentes</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold mb-1">¿Cuánto tarda en llegar mi pedido?</h3>
                <p className="text-sm text-muted-foreground">
                  Los pedidos a España peninsular tardan 2-7 días laborables. Para otros destinos, consulta nuestra política de envíos.
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-1">¿Puedo devolver un producto?</h3>
                <p className="text-sm text-muted-foreground">
                  Sí, tienes 14 días desde la recepción para devolver cualquier producto. Consulta nuestra política de devoluciones para más detalles.
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-1">¿Los productos tienen garantía?</h3>
                <p className="text-sm text-muted-foreground">
                  Todos nuestros productos cuentan con garantía legal de 2 años según la legislación europea.
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-1">¿Envían internacionalmente?</h3>
                <p className="text-sm text-muted-foreground">
                  Sí, enviamos a toda España y Portugal. Los plazos de entrega varían según el destino.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
