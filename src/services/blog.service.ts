import { BlogPost } from '@/types/models';
import { apiService } from './api.service';
import { environment } from '@/config/environment';

export const blogService = {
    // Cache local para almacenar los posts
    cache: [] as BlogPost[],

    getAllPosts: async (): Promise<BlogPost[]> => {
        try {
            // Si ya tenemos datos en caché, podríamos devolverlos, 
            // pero normalmente querremos refrescar la lista al entrar al blog principal.
            // O si el usuario quiere que sea "carga única", podemos verificar si cache.length > 0.
            // Asumiremos que getAll siempre refresca la lista para tener lo último,
            // pero getPostBySlug usará la caché.

            const response = await apiService.get<any[]>('/blog/get/all');

            const mappedPosts: BlogPost[] = response.map(item => ({
                id: item.id,
                title: item.title,
                slug: item.slug,
                excerpt: item.excerpt,
                content: item.content,  // Se asume markdown texto literal
                author: item.author,
                date: item.date, // "2025-12-16"
                // Construir URL completa de la imagen
                imageUrl: item.imageUrl ? (item.imageUrl.startsWith('http') ? item.imageUrl : `${environment.imageBaseUrl}${item.imageUrl}`) : '',
                // Tags vienen como string "tag1, tag2" -> array
                tags: item.tags ? item.tags.split(',').map((t: string) => t.trim()) : [],
                // ReadTime viene como numero -> string "X min"
                readTime: `${item.readTime} min`
            }));

            // Actualizar caché
            blogService.cache = mappedPosts;
            return mappedPosts;
        } catch (error) {
            console.error('Error fetching blog posts:', error);
            // Si falla, devolvemos array vacío o lo que había en caché si queremos ser resilientes
            return [];
        }
    },

    getPostBySlug: async (slug: string): Promise<BlogPost | undefined> => {
        // Buscar primero en caché
        let post = blogService.cache.find(p => p.slug === slug);

        if (post) {
            return post;
        }

        // Si no está en caché (ej: entrada directa por URL), cargamos todos
        // ya que no hay endpoint de "get one by slug" especificado, solo "get all".
        await blogService.getAllPosts();
        return blogService.cache.find(p => p.slug === slug);
    },

    getRecentPosts: async (limit: number = 3): Promise<BlogPost[]> => {
        if (blogService.cache.length === 0) {
            await blogService.getAllPosts();
        }
        return blogService.cache.slice(0, limit);
    }
};

