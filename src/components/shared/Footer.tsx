import { Link } from 'react-router-dom';

export const Footer = () => {
  return (
    <footer className="relative bg-gradient-to-br from-secondary via-secondary/95 to-secondary/90 text-secondary-foreground mt-auto overflow-hidden">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMzLjMxIDAgNiAyLjY5IDYgNnMtMi42OSA2LTYgNi02LTIuNjktNi02IDIuNjktNiA2LTZ6IiBzdHJva2U9IiNmZmYiIHN0cm9rZS13aWR0aD0iMC41IiBvcGFjaXR5PSIwLjAzIi8+PC9nPjwvc3ZnPg==')] opacity-30"></div>
      <div className="container mx-auto px-4 py-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <h3 className="text-xl font-bold mb-4 gradient-text">MotoGear</h3>
            <p className="text-sm text-muted-foreground/80 leading-relaxed">
              Tu tienda especializada en accesorios y equipamiento para motoristas.
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-white">Categorías</h4>
            <ul className="space-y-2 text-sm text-muted-foreground/80">
              <li><Link to="/catalog" className="hover:text-primary transition-all hover:translate-x-1 inline-block">Cascos</Link></li>
              <li><Link to="/catalog" className="hover:text-primary transition-all hover:translate-x-1 inline-block">Guantes</Link></li>
              <li><Link to="/catalog" className="hover:text-primary transition-all hover:translate-x-1 inline-block">Chaquetas</Link></li>
              <li><Link to="/catalog" className="hover:text-primary transition-all hover:translate-x-1 inline-block">Maletas</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-white">Información</h4>
            <ul className="space-y-2 text-sm text-muted-foreground/80">
              <li><Link to="/shipping" className="hover:text-primary transition-all hover:translate-x-1 inline-block">Envíos</Link></li>
              <li><Link to="/returns" className="hover:text-primary transition-all hover:translate-x-1 inline-block">Devoluciones</Link></li>
              <li><Link to="/payment-info" className="hover:text-primary transition-all hover:translate-x-1 inline-block">Pagos</Link></li>
              <li><Link to="/terms" className="hover:text-primary transition-all hover:translate-x-1 inline-block">Términos</Link></li>
              <li><Link to="/contact" className="hover:text-primary transition-all hover:translate-x-1 inline-block">Contacto</Link></li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="font-semibold mb-4 text-white">Atención al Cliente</h4>
            <p className="text-sm text-muted-foreground/80 leading-relaxed">
              ¿Tienes alguna duda? Contáctanos y te ayudaremos con tu pedido.
            </p>
          </div>
        </div>
 <div className="mt-8 pt-8 border-t border-border/30 text-center text-sm text-muted-foreground/80">
          <p> Todos los productos están homologados por la normativa europea (UE).</p>
        </div>
        <div className="mt-8 pt-8 border-t border-border/30 text-center text-sm text-muted-foreground/80">
          <p>&copy; 2024 MotoGear. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
};
