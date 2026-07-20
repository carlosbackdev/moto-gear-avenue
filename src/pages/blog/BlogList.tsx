import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Calendar, User, Clock, ArrowRight, BookOpen, Cpu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { BlogPost } from '@/types/models';
import { blogService } from '@/services/blog.service';
import { DEFAULT_SEO } from '@/lib/seo';

const isOnboardPost = (post: BlogPost) => {
    const searchable = `${post.title} ${post.tags.join(' ')}`.toLowerCase();
    return ['ordenador de a bordo', 'kawasaki', 'diagnóstico', 'telemetría', 'kwp2000', 'kds']
        .some(term => searchable.includes(term));
};

const ArticleCard = ({ post }: { post: BlogPost }) => (
    <article className="group flex flex-col overflow-hidden rounded-xl border border-border bg-card transition-all duration-300 hover:shadow-lg">
        <Link to={`/blog/${post.slug}`} className="relative h-48 overflow-hidden bg-muted">
            {post.imageUrl ? (
                <img src={post.imageUrl} alt={post.title} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
            ) : (
                <div className="flex h-full items-center justify-center"><BookOpen className="h-10 w-10 text-muted-foreground" /></div>
            )}
            <div className="absolute left-4 top-4 flex flex-wrap gap-2">
                {post.tags.slice(0, 2).map(tag => (
                    <Badge key={tag} className="border-none bg-black/90 text-white shadow-sm backdrop-blur-sm hover:bg-black/80">{tag}</Badge>
                ))}
            </div>
        </Link>

        <div className="flex flex-1 flex-col p-6">
            <div className="mb-4 flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
                <span className="flex items-center gap-1"><Calendar className="h-3 w-3" />{new Date(post.date).toLocaleDateString('es-ES')}</span>
                <span className="flex items-center gap-1"><Clock className="h-3 w-3" />{post.readTime}</span>
            </div>
            <Link to={`/blog/${post.slug}`}>
                <h3 className="mb-3 line-clamp-2 text-xl font-bold transition-colors group-hover:text-primary">{post.title}</h3>
            </Link>
            <p className="mb-6 line-clamp-3 flex-1 text-sm text-muted-foreground">{post.excerpt}</p>
            <div className="mt-auto flex items-center justify-between border-t border-border pt-4">
                <span className="flex items-center gap-2 text-sm font-medium"><User className="h-4 w-4 text-primary" />{post.author}</span>
                <Button asChild variant="ghost" size="sm" className="gap-1 px-0 hover:bg-transparent hover:text-primary">
                    <Link to={`/blog/${post.slug}`}>Leer más <ArrowRight className="h-4 w-4" /></Link>
                </Button>
            </div>
        </div>
    </article>
);

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

    const onboardPosts = posts.filter(isOnboardPost);
    const generalPosts = posts.filter(post => !isOnboardPost(post));

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
                        <h1 className="text-4xl md:text-5xl font-bold mb-4">Blog MotoGear</h1>
                        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                            Desarrollo del ordenador de a bordo, diagnóstico, equipamiento, seguridad y cultura motera.
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
                        <div className="space-y-16">
                            <section className="rounded-[1.75rem] bg-[#0a0b0b] px-6 py-10 text-white sm:px-10">
                                <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
                                    <div>
                                        <span className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-primary"><Cpu className="h-4 w-4" />Diario de desarrollo</span>
                                        <h2 className="mt-3 text-3xl font-bold">Ordenador de a bordo MotoGear</h2>
                                        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-white/55">Pruebas reales, compatibilidad Kawasaki y avances del dispositivo, explicados sin ocultar lo que todavía está en validación.</p>
                                    </div>
                                </div>
                                {onboardPosts.length > 0 ? (
                                    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">{onboardPosts.map(post => <ArticleCard key={post.id} post={post} />)}</div>
                                ) : (
                                    <div className="rounded-xl border border-dashed border-white/20 px-6 py-10 text-center text-sm text-white/50">El primer artículo aparecerá aquí cuando lo publiques desde la plantilla del admin.</div>
                                )}
                            </section>

                            <section>
                                <div className="mb-8">
                                    <span className="text-xs font-semibold uppercase tracking-[0.16em] text-primary">Guías y cultura motera</span>
                                    <h2 className="mt-3 text-3xl font-bold">El resto de MotoGear</h2>
                                </div>
                                {generalPosts.length > 0 ? (
                                    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">{generalPosts.map(post => <ArticleCard key={post.id} post={post} />)}</div>
                                ) : (
                                    <p className="rounded-xl border border-dashed border-border px-6 py-10 text-center text-muted-foreground">Todavía no hay otros artículos publicados.</p>
                                )}
                            </section>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}
