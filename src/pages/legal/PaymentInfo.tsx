import { Link } from 'react-router-dom';
import { LegalPage } from '@/components/legal/LegalPage';
import { seller } from '@/config/seller';
export default function PaymentInfo() {
  return <LegalPage title="Pago y pedidos" description="Un proceso de compra claro, con el importe visible antes de pagar." path="/payment-info">
    <section><h2>Pago mediante Stripe</h2><p>Desde tu pedido puedes acceder a la pasarela de Stripe. Allí se muestran los métodos de pago disponibles. Introduce los datos de tarjeta únicamente en esa pasarela; no los envíes por correo ni por el formulario de contacto.</p></section>
    <section><h2>Antes de pagar</h2><p>Revisa producto, cantidad, compatibilidad, dirección, transporte e importe total. Crear un pedido no equivale a haber completado el pago. Si cancelas o se interrumpe la operación, consulta su estado antes de volver a intentarlo.</p></section>
    <section><h2>Consulta tu compra</h2><p>Accede a <Link to="/orders">Mis pedidos</Link> para ver la información de tu compra. Si el estado no coincide con un cargo que ves en tu banco, escribe a <a href={`mailto:${seller.email}`}>{seller.email}</a> con el número de pedido. No realices otro pago hasta aclararlo.</p></section>
    <section><h2>Cambios, cancelaciones y devolución</h2><p>Contacta cuanto antes si necesitas corregir o cancelar un pedido. Consulta también las <Link to="/returns">condiciones de desistimiento, reembolso y garantía</Link> y los <Link to="/shipping">plazos de envío</Link>.</p></section>
  </LegalPage>;
}
