import { convertNameToSlug } from "@/utils/convertNameToSlug";
import { Link } from "react-router-dom";

function CategoryCard({ name, thumbnail }) {
  const categorySlug = convertNameToSlug(name);
  return (
    <Link to={`/category/${categorySlug}`}>
      <div className="bg-background rounded-md shadow-md overflow-hidden">
        <img
          src={thumbnail}
          width={200}
          height={150}
          alt="Produce"
          className="w-full h-24 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="p-2">
          <h3 className="text-base font-semibold group-hover:text-primary transition-colors duration-300 truncate">
            {name}
          </h3>
        </div>
      </div>
    </Link>
  );
}

export default CategoryCard;
