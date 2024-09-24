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
import { setActivationToken } from "@/store/features/auth/authSlice";

const Signup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // form schema
  const schema = yup.object().shape({
    name: yup.string().required("Name is required"),
    email: yup
      .string()
      .required("Email is required")
      .matches(
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Email must start with one or more alphanumeric characters, followed by an '@' symbol, then another alphanumeric sequence, a dot, and finally a valid top-level domain extension (e.g., '.com', '.org')"
      ),
    password: yup
      .string()
      .required("Password is required")
      .min(8, "Password must be at least 8 characters")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
        "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
      ),
  });

  // schema resolver
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  // Handle form submission
  const onSubmit = async (data) => {
    const toastId = toast.loading("Loading...");
    try {
      toast.dismiss(toastId);
      const res = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/users/`,
        data
      );
      // store activation token in store
      dispatch(setActivationToken(res.data?.activationToken));
      toast.success(res.data?.message);
      navigate("/verification");
    } catch (err) {
      toast.dismiss(toastId);
      toast.error(err.response?.data?.message);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full sm:max-w-sm rounded-lg border bg-card text-card-foreground shadow-sm"
    >
      <header className="flex flex-col space-y-1.5 p-6">
        <h1 className="text-2xl font-semibold leading-none tracking-tight mb-1">
          Sign Up
        </h1>
        <p className="text-sm text-muted-foreground">
          Enter your information to create an account
        </p>
      </header>
      <section className="p-6 pt-0">
        <div className="grid gap-4">
          <div className="grid grid-cols-1 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Your name</Label>
              <Input
                id="name"
                placeholder="First and last name"
                {...register("name")}
              />
              {/*error message*/}
              {errors.name && (
                <span className="text-sm text-red-500">
                  {errors.name.message}
                </span>
              )}
            </div>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="m@example.com"
              {...register("email")}
            />
            {/*error message*/}
            {errors.email && (
              <span className="text-sm text-red-500">
                {errors.email.message}
              </span>
            )}
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" {...register("password")} />
            {/*error message*/}
            {errors.password && (
              <span className="text-sm text-red-500">
                {errors.password.message}
              </span>
            )}
          </div>
          <Button type="submit" className="w-full">
            Create an account
          </Button>
        </div>
        <div className="mt-4 text-center text-sm">
          Already have an account?{" "}
          <Link to="/login" className="underline">
            Sign in
          </Link>
        </div>
      </section>
    </form>
  );
};

export default Signup;
