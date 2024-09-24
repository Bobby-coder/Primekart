import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import * as yup from "yup";

const EditPasswordDialoge = () => {
  // Define the validation schema using Yup
  const schema = yup.object().shape({
    currentPassword: yup.string().required("Current Password is required"),
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
      const { currentPassword, newPassword, confirmPassword } = data;
      if (newPassword !== confirmPassword) {
        toast.error("Password do not match!");
        reset();
        return;
      }
      const res = await axios.put(
        `${import.meta.env.VITE_BASE_URL}/users/password`,
        { currentPassword, newPassword },
        {
          withCredentials: true,
        }
      );
      toast.success(res.data?.message);
      reset();
    } catch (error) {
      reset();
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  }
  // jsx
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Edit</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Change Password</DialogTitle>
          <DialogDescription>
            Use the form below to change the password for your Primekart account
          </DialogDescription>
        </DialogHeader>
        <form className="grid gap-4 py-4" onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="password" className="text-right">
              Current password:
            </Label>
            <Input
              type="password"
              id="password"
              className="col-span-3"
              {...register("currentPassword")}
            />
          </div>
          {errors.currentPassword && (
            <p className="text-sm text-red-500">
              {errors.currentPassword.message}
            </p>
          )}

          <div className="grid grid-cols-4 items-center gap-4">
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

          <div className="grid grid-cols-4 items-center gap-4">
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
            <p className="text-sm text-red-500">
              {errors.confirmPassword.message}
            </p>
          )}
          <DialogFooter>
            <Button type="submit">Save changes</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditPasswordDialoge;
