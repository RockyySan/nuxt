export const useTextFormat = async (product_type) => {
  const formattedProductType = (product_type) => {
    if (!product_type) return ''
    return product_type
      .replace(/_/g, ' ') // Replace underscores with spaces
      .toLowerCase() // Ensure it's in lowercase
      .replace(/\b\w/g, (char) => char.toUpperCase()); // Capitalize first letter of each word
  }

  return formattedProductType(product_type); // Return the formatted product type
}
