import { useEffect, useState } from "react";
import { ScrollArea } from "../ui/scroll-area";
import ProductGridItem from "./productGridItem";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import InvalidCategory from "./InvalidCategory";

function 
ProductGrid() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(null);
  const [error, setError] = useState(null);
  const selectedCategory = useParams().name;
  const { sortBy, order } = useSelector((state) => state.sorting);

  useEffect(() => {
    // Reset the error state whenever the category changes
    setError(null);
    setLoading(true);
    axios
      .get(
        `${import.meta.env.VITE_BASE_URL}/products/category/${selectedCategory}`
      )
      .then((res) => {
        setLoading(false);
        if (res.data.products.length === 0) {
          setError({ message: "Invalid category" });
        } else {
          setProducts(res.data.products);
        }
      })
      .catch((err) => {
        setLoading(false);
        setError(err);
      });
  }, [selectedCategory, sortBy, order]);

  if (error) {
    return <InvalidCategory />;
  }

  return (
    <ScrollArea className="h-[calc(100vh-180px)]">
      <div className="grid grid-cols-2 gap-2 p-2 bg-[#f4f6fb] lg:grid-cols-5">
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <div className="text-center">
            {error.data?.message || "Something went wrong"}
          </div>
        ) : (
          <>
            {products.map((product) => (
              <ProductGridItem key={product._id} product={product} />
            ))}
          </>
        )}
      </div>
    </ScrollArea>
  );
}

export default ProductGrid;
