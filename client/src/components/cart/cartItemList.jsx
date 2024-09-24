import { Separator } from "../ui/separator";
import CartItem from "./cartItem";
import OrderDetails from "./OrderDetails";
import { useSelector } from "react-redux";

function CartItemList() {
  const { items } = useSelector((state) => state.cart);

  return (
    <div className="flex justify-between">
      <div className="border w-full lg:w-[68%]">
        <div className="border-b p-4">
          <h2 className="font-semibold text-lg">Shopping Cart</h2>
        </div>
        <div className="grid gap-4">
          {items.products?.map(({product, quantity}) => {
            return (
              <div key={product._id}>
                <CartItem product={product} quantity={quantity}/>
                <Separator />
              </div>
            );
          })}
        </div>
      </div>

      <OrderDetails extraClasses={"hidden lg:flex "} />
    </div>
  );
}

export default CartItemList;
