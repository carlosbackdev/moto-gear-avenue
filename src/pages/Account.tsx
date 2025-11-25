import { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Link } from 'react-router-dom';
import { Package, User, Lock, Eye, EyeOff } from 'lucide-react';
import { usersService } from '@/services/users.service';
import { useToast } from '@/hooks/use-toast';

export default function Account() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !newPassword) {
      toast({
        title: "Error",
        description: "Por favor completa todos los campos",
        variant: "destructive",
      });
      return;
    }

    if (newPassword.length < 6) {
      toast({
        title: "Error",
        description: "La contraseña debe tener al menos 6 caracteres",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      await usersService.changePassword({ email, newPassword });
      toast({
        title: "Éxito",
        description: "Contraseña actualizada correctamente",
      });
      setEmail('');
      setNewPassword('');
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "No se pudo cambiar la contraseña. Verifica que el email sea correcto.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8 gradient-text">Mi Cuenta</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                Información Personal
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-4 mb-4">
                <Avatar className="h-20 w-20">
                  <AvatarImage src={user?.photoUrl || ''} alt={user?.name || 'Usuario'} />
                  <AvatarFallback className="text-xl">
                    {user?.name?.charAt(0).toUpperCase() || 'U'}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-lg font-semibold">{user?.name || user?.fullName}</p>
                  <p className="text-sm text-muted-foreground">
                    {user?.authProvider === 'GOOGLE' ? 'Cuenta de Google' : 'Cuenta local'}
                  </p>
                </div>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Email</p>
                <p className="font-semibold">{user?.email}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Miembro desde</p>
                <p className="font-semibold">
                  {user?.createdAt ? new Date(user.createdAt).toLocaleDateString('es-ES') : '-'}
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Package className="h-5 w-5" />
                Mis Pedidos
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Consulta el estado de tus pedidos y tu historial de compras
              </p>
              <Link to="/orders">
                <Button className="w-full">Ver Mis Pedidos</Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow md:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lock className="h-5 w-5" />
                Cambiar Contraseña
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleChangePassword} className="space-y-4">
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="tu@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="newPassword">Nueva Contraseña</Label>
                  <div className="relative">
                    <Input
                      id="newPassword"
                      type={showPassword ? "text" : "password"}
                      placeholder="Mínimo 6 caracteres"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      required
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="absolute right-0 top-0"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </Button>
                  </div>
                </div>
                <Button type="submit" disabled={loading} className="w-full">
                  {loading ? 'Cambiando...' : 'Cambiar Contraseña'}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
