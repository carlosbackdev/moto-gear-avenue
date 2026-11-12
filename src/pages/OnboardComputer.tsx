import { useQuery } from '@tanstack/react-query';
import { Link, Navigate } from 'react-router-dom';
import { ONBOARD_COMPUTER_SLUG } from '@/lib/onboard-computer';
import { getProductUrl } from '@/lib/seo';
import { productService } from '@/services/product.service';
import { Button } from '@/components/ui/button';

// Resolve the same public product as the home page instead of hardcoding an ID.
export default function OnboardComputer() {
  const { data, isPending, refetch } = useQuery({
    queryKey: ['onboard-computer', ONBOARD_COMPUTER_SLUG],
    queryFn: () => productService.getProductBySlug(ONBOARD_COMPUTER_SLUG),
  });

  if (isPending) {
    return <p role="status" className="container py-20 text-center">Cargando el ordenador de a bordo…</p>;
  }

  if (data) {
    return <Navigate to={getProductUrl(data.id, data.name)} replace />;
  }

  return (
    <div className="container space-y-4 py-20 text-center">
      <p role="alert">No hemos podido cargar el producto. Inténtalo de nuevo.</p>
      <Button onClick={() => refetch()}>Reintentar</Button>
      <p><Link to="/">Volver al inicio</Link></p>
    </div>
  );
}
