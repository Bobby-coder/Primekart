import ReviewHeader from "./ReviewHeader";
import ReviewList from "./ReviewList";

function ReviewSection({ reviews, avgRating, totalRatings }) {
  return (
    <div className="flex flex-col gap-3">
      <ReviewHeader
        avgRating={avgRating}
        totalRatings={totalRatings}
        totalReviews={reviews?.length}
      />
      <ReviewList reviews={reviews} />
    </div>
  );
}

export default ReviewSection;
