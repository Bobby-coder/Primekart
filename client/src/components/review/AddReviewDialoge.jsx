import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import toast from "react-hot-toast";
import { addReview } from "@/store/features/product/productSlice";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const AddReviewDialoge = ({ setIsOpen }) => {
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState("");
  const { productId } = useParams();
  const dispatch = useDispatch();
  const { name, email } = useSelector((state) => state.auth);

  function handleRating(value) {
    setRating(value);
  }

  function handleRemove() {
    setIsOpen(false);
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (comment.trim() && rating.trim()) {
      dispatch(
        addReview({
          productId,
          rating,
          comment,
          reviewerName: name,
          reviewerEmail: email,
        })
      );
      setIsOpen(false);
    } else {
      toast.error("All fields are required");
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="p-4 flex flex-col gap-3 rounded-lg border border-slate-200 bg-white text-slate-950 bg-[#cccc] mb-12"
    >
      {/*Comment*/}
      <div>
        <label className="text-sm font-medium leading-none">Comment</label>
        <input
          type="text"
          placeholder="Best product..."
          className="w-full py-2 px-3 rounded-md text-black flex h-10 border border-input bg-background text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          onChange={(e) => setComment(e.target.value)}
          value={comment}
        />
      </div>

      {/* Rating */}
      <div className="grid gap-3">
        <Label htmlFor="rating">Rating</Label>
        <Select
          onValueChange={(val) => handleRating(val)}
          defaultValue={rating}
        >
          <SelectTrigger id="rating" aria-label="Select rating">
            <SelectValue placeholder="Select rating" />
          </SelectTrigger>
          <SelectContent>
            {["1", "2", "3", "4", "5"].map((num) => (
              <SelectItem value={num} key={crypto.randomUUID()}>
                {num}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      {/*Submit button*/}
      <Button type="submit">Save</Button>
      <Button type="button" onClick={handleRemove}>
        Cancel
      </Button>
    </form>
  );
};

export default AddReviewDialoge;
