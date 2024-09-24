import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setUserDetails } from "@/store/features/auth/authSlice";
import { useState } from "react";
import { CircleArrowLeft } from "lucide-react";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [componentUI, setComponentUI] = useState("login");

  // schemas for login and reset-password
  const loginSchema = yup.object().shape({
    email: yup.string().email("Invalid email").required("Email is required"),
    password: yup.string().required("Password is required"),
  });

  const resetPasswordSchema = yup.object().shape({
    email: yup.string().email("Invalid email").required("Email is required"),
  });

  // Dynamically choose schema based on componentUI state
  const schema = yup.lazy(() => {
    if (componentUI === "login") {
      return loginSchema;
    } else {
      return resetPasswordSchema;
    }
  });

  // Initialize React Hook Form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  // Handle form submission
  const onSubmit = async (data) => {
    if (componentUI === "login") {
      const toastId = toast.loading("Loading...");
      try {
        toast.dismiss(toastId);
        const res = await axios.post(
          `${import.meta.env.VITE_BASE_URL}/users/login`,
          data,
          { withCredentials: true }
        );
        // store user details in store
        dispatch(setUserDetails(res.data?.user));
        toast.success(res.data?.message);
        navigate("/");
      } catch (err) {
        toast.dismiss(toastId);
        toast.error(err.response?.data?.message);
      }
    } else {
      try {
        const res = await axios.post(
          `${import.meta.env.VITE_BASE_URL}/users/reset-password`,
          { email: data.email }
        );
        toast.success(res.data?.message);
      } catch (error) {
        toast.error(error.response?.data?.message || "Something went wrong");
      }
    }
  };

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full sm:max-w-sm  rounded-lg border bg-card text-card-foreground shadow-sm"
      >
        <header className="flex flex-col space-y-1.5 p-6">
          <h1 className="text-2xl font-semibold leading-none tracking-tight mb-1">
            {componentUI === "login" ? "Login" : "Reset Password"}
          </h1>
          <p className="text-sm text-muted-foreground">
            Enter your email below to{" "}
            {componentUI === "login"
              ? "login to your account"
              : "reset your password"}
          </p>
        </header>

        <section className="p-6 pt-0">
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                {...register("email")}
              />
              {/*error message */}
              {errors.email && (
                <span className="text-sm text-red-500">
                  {errors.email.message}
                </span>
              )}
            </div>
            {componentUI === "login" && (
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                  <Button
                    variant="link"
                    className="ml-auto inline-block text-sm underline"
                    type="button"
                    onClick={() => setComponentUI("reset-password")}
                  >
                    Forgot your password?
                  </Button>
                </div>
                <Input
                  id="password"
                  type="password"
                  {...register("password")}
                />
                {/*error message */}
                {errors.password && (
                  <span className="text-sm text-red-500">
                    {errors.password.message}
                  </span>
                )}
              </div>
            )}
            <Button type="submit" className="w-full">
              {componentUI === "login" ? "Login" : "Reset Password"}
            </Button>
          </div>
          {componentUI === "login" ? (
            <div className="mt-4 text-center text-sm">
              Don&apos;t have an account?{" "}
              <Link to="/signup" className="underline">
                Sign up
              </Link>
            </div>
          ) : (
            <Button
              variant="link"
              className="mt-2 text-center text-sm pl-0"
              onClick={() => setComponentUI("login")}
            >
              <CircleArrowLeft className="mr-1" /> Back to Login
            </Button>
          )}
        </section>
      </form>
    </>
  );
};

export default Login;
