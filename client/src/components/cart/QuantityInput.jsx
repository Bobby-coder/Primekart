import { Minus, Plus } from "lucide-react";
import { Button } from "../ui/button";
import { useDispatch } from "react-redux";
import { addToCart, decreaseQuantity } from "@/store/features/cart/cartSlice";

function QuantityInput({ quantity, id }) {
  const dispatch = useDispatch();

  async function handleIncreaseQuantity() {
    dispatch(addToCart({ productId: id, quantity: 1 }));
  }

  async function handleDecreaseQuantity() {
    dispatch(decreaseQuantity(id));
  }

  return (
    <div className="flex items-center space-x-2">
      <Button
        variant="outline"
        className="rounded-full w-8 h-8 p-0"
        disabled={quantity <= 1}
        onClick={handleDecreaseQuantity}
      >
        <Minus size={16} strokeWidth={1.25} />
      </Button>
      <input
        className="flex h-10 border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 w-12 text-center border rounded-md"
        type="number"
        value={quantity}
        readOnly
      />
      <Button
        variant="outline"
        className="rounded-full w-8 h-8 p-0"
        onClick={handleIncreaseQuantity}
      >
        <Plus size={16} strokeWidth={1.25} />
      </Button>
    </div>
  );
}

export default QuantityInput;
