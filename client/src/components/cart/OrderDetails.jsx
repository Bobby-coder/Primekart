import { ShieldCheck } from "lucide-react";
import { Separator } from "../ui/separator";
import { useSelector } from "react-redux";
import { getTotalDiscount } from "@/utils/getTotalDiscount";

function OrderDetails({ extraClasses }) {
  const { items } = useSelector((state) => state.cart);
  //const totalAmountInINR = getAmountInINR(totalAmount);
  //const totalOriginalPriceInINR = getAmountInINR(totalOriginalPrice);
  const totalDiscount = getTotalDiscount(items.products);

  return (
    <div className={`flex-col gap-8 w-full lg:w-[30%] ${extraClasses}`}>
      <div className="flex flex-col gap-4 border p-4">
        <h3 className="tracking-tight text-lg font-semibold text-gray-700">
          PRICE DETAILS
        </h3>

        <Separator />

        {/*total amount*/}
        <div className="flex justify-between">
          <span className="text-gray-600">Price ({items.totalItems} items)</span>
          <span className="text-gray-800">₹{items.totalOriginalPrice}</span>
        </div>

        {/*discount*/}
        <div className="flex justify-between">
          <span className="text-gray-600">Discount</span>
          <span className="text-green-600">– ₹{totalDiscount}</span>
        </div>

        {/*delivery charges*/}
        <div className="flex justify-between">
          <span className="text-gray-600">Delivery Charges</span>
          <div className="flex items-center space-x-1">
            <span className="line-through text-gray-400">₹100</span>
            <span className="text-green-600">Free</span>
          </div>
        </div>

        {/*packaging fee*/}
        <div className="flex justify-between">
          <span className="text-gray-600">Secured Packaging Fee</span>
          <span className="text-gray-800">₹59</span>
        </div>

        <Separator />

        {/*total amount*/}
        <div className="flex justify-between">
          <span className="text-lg font-semibold text-gray-700">
            Total Amount
          </span>
          <span className="text-lg font-semibold text-gray-800">
            ₹{items.totalAmount}
          </span>
        </div>

        <Separator />

        <p className="text-green-600">
          You will save ₹{totalDiscount} on this order
        </p>
      </div>
      <div className="flex items-center space-x-2 my-2 lg:my-0">
        <ShieldCheck size={30} strokeWidth={1.25} />
        <p className="text-sm text-gray-600">
          Safe and Secure Payments. Easy returns. 100% Authentic products.
        </p>
      </div>
    </div>
  );
}

export default OrderDetails;
