import { Label } from "@/components/ui/label";
import {
  SelectValue,
  SelectTrigger,
  SelectItem,
  SelectContent,
  Select,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Share } from "lucide-react";
import ReviewSection from "@/components/review/ReviewSection";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ImageSection from "@/components/ImageSection";
import RatingsInfo from "@/components/review/RatingsInfo";
import { getOriginalPrice } from "@/utils/getOriginalPrice";
import WishlistIcon from "@/components/wishlist/WishlistIcon";
import { slugIntoName } from "@/utils/getNameFromSlug";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "@/store/features/cart/cartSlice";
import toast from "react-hot-toast";
import AddedToCartToast from "@/components/customToasts/AddedToCartToast";
import { getAmountInINR } from "@/utils/getAmountInINR";
import CopyToClipboard from "react-copy-to-clipboard";
import InvalidProduct from "@/components/category/InvalidProduct";
import { fetchProduct } from "@/store/features/product/productSlice";

function ProductDetailPage() {
  const [quantity, setQuantity] = useState(1);
  const [isAdded, setIsAdded] = useState(false);
  const { productId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { items } = useSelector((state) => state.cart);
  const { name } = useSelector((state) => state.auth);
  const { productData, loading, error } = useSelector((state) => state.product);

  useEffect(() => {
    dispatch(fetchProduct(productId));
  }, [productId, dispatch]);

  useEffect(() => {
    // check if item is present in cart or not
    setIsAdded(
      items.products?.some(({ product }) => product?._id === productId)
    );
  }, [items.products, productId]);

  if (error) {
    return <InvalidProduct />;
  }

  // Calculate total rating by adding all ratings
  const totalRatings = productData.reviews?.reduce(
    (acc, currReview) => acc + currReview.rating,
    0
  );

  const priceInINR = getAmountInINR(productData.price);

  // calculate original price
  const originalPrice = getOriginalPrice(
    productData.discountPercentage,
    priceInINR
  );

  // Capitalized brand name
  const capitalizedCategory = slugIntoName(productData.category);

  // handler to update quantity
  function handleQuantity(val) {
    setQuantity(val);
  }

  // Handler to add product to cart
  function handleAddToCart() {
    if (!name) {
      toast.error("Please login to access this feature");
    } else {
      dispatch(addToCart({ productId, quantity }))
        .unwrap()
        .then(() => {
          toast.custom((t) => (
            <AddedToCartToast
              t={t}
              thumbnail={productData.thumbnail}
              title={productData.title}
            />
          ));
        })
        .catch((err) => {
          toast.error(err || "Something went wrong");
        });
    }
  }
  return (
    <>
      {loading ? (
        <h1>Loading...</h1>
      ) : error ? (
        <p>{error.data?.message || "Something went wrong"}</p>
      ) : (
        <div className="p-6 mx-auto flex flex-col gap-10 lg:flex-row lg:max-w-7xl">
          {/*images*/}
          <ImageSection images={productData.images} />

          {/*details*/}
          <div className="flex flex-col gap-8">
            <div>
              {/*title & Icons*/}
              <div className="flex flex-wrap items-start gap-4">
                {/*Name & brand*/}
                <div>
                  <h2 className="text-2xl font-extrabold text-gray-800 mb-2">
                    {productData.title}
                  </h2>
                  <p>{productData.brand}</p>
                </div>

                {/*Icons*/}
                <div className="ml-auto flex items-center">
                  {/*Wishlist Icon*/}
                  <WishlistIcon
                    productId={productId}
                    product={{
                      id: productData._id,
                      title: productData.title,
                      thumbnail: productData.thumbnail,
                      price: priceInINR,
                      discountPercentage: productData.discountPercentage,
                      category: productData.category,
                    }}
                  />
                  {/*Share Icon to copy link*/}
                  <CopyToClipboard
                    text={window.location.href}
                    onCopy={() => toast.success("Link copied")}
                  >
                    <button className="px-2.5 py-1.5 text-xs text-gray-400 rounded-md flex items-center">
                      <Share />
                    </button>
                  </CopyToClipboard>
                </div>
              </div>

              <hr className="my-8" />

              <div className="flex flex-col flex-wrap gap-4 items-start">
                {/*Price & discount*/}
                <p className="text-3xl font-semibold">
                  ₹{priceInINR}{" "}
                  <span className="line-through text-muted-foreground text-xl">
                    ₹{originalPrice}
                  </span>
                  <span className="text-red-500 text-sm ml-2">
                    {productData.discountPercentage}% off
                  </span>
                </p>

                {/*Rating*/}
                <RatingsInfo
                  avgRating={productData.rating}
                  totalRatings={totalRatings}
                  totalReviews={productData.reviews?.length}
                />
              </div>

              <hr className="my-8" />

              {/*Category & Tags*/}
              <div className="flex flex-col gap-3">
                <p>Category: {capitalizedCategory}</p>
                {/*Tags*/}
                <div className="flex items-center gap-2">
                  {productData.tags?.map((tag) => (
                    <Badge key={crypto.randomUUID()} variant="secondary">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>

              <hr className="my-8" />

              {/*Quantity*/}
              <div className="flex items-center gap-2 mb-4">
                <Label className="text-base">Quantity</Label>
                <Select
                  defaultValue={1}
                  onValueChange={(val) => handleQuantity(val)}
                >
                  <SelectTrigger className="w-24">
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent>
                    {Array.from(
                      { length: productData.stock },
                      (_, index) => index + 1
                    ).map((num, i) => (
                      <SelectItem key={i} value={num}>
                        {num}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/*Checkout buttons*/}
              <div className="flex gap-3 w-full items-center">
                <Button
                  size="lg"
                  className=""
                  onClick={() => navigate("/cart")}
                >
                  Buy now
                </Button>
                <Button size="lg" className="" onClick={handleAddToCart}>
                  Add to cart
                </Button>
              </div>
            </div>

            {/*description */}
            <div className="flex flex-col gap-2">
              <h3 className="text-2xl font-bold">Product description</h3>
              <div className="text-sm leading-loose">
                <p>{productData.description}</p>
              </div>
            </div>

            {/*reviews */}
            <ReviewSection
              reviews={productData.reviews}
              avgRating={productData.rating}
              totalRatings={totalRatings}
            />
          </div>
        </div>
      )}
    </>
  );
}

export default ProductDetailPage;
