import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { slugIntoName } from "@/utils/getNameFromSlug";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setSorting } from "@/store/features/sorting/sortingSlice";

const CategoryHeader = () => {
  // extract selected category from params
  const selectedCategory = useParams().name;

  // convert selected category into correctly formated name
  const categoryName = slugIntoName(selectedCategory);

  const dispatch = useDispatch();

  function handleSorting(val) {
    dispatch(setSorting(val));
  }

  return (
    <div className="flex items-center justify-between p-3 border-b border-solid border-[#eeeeee]">
      <p className="t text-xs sm:text-base font-bold">
        Buy {categoryName} Online
      </p>
      <div className="flex gap-3 items-center">
        {/*sort dropdown*/}
        <div className="flex gap-2 items-center">
          <Label
            htmlFor="sort"
            className="hidden sm:block text-[#666] text-xs sm:text-sm font-medium"
          >
            Sort By
          </Label>
          <Select id="sort" onValueChange={handleSorting}>
            <SelectTrigger className="w-[90px] sm:w-[180px] text-xs font-semibold">
              <SelectValue placeholder="Select" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem
                  value="price_asc"
                  className="text-[#666] text-xs font-medium"
                >
                  Price (Low to high)
                </SelectItem>
                <SelectItem
                  value="price_desc"
                  className="text-[#666] text-xs font-medium"
                >
                  Price (High to low)
                </SelectItem>
                <SelectItem
                  value="rating_asc"
                  className="text-[#666] text-xs font-medium"
                >
                  Rating (Low to high)
                </SelectItem>
                <SelectItem
                  value="rating_desc"
                  className="text-[#666] text-xs font-medium"
                >
                  Rating (High to low)
                </SelectItem>
                <SelectItem
                  value="title_asc"
                  className="text-[#666] text-xs font-medium"
                >
                  Name (A to Z)
                </SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
};

export default CategoryHeader;
