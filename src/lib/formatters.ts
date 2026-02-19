export const formatPrice = (price: string) => {
  // Check if price is a valid string
  if (!price) return 'Price not available';
  
  // If price already has a currency symbol ($, €, £, A$, etc.), return as is
  // A simple regex to check for common currency symbols or non-digit prefix
  // Matches if there is any character that is NOT a digit, dot, comma, or whitespace
  if (/[^\d\.\,\s]/.test(price)) return price;
  
  // Otherwise, assume it's a raw number and prepend '$'
  // Note: For a robust multi-currency solution, a currency conversion API and geo-location service would be required.
  return `$${price}`;
};
