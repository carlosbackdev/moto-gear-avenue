import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Calendar, User, Clock, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { BlogPost } from '@/types/models';
import { blogService } from '@/services/blog.service';
import { DEFAULT_SEO } from '@/lib/seo';

export default function BlogList() {
    const [posts, setPosts] = useState<BlogPost[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const data = await blogService.getAllPosts();
                setPosts(data);
            } catch (error) {
                console.error('Error fetching blog posts:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchPosts();
    }, []);

    return (
        <>
            <Helmet>
                <title>Blog MotoGear - Guías, Consejos y Reviews</title>
                <meta name="description" content="Descubre nuestras guías de compra, consejos de mantenimiento y reviews de los últimos accesorios para moto. Aprende con MotoGear." />
                <link rel="canonical" href={`${DEFAULT_SEO.siteUrl}/blog`} />
            </Helmet>

            <div className="min-h-screen bg-background pb-16">
                {/* Header */}
                <div className="bg-muted py-16 mb-12">
                    <div className="container mx-auto px-4 text-center">
                        <h1 className="text-4xl md:text-5xl font-bold mb-4">MotoGear Magazine</h1>
                        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                            Tu fuente de información sobre equipamiento, seguridad y cultura motera.
                        </p>
                    </div>
                </div>

                <div className="container mx-auto px-4">
                    {loading ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {Array.from({ length: 3 }).map((_, i) => (
                                <div key={i} className="h-96 bg-muted animate-pulse rounded-xl" />
                            ))}
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {posts.map((post) => (
                                <article
                                    key={post.id}
                                    className="group flex flex-col bg-card border border-border rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300"
                                >
                                    <Link to={`/blog/${post.slug}`} className="relative h-48 overflow-hidden">
                                        <img
                                            src={post.imageUrl}
                                            alt={post.title}
                                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                        />
                                        <div className="absolute top-4 left-4 flex gap-2">
                                            {post.tags.map(tag => (
                                                <Badge key={tag} className="bg-black/90 text-white hover:bg-black/80 backdrop-blur-sm shadow-sm border-none">{tag}</Badge>
                                            ))}
                                        </div>
                                    </Link>

                                    <div className="flex-1 p-6 flex flex-col">
                                        <div className="flex items-center gap-4 text-xs text-muted-foreground mb-4">
                                            <div className="flex items-center gap-1">
                                                <Calendar className="h-3 w-3" />
                                                {new Date(post.date).toLocaleDateString('es-ES', {
                                                    year: 'numeric',
                                                    month: 'long',
                                                    day: 'numeric'
                                                })}
                                            </div>
                                            <div className="flex items-center gap-1">
                                                <Clock className="h-3 w-3" />
                                                {post.readTime}
                                            </div>
                                        </div>

                                        <Link to={`/blog/${post.slug}`}>
                                            <h2 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors line-clamp-2">
                                                {post.title}
                                            </h2>
                                        </Link>

                                        <p className="text-muted-foreground text-sm mb-6 line-clamp-3 flex-1">
                                            {post.excerpt}
                                        </p>

                                        <div className="flex items-center justify-between mt-auto pt-4 border-t border-border">
                                            <div className="flex items-center gap-2 text-sm text-foreground font-medium">
                                                <User className="h-4 w-4 text-primary" />
                                                {post.author}
                                            </div>
                                            <Link to={`/blog/${post.slug}`}>
                                                <Button variant="ghost" size="sm" className="gap-1 px-0 hover:bg-transparent hover:text-primary">
                                                    Leer más <ArrowRight className="h-4 w-4" />
                                                </Button>
                                            </Link>
                                        </div>
                                    </div>
                                </article>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}
