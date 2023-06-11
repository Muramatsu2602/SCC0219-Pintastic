export function calculateDiscountedPrice(originalPrice, discountPercentage) {
  // Convert the input parameters to numbers
  const price = Number(originalPrice);
  const percentage = Number(discountPercentage);

  // Check if the conversion is successful
  if (isNaN(price) || isNaN(percentage)) {
    // Return a default value or throw an error, depending on your requirement
    return 0;
  }

  const discountAmount = (price * percentage) / 100;
  const discountedPrice = price - discountAmount;
  return discountedPrice.toFixed(2);
}
