import { Star } from "lucide-react";
import { Button } from "@/components/ui/button";

interface StarRatingProps {
  rating: number;
  size?: number;
}

const StarRating = ({ rating, size = 16 }: StarRatingProps) => {
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          className={
            star <= rating ? "fill-current text-yellow-400" : "text-gray-300"
          }
          key={star}
          size={size}
        />
      ))}
    </div>
  );
};

interface ReviewItemProps {
  review: {
    name: string;
    initials: string;
    rating: number;
    comment: string;
    date: string;
  };
}

export const ReviewItem = ({ review }: ReviewItemProps) => {
  return (
    <div className="space-y-2 border-b pb-4">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted">
            <span className="font-medium text-xs">{review.initials}</span>
          </div>
          <div>
            <p className="font-medium text-sm">{review.name}</p>
            <StarRating rating={review.rating} />
          </div>
        </div>
        <span className="text-muted-foreground text-xs">{review.date}</span>
      </div>
      <p className="text-muted-foreground text-sm">{review.comment}</p>
    </div>
  );
};

interface ReviewsTabProps {
  reviews: {
    total: number;
    average: number;
    items: Array<{
      name: string;
      initials: string;
      rating: number;
      comment: string;
      date: string;
    }>;
  };
}

export const ReviewsTab = ({ reviews }: ReviewsTabProps) => {
  return (
    <div className="flex flex-col gap-4 rounded-lg border bg-white p-4">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold">Avaliações ({reviews.total})</h3>
        <div className="flex items-center gap-1">
          <Star className="fill-current text-yellow-400" size={16} />
          <span className="font-medium text-sm">{reviews.average}</span>
        </div>
      </div>

      <div className="space-y-4">
        {reviews.items.map((review, index) => (
          <ReviewItem key={index} review={review} />
        ))}
      </div>

      <Button className="w-full" variant="outline">
        Ver todas as avaliações
      </Button>
    </div>
  );
};
