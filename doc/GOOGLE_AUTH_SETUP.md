# Configuración de Google Sign-In

## Obtener el Google Client ID

1. **Ir a Google Cloud Console**
   - Accede a [Google Cloud Console](https://console.cloud.google.com/)
   - Crea un nuevo proyecto o selecciona uno existente

2. **Habilitar Google Sign-In API**
   - En el menú lateral, ve a "APIs y servicios" → "Biblioteca"
   - Busca "Google+ API" y habilítala
   - También busca "Google Identity Services" y habilítala

3. **Configurar la pantalla de consentimiento OAuth**
   - Ve a "APIs y servicios" → "Pantalla de consentimiento de OAuth"
   - Selecciona "Externo" (para pruebas) o "Interno" (si tienes Google Workspace)
   - Completa la información básica:
     - Nombre de la aplicación: "MotoGear"
     - Email de soporte de usuario
     - Logotipo de la aplicación (opcional)
   - En "Dominios autorizados", agrega:
     - Tu dominio local: `localhost`
     - Tu dominio de producción (si lo tienes)
   - Ámbitos (scopes):
     - `.../auth/userinfo.email`
     - `.../auth/userinfo.profile`
     - `openid`

4. **Crear credenciales OAuth 2.0**
   - Ve a "APIs y servicios" → "Credenciales"
   - Haz clic en "Crear credenciales" → "ID de cliente de OAuth 2.0"
   - Tipo de aplicación: "Aplicación web"
   - Nombre: "MotoGear Web Client"
   
   **Orígenes de JavaScript autorizados:**
   ```
   http://localhost:5173
   http://localhost:3000
   https://tu-dominio.com (si tienes uno)
   ```
   
   **URIs de redireccionamiento autorizados:**
   ```
   http://localhost:5173
   http://localhost:3000
   https://tu-dominio.com (si tienes uno)
   ```

5. **Copiar el Client ID**
   - Una vez creadas las credenciales, copia el "ID de cliente"
   - Se verá algo como: `123456789-abcdefg.apps.googleusercontent.com`

## Configurar el proyecto

1. **Crear archivo `.env` en la raíz del proyecto:**
   ```bash
   cp .env.example .env
   ```

2. **Editar `.env` y agregar tu Google Client ID:**
   ```env
   VITE_GOOGLE_CLIENT_ID=tu-client-id-aqui.apps.googleusercontent.com
   ```

3. **Reiniciar el servidor de desarrollo:**
   ```bash
   npm run dev
   ```

## Configuración del Backend

El backend ya está configurado para recibir el token de Google en el endpoint:
```
POST /api/auth/firebase-login
```

Body:
```json
{
  "email": "usuario@gmail.com",
  "fullName": "Juan Pérez",
  "firebaseToken": "eyJhbGciOiJSUzI1NiIsImtpZCI6...",
  "firebaseUid": "google-uid-123456",
  "photoUrl": "https://lh3.googleusercontent.com/a/..."
}
```

El backend:
1. Valida el token de Google (opcional pero recomendado)
2. Busca o crea el usuario en la base de datos
3. Retorna un JWT propio del backend

## Validación del Token en el Backend (Opcional pero Recomendado)

Para mayor seguridad, el backend puede validar el token de Google antes de crear/autenticar al usuario:

1. **Agregar dependencia en el backend:**
   ```xml
   <dependency>
       <groupId>com.google.api-client</groupId>
       <artifactId>google-api-client</artifactId>
       <version>2.2.0</version>
   </dependency>
   ```

2. **Configurar en `application.properties`:**
   ```properties
   google.client.id=tu-client-id-aqui.apps.googleusercontent.com
   ```

3. **El `GoogleTokenValidator` ya está implementado en el backend**
   - Valida que el token sea legítimo
   - Verifica que el email coincida
   - Previene ataques de suplantación

## Flujo de Autenticación

```
Usuario → Click "Continuar con Google"
       ↓
Google Sign-In Popup → Usuario se autentica
       ↓
Google devuelve token JWT + datos del usuario
       ↓
Frontend envía datos a /api/auth/firebase-login
       ↓
Backend valida token (opcional) y crea/busca usuario
       ↓
Backend devuelve JWT propio
       ↓
Frontend guarda JWT y redirige al usuario
```

## Solución de Problemas

### Error: "Invalid Client ID"
- Verifica que el Client ID en `.env` sea correcto
- Asegúrate de que el origen de la aplicación esté en la lista de orígenes autorizados en Google Console

### Error: "Popup bloqueado"
- Permite popups para tu localhost en el navegador
- En Chrome: ícono de popup bloqueado en la barra de direcciones

### Error: "redirect_uri_mismatch"
- Verifica que la URL de tu aplicación esté en la lista de URIs de redireccionamiento en Google Console
- Asegúrate de incluir el protocolo (http:// o https://)

### El botón de Google no aparece
- Verifica que `VITE_GOOGLE_CLIENT_ID` esté configurado en `.env`
- Revisa la consola del navegador para ver errores
- Asegúrate de haber reiniciado el servidor después de crear el `.env`

## Referencias

- [Google Identity Services Documentation](https://developers.google.com/identity/gsi/web/guides/overview)
- [Google Cloud Console](https://console.cloud.google.com/)
- [OAuth 2.0 Scopes](https://developers.google.com/identity/protocols/oauth2/scopes)
