import { useSelector } from "react-redux";
import WishlistItem from "./WishlistItem";

function WishlistGrid() {
  // Extract wishlist from store
  const { items } = useSelector((state) => state.wishlist);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {items.products?.map((product) => {
        return <WishlistItem key={product._id} product={product} />;
      })}
    </div>
  );
}

export default WishlistGrid;