import { CircleAlert } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "../ui/button";

const InvalidCategory = () => {
  return (
    <div className="flex flex-col items-center justify-center h-[calc(100vh-180px)] text-center bg-white p-6">
      <CircleAlert className="h-16 w-16 text-red-500 mb-4" />
      <h1 className="text-2xl font-semibold text-gray-800 mb-2">
        No Products Found
      </h1>
      <p className="text-gray-600 mb-4">
        Sorry, we couldn&apos;t find any products for the selected category. It
        seems this category doesn&apos;t exist.
      </p>
      <Link to="/category/beauty">
        <Button className="px-4 py-2 rounded-md">
          Browse Other Categories
        </Button>
      </Link>
    </div>
  );
};

export default InvalidCategory;
