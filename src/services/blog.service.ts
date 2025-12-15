import { BlogPost } from '@/types/models';
import helmetImage from '@/assets/placeholder-helmet.jpg';
import glovesImage from '@/assets/placeholder-gloves.jpg';
import heroMotoImage from '@/assets/hero-moto.jpg';

// Mock data
const MOCK_POSTS: BlogPost[] = [
    {
        id: 1,
        title: 'Guía Definitiva: Cómo elegir tu primer casco',
        slug: 'como-elegir-primer-casco',
        excerpt: 'Descubre los factores clave para comprar tu primer casco de moto: seguridad, tipo, talla y materiales. No te arriesgues en tu primera elección.',
        content: `
# Cómo elegir tu primer casco de moto

Elegir tu primer casco es probablemente la decisión más importante que tomarás como nuevo motorista. No es solo un accesorio legal obligatorio, es tu principal salvavidas.

## 1. Tipos de Casco

Existen principalmente tres tipos de cascos, cada uno con sus pros y contras:

### Integral (Full Face)
Es la opción más segura. Cubre toda la cabeza y la cara de una sola pieza.
* **Pros:** Máxima protección, mejor aislamiento acústico.
* **Contras:** Puede dar calor en verano, campo de visión a veces más reducido.

### Modular (Abatible)
Permite levantar la mentonera. Muy popular en mototurismo.
* **Pros:** Versatilidad, cómodo para hablar o airearse en paradas.
* **Contras:** Suele ser más pesado y ruidoso que un integral.

### Jet (Abierto)
Cubre la cabeza pero deja el rostro al descubierto.
* **Pros:** Muy fresco, gran campo de visión.
* **Contras:** **Menor protección.** En caso de caída, la cara está expuesta.

## 2. La Talla Correcta

Un casco caro de la talla incorrecta protege menos que uno barato de tu talla.
1. Mide la circunferencia de tu cabeza por encima de las cejas.
2. Consulta la tabla del fabricante (cada marca talla distinto).
3. **Prueba de ajuste:** El casco debe apretar un poco (sin doler). Si mueves la cabeza bruscamente, el casco no debe bailar.

## 3. Homologación

Busca siempre la etiqueta **ECE 22.06** (la normativa europea más reciente y exigente). Evita cascos que solo tengan certificaciones antiguas o dudosas si vas a circular por Europa.

## 4. Materiales

* **Policarbonato:** Más económicos, vida útil de unos 5 años.
* **Fibra de Vidrio/Composite:** Mejor absorción de impacto y más ligeros.
* **Fibra de Carbono:** Los más ligeros y resistentes (y caros).

## Conclusión

Para tu primer casco, nuestra recomendación es un **Integral de Fibra**. Ofrece el mejor equilibrio entre seguridad y peso. ¡Invierte en tu cabeza!
    `,
        author: 'Carlos MotoGear',
        date: '2024-05-15',
        imageUrl: helmetImage,
        tags: ['Seguridad', 'Guías', 'Principiantes'],
        readTime: '5 min'
    },
    {
        id: 2,
        title: 'Mantenimiento de ropa de cuero: Trucos y Consejos',
        slug: 'mantenimiento-ropa-cuero',
        excerpt: 'Aprende a limpiar, hidratar y conservar tu mono o chaqueta de cuero para que dure años como el primer día.',
        content: `
# Mantenimiento de tu equipamiento de cuero

El cuero es como una segunda piel y, como tal, necesita cuidados para no agrietarse ni perder sus propiedades abrasivas.

## Limpieza Básica
Después de cada ruta larga:
1. Pasa un paño húmedo (solo agua) para quitar mosquitos y polvo superficial.
2. Deja secar al aire, **nunca** bajo el sol directo ni cerca de radiadores.

## Hidratación Profunda
Cada 3-6 meses:
* Utiliza una crema específica para cuero o crema hidratante neutra (tipo Nivea tapa azul, aunque hay debate, los productos específicos son mejores).
* Aplica con movimientos circulares y deja absorber durante la noche.
* Retira el exceso con un paño limpio al día siguiente.

## Almacenamiento
Cuelga siempre tu chaqueta o mono en una percha ancha para que no se deformen los hombros. Guárdalo en un lugar seco y ventilado. Evita fundas de plástico cerradas que pueden crear moho.
    `,
        author: 'Laura Taller',
        date: '2024-06-02',
        imageUrl: glovesImage,
        tags: ['Mantenimiento', 'Equipamiento', 'Tutorial'],
        readTime: '3 min'
    },
    {
        id: 3,
        title: 'Review: Alpinestars GP Plus R v3',
        slug: 'review-alpinestars-gp-plus-r-v3',
        excerpt: 'Probamos a fondo la nueva chaqueta deportiva de Alpinestars. ¿Vale la pena la actualización? Análisis de confort y protección.',
        content: `
# Review: Alpinestars GP Plus R v3

La GP Plus R v3 es una de las chaquetas de cuero deportivo más vendidas del mercado. La hemos probado durante 1000km y este es nuestro veredicto.

## Diseño y Confort
Visualmente es agresiva y moderna. Incorpora paneles elásticos en zonas clave (axilas, omóplatos) que mejoran mucho la movilidad respecto a la v2. Ya no te sientes "encorsetado" sobre la moto.

## Protección
* Cuero bovino de 1.3mm.
* Protecciones Nucleon Flex Plus en hombros y codos (muy finas pero Nivel 1).
* Deslizaderas externas en hombros (DFS).
* Bolsillo para espaldera (se vende por separado).

## Ventilación
Cuenta con dos entradas de aire en los hombros con cremallera. Son efectivas en movimiento, pero en parado bajo el sol de agosto pasarás calor (es cuero negro, al fin y al cabo).

## Veredicto
Si buscas una chaqueta deportiva para fin de semana o incluso circuito amateur, la **GP Plus R v3** es una apuesta segura. La mejora en confort justifica su precio.

**Puntuación: 9/10**
    `,
        author: 'Equipo de Pruebas',
        date: '2024-06-20',
        imageUrl: heroMotoImage,
        tags: ['Reviews', 'Alpinestars', 'Chaquetas'],
        readTime: '4 min'
    }
];

export const blogService = {
    getAllPosts: async (): Promise<BlogPost[]> => {
        // Simular delay de red
        return new Promise((resolve) => {
            setTimeout(() => resolve([...MOCK_POSTS]), 500);
        });
    },

    getPostBySlug: async (slug: string): Promise<BlogPost | undefined> => {
        return new Promise((resolve) => {
            setTimeout(() => {
                const post = MOCK_POSTS.find(p => p.slug === slug);
                resolve(post);
            }, 500);
        });
    },

    getRecentPosts: async (limit: number = 3): Promise<BlogPost[]> => {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve([...MOCK_POSTS].slice(0, limit));
            }, 500);
        });
    }
};
