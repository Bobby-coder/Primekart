import { Star } from "lucide-react";

function RatingsInfo({ avgRating, totalRatings, totalReviews }) {
  return (
    <div className="flex items-center flex-wrap gap-2 sm:gap-4">
      <div className="flex items-center p-2 bg-pink-100 text-xs sm:text-sm text-pink-600 rounded-md">
        <Star className="w-4 h-4 sm:w-5 sm:h-5 fill-current mr-1" />
        <span>{avgRating?.toFixed(1)}</span>
      </div>
      <div className="text-gray-500 text-xs sm:text-sm p-0">
        {totalRatings} ratings and {totalReviews} reviews
      </div>
    </div>
  );
}

export default RatingsInfo;
