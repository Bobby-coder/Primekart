import { Link } from "react-router-dom";

function CategoryListItem({ slug, name }) {
  return (
    <Link to={`/category/${slug}`}>
      <p>{name}</p>
    </Link>
  );
}

export default CategoryListItem;
