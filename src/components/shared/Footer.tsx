import { Link } from 'react-router-dom';
import { ArrowUpRight, Github, Mail } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="relative overflow-hidden bg-[#080909] text-white">
      <div className="absolute inset-0 circuit-grid opacity-15" />
      <div className="container relative px-4 py-16 sm:py-20">
        <div className="grid gap-12 border-b border-white/10 pb-14 lg:grid-cols-[1.3fr_0.7fr_0.7fr]">
          <div className="max-w-md">
            <Link to="/" className="font-display text-3xl font-semibold tracking-[-0.04em]">
              Moto<span className="text-primary">Gear</span>
            </Link>
            <p className="mt-5 text-sm leading-relaxed text-white/45">
              Tecnología para entender tu moto: telemetría, diagnóstico y datos de la ECU en un único dispositivo.
            </p>
            <div className="mt-7 flex items-center gap-3">
              <a
                href="mailto:motogearspain@gmail.com"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/12 text-white/55 transition hover:border-primary/50 hover:text-primary"
                aria-label="Enviar email a MotoGear"
              >
                <Mail className="h-4 w-4" />
              </a>
              <a
                href="https://github.com/carlosbackdev"
                target="_blank"
                rel="noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/12 text-white/55 transition hover:border-primary/50 hover:text-primary"
                aria-label="GitHub de Carlos Backdev"
              >
                <Github className="h-4 w-4" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-[10px] font-semibold uppercase tracking-[0.18em] text-white/30">Producto</h3>
            <ul className="mt-5 space-y-3 text-sm text-white/55">
              <li><Link to="/catalog" className="transition hover:text-primary">Tienda y otros productos</Link></li>
              <li><a href="/#producto" className="transition hover:text-primary">Funciones</a></li>
              <li><a href="/#como-funciona" className="transition hover:text-primary">Cómo funciona</a></li>
              <li><a href="/#compatibilidad" className="transition hover:text-primary">Compatibilidad</a></li>
              <li><Link to="/blog" className="transition hover:text-primary">Blog y desarrollo</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-[10px] font-semibold uppercase tracking-[0.18em] text-white/30">MotoGear</h3>
            <ul className="mt-5 space-y-3 text-sm text-white/55">
              <li><Link to="/account" className="transition hover:text-primary">Mi cuenta</Link></li>
              <li><Link to="/orders" className="transition hover:text-primary">Pedidos y seguimiento</Link></li>
              <li><Link to="/shipping" className="transition hover:text-primary">Envíos</Link></li>
              <li><Link to="/returns" className="transition hover:text-primary">Devoluciones</Link></li>
              <li><Link to="/payment-info" className="transition hover:text-primary">Pagos</Link></li>
              <li><Link to="/contact" className="transition hover:text-primary">Contacto</Link></li>
              <li><Link to="/terms" className="transition hover:text-primary">Términos y condiciones</Link></li>
              <li>
                <a href="mailto:motogearspain@gmail.com" className="inline-flex items-center transition hover:text-primary">
                  Escribirnos <ArrowUpRight className="ml-1 h-3.5 w-3.5" />
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col gap-4 pt-7 text-[11px] text-white/30 sm:flex-row sm:items-center sm:justify-between">
          <p>&copy; {new Date().getFullYear()} MotoGear. Todos los derechos reservados.</p>
          <p>Pago seguro · Área de cliente · Seguimiento de pedidos</p>
        </div>
      </div>
    </footer>
  );
};
