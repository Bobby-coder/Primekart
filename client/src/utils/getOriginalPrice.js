export function getOriginalPrice(discountPercentage, priceAfterDiscount) {
  // Convert the discount percentage to a decimal
  const discountDecimal = discountPercentage / 100;

  // Calculate the original price
  const originalPrice = priceAfterDiscount / (1 - discountDecimal);

  return Math.round(originalPrice);
}
