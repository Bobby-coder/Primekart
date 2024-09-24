import { SearchIcon, ShoppingBasketIcon } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { Input } from "../ui/input";
import { useDispatch, useSelector } from "react-redux";
import { updateSearchText } from "@/store/features/search/SearchSlice";
import CartIcon from "./CartIcon";
import WishlistIcon from "./WishlistIcon";
import SideBar from "../home/SideBar";

function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  function handleSearch(val) {
    dispatch(updateSearchText(val));
  }

  const { searchText } = useSelector((state) => state.search);

  return (
    <header className="bg-primary text-primary-foreground py-4 px-6 flex flex-col gap-6 md:flex-row md:gap-0 md:px-8 lg:px-10">
      <div className="flex items-center justify-between w-full">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <ShoppingBasketIcon className="w-6 h-6" />
          <span className="text-lg font-semibold">Primekart</span>
        </Link>

        {/* Search input for larger screens */}
        <div
          className="hidden relative md:flex flex-1 max-w-md"
          onClick={() => navigate("/search")}
        >
          <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search product..."
            className="w-full py-2 pr-3 pl-10 rounded-md focus:outline-none text-black"
            onChange={(e) => handleSearch(e.target.value)}
            value={searchText}
          />
        </div>

        {/* Icons */}
        <div className="flex items-center gap-6">
          {/*Wishlist Icon*/}
          <WishlistIcon />

          {/*Cart Icon*/}
          <CartIcon />
        </div>
      </div>

      {/* Search input and categories sidebar for smaller screens */}
      <div className="flex md:hidden">
        <SideBar />
        <div className="relative w-full" onClick={() => navigate("/search")}>
          <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search product..."
            className="w-full py-2 pr-3 pl-10 rounded-md focus:outline-none text-black"
            onChange={(e) => handleSearch(e.target.value)}
            value={searchText}
          />
        </div>
      </div>
    </header>
  );
}

export default Header;
