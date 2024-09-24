import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";
import { CircleUserRound, Menu } from "lucide-react";
import { Separator } from "../ui/separator";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchCategories } from "@/store/features/category/categorySlice";
import CategoryListItem from "./CategoryListItem";
import axios from "axios";
import toast from "react-hot-toast";
import { setUserDetails } from "@/store/features/auth/authSlice";
import { resetWishList } from "@/store/features/wishlist/wishlistSlice";
import { resetCart } from "@/store/features/cart/cartSlice";

function SideBar() {
  const dispatch = useDispatch();
  const { items, status } = useSelector((state) => state.category);
  const { name } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchCategories());
    }
  }, [dispatch, status]);

  async function handleLogout() {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/users/logout`,
        {},
        {
          withCredentials: true,
        }
      );
      // Reset user details, cart and wishlist
      dispatch(setUserDetails({ name: "", email: "" }));
      dispatch(resetWishList());
      dispatch(resetCart());
      navigate("/login");
      toast.success(res.data?.message);
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  }

  return (
    <Sheet>
      <SheetTrigger className="flex gap-1 items-center mr-3 md:mr-8">
        <Menu />
        All
      </SheetTrigger>
      <SheetContent side="left" className="p-0">
        <SheetHeader>
          <SheetTitle></SheetTitle>
          <SheetDescription></SheetDescription>
        </SheetHeader>
        <ScrollArea className="h-dvh relative">
          {/* Header */}
          {name ? (
            <div className="h-[50px] p-4 bg-primary flex gap-2 items-center text-white absolute top-0 right-0 w-full">
              <CircleUserRound />
              <p>Hello, {name}</p>
            </div>
          ) : (
            <Link
              to="/login"
              className="h-[50px] p-4 bg-primary flex gap-2 items-center text-white absolute top-0 right-0 w-full"
            >
              <CircleUserRound />
              <p>Login</p>
            </Link>
          )}

          {/* All categories list */}
          <div className="p-4 flex flex-col gap-3 mt-[50px]">
            <h1 className="font-bold text-lg">Shop by Category</h1>
            {items.categories?.map(({ _id, name, slug }) => {
              return <CategoryListItem key={_id} name={name} slug={slug} />;
            })}
          </div>

          <Separator />

          {/* Account settings list */}
          {name && (
            <div className="p-4 flex flex-col gap-3">
              <h1 className="font-bold text-lg">Help & Settings</h1>
              <Link to="/my-account">
                <p>Your Account</p>
              </Link>
              <div onClick={handleLogout} className="cursor-pointer">
                <p>Sign out</p>
              </div>
            </div>
          )}
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
}

export default SideBar;
