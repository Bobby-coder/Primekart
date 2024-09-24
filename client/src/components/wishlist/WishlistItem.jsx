import { getOriginalPrice } from "@/utils/getOriginalPrice";
import { X } from "lucide-react";
import { Button } from "../ui/button";
import { useDispatch } from "react-redux";
import AddedToCartToast from "../customToasts/AddedToCartToast";
import toast from "react-hot-toast";
import RemovedFromWishlist from "../customToasts/RemovedFromWishList";
import { useNavigate } from "react-router-dom";
import {
  moveToCart,
  removeFromWishlist,
} from "@/store/features/wishlist/wishlistSlice";

function WishlistItem({
  product: { _id: id, title, thumbnail, price, discountPercentage, category },
}) {
  const dispatch = useDispatch();
  const originalPrice = getOriginalPrice(discountPercentage, price);
  const navigate = useNavigate();

  // Handler to remove item from wishlist
  function handleRemove() {
    dispatch(removeFromWishlist(id));
    // successfully removed toast
    toast.custom((t) => (
      <RemovedFromWishlist t={t} thumbnail={thumbnail} title={title} />
    ));
  }

  // Handler to add item to cart and remove from wishlist
  function handleAddtoCart() {
    dispatch(moveToCart(id));
    // display successfully added toast
    toast.custom((t) => (
      <AddedToCartToast t={t} thumbnail={thumbnail} title={title} />
    ));
  }

  return (
    <div className="border relative">
      {/*Image*/}
      <img
        src={thumbnail}
        alt="product image"
        className="w-full h-48 object-cover cursor-pointer"
        onClick={() => navigate(`/category/${category}/${id}`)}
      />

      {/*Remove Icon*/}
      <Button
        variant="ghost"
        className="absolute top-2 right-2 p-2"
        onClick={handleRemove}
      >
        <X />
      </Button>

      <div className="p-4 flex flex-col gap-2">
        {/*Name*/}
        <h3 className="text-sm font-medium truncate">{title}</h3>

        {/*Price & Discount*/}
        <p className="text-sm font-semibold">
          ₹{price}
          <span className="line-through text-muted-foreground mx-1">
            ₹{originalPrice}
          </span>
          <span className="text-red-500">({discountPercentage}% OFF)</span>
        </p>

        <Button variant="outline" onClick={handleAddtoCart}>
          MOVE TO BAG
        </Button>
      </div>
    </div>
  );
}

export default WishlistItem;
