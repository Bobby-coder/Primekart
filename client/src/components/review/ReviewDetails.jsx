import { Badge } from "@/components/ui/badge";
import { Button } from "../ui/button";
import { getFormattedTimeAndDate } from "@/utils/getFormattedTimeAndDate";
import { Star } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getInitials } from "@/utils/getInitials";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import EditReviewDialoge from "./EditReviewDialoge";
import { deleteReview } from "@/store/features/product/productSlice";

const ReviewDetails = ({
  id,
  rating,
  comment,
  date,
  reviewerName,
  reviewerEmail,
}) => {
  let helpfulCount = 18;
  let verifiedPurchase = true;
  const initials = getInitials(reviewerName);

  // createdAt date & time in beautiful format
  const [formattedDate, formattedTime] = getFormattedTimeAndDate(date);
  const formattedDateTime = `${formattedDate} ${formattedTime}`;

  const { email } = useSelector((state) => state.auth);
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();

  function handleDelete() {
    dispatch(deleteReview(id));
  }

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center">
        <Avatar className="mr-2">
          <AvatarImage
            src={`https://api.dicebear.com/9.x/initials/svg?seed=${reviewerName}`}
          />
          <AvatarFallback>{initials}</AvatarFallback>
        </Avatar>
        <span>{reviewerName}</span>
      </div>

      <div className="flex gap-2 items-center">
        <div className="flex gap-1 items-center">
          {Array.from({ length: rating }).map(() => (
            <Star
              color="yellow"
              fill="yellow"
              strokeWidth={1.5}
              key={crypto.randomUUID()}
            />
          ))}
        </div>
        {/*title*/}
        <p>{comment}</p>
      </div>

      <p>Reviewed on {formattedDateTime}</p>

      {verifiedPurchase && (
        <div>
          <Badge variant="secondary" className="inline ">
            Verified Purchase
          </Badge>
        </div>
      )}

      {helpfulCount > 0 && <p>{helpfulCount} people found this helpful</p>}

      <div className="flex">
        <div className="flex items-center gap-3 mr-2">
          <Button variant="outline">Helpful</Button>
        </div>

        {reviewerEmail === email && (
          <>
            <div className="flex items-center gap-3 mr-2">
              <Button variant="outline" onClick={() => setIsOpen(true)}>
                Edit
              </Button>
            </div>

            <div className="flex items-center gap-3">
              <Button variant="outline" onClick={handleDelete}>
                Delete
              </Button>
            </div>
          </>
        )}
      </div>
      {isOpen && (
        <EditReviewDialoge
          setIsOpen={setIsOpen}
          comment={comment}
          rating={rating}
          reviewId={id}
        />
      )}
    </div>
  );
};

export default ReviewDetails;
