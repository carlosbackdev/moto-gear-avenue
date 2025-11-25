import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { toast } from 'sonner';
import { GoogleLogin, CredentialResponse } from '@react-oauth/google';
import { Eye, EyeOff } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { usersService } from '@/services/users.service';

export default function Login() {
  const navigate = useNavigate();
  const { login, firebaseLogin, isAuthenticated } = useAuth();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  
  const [recoverDialogOpen, setRecoverDialogOpen] = useState(false);
  const [recoverLoading, setRecoverLoading] = useState(false);
  const [showRecoverPassword, setShowRecoverPassword] = useState(false);
  const [recoverData, setRecoverData] = useState({
    email: '',
    newPassword: '',
  });

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await login(formData);
      toast.success('¡Bienvenido de nuevo!');
      navigate('/');
    } catch (error) {
      console.error('Login error:', error);
      toast.error('Email o contraseña incorrectos');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSuccess = async (credentialResponse: CredentialResponse) => {
    setLoading(true);
    try {
      // Decodificar el JWT de Google para obtener los datos del usuario
      const credential = credentialResponse.credential;
      if (!credential) {
        throw new Error('No se recibió credencial de Google');
      }

      // Decodificar el token JWT (es seguro hacerlo en el cliente para obtener info básica)
      const base64Url = credential.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split('')
          .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
          .join('')
      );
      const payload = JSON.parse(jsonPayload);

      await firebaseLogin({
        email: payload.email,
        fullName: payload.name || payload.email.split('@')[0],
        firebaseToken: credential,
        firebaseUid: payload.sub,
        photoUrl: payload.picture || null,
      });

      toast.success('¡Bienvenido!');
      navigate('/');
    } catch (error) {
      console.error('Google login error:', error);
      toast.error('Error al iniciar sesión con Google');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleError = () => {
    toast.error('Error al iniciar sesión con Google');
  };

  const handleRecoverAccount = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!recoverData.email || !recoverData.newPassword) {
      toast.error('Por favor completa todos los campos');
      return;
    }

    if (recoverData.newPassword.length < 6) {
      toast.error('La contraseña debe tener al menos 6 caracteres');
      return;
    }

    setRecoverLoading(true);
    try {
      await usersService.changePassword({
        email: recoverData.email,
        newPassword: recoverData.newPassword,
      });
      toast.success('Contraseña cambiada exitosamente');
      setRecoverDialogOpen(false);
      setRecoverData({ email: '', newPassword: '' });
    } catch (error) {
      console.error('Error al recuperar cuenta:', error);
      toast.error('Error al cambiar la contraseña. Verifica que el email sea correcto.');
    } finally {
      setRecoverLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">Iniciar Sesión</CardTitle>
          <CardDescription className="text-center">
            Accede a tu cuenta de MotoGear
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="tu@email.com"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <Label htmlFor="password">Contraseña</Label>
              <div className="relative">
                <Input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="pr-10"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4 text-muted-foreground" />
                  ) : (
                    <Eye className="h-4 w-4 text-muted-foreground" />
                  )}
                </Button>
              </div>
            </div>
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
            </Button>
          </form>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <Separator />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground font-bold">O continúa con</span>
            </div>
          </div>

          <div className="flex justify-center p-4 bg-muted/50 rounded-lg border border-border">
            <GoogleLogin
              onSuccess={handleGoogleSuccess}
              onError={handleGoogleError}
              useOneTap={false}
              text="signin_with"
              size="large"
              width="300"
            />
          </div>

          <div className="mt-4 text-center text-sm space-y-2">
            <div>
              <span className="text-muted-foreground">¿No tienes cuenta? </span>
              <Link to="/register" className="text-primary hover:underline font-medium">
                Regístrate aquí
              </Link>
            </div>
            <div>
              <Dialog open={recoverDialogOpen} onOpenChange={setRecoverDialogOpen}>
                <DialogTrigger asChild>
                  <Button variant="link" className="text-primary p-0 h-auto font-medium">
                    ¿Olvidaste tu contraseña?
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Recuperar Cuenta</DialogTitle>
                    <DialogDescription>
                      Ingresa tu email y una nueva contraseña para recuperar tu cuenta
                    </DialogDescription>
                  </DialogHeader>
                  <form onSubmit={handleRecoverAccount} className="space-y-4">
                    <div>
                      <Label htmlFor="recover-email">Email</Label>
                      <Input
                        id="recover-email"
                        type="email"
                        placeholder="tu@email.com"
                        value={recoverData.email}
                        onChange={(e) => setRecoverData({ ...recoverData, email: e.target.value })}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="recover-password">Nueva Contraseña</Label>
                      <div className="relative">
                        <Input
                          id="recover-password"
                          type={showRecoverPassword ? "text" : "password"}
                          placeholder="••••••••"
                          value={recoverData.newPassword}
                          onChange={(e) => setRecoverData({ ...recoverData, newPassword: e.target.value })}
                          required
                          className="pr-10"
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                          onClick={() => setShowRecoverPassword(!showRecoverPassword)}
                        >
                          {showRecoverPassword ? (
                            <EyeOff className="h-4 w-4 text-muted-foreground" />
                          ) : (
                            <Eye className="h-4 w-4 text-muted-foreground" />
                          )}
                        </Button>
                      </div>
                    </div>
                    <Button type="submit" className="w-full" disabled={recoverLoading}>
                      {recoverLoading ? 'Cambiando contraseña...' : 'Cambiar Contraseña'}
                    </Button>
                  </form>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
