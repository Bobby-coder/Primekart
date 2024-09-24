import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { HeartIcon } from "lucide-react";
import toast from "react-hot-toast";
import RemovedFromWishlist from "../customToasts/RemovedFromWishList";
import AddedToWishlist from "../customToasts/AddedToWishlist";
import {
  addToWishlist,
  removeFromWishlist,
} from "@/store/features/wishlist/wishlistSlice";

function WishlistIcon({ productId, product, position }) {
  const dispatch = useDispatch();
  const { name } = useSelector((state) => state.auth);
  const { items } = useSelector((state) => state.wishlist);
  const [isWished, setIsWished] = useState(false);

  useEffect(() => {
    // check if item is present in wishlist or not
    setIsWished(items.products?.some((item) => item._id === productId));
  }, [items.products, productId]);

  // Handler to toggle item in wishlist
  const handleWishlistToggle = () => {
    if (!name) {
      toast.error("Please login to access this feature");
    } else {
      if (isWished) {
        dispatch(removeFromWishlist(productId))
          .unwrap()
          .then(() => {
            // display successfully removed toast
            toast.custom((t) => (
              <RemovedFromWishlist
                t={t}
                thumbnail={product.thumbnail}
                title={product.title}
              />
            ));
          })
          .catch((err) => {
            toast.error(err || "Something went wrong");
          });
      } else {
        dispatch(addToWishlist(productId))
          .unwrap()
          .then(() =>
            // display successfully added toast
            toast.custom((t) => (
              <AddedToWishlist
                t={t}
                thumbnail={product.thumbnail}
                title={product.title}
              />
            ))
          )
          .catch((err) => {
            toast.error(err || "Something went wrong");
          });
      }
      setIsWished(!isWished);
    }
  };

  return (
    <button
      onClick={handleWishlistToggle}
      className={`${position} p-2 rounded-full transition-colors duration-200 ${
        isWished ? "text-red-500" : "text-gray-400 hover:text-red-500"
      }`}
    >
      <HeartIcon
        className={`w-6 h-6 transition-transform duration-200`}
        fill={isWished ? "currentColor" : "none"}
      />
      <span className="sr-only">Add to Wishlist</span>
    </button>
  );
}

export default WishlistIcon;
