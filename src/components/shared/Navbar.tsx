import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, User, LogOut, Package, ChevronDown, Menu } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useCart } from '@/contexts/CartContext';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';
import { SearchBar } from './SearchBar';
import { useEffect, useState } from 'react';
import { categoryService } from '@/services/category.service';
import { orderService } from '@/services/order.service';
import { Category } from '@/types/models';
import logoMotogear from '@/assets/logo-motogear.png';


export const Navbar = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const { totalItems } = useCart();
  const navigate = useNavigate();
  const [categories, setCategories] = useState<Category[]>([]);
  const [ordersCount, setOrdersCount] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const cats = await categoryService.getCategories();
        setCategories(cats);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchOrders = async () => {
      if (isAuthenticated) {
        try {
          const orders = await orderService.getUserOrders();
          setOrdersCount(orders.length);
        } catch (error) {
          console.error('Error fetching orders:', error);
        }
      }
    };
    fetchOrders();
  }, [isAuthenticated]);

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 gap-6">
        <Link to="/" className="flex items-center space-x-2 flex-shrink-0">
          <img src={logoMotogear} alt="MotoGear Logo" className="h-14 w-auto" />
        </Link>

        {/* Desktop SearchBar */}
        <div className="flex-1 max-w-2xl hidden md:block">
          <SearchBar />
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-4 flex-shrink-0">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="gap-2">
                Categorías
                <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-56">
              {categories.map((category) => (
                <DropdownMenuItem 
                  key={category.id}
                  onClick={() => navigate(`/catalog?category=${category.id}`)}
                  className="cursor-pointer"
                >
                  {category.name}
                </DropdownMenuItem>
              ))}
              {categories.length === 0 && (
                <DropdownMenuItem disabled>
                  No hay categorías disponibles
                </DropdownMenuItem>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
          {isAuthenticated && (
            <>
              <Link to="/orders" className="relative">
                <Button variant="ghost" size="icon">
                  <Package className="h-5 w-5" />
                  {ordersCount > 0 && (
                    <Badge variant="default" className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs">
                      {ordersCount}
                    </Badge>
                  )}
                </Button>
              </Link>
              <Link to="/cart" className="relative">
                <Button variant="ghost" size="icon">
                  <ShoppingCart className="h-5 w-5" />
                  {totalItems > 0 && (
                    <Badge variant="default" className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs">
                      {totalItems}
                    </Badge>
                  )}
                </Button>
              </Link>
            </>
          )}
          {isAuthenticated ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={user?.photoUrl || ''} alt={user?.name || 'Usuario'} />
                    <AvatarFallback>
                      {user?.name?.charAt(0).toUpperCase() || user?.email?.charAt(0).toUpperCase() || 'U'}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem asChild>
                  <Link to="/account" className="flex items-center cursor-pointer">
                    <User className="mr-2 h-4 w-4" />
                    Mi Cuenta
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/orders" className="flex items-center cursor-pointer">
                    <Package className="mr-2 h-4 w-4" />
                    Mis Pedidos
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/cart" className="flex items-center cursor-pointer">
                    <ShoppingCart className="mr-2 h-4 w-4" />
                    Mi Carrito
                    {totalItems > 0 && (
                      <Badge variant="default" className="ml-auto">
                        {totalItems}
                      </Badge>
                    )}
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={logout} className="cursor-pointer">
                  <LogOut className="mr-2 h-4 w-4" />
                  Cerrar Sesión
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Link to="/login">
              <Button variant="default" size="sm">
                Iniciar Sesión
              </Button>
            </Link>
          )}
        </div>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden flex items-center"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <Menu className="h-8 w-8" />
        </button>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 bg-white dark:bg-background flex flex-col p-6 md:hidden shadow-xl" style={{backgroundColor: 'rgba(255,255,255,1)'}}>
          <button
            className="self-end mb-4"
            onClick={() => setMobileMenuOpen(false)}
          >
            <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <SearchBar />
          <div className="flex flex-col space-y-4 mt-6 bg-white dark:bg-background rounded-xl p-4 shadow-md">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="gap-2 w-full justify-start">
                  Categorías
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-full">
                {categories.map((category) => (
                  <DropdownMenuItem 
                    key={category.id}
                    onClick={() => { navigate(`/catalog?category=${category.id}`); setMobileMenuOpen(false); }}
                    className="cursor-pointer"
                  >
                    {category.name}
                  </DropdownMenuItem>
                ))}
                {categories.length === 0 && (
                  <DropdownMenuItem disabled>
                    No hay categorías disponibles
                  </DropdownMenuItem>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
            {isAuthenticated && (
              <>
                <Button variant="ghost" className="w-full justify-start" onClick={() => { navigate('/orders'); setMobileMenuOpen(false); }}>
                  <Package className="h-5 w-5 mr-2" /> Mis Pedidos
                  {ordersCount > 0 && (
                    <Badge variant="default" className="ml-auto">
                      {ordersCount}
                    </Badge>
                  )}
                </Button>
                <Button variant="ghost" className="w-full justify-start" onClick={() => { navigate('/cart'); setMobileMenuOpen(false); }}>
                  <ShoppingCart className="h-5 w-5 mr-2" /> Mi Carrito
                  {totalItems > 0 && (
                    <Badge variant="default" className="ml-auto">
                      {totalItems}
                    </Badge>
                  )}
                </Button>
              </>
            )}
            {isAuthenticated ? (
              <Button variant="ghost" className="w-full justify-start" onClick={() => { navigate('/account'); setMobileMenuOpen(false); }}>
                <User className="h-5 w-5 mr-2" /> Mi Cuenta
              </Button>
            ) : (
              <Button variant="default" className="w-full justify-start" onClick={() => { navigate('/login'); setMobileMenuOpen(false); }}>
                Iniciar Sesión
              </Button>
            )}
            {isAuthenticated && (
              <Button variant="ghost" className="w-full justify-start" onClick={() => { logout(); setMobileMenuOpen(false); }}>
                <LogOut className="h-5 w-5 mr-2" /> Cerrar Sesión
              </Button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};
