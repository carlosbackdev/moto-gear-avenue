# MotoGear - Ordenador de a bordo para moto

![MotoGear](https://motogear.es/icon-512.png)

## 🏍️ Sobre el Proyecto

**MotoGear** se está reconvirtiendo en la web del ordenador de a bordo MotoGear:
telemetría y diagnóstico local para motocicletas Kawasaki. La primera versión
está en desarrollo y la compatibilidad se comunica únicamente cuando está
validada.

La portada consulta la ficha `ordenador-bordo-kawasaki` en el backend. El estado,
precio y stock configurados desde `admin-front` deciden si muestra
**Próximamente**, **Sin stock** o el acceso a compra.

🌐 **Web**: [https://motogear.es](https://motogear.es)

### Características principales

- **Landing del producto**: propuesta, funcionamiento y estado real del desarrollo
- **Ficha conectada**: precio, disponibilidad y stock procedentes del backend
- **Compra condicionada**: carrito y checkout solo se activan cuando el producto está disponible
- **Flujo de lanzamiento**: estados de borrador, próximamente, disponible y sin stock
- **Diseño responsive**: Experiencia optimizada en móvil, tablet y escritorio
- **SEO del producto**: metadatos y datos estructurados según el estado comercial

## 🛠️ Tecnologías

Este proyecto está construido con tecnologías modernas:

| Frontend | Backend | Pagos |
|----------|---------|-------|
| React 18 | Spring Boot | Stripe |
| TypeScript | REST API | |
| Tailwind CSS | MySQL | |
| Vite | | |
| shadcn/ui | | |

### Otras tecnologías utilizadas

- **React Router**: Navegación SPA
- **React Query**: Gestión de estado y caché
- **React Helmet Async**: SEO dinámico
- **Lucide React**: Iconografía
- **Sonner**: Notificaciones toast

## 🚀 Instalación Local

### Requisitos previos

- Node.js 18+ ([instalar con nvm](https://github.com/nvm-sh/nvm#installing-and-updating))
- npm o yarn

### Pasos de instalación

```bash
# 1. Clonar el repositorio
git clone https://github.com/tu-usuario/motogear.git

# 2. Entrar al directorio
cd motogear

# 3. Instalar dependencias
npm install

# 4. Configurar variables de entorno
cp .env.example .env.local

# 5. Editar .env.local con tus URLs de backend
# VITE_API_BASE_URL=http://localhost:8080/api
# VITE_IMAGE_BASE_URL=http://localhost:8080

# 6. Iniciar servidor de desarrollo
npm run dev
```

La aplicación estará disponible en `http://localhost:8080`

## 📁 Estructura del Proyecto

```
src/
├── assets/          # Imágenes y recursos estáticos
├── components/      # Componentes reutilizables
│   ├── shared/      # Navbar, Footer, ProductCard...
│   ├── ui/          # Componentes shadcn/ui
│   └── auth/        # Componentes de autenticación
├── contexts/        # Context providers (Auth, Cart, Wishlist)
├── hooks/           # Custom hooks
├── lib/             # Utilidades y datos mock
├── pages/           # Páginas de la aplicación
├── services/        # Servicios API
└── types/           # Definiciones TypeScript
```

## 📖 Documentación Adicional

- [Documentación de la API Backend](./doc/README_BACKEND_API.md)
- [Configuración de Google Auth](./doc/GOOGLE_AUTH_SETUP.md)
- [Organización del Proyecto](./doc/README_ORGANIZACION.md)

## 🤖 Desarrollo con IA

Este proyecto ha sido desarrollado con la asistencia de herramientas de Inteligencia Artificial, lo que ha permitido:

- Acelerar el desarrollo de componentes UI
- Implementar mejores prácticas de código
- Optimizar el SEO técnico
- Mejorar la accesibilidad y experiencia de usuario

## 📄 Licencia

Este proyecto es propiedad de MotoGear. Todos los derechos reservados.

---

**MotoGear** - Tu tienda de confianza para equipamiento de moto 🏍️
