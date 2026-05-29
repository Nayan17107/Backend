import { motion } from "framer-motion";
import { getStoreMeta } from "../utils/storeColors";
import { formatPrice, priceNumber } from "../utils/formatPrice";

const PriceCompareList = ({ products = [] }) => {
  if (!products || products.length === 0) {
    return null;
  }

  // Sort all products by price (low to high)
  const priceList = [...products].sort((a, b) => {
    const priceA = a.numericPrice || priceNumber(a.price);
    const priceB = b.numericPrice || priceNumber(b.price);
    return priceA - priceB;
  });

  if (priceList.length === 0) {
    return null;
  }

  const lowestPrice = Math.min(
    ...priceList.map((p) => p.numericPrice || priceNumber(p.price))
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2, duration: 0.4 }}
      className="mt-4 max-w-full overflow-hidden rounded-[24px] border border-[#1d2940] bg-[#111827] p-4 sm:p-8"
    >
      <div className="mb-8">
        <h2 className="font-heading text-xl font-black text-white sm:text-2xl">
          Compare Prices Across Stores
        </h2>
        <p className="mt-2 text-sm font-semibold text-white/40">
          Updated just now
        </p>
      </div>

      <div className="space-y-3 max-h-[600px] overflow-y-auto pr-2">
        {priceList.map((product, index) => {
          const store = getStoreMeta(product.source);
          const price = product.numericPrice || priceNumber(product.price);
          const isBest = price === lowestPrice;
          const oldPrice = price < Number.MAX_SAFE_INTEGER
            ? Math.round(price * 1.22)
            : null;

          return (
            <motion.div
              key={`${product.id}-${index}`}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.06, duration: 0.3 }}
              className={`flex flex-col gap-4 rounded-xl border px-4 py-4 transition md:grid md:grid-cols-[56px_minmax(0,1fr)] md:items-center md:gap-3 md:px-6 md:py-5 ${
                isBest
                  ? "border-emerald-400/40 bg-emerald-400/5"
                  : "border-[#27344d] bg-[#182131]"
              }`}
            >
              {/* Store Avatar */}
              <div className="flex flex-col items-center gap-2 md:row-span-3">
                <div
                  className="flex h-12 w-12 items-center justify-center rounded-xl text-sm font-black text-white shadow-lg md:h-14 md:w-14 md:rounded-2xl md:text-base"
                  style={{
                    backgroundColor: store.color,
                    boxShadow: `0 12px 24px ${store.color}40`
                  }}
                >
                  {store.initials}
                </div>
                <span className="text-[10px] font-black text-white/40 text-center">
                  {store.label.split(" ")[0]}
                </span>
              </div>

              {/* Store Info & Rating */}
              <div className="flex flex-col items-center gap-1 md:items-start">
                <span className="font-heading text-sm font-black text-white md:text-base">
                  {store.label}
                </span>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-amber-400 md:text-sm">
                    ★★★★
                  </span>
                  <span className="text-slate-500">★</span>
                  <span className="text-xs text-white/40 md:text-sm">
                    {product.rating ? Number(product.rating).toFixed(1) : "4.2"}
                  </span>
                </div>
              </div>

              {/* Price Section */}
              <div className="flex flex-col items-center gap-1 md:items-end md:justify-self-end">
                <div className="flex flex-wrap items-baseline gap-2 justify-center md:justify-end">
                  <span className="font-heading text-lg font-black text-cyan-400 md:text-2xl">
                    {formatPrice(product.price)}
                  </span>
                  {oldPrice && (
                    <span className="text-xs font-bold text-white/25 line-through md:text-sm">
                      ₹{oldPrice.toLocaleString("en-IN")}
                    </span>
                  )}
                </div>
                <p className="text-xs font-semibold text-white/28 md:text-sm text-center md:text-right">
                  🚚 {product.delivery || "Check delivery"}
                </p>
              </div>

              {/* Badges and Button Container */}
              <div className="flex flex-col gap-2 md:col-start-2 md:row-start-1 md:row-span-3 md:flex-row md:items-center md:justify-end md:gap-2">
                {/* Best Badge */}
                {isBest && (
                  <motion.div
                    initial={{ scale: 0.8 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 380, damping: 16 }}
                    className="flex w-fit shrink-0 items-center gap-1 rounded-full bg-gradient-to-r from-emerald-400 to-green-500 px-3 py-1.5 text-xs font-black text-white shadow-lg shadow-emerald-500/30 md:px-4 md:py-2 md:text-sm"
                  >
                    ⚡ BEST
                  </motion.div>
                )}

                {/* Coupon Badge */}
                {product.discount && !isBest && (
                  <div className="flex w-fit shrink-0 rounded-full border border-blue-400/30 bg-blue-500/20 px-3 py-1.5 text-xs font-black text-blue-300">
                    🎟️ {product.discount}
                  </div>
                )}

                {/* Buy Now or Out of Stock */}
                <motion.a
                  href={product.url}
                  target="_blank"
                  rel="noreferrer"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`flex w-full shrink-0 items-center justify-center gap-2 rounded-xl px-4 py-2.5 font-black text-white transition md:w-auto md:px-5 md:py-3 ${
                    product.inStock === false
                      ? "cursor-not-allowed bg-red-500/20 border border-red-400/30"
                      : "bg-gradient-to-r from-purple-500 to-pink-500 hover:shadow-lg hover:shadow-purple-500/30"
                  }`}
                >
                  {product.inStock === false ? (
                    <>
                      <span className="text-sm md:text-base">Out of Stock</span>
                    </>
                  ) : (
                    <>
                      <span className="text-sm md:text-base">Buy Now</span>
                      <span className="text-lg">→</span>
                    </>
                  )}
                </motion.a>
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
};

export default PriceCompareList;
