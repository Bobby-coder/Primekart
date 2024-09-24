import { CircleAlert } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "../ui/button";

const InvalidProduct = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center bg-white p-6">
      <CircleAlert className="h-16 w-16 text-red-500 mb-4" />
      <h1 className="text-2xl font-semibold text-gray-800 mb-2">
        No Products Found
      </h1>
      <p className="text-gray-600 mb-4">
        Sorry, we couldn&apos;t find any product for this Id. It seems this
        product Id doesn&apos;t exist.
      </p>
      <Link to="/category/beauty">
        <Button className="px-4 py-2 rounded-md">Browse Other products</Button>
      </Link>
    </div>
  );
};

export default InvalidProduct;
