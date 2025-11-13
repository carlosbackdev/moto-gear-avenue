import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-secondary text-secondary-foreground mt-auto">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4 text-primary">MotoGear</h3>
            <p className="text-sm text-muted-foreground">
              Tu tienda especializada en accesorios y equipamiento para motoristas.
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Categorías</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link to="/catalog" className="hover:text-primary transition-colors">Cascos</Link></li>
              <li><Link to="/catalog" className="hover:text-primary transition-colors">Guantes</Link></li>
              <li><Link to="/catalog" className="hover:text-primary transition-colors">Chaquetas</Link></li>
              <li><Link to="/catalog" className="hover:text-primary transition-colors">Maletas</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Información</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link to="/shipping" className="hover:text-primary transition-colors">Envíos</Link></li>
              <li><Link to="/returns" className="hover:text-primary transition-colors">Devoluciones</Link></li>
              <li><Link to="/terms" className="hover:text-primary transition-colors">Términos</Link></li>
              <li><Link to="/contact" className="hover:text-primary transition-colors">Contacto</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Síguenos</h4>
            <div className="flex space-x-4">
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-border text-center text-sm text-muted-foreground">
          <p>&copy; 2024 MotoGear. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
};
