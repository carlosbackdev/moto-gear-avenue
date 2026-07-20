import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ArrowUpRight, LogIn, LogOut, Menu, PackageSearch, ShoppingCart, UserRound, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useAuth } from '@/contexts/AuthContext';
import { useCart } from '@/contexts/CartContext';
import logoMotogear from '@/assets/logo-motogear.png';

const navItems = [
  { label: 'El producto', href: '/#producto' },
  { label: 'Cómo funciona', href: '/#como-funciona' },
  { label: 'Compatibilidad', href: '/#compatibilidad' },
  { label: 'Tienda', href: '/catalog' },
  { label: 'Blog', href: '/blog' },
];

export const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { user, isAuthenticated, logout, loading: authLoading } = useAuth();
  const { totalItems } = useCart();

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

        <div className="hidden items-center gap-2 lg:flex">
          <Button asChild variant="ghost" size="icon" className="relative rounded-full" aria-label="Ver carrito">
            <Link to="/cart">
              <ShoppingCart className="h-5 w-5" />
              {totalItems > 0 && (
                <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-primary px-1 text-[10px] font-bold text-white">
                  {totalItems > 99 ? '99+' : totalItems}
                </span>
              )}
            </Link>
          </Button>

          {!authLoading && (isAuthenticated ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="rounded-full border-black/10 bg-white px-4">
                  <UserRound className="mr-2 h-4 w-4" />
                  <span className="max-w-28 truncate">{user?.name || user?.fullName || 'Mi cuenta'}</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel className="truncate">{user?.email}</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild><Link to="/account"><UserRound className="mr-2 h-4 w-4" />Mi cuenta</Link></DropdownMenuItem>
                <DropdownMenuItem asChild><Link to="/orders"><PackageSearch className="mr-2 h-4 w-4" />Pedidos y seguimiento</Link></DropdownMenuItem>
                <DropdownMenuItem asChild><Link to="/cart"><ShoppingCart className="mr-2 h-4 w-4" />Carrito</Link></DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onSelect={logout} className="text-destructive focus:text-destructive">
                  <LogOut className="mr-2 h-4 w-4" />Cerrar sesión
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button asChild className="rounded-full px-5">
              <Link to="/login"><LogIn className="mr-2 h-4 w-4" />Iniciar sesión</Link>
            </Button>
          ))}
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
            <div className="mb-4 grid grid-cols-2 gap-3">
              <Button asChild variant="outline" className="h-12 border-white/15 bg-white/5 text-white hover:bg-white/10 hover:text-white">
                <Link to="/cart"><ShoppingCart className="mr-2 h-4 w-4" />Carrito ({totalItems})</Link>
              </Button>
              {isAuthenticated ? (
                <Button asChild variant="outline" className="h-12 border-white/15 bg-white/5 text-white hover:bg-white/10 hover:text-white">
                  <Link to="/orders"><PackageSearch className="mr-2 h-4 w-4" />Mis pedidos</Link>
                </Button>
              ) : (
                <Button asChild variant="outline" className="h-12 border-white/15 bg-white/5 text-white hover:bg-white/10 hover:text-white">
                  <Link to="/login"><LogIn className="mr-2 h-4 w-4" />Entrar</Link>
                </Button>
              )}
            </div>
            {isAuthenticated && (
              <div className="mb-5 flex items-center justify-between rounded-xl border border-white/10 bg-white/5 p-4 text-sm">
                <Link to="/account" className="min-w-0 truncate text-white/70">{user?.email}</Link>
                <button type="button" onClick={logout} className="ml-3 shrink-0 text-white/50 hover:text-primary" aria-label="Cerrar sesión">
                  <LogOut className="h-4 w-4" />
                </button>
              </div>
            )}
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
