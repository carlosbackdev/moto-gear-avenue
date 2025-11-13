/**
 * Mock Data - Datos de ejemplo para desarrollo
 * 
 * IMPORTANTE: Este archivo contiene datos de prueba.
 * En producción, estos datos vendrán del backend Spring Boot.
 */

import { Product, Category } from '@/types/models';
import helmetImg from '@/assets/placeholder-helmet.jpg';
import glovesImg from '@/assets/placeholder-gloves.jpg';

export const mockCategories: Category[] = [
  { id: 1, name: 'Cascos Integrales', slug: 'cascos-integrales' },
  { id: 2, name: 'Guantes', slug: 'guantes' },
  { id: 3, name: 'Chaquetas', slug: 'chaquetas' },
  { id: 4, name: 'Maletas y Baúles', slug: 'maletas' },
  { id: 5, name: 'Escapes', slug: 'escapes' },
  { id: 6, name: 'Protecciones', slug: 'protecciones' },
];

export const mockProducts: Product[] = [
  {
    id: 1,
    name: 'Casco Integral Racing Pro X1',
    description: 'Casco integral de alto rendimiento con aerodinámica optimizada. Calota de fibra de carbono ultra ligera. Sistema de ventilación avanzado con 7 entradas y 4 salidas de aire. Interior antibacteriano extraíble y lavable. Homologación ECE 22.06.',
    price: 349.99,
    imageUrl: helmetImg,
    images: [helmetImg, helmetImg, helmetImg],
    stock: 15,
    categoryId: 1,
    brand: 'AGV',
    bikeModelCompatibility: 'Universal - Todas las motos deportivas',
    averageRating: 4.5,
    reviewCount: 28
  },
  {
    id: 2,
    name: 'Guantes Racing Carbon Tech',
    description: 'Guantes deportivos con protecciones de carbono en nudillos. Palma de piel de canguro para máximo tacto. Costuras reforzadas en zonas de alto impacto. Cierre micrométrico ajustable. Certificación CE nivel 1.',
    price: 129.99,
    imageUrl: glovesImg,
    images: [glovesImg, glovesImg],
    stock: 30,
    categoryId: 2,
    brand: 'Alpinestars',
    bikeModelCompatibility: 'Universal',
    averageRating: 4.7,
    reviewCount: 45
  },
  {
    id: 3,
    name: 'Casco Modular Urban Flip',
    description: 'Casco modular versátil para uso urbano y touring. Pantalla solar retráctil integrada. Sistema de apertura con una sola mano. Interior confortable con tejido hipoalergénico. Preparado para intercomunicador Bluetooth. Homologación P/J.',
    price: 249.99,
    imageUrl: helmetImg,
    stock: 20,
    categoryId: 1,
    brand: 'Shoei',
    bikeModelCompatibility: 'Universal - Ideal para motos touring y naked',
  },
  {
    id: 4,
    name: 'Guantes Touring Waterproof',
    description: 'Guantes impermeables para largas distancias. Membrana Gore-Tex garantiza impermeabilidad y transpirabilidad. Protecciones certificadas en nudillos y palma. Puño largo para máxima protección. Reflectantes para visibilidad nocturna.',
    price: 159.99,
    imageUrl: glovesImg,
    stock: 25,
    categoryId: 2,
    brand: 'Dainese',
    bikeModelCompatibility: 'Universal',
  },
  {
    id: 5,
    name: 'Casco Jet Vintage Retro',
    description: 'Casco jet de estilo retro con diseño vintage. Calota en policarbonato de alta resistencia. Interior de ante sintético premium. Visera incluida. Sistema de cierre micrométrico. Perfecto para motos custom y café racer.',
    price: 169.99,
    imageUrl: helmetImg,
    stock: 18,
    categoryId: 1,
    brand: 'Bell',
    bikeModelCompatibility: 'Café Racer, Custom, Scrambler',
  },
  {
    id: 6,
    name: 'Guantes Invierno Heated',
    description: 'Guantes calefactables para invierno extremo. Sistema de calefacción eléctrica con 3 niveles de temperatura. Batería de litio recargable (autonomía 6h). Membrana impermeable. Aislamiento térmico Thinsulate. Pantalla táctil compatible.',
    price: 199.99,
    imageUrl: glovesImg,
    stock: 12,
    categoryId: 2,
    brand: 'Macna',
    bikeModelCompatibility: 'Universal',
  },
  {
    id: 7,
    name: 'Casco Off-Road MX Elite',
    description: 'Casco cross/enduro de competición. Diseño aerodinámico con sistema EPS multi-densidad. Visera ajustable y extraíble. Preparado para gafas de motocross. Ventilación superior con 9 canales de aire. Peak solar incluido.',
    price: 279.99,
    imageUrl: helmetImg,
    stock: 22,
    categoryId: 1,
    brand: 'Fox Racing',
    bikeModelCompatibility: 'Motocross, Enduro, Adventure',
  },
  {
    id: 8,
    name: 'Guantes Verano Perforados',
    description: 'Guantes ultraligeros para verano. Perforaciones laser-cut para máxima ventilación. Nudillos con protección flexible. Palma reforzada con Kevlar. Compatible con pantallas táctiles. Certificación CE. Diseño racing agresivo.',
    price: 79.99,
    imageUrl: glovesImg,
    stock: 40,
    categoryId: 2,
    brand: 'Rev\'it',
    bikeModelCompatibility: 'Universal',
  },
];
