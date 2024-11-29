import { ShieldCheck } from "lucide-react";
import { Separator } from "../ui/separator";
import { useSelector } from "react-redux";
import { getTotalDiscount } from "@/utils/getTotalDiscount";
import { Button } from "../ui/button";
import axios from "axios";
import toast from "react-hot-toast";

function OrderDetails({ extraClasses }) {
  const { items } = useSelector((state) => state.cart);
  //const totalAmountInINR = getAmountInINR(totalAmount);
  //const totalOriginalPriceInINR = getAmountInINR(totalOriginalPrice);
  const totalDiscount = getTotalDiscount(items.products);

  function loadScript(src) {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  }

  async function displayRazorpay() {
    try {
      const res = await loadScript(
        "https://checkout.razorpay.com/v1/checkout.js"
      );

      if (!res) {
        alert("Razorpay SDK failed to load. Are you online?");
        return;
      }

      const result = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/payment/razorpay-order`,
        { amount: items.totalAmount },
        { withCredentials: true }
      );

      const { amount, id: order_id, currency } = result.data.order;

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: amount.toString(),
        currency: currency,
        name: "Primekart",
        description: "Test Transaction",
        order_id: order_id,
        handler: async function (response) {
          const data = {
            orderCreationId: order_id,
            razorpayPaymentId: response.razorpay_payment_id,
            razorpayOrderId: response.razorpay_order_id,
            razorpaySignature: response.razorpay_signature,
          };

          const result = await axios.post(
            `${import.meta.env.VITE_BASE_URL}/payment/verify-payment`,
            data,
            { withCredentials: true }
          );

          toast.success(result.data.message);
        },
        prefill: {
          name: "Primekart",
          email: "bobbysadhwani612@gmail.com",
          contact: "9425682357",
        },
        notes: {
          address: "Primekart Corporate Office",
        },
        theme: {
          color: "#61dafb",
        },
      };

      const paymentObject = new window.Razorpay(options);
      paymentObject.open();
    } catch (err) {
      console.log(err);
      toast.error(err.response?.data?.message);
    }
  }

  return (
    <div className={`flex-col gap-8 w-full lg:w-[30%] ${extraClasses}`}>
      <div className="flex flex-col gap-4 border p-4">
        <h3 className="tracking-tight text-lg font-semibold text-gray-700">
          PRICE DETAILS
        </h3>

        <Separator />

        {/*total amount*/}
        <div className="flex justify-between">
          <span className="text-gray-600">
            Price ({items.totalItems} items)
          </span>
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
      <Button className="w-full mt-3 md:mt-0" onClick={displayRazorpay}>
        Buy Now
      </Button>
    </div>
  );
}

export default OrderDetails;
