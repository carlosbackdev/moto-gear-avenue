# Publicación de la página de venta

Los textos presentan el producto por sus funciones. El botón de compra sigue dependiendo del precio, disponibilidad y stock que devuelve el backend. Las ilustraciones existentes se identifican como tales; sustituirlas por fotos y vídeos reales cuando estén disponibles.

## Datos que debe completar el titular antes de publicar

- Configurar VITE_SELLER_TAX_ID y VITE_SELLER_ADDRESS con los datos públicos del vendedor; configurar VITE_RETURNS_ADDRESS para las devoluciones. Son variables de compilación Vite: requieren reconstruir la web y son públicas. No introducir secretos.
- Confirmar nombre del titular y correo de soporte en src/config/seller.ts.
- Confirmar tarifas, destinos y plazo de envío con la operativa real. Se conservan las tarifas existentes; esta modificación no cambia los cálculos del backend ni restringe países en checkout.
- Completar la información de privacidad según proveedores, plazos de conservación y transferencias realmente utilizados.
- Acordar cómo recibirá la app el primer comprador. No se anuncian enlaces de descarga ni disponibilidad en tiendas que todavía no existen.
- Verificar compatibilidad por año, versión y conector antes de aceptar el pedido. No se promete compatibilidad universal con modelos Kawasaki.

La actualización de textos no acredita conformidad del dispositivo ni resuelve las gestiones fiscales o de actividad. Esos trabajos quedan fuera de este cambio.

## Validación

Ejecutar npm run build y npx tsc --noEmit -p tsconfig.app.json. Revisar la portada con producto disponible, sin stock y error de API; comprobar precio y CTA contra el backend. Probar el proceso de pago en entorno de pruebas antes de publicar.
