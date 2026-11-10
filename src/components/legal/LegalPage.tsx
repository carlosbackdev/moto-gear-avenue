import { ReactNode } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { seller } from '@/config/seller';

export function SellerDetails() {
  return <dl className="space-y-2 rounded-xl border bg-muted/30 p-5">
    <div><dt className="inline font-semibold">Titular: </dt><dd className="inline">{seller.name} · {seller.brand}</dd></div>
    {seller.taxId && <div><dt className="inline font-semibold">NIF: </dt><dd className="inline">{seller.taxId}</dd></div>}
    {seller.address && <div><dt className="inline font-semibold">Domicilio: </dt><dd className="inline">{seller.address}</dd></div>}
    <div><dt className="inline font-semibold">Contacto: </dt><dd className="inline"><a href={`mailto:${seller.email}`} className="text-primary underline">{seller.email}</a></dd></div>
  </dl>;
}
export function LegalPage({ title, description, path, children }: { title: string; description: string; path: string; children: ReactNode }) {
  return <>
    <Helmet><title>{title} | MotoGear</title><meta name="description" content={description} /><link rel="canonical" href={`https://motogear.es${path}`} /></Helmet>
    <div className="min-h-screen bg-[#f4f3f0] px-4 py-12 sm:py-20">
      <article className="mx-auto max-w-4xl rounded-3xl border bg-white p-6 shadow-sm sm:p-12">
        <p className="text-xs font-semibold uppercase tracking-widest text-primary">Información para tu compra</p>
        <h1 className="mt-4 font-display text-3xl font-semibold tracking-tight sm:text-4xl">{title}</h1>
        <p className="mt-4 text-muted-foreground">{description}</p>
        <div className="mt-8 space-y-7 text-sm leading-relaxed [&_h2]:mb-3 [&_h2]:text-xl [&_h2]:font-semibold [&_p+p]:mt-3 [&_a]:text-primary [&_a]:underline">{children}</div>
        <nav aria-label="Información de compra" className="mt-10 flex flex-wrap gap-4 border-t pt-6 text-sm">
          <Link to="/terms">Condiciones</Link><Link to="/shipping">Envíos</Link><Link to="/returns">Devoluciones y garantía</Link><Link to="/privacy">Privacidad</Link><Link to="/contact">Contacto</Link>
        </nav>
        <p className="mt-6 text-xs text-muted-foreground">Actualizado el 10 de noviembre de 2026.</p>
      </article>
    </div>
  </>;
}
