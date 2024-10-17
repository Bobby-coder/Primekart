import ProductGridItem from "@/components/category/productGridItem";
import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import notFoundImage from "../assets/no-product-found.png";

function SearchPage() {
  const { searchText } = useSelector((state) => state.search);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // fetch data based on specified search text
  useEffect(() => {
    fetchProducts(searchText);
  }, [searchText]);

  function fetchProducts(searchText) {
    if (searchText) {
      setLoading(true);
      axios
        .get(`${import.meta.env.VITE_BASE_URL}/products/search?q=${searchText}`)
        .then((res) => {
          setLoading(false);
          setProducts(res.data.products);
        })
        .catch((err) => {
          setLoading(false);
          setError(err);
        });
    }
  }

  return (
    <div className="mx-auto flex flex-col lg:max-w-[980px] xl:max-w-[1220px] my-6 px-6 lg:px-0 min-h-screen">
      {/* Render text only if search text is not empty */}
      {searchText && (
        <p className="text-md font-bold">{`Showing results for "${searchText}"`}</p>
      )}

      {/*Search items grid*/}
      {searchText && (
        <div className="grid grid-cols-2 gap-2 p-2 lg:grid-cols-5">
          {loading ? (
            <p>Loading...</p>
          ) : error ? (
            <p>{error.data?.message || "Something went wrong"}</p>
          ) : products.length === 0 ? (
            // No products found UI
            <div className="flex flex-col items-center justify-center col-span-full mt-10">
              <img
                src={notFoundImage}
                alt="No results found"
                className="w-40 h-40 mb-4"
              />
              <p className="text-lg font-semibold text-gray-600">
                No products found
              </p>
              <p className="text-md text-gray-500">
                Try searching with different keywords.
              </p>
            </div>
          ) : (
            // Render resultant products only if search text is not empty
            products.map((product) => (
              <ProductGridItem key={product._id} product={product} />
            ))
          )}
        </div>
      )}
    </div>
  );
}

export default SearchPage;
