import { LegalPage } from '@/components/legal/LegalPage';
import { seller } from '@/config/seller';
export default function ShippingPolicy() {
  return <LegalPage title="Envíos y entregas" description="Información para saber cuánto cuesta el transporte y cómo consultar tu pedido." path="/shipping">
    <section><h2>Destino y coste</h2><p>La tarifa estándar para España peninsular es de 1,99 € en pedidos inferiores a 50 € y gratuita a partir de 50 €. Para Baleares, Canarias, Ceuta, Melilla y otros países, consúltanos antes de hacer el pedido: no des por aplicable la tarifa peninsular.</p></section>
    <section><h2>Cuándo recibirás tu pedido</h2><p>Para productos disponibles con envío desde España, el plazo orientativo es de 2 a 7 días laborables. Revisa la información específica del producto: los artículos enviados desde proveedores internacionales pueden tener plazos distintos. Si surge una incidencia, contactaremos contigo para resolverla.</p></section>
    <section><h2>Dirección y seguimiento</h2><p>Comprueba nombre, dirección y código postal antes de pagar. Puedes consultar tu pedido desde tu cuenta. Cuando se asigne un número de seguimiento, podrás consultar la información del transportista.</p></section>
    <section><h2>Si algo va mal</h2><p>Si el paquete no llega, llega dañado o necesitas corregir la dirección, escribe a <a href={`mailto:${seller.email}`}>{seller.email}</a> indicando el pedido. Gestionaremos la incidencia; no tienes que resolverla por tu cuenta con el transportista.</p></section>
  </LegalPage>;
}
