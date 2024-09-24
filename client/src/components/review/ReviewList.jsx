import ReviewDetails from "./ReviewDetails";

const ReviewList = ({ reviews }) => {
  return (
    <div className="flex flex-col gap-8">
      {reviews &&
        reviews.map(({ _id:id, rating, comment, date, reviewerName, reviewerEmail }) => {
          return (
            <ReviewDetails
              key={id}
              id={id}
              rating={rating}
              comment={comment}
              date={date}
              reviewerName={reviewerName}
              reviewerEmail = {reviewerEmail}
            />
          );
        })}
    </div>
  );
};

export default ReviewList;
