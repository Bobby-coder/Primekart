import { useState } from "react";
import { Button } from "../ui/button";
import RatingsInfo from "./RatingsInfo";
import AddReviewDialoge from "./AddReviewDialoge";

const ReviewHeader = ({ avgRating, totalReviews, totalRatings }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div>
      <div className="flex flex-col gap-4 sm:flex-row sm:justify-between sm:items-center mb-12">
        <div className="flex flex-col gap-4">
          <h1 className="text-lg sm:text-2xl font-semibold">
            Ratings & Reviews
          </h1>
          <RatingsInfo
            avgRating={avgRating}
            totalReviews={totalReviews}
            totalRatings={totalRatings}
          />
        </div>
        <Button onClick={() => setIsOpen(true)}>Write a product review</Button>
      </div>
      {isOpen && <AddReviewDialoge setIsOpen={setIsOpen} />}
    </div>
  );
};

export default ReviewHeader;
