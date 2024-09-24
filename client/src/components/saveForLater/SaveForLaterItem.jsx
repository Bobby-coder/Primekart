import { getOriginalPrice } from "@/utils/getOriginalPrice";
import { Button } from "../ui/button";
import { useDispatch } from "react-redux";
import { moveToCart, removeSavedItem } from "@/store/features/cart/cartSlice";
import { useNavigate } from "react-router-dom";

function SaveForLaterItem({
  savedItem: { _id: id, title, thumbnail, price, discountPercentage, category },
}) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Handler to remove item from saved items
  function handleRemoveFromSavedItems() {
    dispatch(removeSavedItem(id));
  }

  // Handler to add item to cart and remove from saved items
  function handleMoveToCart() {
    dispatch(moveToCart(id));
  }

  const originalPrice = getOriginalPrice(discountPercentage, price);
  return (
    <div className="flex flex-col gap-3 p-4">
      <div className="flex items-center gap-4">
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
          <p className="font-semibold">{title}</p>
          {/*Price & Discount for larger screens*/}
          <div className="items-center gap-1 hidden lg:flex">
            <p className="line-through text-muted-foreground text-[14px]">
              Rs.{originalPrice}
            </p>
            <p className="text-lg font-bold">Rs.{price} </p>
            <p className="text-red-500 text-[14px]">
              ({discountPercentage}% OFF)
            </p>
          </div>
        </div>
      </div>

      {/*Price and discount for smaller screens*/}
      <div className="flex gap-2 lg:hidden my-2">
        <p className="line-through text-muted-foreground text-[12px] self-end">
          ₹{originalPrice}
        </p>
        <p className="text-md font-bold mb-[-1px]">₹{price} </p>
        <p className="text-red-500 text-[12px] self-end">
          ({discountPercentage}% OFF)
        </p>
      </div>

      <div className="flex items-center">
        <Button
          variant="regular"
          className="text-sm font-semibold lg:text-md lg:font-semibold p-0 mr-4 lg:mx-4"
          onClick={handleMoveToCart}
        >
          MOVE TO CART
        </Button>
        <Button
          variant="regular"
          className="text-sm font-semibold lg:text-md lg:font-semibold p-0 mr-4 lg:mx-4"
          onClick={handleRemoveFromSavedItems}
        >
          REMOVE
        </Button>
      </div>
    </div>
  );
}

export default SaveForLaterItem;
