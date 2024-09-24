import { getOriginalPrice } from "./getOriginalPrice.js";

export function getTotalDiscount(productList) {
  // total discounted price of all products
  const totalDiscountedPrice = productList?.reduce(
    (acc, {product}) => acc + product.price,
    0
  );

  // total original price of all products
  const totalOriginalPrice = productList?.reduce((acc, {product}) => {
    // original price of current product
    let originalPrice = getOriginalPrice(
      product.discountPercentage,
      product.price
    );
    return acc + originalPrice;
  }, 0);

  return Math.round(totalOriginalPrice - totalDiscountedPrice);
}
