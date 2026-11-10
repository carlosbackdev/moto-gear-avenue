import { Link } from 'react-router-dom';
import { LegalPage, SellerDetails } from '@/components/legal/LegalPage';

export default function Terms() {
  return <LegalPage title="Aviso legal y condiciones de compra" description="Quién está detrás de MotoGear y qué debes saber antes de hacer tu pedido." path="/terms">
    <SellerDetails />
    <section><h2>El producto y tu moto</h2><p>MotoGear es un dispositivo con pantalla propia que obtiene información de la ECU. Comprueba modelo, año, conector, contenido del kit y funciones en la ficha. Si tienes dudas, <Link to="/contact">consúltanos antes de comprar</Link>.</p><p>La pantalla funciona sin teléfono. El diagnóstico detallado y la configuración móvil requieren la app: su publicación en Google Play y App Store está pendiente. Consulta el acceso disponible para tu teléfono antes de comprar. El consumo mostrado es una estimación orientativa y el equipo no sustituye al cuadro original ni a una revisión profesional.</p></section>
    <section><h2>Precio, disponibilidad y pedido</h2><p>Revisa las características, disponibilidad y precio total, incluidos los impuestos aplicables y el transporte, antes de confirmar el pago. La cuenta de la tienda permite gestionar tus pedidos; no es necesaria para usar la pantalla del dispositivo.</p><p>El pago se realiza mediante Stripe. Si un pago se interrumpe o aparece pendiente, comprueba su estado antes de repetirlo. Puedes contactar con nosotros para aclarar cualquier incidencia.</p></section>
    <section><h2>Entrega, devolución y garantía</h2><p>Consulta las <Link to="/shipping">condiciones de envío</Link> y las <Link to="/returns">condiciones de devolución y garantía</Link>. Conserva la confirmación de compra. Si detectas un error de dirección o quieres cancelar antes del envío, escríbenos indicando el número de pedido.</p></section>
    <section><h2>Uso e instalación</h2><p>Sigue las instrucciones del equipo, fija la pantalla y el cableado sin interferir con los mandos y utiliza la app con la moto detenida. Borrar un código no repara la causa de la avería. Los datos y prestaciones dependen de la ECU compatible.</p></section>
    <section><h2>Privacidad y marcas</h2><p>Explicamos el tratamiento de tus datos en la <Link to="/privacy">política de privacidad</Link>. MotoGear es un proyecto independiente: las marcas de motocicletas se mencionan para identificar modelos y compatibilidad, sin implicar afiliación con sus fabricantes.</p></section>
    <section><h2>Consultas y reclamaciones</h2><p>Usa el contacto indicado arriba para cualquier consulta o reclamación. Estas condiciones no limitan tus derechos como consumidor ni la protección obligatoria que te corresponda.</p></section>
  </LegalPage>;
}
