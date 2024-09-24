import { getAmountInINR } from "@/utils/getAmountInINR";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "@/store/features/cart/cartSlice";
import Image from "../Image";
import WishlistIcon from "../wishlist/WishlistIcon";
import toast from "react-hot-toast";
import AddedToCartToast from "../customToasts/AddedToCartToast";
import { Star } from "lucide-react";
import { useDrag } from "react-dnd";

function ProductGridItem({
  product: {
    _id: id,
    title,
    thumbnail,
    price,
    discountPercentage,
    category,
    rating,
  },
}) {
  const dispatch = useDispatch();
  const priceInINR = getAmountInINR(price);
  const { name } = useSelector((state) => state.auth);

  // Handler to add item to cart
  function handleAddtoCart() {
    if (!name) {
      toast.error("Please login to access this feature");
    } else {
      // Clear any previous error before making the request
      dispatch(addToCart({ productId: id, quantity: 1 }))
        .unwrap() // Unwrap the promise to handle the response directly
        .then(() => {
          // Show success toast if product is added successfully
          toast.custom((t) => (
            <AddedToCartToast t={t} thumbnail={thumbnail} title={title} />
          ));
        })
        .catch((err) => {
          // Show error toast if something goes wrong
          toast.error(err || "Something went wrong");
        });
    }
  }

  // drag product to cart or wishlist
  const [{ isDragging }, drop] = useDrag({
    type: "PRODUCT",
    item: { id, title, thumbnail, price: priceInINR, discountPercentage },
    collect: (monitor) => ({ isDragging: monitor.isDragging() }),
  });

  return (
    <div
      ref={drop}
      className={`flex flex-col items-center pb-[0.75rem] bg-white border border-solid border-gray-200 relative ${
        isDragging && "opacity-50"
      }`}
    >
      {/* Image */}
      <Link to={`/category/${category}/${id}`}>
        <div className="overflow-hidden">
          <Image src={thumbnail} alt="product-image" />
        </div>
      </Link>

      {/* Title */}
      <div className="w-full flex flex-col gap-1 px-[0.75rem]">
        <div className="overflow-hidden text-gray-800 font-semibold text-sm w-full h-9 mb-1 leading-[18px] whitespace-normal line-clamp-2">
          {title}
        </div>

        {/* Price & rating */}
        <div className="flex justify-between items-center">
          <p className="text-gray-800 font-semibold text-xs sm:text-sm">
            ₹{priceInINR}
          </p>
          {/*Rating*/}
          {rating > 0 && (
            <div className="flex items-center p-2 text-xs sm:text-sm text-yellow-500 rounded-md">
              <Star className="w-4 h-4 fill-current mr-[2px]" />
              <span className="text-black">{rating.toFixed(1)}</span>
            </div>
          )}
        </div>
      </div>

      {/*Added to cart button*/}
      <Button
        variant="outline"
        className="cursor-pointer h-8 border border-solid text-primary font-semibold text-sm bg-muted rounded-none w-[90%] mt-2"
        onClick={handleAddtoCart}
      >
        ADD
      </Button>

      {/*Wishlist Icon*/}
      <WishlistIcon
        productId={id}
        product={{
          id,
          title,
          thumbnail,
          price: priceInINR,
          discountPercentage,
          category,
        }}
        position="absolute top-2 right-2"
      />
    </div>
  );
}

export default ProductGridItem;
