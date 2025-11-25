import { useEffect, useState } from 'react';
import { Star, User } from 'lucide-react';
import { Review } from '@/types/models';
import { reviewService } from '@/services/review.service';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from '@/hooks/use-toast';
import { usersService } from '@/services/users.service';

interface ProductReviewsProps {
  productId: number;
}

const StarRating = ({ rating, interactive = false, onRatingChange }: { 
  rating: number; 
  interactive?: boolean;
  onRatingChange?: (rating: number) => void;
}) => {
  const [hoverRating, setHoverRating] = useState(0);

  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={`h-5 w-5 cursor-pointer transition-colors ${
            star <= (interactive ? (hoverRating || rating) : rating)
              ? 'fill-yellow-400 text-yellow-400'
              : 'text-muted-foreground'
          }`}
          onMouseEnter={() => interactive && setHoverRating(star)}
          onMouseLeave={() => interactive && setHoverRating(0)}
          onClick={() => interactive && onRatingChange?.(star)}
        />
      ))}
    </div>
  );
};

export const ProductReviews = ({ productId }: ProductReviewsProps) => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [canReview, setCanReview] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newReview, setNewReview] = useState({ rating: 5, content: '' });
  const [submitting, setSubmitting] = useState(false);
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    loadReviews();
    if (isAuthenticated) {
      checkCanReview();
    }
  }, [productId, isAuthenticated]);

  const loadReviews = async () => {
    try {
      const data = await reviewService.getProductReviews(productId);
      
      await Promise.all(
      data.map(async (review) => {
        try {
          const name = await usersService.getUserName(review.userId);
          console.log('Fetched user name:', name);
          review.userFullName = name;
        } catch (error) {
          console.error(`Error loading user ${review.userId}:`, error);
          review.userFullName = 'Usuario'; // Valor por defecto si falla
        }
      })
    );
      setReviews(data);
    } catch (error) {
      console.error('Error loading reviews:', error);
      setReviews([]);
    } finally {
      setLoading(false);
    }
  };

  const checkCanReview = async () => {
    try {
      const can = await reviewService.canReview(productId);
      setCanReview(can);
    } catch (error) {
      console.error('Error checking review permission:', error);
      setCanReview(false);
    }
  };

  const handleSubmitReview = async () => {
    if (!newReview.content.trim()) {
      toast({
        title: 'Error',
        description: 'Por favor, escribe un comentario',
        variant: 'destructive',
      });
      return;
    }

    setSubmitting(true);
    try {
      await reviewService.createReview({
        productId,
        rating: newReview.rating,
        content: newReview.content,
      });
      
      toast({
        title: 'Reseña enviada',
        description: 'Tu reseña ha sido publicada correctamente',
      });

      setIsDialogOpen(false);
      setNewReview({ rating: 5, content: '' });
      loadReviews();
      setCanReview(false);
    } catch (error) {
      toast({
        title: 'Error',
        description: 'No se pudo enviar la reseña',
        variant: 'destructive',
      });
    } finally {
      setSubmitting(false);
    }
  };

  const averageRating = reviews.length > 0
    ? reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length
    : 0;

  if (loading) {
    return <div>Cargando reseñas...</div>;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Valoraciones y Reseñas</span>
          <div className="flex items-center gap-2">
            <StarRating rating={Math.round(averageRating)} />
            <span className="text-sm text-muted-foreground">
              {averageRating.toFixed(1)} ({reviews.length})
            </span>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {canReview && (
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button className="w-full">Escribir una reseña</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Escribe tu reseña</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Calificación</label>
                  <StarRating
                    rating={newReview.rating}
                    interactive
                    onRatingChange={(rating) => setNewReview({ ...newReview, rating })}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Comentario</label>
                  <Textarea
                    placeholder="Comparte tu experiencia con este producto..."
                    value={newReview.content}
                    onChange={(e) => setNewReview({ ...newReview, content: e.target.value })}
                    rows={4}
                  />
                </div>
                <Button 
                  onClick={handleSubmitReview} 
                  disabled={submitting}
                  className="w-full"
                >
                  {submitting ? 'Enviando...' : 'Publicar reseña'}
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        )}

        {reviews.length === 0 ? (
          <p className="text-center text-muted-foreground py-8">
            No hay reseñas todavía. ¡Sé el primero en valorar este producto!
          </p>
        ) : (
          reviews.map((review, index) => (
            <div key={review.id}>
              {index > 0 && <Separator className="mb-6" />}
              <div className="flex gap-4">
                <Avatar>
                  <AvatarFallback>
                    <User className="h-4 w-4" />
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 space-y-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-semibold">{review.userFullName}</p>
                    </div>
                    <StarRating rating={review.rating} />
                  </div>
                  <p className="text-sm text-foreground">{review.content}</p>
                </div>
              </div>
            </div>
          ))
        )}
      </CardContent>
    </Card>
  );
};
