import { slugIntoName } from "@/utils/getNameFromSlug";
import { Link, useParams } from "react-router-dom";

function CategorySidebarItem({ name, thumbnail, slug }) {
  // extract selected category from params
  const selectedCategory = useParams().name;

  // convert selected category into correctly formated name
  const categoryName = slugIntoName(selectedCategory);

  // check wether current category item is selected category item
  const isCurrentCategory = categoryName === name;

  return (
    <Link to={`/category/${slug}`}>
      <div className="relative flex items-center w-full">
        {/*large screens left border*/}
        <div className="absolute top-0 right-0 w-1 h-full bg-muted rounded-bl-lg rounded-tl-lg lg:rounded-none lg:left-0"></div>
        {/*content*/}
        <div
          className={`flex flex-col w-full py-2 items-center hover:bg-muted cursor-pointer border-b border-solid border-[#eeeeee] lg:p-3 lg:flex-row lg:gap-2 ${
            isCurrentCategory && "bg-muted"
          } lg:truncate`}
        >
          <div className="overflow-hidden w-[48px] h-[48px] bg-[#F8F8F8] rounded-xl pt-2">
            <img src={thumbnail} alt="category-thumbnail" className="w-full" />
          </div>
          <p className="text-[10px] font-bold text-center w-[90%] sm-w-full sm:text-sm sm:font-medium lg:leading-[18px]">
            {name}
          </p>
        </div>
      </div>
    </Link>
  );
}

export default CategorySidebarItem;
