import { Link } from 'react-router-dom';
import { seller } from '@/config/seller';
export function PrivacyNotice({ purpose, basis = 'gestionar tu solicitud' }: { purpose: string; basis?: string }) {
  return <p className="text-xs leading-relaxed text-muted-foreground">
    Responsable: {seller.name} (MotoGear). Usamos tus datos para {purpose}, con base en {basis}.
    Puedes solicitar acceso, rectificación o supresión en {seller.email}. <Link className="text-primary underline" to="/privacy">Información completa de privacidad y proveedores.</Link>
  </p>;
}
