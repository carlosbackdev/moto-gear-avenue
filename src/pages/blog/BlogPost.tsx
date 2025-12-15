import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import ReactMarkdown from 'react-markdown';
import { Calendar, User, Clock, ArrowLeft, Share2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { BlogPost } from '@/types/models';
import { blogService } from '@/services/blog.service';
import { DEFAULT_SEO } from '@/lib/seo';
import { toast } from 'sonner';

export default function BlogPostDetail() {
    const { slug } = useParams<{ slug: string }>();
    const navigate = useNavigate();
    const [post, setPost] = useState<BlogPost | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!slug) return;

        const fetchPost = async () => {
            try {
                const data = await blogService.getPostBySlug(slug);
                if (data) {
                    setPost(data);
                } else {
                    // Si no encuentra el post, redirige o maneja el error
                    navigate('/blog');
                    toast.error('Artículo no encontrado');
                }
            } catch (error) {
                console.error('Error fetching post:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchPost();
    }, [slug, navigate]);

    const handleShare = async () => {
        if (navigator.share) {
            try {
                await navigator.share({
                    title: post?.title,
                    text: post?.excerpt,
                    url: window.location.href,
                });
            } catch (error) {
                console.log('Error sharing:', error);
            }
        } else {
            navigator.clipboard.writeText(window.location.href);
            toast.success('Enlace copiado al portapapeles');
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
        );
    }

    if (!post) return null;

    return (
        <>
            <Helmet>
                <title>{post.title} | Blog MotoGear</title>
                <meta name="description" content={post.excerpt} />
                {/* Open Graph */}
                <meta property="og:type" content="article" />
                <meta property="og:title" content={post.title} />
                <meta property="og:description" content={post.excerpt} />
                <meta property="og:image" content={post.imageUrl} />
                <meta property="article:published_time" content={post.date} />
                <meta property="article:author" content={post.author} />
                <link rel="canonical" href={`${DEFAULT_SEO.siteUrl}/blog/${post.slug}`} />
            </Helmet>

            <div className="min-h-screen bg-background pb-16">
                {/* Hero Image */}
                <div className="relative h-[400px] w-full overflow-hidden">
                    <img
                        src={post.imageUrl}
                        alt={post.title}
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
                </div>

                <div className="container mx-auto px-4 relative -mt-32 z-10">
                    <div className="max-w-4xl mx-auto">
                        <Button
                            variant="outline"
                            size="sm"
                            className="mb-6 bg-background/80 backdrop-blur border-border"
                            onClick={() => navigate('/blog')}
                        >
                            <ArrowLeft className="mr-2 h-4 w-4" /> Volver al Blog
                        </Button>

                        <article className="bg-card border border-border rounded-xl shadow-xl overflow-hidden">
                            <div className="p-6 md:p-10">
                                <div className="flex flex-wrap gap-2 mb-6">
                                    {post.tags.map(tag => (
                                        <Badge key={tag} variant="secondary">{tag}</Badge>
                                    ))}
                                </div>

                                <h1 className="text-3xl md:text-5xl font-bold mb-6 leading-tight">
                                    {post.title}
                                </h1>

                                <div className="flex flex-wrap items-center justify-between gap-4 py-6 border-y border-border mb-8">
                                    <div className="flex items-center gap-6 text-muted-foreground text-sm">
                                        <div className="flex items-center gap-2">
                                            <User className="h-4 w-4" />
                                            <span className="font-medium text-foreground">{post.author}</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Calendar className="h-4 w-4" />
                                            <span>{new Date(post.date).toLocaleDateString('es-ES', { dateStyle: 'long' })}</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Clock className="h-4 w-4" />
                                            <span>{post.readTime}</span>
                                        </div>
                                    </div>

                                    <Button variant="ghost" size="sm" onClick={handleShare} className="gap-2 text-muted-foreground hover:text-primary">
                                        <Share2 className="h-4 w-4" />
                                        Compartir
                                    </Button>
                                </div>

                                {/* Content Renderer */}
                                <div className="prose prose-lg dark:prose-invert max-w-none prose-headings:font-bold prose-headings:tracking-tight prose-a:text-primary prose-img:rounded-xl">
                                    <ReactMarkdown>{post.content}</ReactMarkdown>
                                </div>
                            </div>
                        </article>
                    </div>
                </div>
            </div>
        </>
    );
}
