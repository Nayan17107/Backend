export const priceNumber = (price) => {
  if (typeof price === "number") return price;
  if (typeof price !== "string") return Number.MAX_SAFE_INTEGER;
  const parsed = Number(price.replace(/[^0-9.]/g, ""));
  return Number.isFinite(parsed) && parsed > 0
    ? parsed
    : Number.MAX_SAFE_INTEGER;
};

export const formatPrice = (price) => {
  if (!price) return "Price unavailable";
  const value = String(price);

  if (/^(INR|Rs\.)\s?/i.test(value)) {
    const amount = Number(value.replace(/[^0-9.]/g, ""));
    return Number.isFinite(amount)
      ? `\u20b9${amount.toLocaleString("en-IN")}`
      : value;
  }

  return value;
};
