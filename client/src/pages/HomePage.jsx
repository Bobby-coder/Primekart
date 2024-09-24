import banner from "../assets/banner-1.png";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import CategoryCard from "@/components/home/CategoryCard";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories } from "@/store/features/category/categorySlice";

export default function HomePage() {
  const dispatch = useDispatch();
  let { items, status } = useSelector((state) => state.category);

  // dispatch category thunk to fetch categories
  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchCategories());
    }
  }, [dispatch, status]);

  return (
    <div className="flex flex-col min-h-[100dvh]">
      <main className="flex-1">
        {/*Banner*/}
        <section className="bg-primary py-6 md:py-16 lg:py-20 px-6 md:px-8 lg:px-10">
          <div className="container mx-auto grid md:grid-cols-2 gap-8 items-center">
            <div className="space-y-4">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary-foreground">
                Products Delivered to Your Door
              </h1>
              <p className="text-lg md:text-xl text-primary-foreground">
                Get your favorite products delivered in as little as an hour.
              </p>
            </div>
            <div className="hidden md:block">
              <img
                src={banner}
                width={500}
                height={500}
                alt="product Delivery"
                className="w-full max-w-md mx-auto object-cover"
              />
            </div>
          </div>
        </section>

        {/*Featured Categories section*/}
        <section className="py-12 md:py-16 lg:py-20 px-6 md:px-8 lg:px-10">
          <div className="container mx-auto">
            <div className="text-center space-y-4">
              <div className="inline-block rounded-md bg-muted px-3 py-1 text-sm">
                Featured Categories
              </div>
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold">
                Discover Your Favorites
              </h2>
              <p className="text-muted-foreground text-lg md:text-xl">
                Browse our selection of top-selling product categories.
              </p>
            </div>

            {/* Category grid */}
            <div className="grid grid-cols-2 md:grid-cols-5 lg:grid-cols-10 gap-4 mt-8">
              {items.categories?.map(({ _id, name, thumbnail }) => (
                <CategoryCard key={_id} name={name} thumbnail={thumbnail} />
              ))}
            </div>
          </div>
        </section>

        {/*Why choose us section*/}
        <section className="bg-muted py-12 md:py-16 lg:py-20 px-6 md:px-8 lg:px-10">
          <WhyChooseUs />
        </section>
      </main>
    </div>
  );
}
