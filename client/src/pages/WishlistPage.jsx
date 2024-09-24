import WishlistGrid from "@/components/wishlist/WishlistGrid";
import { useSelector } from "react-redux";

function WishlistPage() {
  const { items } = useSelector((state) => state.wishlist);

  return (
    <div className="mx-auto flex flex-col lg:max-w-[980px] xl:max-w-[1220px] my-6 px-6 lg:px-0 min-h-screen">
      <div className="flex gap-1 items-center mb-4">
        <h1 className="text-lg font-bold">My Wishlist</h1>
        <span className="text-md">{items.length} items</span>
      </div>
      <WishlistGrid />
    </div>
  );
}

export default WishlistPage;
