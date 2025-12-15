# MotoGear - Tienda Online de Accesorios para Moto

![MotoGear](https://motogear.es/icon-512.png)

## 🏍️ Sobre el Proyecto

**MotoGear** es una tienda online especializada en accesorios y equipamiento premium para motociclistas. Ofrecemos una amplia gama de productos de calidad, desde cascos y guantes hasta chaquetas, maletas y protecciones.

🌐 **Web**: [https://motogear.es](https://motogear.es)

### Características principales

- **Catálogo completo**: Amplia selección de accesorios para moto organizados por categorías
- **Búsqueda inteligente**: Encuentra productos fácilmente por nombre, categoría o palabras clave
- **Carrito de compra**: Gestión completa del carrito con variantes de producto
- **Checkout seguro**: Pagos procesados de forma segura con Stripe
- **Seguimiento de pedidos**: Rastrea tus envíos en tiempo real
- **Sistema de reseñas**: Opiniones verificadas de clientes
- **Diseño responsive**: Experiencia optimizada en móvil, tablet y escritorio
- **SEO optimizado**: URLs amigables con nombres de producto para mejor posicionamiento

### Servicios

- ✅ **Envío rápido**: Entrega en 2-7 días laborables
- ✅ **Devolución gratis**: Sin coste en todos los productos
- ✅ **Pago seguro**: Encriptación SSL y certificación PCI DSS
- ✅ **Atención al cliente**: Soporte por email en motogearspain@gmail.com

## 🛠️ Tecnologías

Este proyecto está construido con tecnologías modernas:

| Frontend | Backend | Pagos |
|----------|---------|-------|
| React 18 | Spring Boot | Stripe |
| TypeScript | REST API | |
| Tailwind CSS | PostgreSQL | |
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
