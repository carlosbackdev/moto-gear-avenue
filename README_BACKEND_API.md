# 📡 Documentación de API Backend

Backend URL: `http://localhost:8080/api`

## 🗂️ Categorías

### Obtener todas las categorías
```
GET /categories/get/all
```

**Respuesta:**
```json
[
  {
    "id": 1,
    "name": "Cascos"
  },
  {
    "id": 2,
    "name": "Guantes"
  }
]
```

### Obtener categoría por ID
```
GET /categories/get/{id}
```

**Parámetros:**
- `id` (path): ID de la categoría

**Respuesta:**
```json
{
  "id": 1,
  "name": "Cascos"
}
```

---

## 🛍️ Productos

### Obtener productos paginados
```
GET /products/page?page={page}&size={size}
```

**Parámetros:**
- `page` (query): Número de página (por defecto: 0)
- `size` (query): Tamaño de página (por defecto: 20)

**Respuesta:**
```json
{
  "content": [
    {
      "id": 1,
      "name": "Accesorios para motocicleta...",
      "details": "",
      "specifications": "{\"Origen\":\"CN(Origen)\",...}",
      "originalPrice": 4.13,
      "sellPrice": 2.28,
      "discount": 56,
      "currency": "EUR",
      "shippingCost": 1.99,
      "deliveryEstimateDays": "21-25 días",
      "variant": "[{\"groupName\":\"Color Red\",\"options\":[...]}]",
      "sellerName": "Vendedor de AliExpress",
      "category": 1,
      "images": []
    }
  ],
  "pageable": {
    "pageNumber": 0,
    "pageSize": 20,
    "offset": 0
  },
  "totalElements": 1,
  "totalPages": 1,
  "last": true,
  "first": true,
  "empty": false
}
```

### Obtener producto por ID
```
GET /products/{id}
```

**Parámetros:**
- `id` (path): ID del producto

**Respuesta:**
```json
{
  "id": 1,
  "name": "Accesorios para motocicleta...",
  "details": "",
  "specifications": "{\"Origen\":\"CN(Origen)\",...}",
  "originalPrice": 4.13,
  "sellPrice": 2.28,
  "discount": 56,
  "currency": "EUR",
  "shippingCost": 1.99,
  "deliveryEstimateDays": "21-25 días",
  "variant": "[{\"groupName\":\"Color Red\",\"options\":[...]}]",
  "sellerName": "Vendedor de AliExpress",
  "category": 1,
  "images": []
}
```

### Obtener productos por categoría
```
GET /products/category/{categoryId}?page={page}
```

**Parámetros:**
- `categoryId` (path): ID de la categoría
- `page` (query): Número de página (por defecto: 0)

**Respuesta:**
```json
[
  {
    "id": 1,
    "name": "Accesorios para motocicleta...",
    "details": "",
    "specifications": "{\"Origen\":\"CN(Origen)\",...}",
    "originalPrice": 4.13,
    "sellPrice": 2.28,
    "discount": 56,
    "currency": "EUR",
    "shippingCost": 1.99,
    "deliveryEstimateDays": "21-25 días",
    "variant": "[{\"groupName\":\"Color Red\",\"options\":[...]}]",
    "sellerName": "Vendedor de AliExpress",
    "category": 1,
    "images": []
  }
]
```

---

## 📝 Estructura de Datos

### Product
```typescript
{
  id: number;
  name: string;
  details: string;
  specifications: string; // JSON string
  originalPrice: number;
  sellPrice: number;
  discount: number;
  currency: string;
  shippingCost: number;
  deliveryEstimateDays: string;
  variant: string; // JSON string de variantes
  sellerName: string;
  category: number;
  images: string[];
}
```

### Variant Structure
```json
[
  {
    "groupName": "Color Red",
    "options": [
      {"value": "Red", "extraPrice": 0.0},
      {"value": "Black", "extraPrice": 0.0}
    ]
  }
]
```

### Specifications Structure
```json
{
  "Producto químico de alta preocupación": "Ninguno",
  "Origen": "CN(Origen)",
  "CN": "Sichuan",
  "Material": "Spandex y Nylon"
}
```

---

## 🔧 Configuración

Para conectar con el backend local:

1. Asegúrate de que el backend esté corriendo en `http://localhost:8080`
2. El frontend ya está configurado para usar esta URL por defecto
3. Para cambiar la URL, crea un archivo `.env.local`:
```
VITE_API_BASE_URL=http://localhost:8080/api
```
