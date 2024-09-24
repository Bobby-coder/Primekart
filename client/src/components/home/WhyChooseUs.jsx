import { ClockIcon, PercentIcon, TruckIcon, UserIcon } from "lucide-react";
import banner2 from "../../assets/banner-2.png";

function WhyChooseUs() {
  return (
    <div className="container mx-auto grid lg:grid-cols-2 gap-8 items-center">
      <div>
        <img
          src={banner2}
          width={500}
          height={500}
          alt="product Delivery"
          className="w-full max-w-md mx-auto object-cover"
        />
      </div>

      <div className="space-y-4">
        <div className="inline-block rounded-md bg-muted px-3 py-1 text-sm">
          Why Choose Us?
        </div>
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold">
          Convenient product Delivery
        </h2>
        <p className="text-muted-foreground text-lg md:text-xl">
          Our on-demand product delivery service makes it easy to get the items
          you need, when you need them. With fast and reliable delivery, you can
          spend more time doing the things you love.
        </p>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          <div className="bg-background rounded-md shadow-md py-4 px-2">
            <ClockIcon className="w-6 h-6 text-primary" />
            <h3 className="text-md sm:text-lg font-semibold mt-2">Fast Delivery</h3>
            <p className="text-muted-foreground text-sm">
              Get your products in as little as an hour.
            </p>
          </div>
          <div className="bg-background rounded-md shadow-md py-4 px-2">
            <TruckIcon className="w-6 h-6 text-primary" />
            <h3 className="text-md sm:text-lg font-semibold mt-2">Wide Selection</h3>
            <p className="text-muted-foreground text-sm">
              Browse thousands of product items.
            </p>
          </div>
          <div className="bg-background rounded-md shadow-md py-4 px-2">
            <PercentIcon className="w-6 h-6 text-primary" />
            <h3 className="text-md sm:text-lg font-semibold mt-2">Fair Prices</h3>
            <p className="text-muted-foreground text-sm">
              Enjoy great prices on all your favorite items.
            </p>
          </div>
          <div className="bg-background rounded-md shadow-md py-4 px-2">
            <UserIcon className="w-6 h-6 text-primary" />
            <h3 className="text-md sm:text-lg font-semibold mt-2">Friendly Support</h3>
            <p className="text-muted-foreground text-sm">
              Our team is here to help with any questions or concerns.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WhyChooseUs;
