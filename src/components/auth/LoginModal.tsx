import { useState, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { toast } from 'sonner';
import { GoogleLogin, CredentialResponse } from '@react-oauth/google';
import { Eye, EyeOff, ExternalLink, Copy } from 'lucide-react';
import { usersService } from '@/services/users.service';

// Detectar navegadores embebidos (WebViews) de apps sociales
const isInAppBrowser = (): boolean => {
  const ua = navigator.userAgent || (navigator as any).vendor || '';
  return /FBAN|FBAV|Instagram|TikTok|Snapchat|Line|Twitter|Pinterest|LinkedIn|Bytedance/i.test(ua);
};

interface LoginModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  trigger?: React.ReactNode;
}

export function LoginModal({ open, onOpenChange, trigger }: LoginModalProps) {
  const isWebView = useMemo(() => isInAppBrowser(), []);
  const navigate = useNavigate();
  const { login, firebaseLogin } = useAuth();
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
      onOpenChange(false);
      setFormData({ email: '', password: '' });
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
      const credential = credentialResponse.credential;
      if (!credential) {
        throw new Error('No se recibió credencial de Google');
      }

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
      onOpenChange(false);
      setFormData({ email: '', password: '' });
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

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success('Enlace copiado. Pégalo en Chrome o Safari para usar Google.');
  };

  const handleOpenExternal = () => {
    window.open(window.location.href, '_blank');
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
    <Dialog open={open} onOpenChange={onOpenChange}>
      {trigger && <DialogTrigger asChild>{trigger}</DialogTrigger>}
      <DialogContent className="max-w-md">
        <DialogHeader className="space-y-1">
          <DialogTitle className="text-2xl font-bold text-center">Iniciar Sesión</DialogTitle>
          <DialogDescription className="text-center">
            Accede a tu cuenta de MotoGear
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="modal-email">Email</Label>
              <Input
                id="modal-email"
                name="email"
                type="email"
                placeholder="tu@email.com"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <Label htmlFor="modal-password">Contraseña</Label>
              <div className="relative">
                <Input
                  id="modal-password"
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

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <Separator />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground font-bold">O continúa con</span>
            </div>
          </div>

          <div className="flex justify-center">
            {isWebView ? (
              <div className="w-full space-y-3">
                <div className="p-4 bg-amber-500/10 border border-amber-500/30 rounded-lg text-center space-y-3">
                  <p className="text-sm text-amber-600 dark:text-amber-400 font-medium">
                    Google no permite iniciar sesión desde la app de TikTok/Instagram.
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Usa tu email y contraseña, o abre la web en tu navegador:
                  </p>
                  
                  <div className="grid grid-cols-2 gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="gap-2 w-full"
                      onClick={handleOpenExternal}
                    >
                      <ExternalLink className="h-4 w-4" />
                      Abrir fuera
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="gap-2 w-full"
                      onClick={handleCopyLink}
                    >
                      <Copy className="h-4 w-4" />
                      Copiar Link
                    </Button>
                  </div>
                </div>
              </div>
            ) : (
              <GoogleLogin
                onSuccess={handleGoogleSuccess}
                onError={handleGoogleError}
                useOneTap={false}
                text="signin_with"
                size="large"
                width="260"
                theme="outline"
                shape="rectangular"
              />
            )}
          </div>

          <div className="text-center text-sm space-y-2">
            <div>
              <span className="text-muted-foreground">¿No tienes cuenta? </span>
              <Link 
                to="/register" 
                className="text-primary hover:underline font-medium"
                onClick={() => onOpenChange(false)}
              >
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
        </div>
      </DialogContent>
    </Dialog>
  );
}
