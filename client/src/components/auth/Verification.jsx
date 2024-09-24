import { MuiOtpInput } from "mui-one-time-password-input";
import { CircleArrowLeft, ShoppingBasketIcon } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";

const Verification = () => {
  const navigate = useNavigate();
  const [otp, setOtp] = useState("");
  const { activationToken } = useSelector((state) => state.auth);

  const handleChange = (newValue) => {
    setOtp(newValue);
  };

  async function handleSubmit() {
    const toastId = toast.loading("Loading...");
    try {
      toast.dismiss(toastId);
      const res = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/users/activate`,
        { activationCode: otp, activationToken }
      );
      toast.success(res.data?.message);
      navigate("/login");
    } catch (err) {
      toast.dismiss(toastId);
      toast.error(err.response?.data?.message);
    }
  }

  function matchIsNumeric(text) {
    const isNumber = typeof text === "number";
    const isString = typeof text === "string";
    return (isNumber || (isString && text !== "")) && !isNaN(Number(text));
  }

  const validateChar = (value) => {
    return matchIsNumeric(value);
  };

  return (
    <div className="flex flex-col items-center justify-center w-[400px]">
      <Link
        to="/"
        className="flex items-center mb-6 text-2xl font-semibold text-gray-900"
      >
        <ShoppingBasketIcon className="w-8 h-8 mr-2" />
        PrimeKart
      </Link>
      <div className="w-full p-6 bg-white rounded-lg shadow md:mt-0 sm:max-w-md sm:p-8">
        <h1 className="text-2xl font-semibold leading-none tracking-tight mb-1">
          Email Verification
        </h1>
        <p className="text-sm text-muted-foreground mb-5">
          We have sent a code to your email
        </p>
        <MuiOtpInput
          value={otp}
          autoFocus
          onChange={handleChange}
          validateChar={validateChar}
          TextFieldsProps={{ placeholder: "-" }}
          error={true}
          variant={true}
        />
        <Button
          className="w-full font-medium rounded-lg text-[14px] px-5 py-2.5 text-center mt-4"
          onClick={handleSubmit}
        >
          Verify Email
        </Button>
        <Link
          to="/signup"
          className="flex gap-1 cursor-pointer items-center mt-6"
        >
          <CircleArrowLeft />

          <span className="text-sm mb-[-1.59px]">Back To Signup</span>
        </Link>
      </div>
    </div>
  );
};

export default Verification;
