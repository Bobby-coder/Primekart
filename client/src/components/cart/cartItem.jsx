import { getOriginalPrice } from "@/utils/getOriginalPrice";
import { Button } from "../ui/button";
import QuantityInput from "./QuantityInput";
import { removeFromCart, saveForLater } from "@/store/features/cart/cartSlice";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import RemovedFromCart from "../customToasts/RemovedFromCart";
import { useNavigate } from "react-router-dom";

function CartItem({
  product: { _id: id, title, thumbnail, price, discountPercentage, category },
  quantity,
}) {
  const originalPrice = getOriginalPrice(discountPercentage, price);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Handler to remove item from cart
  function handleRemoveFromCart() {
    dispatch(removeFromCart(id));
    // display successfully removed toast
    toast.custom((t) => (
      <RemovedFromCart t={t} thumbnail={thumbnail} title={title} />
    ));
  }

  // Handler to add item to saved items and remove from cart
  function handleSaveForLater() {
    dispatch(saveForLater(id));
  }

  return (
    <div className="flex flex-col gap-6 p-4">
      <div className="flex items-center px-4 gap-4">
        {/*Image*/}
        <img
          alt="Product image"
          className="aspect-square rounded-md object-cover cursor-pointer"
          height="80"
          src={thumbnail}
          width="80"
          onClick={() => navigate(`/category/${category}/${id}`)}
        />

        <div className="flex flex-col gap-3">
          {/*Name*/}
          <p className="text-sm font-medium w-full">{title}</p>
          {/*Price & Discount for larger screens*/}
          <div className="hidden lg:flex items-center gap-1">
            <p className="line-through text-muted-foreground text-[14px]">
              Rs.{originalPrice * quantity}
            </p>
            <p className="text-lg font-bold">Rs.{price * quantity} </p>
            <p className="text-red-500 text-[14px]">
              ({discountPercentage}% OFF)
            </p>
          </div>
        </div>
      </div>

      <div className="flex gap-[6px] lg:items-center flex-col lg:flex-row px-4">
        <QuantityInput quantity={quantity} id={id} />
        {/*Price and discount for smaller screens*/}
        <div className="flex gap-2 lg:hidden my-2">
          <p className="line-through text-muted-foreground text-[12px] self-end">
            ₹{originalPrice * quantity}
          </p>
          <p className="text-md font-bold mb-[-1px]">₹{price * quantity}</p>
          <p className="text-red-500 text-[12px] self-end">
            ({discountPercentage}% OFF)
          </p>
        </div>

        <div className="flex flex-wrap">
          <Button
            variant="regular"
            className="text-sm font-semibold lg:text-md lg:font-semibold p-0 mr-4 lg:mx-4"
            onClick={handleSaveForLater}
          >
            SAVE FOR LATER
          </Button>
          <Button
            variant="regular"
            className="text-sm font-semibold lg:text-md lg:font-semibold p-0 mr-4"
            onClick={handleRemoveFromCart}
          >
            REMOVE
          </Button>
          <Button
            variant="regular"
            className="text-sm font-semibold lg:text-md lg:font-semibold p-0 "
          >
            SEE MORE LIKE THESE
          </Button>
        </div>
      </div>
    </div>
  );
}

export default CartItem;
