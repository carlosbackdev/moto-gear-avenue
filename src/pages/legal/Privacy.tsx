import { LegalPage, SellerDetails } from '@/components/legal/LegalPage';
import { seller } from '@/config/seller';
export default function Privacy() {
  return <LegalPage title="Política de privacidad" description="Qué datos usamos en la tienda, para qué y cómo ejercer tus derechos." path="/privacy">
    <SellerDetails />
    <section><h2>Consultas, cuenta y pedidos</h2><p>Tratamos los datos de contacto y de tu moto para responder a solicitudes; los de cuenta, dirección y compra para gestionar pedidos y soporte. Las bases son las medidas precontractuales, la ejecución del contrato y las obligaciones legales correspondientes.</p><p>Si solicitas un aviso de disponibilidad, utilizamos los datos de ese formulario para el aviso que has pedido, con tu consentimiento. Puedes retirarlo por email. Una consulta de compatibilidad no implica suscripción a publicidad general.</p></section>
    <section><h2>Conservación y proveedores</h2><p>Conservamos los datos mientras sean necesarios para su finalidad y durante los plazos legales aplicables. Intervienen proveedores de alojamiento, correo, pago y transporte cuando el servicio lo requiere. Si eliges iniciar sesión con Google, interviene también ese proveedor. Las transferencias internacionales que procedan requieren las garantías previstas por la normativa.</p></section>
    <section><h2>Tus derechos</h2><p>Puedes solicitar acceso, rectificación, supresión, oposición, limitación y portabilidad en <a href={`mailto:${seller.email}`}>{seller.email}</a>, indicando qué solicitas. También puedes reclamar ante la <a href="https://www.aepd.es/" target="_blank" rel="noreferrer">Agencia Española de Protección de Datos</a>.</p></section>
    <section><h2>Uso del lector</h2><p>La cuenta de esta tienda y la conexión local entre el lector y el móvil son funciones diferentes. No necesitas iniciar sesión en la tienda para usar la pantalla del dispositivo.</p></section>
  </LegalPage>;
}
