import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import SideBar from "./SideBar";
import { convertNameToSlug } from "@/utils/convertNameToSlug";

function CategoryNavbar() {
  const navigate = useNavigate();
  const categories = [
    "Beauty",
    "Fragrances",
    "Furniture",
    "Groceries",
    "Home Decoration",
    "Kitchen Accessories",
    "Laptops",
    "Mens Shirts",
    "Mens Shoes",
    "Mens Watches",
  ];

  const categoriesForMidScreens = [
    "Beauty",
    "Fragrances",
    "Furniture",
    "Groceries",
    "Home Decoration",
    "Tablets",
  ];

  // handler to navigate to category page
  function handleNavigate(category) {
    const categorySlug = convertNameToSlug(category);
    navigate(`/category/${categorySlug}`);
  }

  return (
    <div className="hidden w-full px-6 md:px-8 lg:px-10 md:flex bg-[#232F3E] text-white overflow-hidden">
      <SideBar />

      {/*For large screens*/}
      <div className="hidden xl:flex">
        {categories.map((category) => (
          <Button
            key={crypto.randomUUID()}
            variant="link"
            className="p-0 text-white mr-8"
            onClick={() => {
              handleNavigate(category);
            }}
          >
            {category}
          </Button>
        ))}
      </div>

      {/*For mid screens*/}
      <div className="flex xl:hidden">
        {categoriesForMidScreens.map((category) => (
          <Button
            key={crypto.randomUUID()}
            variant="link"
            className="p-0 text-white mr-8"
            onClick={() => {
              handleNavigate(category);
            }}
          >
            {category}
          </Button>
        ))}
      </div>
    </div>
  );
}

export default CategoryNavbar;
