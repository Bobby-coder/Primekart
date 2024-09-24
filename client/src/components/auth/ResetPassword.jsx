import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import * as yup from "yup";

const ResetPassword = () => {
  const navigate = useNavigate();
  const { token: resetPasswordToken } = useParams();
  // Define the validation schema using Yup
  const schema = yup.object().shape({
    newPassword: yup
      .string()
      .required("New Password is required")
      .min(8, "Password must be at least 8 characters")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
        "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
      ),
    confirmPassword: yup.string().required("Confirm Password is required"),
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  // handle form submission
  async function onSubmit(data) {
    try {
      const { newPassword, confirmPassword } = data;
      if (newPassword !== confirmPassword) {
        toast.error("Password do not match!");
        reset();
        return;
      }
      const res = await axios.put(
        `${import.meta.env.VITE_BASE_URL}/users/reset-password`,
        { newPassword, confirmPassword, resetPasswordToken }
      );
      toast.success(res.data?.message);
      navigate("/login");
      reset();
    } catch (error) {
      reset();
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  }
  return (
    <form
      className="grid gap-4 p-4 border border-solid border-[#ccc] rounded-sm w-[320px] sm:w-[400px]"
      onSubmit={handleSubmit(onSubmit)}
    >
      <h1 className="text-2xl font-semibold leading-none tracking-tight mb-1">
        Reset Password
      </h1>
      <div>
        <Label htmlFor="newPassword" className="text-right">
          New password:
        </Label>
        <Input
          type="password"
          id="newPassword"
          className="col-span-3"
          {...register("newPassword")}
        />
      </div>
      {errors.newPassword && (
        <p className="text-sm text-red-500">{errors.newPassword.message}</p>
      )}

      <div>
        <Label htmlFor="confirmPassword" className="text-right">
          Reenter password:
        </Label>
        <Input
          type="password"
          id="confirmPassword"
          className="col-span-3"
          {...register("confirmPassword")}
        />
      </div>
      {errors.confirmPassword && (
        <p className="text-sm text-red-500">{errors.confirmPassword.message}</p>
      )}
      <Button type="submit">Save changes</Button>
    </form>
  );
};

export default ResetPassword;
