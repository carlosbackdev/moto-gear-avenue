import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ArrowUpRight, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import logoMotogear from '@/assets/logo-motogear.png';

const navItems = [
  { label: 'El producto', href: '/#producto' },
  { label: 'Cómo funciona', href: '/#como-funciona' },
  { label: 'Compatibilidad', href: '/#compatibilidad' },
  { label: 'Desarrollo', href: '/#desarrollo' },
  { label: 'FAQ', href: '/#faq' },
];

export const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname, location.hash]);

  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-black/10 bg-[#f8f7f4]/95 backdrop-blur-xl">
      <div className="container flex h-[72px] items-center justify-between gap-6 px-4">
        <Link to="/" className="flex items-center gap-3" aria-label="MotoGear - Inicio">
          <img src={logoMotogear} alt="MotoGear" className="h-10 w-auto sm:h-11" />
          <span className="hidden border-l border-black/15 pl-3 text-[10px] font-semibold uppercase leading-tight tracking-[0.12em] text-black/45 xl:block">
            Ordenador<br />de a bordo
          </span>
        </Link>

        <nav className="hidden items-center gap-7 lg:flex" aria-label="Navegación principal">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-[13px] font-semibold text-black/58 transition-colors hover:text-primary"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-4 lg:flex">
          <span className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.13em] text-black/40">
            <span className="h-2 w-2 rounded-full bg-amber-400 shadow-[0_0_0_4px_rgba(251,191,36,0.12)]" />
            En desarrollo
          </span>
          <Button asChild className="rounded-full px-5">
            <Link to="/contact?subject=compatibility">
              Consultar mi moto
              <ArrowUpRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>

        <button
          type="button"
          className="flex h-10 w-10 items-center justify-center rounded-full border border-black/10 bg-white lg:hidden"
          onClick={() => setMobileMenuOpen(true)}
          aria-label="Abrir menú"
          aria-expanded={mobileMenuOpen}
        >
          <Menu className="h-5 w-5" />
        </button>
      </div>

      {mobileMenuOpen && (
        <div className="fixed inset-0 z-[60] min-h-screen overflow-y-auto bg-[#0a0b0b] text-white lg:hidden">
          <div className="flex h-[72px] items-center justify-between border-b border-white/10 px-5">
            <Link to="/" className="font-display text-lg font-semibold tracking-tight">
              Moto<span className="text-primary">Gear</span>
            </Link>
            <button
              type="button"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15"
              onClick={() => setMobileMenuOpen(false)}
              aria-label="Cerrar menú"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <nav className="flex flex-col px-5 py-10" aria-label="Navegación móvil">
            {navItems.map((item, index) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between border-b border-white/10 py-5 font-display text-2xl font-semibold tracking-tight"
              >
                <span>{item.label}</span>
                <span className="text-xs font-medium text-white/25">0{index + 1}</span>
              </a>
            ))}
          </nav>

          <div className="px-5 pb-10">
            <Button asChild size="lg" className="h-14 w-full rounded-full text-base">
              <Link to="/contact?subject=compatibility">
                Consultar compatibilidad
                <ArrowUpRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <p className="mt-5 text-center text-[10px] font-semibold uppercase tracking-[0.15em] text-white/35">
              Primera plataforma · Kawasaki
            </p>
          </div>
        </div>
      )}
    </header>
  );
};
