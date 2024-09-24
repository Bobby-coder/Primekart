import { useSelector } from "react-redux";
import { Separator } from "../ui/separator";
import SaveForLaterItem from "./SaveForLaterItem";

function SaveForLaterGrid() {
  const { items } = useSelector((state) => state.cart);

  return (
    <div className="lg:border w-full lg:w-[68%]">
      <div className="border-b p-4">
        <h2 className="font-semibold text-lg">
          Saved Items ({items.savedForLater?.length})
        </h2>
      </div>
      <div className="p-4">
        <div className="grid gap-4">
          {items.savedForLater?.map((savedItem) => {
            return (
              <div key={savedItem._id}>
                <SaveForLaterItem savedItem={savedItem} />
                <Separator />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default SaveForLaterGrid;
