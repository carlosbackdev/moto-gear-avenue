import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { trackingService } from '@/services/tracking.service';
import { Tracking, TimelineEvent } from '@/types/models';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Package, MapPin, Calendar, Truck, ExternalLink } from 'lucide-react';
import { toast } from 'sonner';

export default function Track() {
  const { orderId } = useParams<{ orderId: string }>();
  const navigate = useNavigate();
  const [tracking, setTracking] = useState<Tracking | null>(null);
  const [loading, setLoading] = useState(true);
  const [timeline, setTimeline] = useState<TimelineEvent[]>([]);
  const [courier, setCourier] = useState<string>('');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const loadTracking = async () => {
      if (!orderId) {
        navigate('/orders');
        return;
      }

      try {
        setLoading(true);
        const data = await trackingService.getAndUpdateTracking(Number(orderId));
        setTracking(data);

        // Parse timeline JSON
        try {
          const parsedTimeline = JSON.parse(data.timeline) as TimelineEvent[];
          setTimeline(parsedTimeline);
        } catch (error) {
          console.error('Error parsing timeline:', error);
          setTimeline([]);
        }

        // Parse couriers JSON and select the one that's not Aliexpress
        try {
          const parsedCouriers = JSON.parse(data.couriers) as string[];
          const selectedCourier = parsedCouriers.find(
            c => !c.toLowerCase().includes('aliexpress')
          ) || parsedCouriers[0] || '';
          setCourier(selectedCourier);
        } catch (error) {
          console.error('Error parsing couriers:', error);
          setCourier('');
        }
      } catch (error) {
        console.error('Error loading tracking:', error);
        toast.error('Error al cargar la información de seguimiento');
      } finally {
        setLoading(false);
      }
    };

    loadTracking();
  }, [orderId, navigate]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!tracking) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <Package className="h-16 w-16 text-muted-foreground mb-4" />
            <p className="text-xl text-muted-foreground mb-4">
              No se pudo cargar la información de seguimiento
            </p>
            <Button onClick={() => navigate('/orders')}>Volver a Pedidos</Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-6">
          <Button variant="outline" onClick={() => navigate('/orders')}>
            ← Volver a Pedidos
          </Button>
        </div>

        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">Seguimiento de Pedido</h1>
          <p className="text-muted-foreground text-lg mb-4">
            Pedido #{tracking.orderId}
          </p>
          <div className="flex items-center justify-center gap-2 flex-wrap">
            <Badge variant="outline" className="text-lg px-4 py-2">
              {tracking.trackingNumber}
            </Badge>
            {tracking.sourceUrl && (
              <a
                href={tracking.sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm text-primary hover:underline"
              >
                Ver en sitio externo <ExternalLink className="h-4 w-4" />
              </a>
            )}
          </div>
        </div>

        <div className="grid gap-6">
          {/* Estado actual */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Package className="h-5 w-5" />
                Estado Actual
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Estado:</span>
                <Badge className="bg-primary">{tracking.status}</Badge>
              </div>
              <div className="flex items-start justify-between gap-4">
                <span className="text-muted-foreground">Descripción:</span>
                <p className="text-right font-medium">{tracking.statusDescription}</p>
              </div>
              {tracking.daysOnRoute > 0 && (
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Días en ruta:</span>
                  <span className="font-medium">{tracking.daysOnRoute} días</span>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Información de envío */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="h-5 w-5" />
                Información de Envío
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Origen</p>
                  <p className="font-medium">{tracking.origin}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Destino</p>
                  <p className="font-medium">{tracking.destination}</p>
                </div>
              </div>
              {courier && (
                <div>
                  <p className="text-sm text-muted-foreground">Transportista</p>
                  <div className="flex items-center gap-2 mt-1">
                    <Truck className="h-4 w-4 text-primary" />
                    <p className="font-medium">{courier}</p>
                  </div>
                </div>
              )}
              {tracking.weight && (
                <div>
                  <p className="text-sm text-muted-foreground">Peso</p>
                  <p className="font-medium">{tracking.weight}</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Línea temporal */}
          {timeline.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  Historial de Envío
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {timeline.map((event, index) => (
                    <div
                      key={index}
                      className={`flex gap-4 pb-4 ${
                        index !== timeline.length - 1 ? 'border-b' : ''
                      }`}
                    >
                      <div className="flex flex-col items-center">
                        <div
                          className={`w-3 h-3 rounded-full ${
                            event.isActive
                              ? 'bg-primary ring-4 ring-primary/20'
                              : 'bg-muted-foreground/30'
                          }`}
                        />
                        {index !== timeline.length - 1 && (
                          <div className="w-0.5 h-full bg-muted-foreground/20 mt-2" />
                        )}
                      </div>
                      <div className="flex-1 pt-0">
                        <p
                          className={`font-medium ${
                            event.isActive ? 'text-primary' : 'text-foreground'
                          }`}
                        >
                          {event.title}
                        </p>
                        <p className="text-sm text-muted-foreground">{event.date}</p>
                        {event.location && (
                          <p className="text-sm text-muted-foreground flex items-center gap-1 mt-1">
                            <MapPin className="h-3 w-3" />
                            {event.location}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          <div className="flex flex-col sm:flex-row gap-4">
            <Button className="flex-1" onClick={() => navigate('/orders')}>
              Ver Todos mis Pedidos
            </Button>
            <Button className="flex-1" variant="outline" onClick={() => navigate('/')}>
              Volver al Inicio
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
