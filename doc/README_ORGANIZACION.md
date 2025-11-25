# 📁 Organización del Proyecto - MotoGear E-commerce

## 🗂️ Estructura de Carpetas

```
src/
├── assets/                    # Imágenes y recursos estáticos
│   └── hero-moto.jpg         # Imagen del hero principal
│
├── components/
│   ├── shared/               # Componentes reutilizables
│   │   ├── Navbar.tsx       # Barra de navegación principal
│   │   ├── Footer.tsx       # Footer del sitio
│   │   └── ProductCard.tsx  # Tarjeta de producto
│   │
│   ├── ui/                   # Componentes UI de shadcn
│   └── ProtectedRoute.tsx   # HOC para proteger rutas privadas
│
├── config/
│   └── environment.ts        # Configuración de URLs del backend
│
├── contexts/                 # Context API de React
│   ├── AuthContext.tsx      # Estado global de autenticación
│   └── CartContext.tsx      # Estado global del carrito
│
├── lib/
│   ├── utils.ts             # Utilidades generales
│   └── mockData.ts          # Datos de prueba (TEMPORAL)
│
├── pages/                    # Páginas principales de la app
│   ├── Home.tsx             # Página de inicio
│   ├── Catalog.tsx          # Catálogo de productos
│   ├── ProductDetail.tsx    # Detalle de producto individual
│   ├── Cart.tsx             # Carrito de compra
│   ├── Checkout.tsx         # Proceso de checkout
│   ├── Login.tsx            # Inicio de sesión
│   ├── Register.tsx         # Registro de usuario
│   ├── Account.tsx          # Perfil del usuario
│   ├── Orders.tsx           # Historial de pedidos
│   └── NotFound.tsx         # Página 404
│
├── services/                 # Servicios para comunicación con backend
│   ├── api.service.ts       # Servicio base HTTP
│   ├── auth.service.ts      # Servicio de autenticación
│   ├── product.service.ts   # Servicio de productos
│   ├── category.service.ts  # Servicio de categorías
│   ├── cart.service.ts      # Servicio del carrito
│   └── order.service.ts     # Servicio de pedidos
│
├── types/
│   └── models.ts            # Interfaces TypeScript
│
├── App.tsx                  # Componente principal + Routing
├── main.tsx                 # Punto de entrada
└── index.css                # Estilos globales + Design System
```

---

## 🔌 Servicios y Endpoints del Backend

### 📋 Tabla de Referencia de Endpoints

| Servicio | Método | Endpoint | Descripción | Ubicación |
|----------|--------|----------|-------------|-----------|
| **Productos** | | | | `src/services/product.service.ts` |
| | GET | `/api/products` | Obtener todos los productos | `getProducts()` |
| | GET | `/api/products/{id}` | Obtener producto por ID | `getProductById(id)` |
| | GET | `/api/products?category={id}` | Filtrar por categoría | `getProductsByCategory(categoryId)` |
| **Categorías** | | | | `src/services/category.service.ts` |
| | GET | `/api/categories` | Obtener todas las categorías | `getCategories()` |
| **Carrito** | | | | `src/services/cart.service.ts` |
| | POST | `/api/cart` | Crear/actualizar carrito | `syncCartWithBackend(cartItems)` |
| | GET | `/api/cart/{cartId}` | Obtener carrito por ID | `getCartById(cartId)` |
| **Pedidos** | | | | `src/services/order.service.ts` |
| | POST | `/api/orders` | Crear nuevo pedido | `createOrder(orderData)` |
| | GET | `/api/orders/{orderId}` | Obtener pedido por ID | `getOrderById(orderId)` |
| | GET | `/api/users/me/orders` | Pedidos del usuario actual | `getUserOrders()` |
| **Autenticación** | | | | `src/services/auth.service.ts` |
| | POST | `/api/auth/register` | Registrar nuevo usuario | `register(data)` |
| | POST | `/api/auth/login` | Iniciar sesión (devuelve JWT) | `login(data)` |
| | GET | `/api/users/me` | Obtener datos del usuario actual | `getCurrentUser()` |

---

## 🎯 Dónde Encontrar Cada Cosa

### ¿Dónde se hacen las llamadas al backend?

- **Carpeta**: `src/services/`
- Cada servicio maneja un dominio específico (productos, auth, pedidos, etc.)
- Todos heredan la configuración base de `api.service.ts`

### ¿Dónde se definen los tipos/interfaces?

- **Archivo**: `src/types/models.ts`
- Interfaces para: Product, Category, CartItem, Order, User, etc.

### ¿Dónde se configura la URL del backend?

- **Archivo**: `src/config/environment.ts`
- Variable: `apiBaseUrl` (por defecto: `http://localhost:8080/api`)

### ¿Dónde se gestiona el estado global?

- **Autenticación**: `src/contexts/AuthContext.tsx`
  - Login, logout, usuario actual
- **Carrito**: `src/contexts/CartContext.tsx`
  - Añadir, eliminar, actualizar productos

### ¿Dónde están las rutas protegidas?

- **Componente**: `src/components/ProtectedRoute.tsx`
- **Uso en**: `src/App.tsx`
- Rutas protegidas: `/checkout`, `/account`, `/account/orders`

### ¿Dónde se define el diseño (colores, estilos)?

- **Design System**: `src/index.css` (variables CSS)
- **Tailwind Config**: `tailwind.config.ts`
- Colores principales: Naranja (#FF6B00) y negro/gris

---

## 🚀 Flujos Principales

### 1. Flujo de Autenticación

```
Login.tsx → authService.login() → POST /api/auth/login
                                 → Guarda token en localStorage
                                 → AuthContext actualiza estado
                                 → Redirección a home
```

### 2. Flujo de Compra

```
Catalog.tsx → productService.getProducts() → GET /api/products
           → Click en producto
           → ProductDetail.tsx → Añadir al carrito
           → CartContext.addItem() → Guarda en localStorage
           → Cart.tsx → Ver carrito
           → Checkout.tsx → orderService.createOrder() → POST /api/orders
           → Redirección a Orders.tsx
```

### 3. Flujo de Ver Pedidos

```
Account.tsx → Link a "Mis Pedidos"
           → Orders.tsx → orderService.getUserOrders() → GET /api/users/me/orders
           → Muestra historial
```

---

## 🔧 Configuración para Desarrollo

### 1. Configurar Backend URL

Edita `src/config/environment.ts`:

```typescript
export const environment = {
  production: false,
  apiBaseUrl: 'http://localhost:8080/api', // Tu backend Spring Boot
};
```

### 2. Variables de Entorno (Opcional)

Crea `.env.local`:

```
VITE_API_BASE_URL=http://localhost:8080/api
```

### 3. Datos de Prueba

Mientras desarrollas sin backend:
- Los datos mock están en: `src/lib/mockData.ts`
- Puedes modificar los servicios para usar estos datos temporalmente

---

## 📝 Notas Importantes

### Autenticación JWT

- El token se guarda en `localStorage` (clave: `authToken`)
- Se añade automáticamente a las peticiones protegidas
- Ver: `src/services/api.service.ts` → método `getHeaders()`

### Gestión del Carrito

- El carrito se guarda en `localStorage` para persistencia
- Se puede sincronizar con backend usando `cartService.syncCartWithBackend()`

### Rutas Públicas vs Protegidas

**Públicas**:
- `/` - Home
- `/catalog` - Catálogo
- `/product/:id` - Detalle producto
- `/cart` - Carrito
- `/login` - Login
- `/register` - Registro

**Protegidas** (requieren login):
- `/checkout` - Checkout
- `/account` - Mi cuenta
- `/account/orders` - Mis pedidos

---

## 🎨 Sistema de Diseño

### Colores Principales

- **Primary**: Naranja (#FF6B00) - CTAs, precios, highlights
- **Secondary**: Negro/Gris oscuro - Headers, texto principal
- **Background**: Blanco/Gris muy claro
- **Accent**: Naranja brillante - Hover states

### Componentes UI

Basados en **shadcn/ui**:
- Button, Card, Input, Label, Badge, Dialog, etc.
- Totalmente personalizables en `src/components/ui/`

---

## 📚 Recursos Adicionales

- [Documentación de React Router](https://reactrouter.com/)
- [Documentación de shadcn/ui](https://ui.shadcn.com/)
- [Tailwind CSS](https://tailwindcss.com/)

---

**¿Necesitas ayuda?** Revisa los comentarios en cada archivo de servicio para entender qué hace cada método.
