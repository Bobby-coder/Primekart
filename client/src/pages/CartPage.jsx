import CartItemList from "@/components/cart/cartItemList";
import OrderDetails from "@/components/cart/OrderDetails";
import SaveForLaterGrid from "@/components/saveForLater/SaveForLaterGrid";

function CartPage() {
  return (
    <div className="flex flex-col gap-3 mx-auto lg:max-w-[980px] xl:max-w-[1220px] lg:my-6">
      <CartItemList />
      <OrderDetails extraClasses={"lg:hidden px-2"} />
      <SaveForLaterGrid />
    </div>
  );
}

export default CartPage;
