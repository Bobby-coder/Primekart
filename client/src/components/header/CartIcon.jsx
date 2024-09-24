import { addToCart } from "@/store/features/cart/cartSlice";
import { ShoppingCartIcon } from "lucide-react";
import { useDrop } from "react-dnd";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import AddedToCartToast from "../customToasts/AddedToCartToast";

const CartIcon = () => {
  const { name } = useSelector((state) => state.auth);
  const { items } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  // dispatch add to cart action with dropped item
  const [, drop] = useDrop({
    accept: "PRODUCT",
    drop: (item) => {
      if (!name) {
        toast.error("Please login to access this feature");
      } else {
        dispatch(addToCart({ productId: item.id, quantity: 1 }))
          .unwrap()
          .then(() =>
            // display successfully added toast
            toast.custom((t) => (
              <AddedToCartToast
                t={t}
                title={item.title}
                thumbnail={item.thumbnail}
              />
            ))
          )
          .catch((err) => {
            toast.error(err || "Something went wrong");
          });
      }
    },
  });

  return (
    <Link
      ref={drop}
      to="/cart"
      className="relative flex flex-col items-center text-primary-foreground hover:text-primary-foreground/80 transition-colors"
    >
      <div className="relative">
        <ShoppingCartIcon className="w-6 h-6" />
        {items.totalItems > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
            {items.totalItems}
          </span>
        )}
      </div>

      <span className="text-xs mt-1">Cart</span>
    </Link>
  );
};

export default CartIcon;
