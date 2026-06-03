import { motion } from "framer-motion";
import { getStoreMeta } from "../utils/storeColors";
import { formatPrice, priceNumber } from "../utils/formatPrice";

const cardHover = {
  initial: { scale: 1 },
  whileHover: { scale: 1.01, y: -4 },
  transition: { type: "spring", stiffness: 320, damping: 22 },
};

const StoreLogo = ({ store }) => {
  return (
    <div className="flex flex-col items-center gap-2">
      <div
        className="flex h-14 w-14 items-center justify-center overflow-hidden rounded-2xl text-sm font-black text-white shadow-lg"
        style={{
          backgroundColor: store.color,
          boxShadow: `0 14px 30px ${store.color}35`,
        }}
      >
        {store.initials}
      </div>
      <span className="max-w-[72px] truncate text-center text-[10px] font-black text-white/40">
        {store.label.split(" ")[0]}
      </span>
    </div>
  );
};

const PriceCompareList = ({ products = [] }) => {
  if (!products || products.length === 0) {
    return null;
  }

  const priceList = [...products].sort((a, b) => {
    const priceA = a.numericPrice || priceNumber(a.price);
    const priceB = b.numericPrice || priceNumber(b.price);
    return priceA - priceB;
  });

  if (priceList.length === 0) {
    return null;
  }

  const lowestPrice = Math.min(
    ...priceList.map((p) => p.numericPrice || priceNumber(p.price)),
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2, duration: 0.4 }}
      className="mt-4 max-w-full overflow-hidden rounded-[24px] border border-[#1d2940] bg-[#111827] p-4 sm:p-8"
      style={{
        boxShadow: "0 24px 70px rgba(0,0,0,0.24)",
      }}
    >
      {/* Top gradient bar with store colors */}
      <div
        className="h-1.5 -mx-4 -mt-4 sm:-mx-8 sm:-mt-8 mb-6 sm:mb-8 rounded-t-[24px]"
        style={{
          background:
            "linear-gradient(90deg, #FF9900, #2874F0, #4CAF50, #E91E63, #FF5722)",
        }}
      />

      <div className="mb-6 sm:mb-8">
        <div className="mb-3 flex items-center gap-3">
          <div
            className="flex h-10 w-10 items-center justify-center rounded-xl text-xl shadow-lg sm:h-12 sm:w-12 sm:text-2xl"
            style={{
              background: "linear-gradient(135deg, #34D399, #10B981)",
              boxShadow: "0 8px 24px rgba(52, 211, 153, 0.35)",
            }}
          >
            🛒
          </div>
          <h2 className="font-heading text-xl font-black text-white sm:text-3xl">
            Compare Prices Across Stores
          </h2>
        </div>
        <p className="mt-2 text-xs text-white/50 sm:text-sm">
          ✓ Updated just now • {products.length} results found
        </p>
      </div>

      <div className="no-scrollbar max-h-[600px] space-y-2.5 overflow-y-auto pr-2 sm:space-y-3">
        {priceList.map((product, index) => {
          const store = getStoreMeta(product.source);
          const price = product.numericPrice || priceNumber(product.price);
          const isBest = price === lowestPrice;
          const oldPrice =
            price < Number.MAX_SAFE_INTEGER ? Math.round(price * 1.22) : null;

          return (
            <motion.div
              key={`${product.id || product.url || product.title}-${index}`}
              initial={{ opacity: 0, x: -18 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05, duration: 0.28 }}
              whileHover={{ y: -3, scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              className={`grid gap-3 rounded-[18px] border-2 p-4 transition sm:grid-cols-[80px_minmax(0,1fr)_auto] sm:items-center sm:gap-x-5 sm:p-5 ${
                isBest
                  ? "border-emerald-400/50 bg-emerald-400/10"
                  : "border-[#27344d]/50 bg-[#182131]/50"
              }`}
              style={{
                borderColor: isBest ? "#34D399" : undefined,
              }}
            >
              <StoreLogo store={store} />

              <div className="min-w-0 text-center sm:text-left">
                <div className="mb-2 flex flex-wrap items-center justify-center gap-2 sm:justify-start">
                  <span className="truncate font-heading text-base font-black text-white">
                    {store.label}
                  </span>
                  {isBest && (
                    <motion.span
                      initial={{ scale: 0.88 }}
                      animate={{ scale: 1 }}
                      transition={{
                        type: "spring",
                        stiffness: 380,
                        damping: 16,
                      }}
                      className="inline-flex min-h-8 items-center gap-1.5 rounded-full bg-gradient-to-r from-emerald-400 to-green-500 px-4 py-1.5 text-xs font-black text-white shadow-lg"
                      style={{
                        boxShadow: "0 8px 24px rgba(52, 211, 153, 0.35)",
                      }}
                    >
                      <span className="text-lg">{"⚡"}</span>
                      BEST PRICE
                    </motion.span>
                  )}
                  {product.discount && !isBest && (
                    <span className="inline-flex min-h-8 items-center rounded-full border border-amber-400/40 bg-amber-400/15 px-3 py-1 text-xs font-black text-amber-300">
                      {product.discount}
                    </span>
                  )}
                </div>

                <div className="flex items-center justify-center gap-2 sm:justify-start">
                  <span className="text-xs text-amber-400 sm:text-sm">
                    {"\u2605\u2605\u2605\u2605"}
                  </span>
                  <span className="text-xs text-slate-500 sm:text-sm">
                    {"\u2605"}
                  </span>
                  <span className="text-xs text-white/40 sm:text-sm">
                    {product.rating ? Number(product.rating).toFixed(1) : "4.2"}
                  </span>
                </div>
              </div>

              <div className="grid gap-3 sm:min-w-[260px] sm:grid-cols-[auto_auto] sm:items-center sm:justify-end">
                <div className="text-center sm:text-right">
                  <div className="flex flex-wrap items-baseline justify-center gap-2 sm:justify-end">
                    <span className="font-heading text-2xl font-black leading-none text-cyan-400">
                      {formatPrice(product.price)}
                    </span>
                    {oldPrice && (
                      <span className="text-sm font-bold text-white/25 line-through">
                        {"\u20B9"}
                        {oldPrice.toLocaleString("en-IN")}
                      </span>
                    )}
                  </div>
                  <p className="mt-2 text-sm font-semibold text-white/38">
                    {"\uD83D\uDE9A"} {product.delivery || "Check delivery"}
                  </p>
                </div>

                <motion.a
                  href={product.url}
                  target="_blank"
                  rel="noreferrer"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`flex min-h-[48px] w-full shrink-0 items-center justify-center gap-2 rounded-[14px] px-4 text-xs font-black transition sm:w-[130px] sm:min-h-[56px] sm:rounded-2xl sm:px-6 sm:text-sm ${
                    product.inStock === false
                      ? "cursor-not-allowed border-2 border-red-500/40 bg-red-500/15 text-red-300"
                      : "border-2 border-cyan-400/40 bg-cyan-400/15 text-cyan-300 hover:border-cyan-400/60 hover:bg-cyan-400/25"
                  }`}
                >
                  <span>
                    {product.inStock === false ? "Out of Stock" : "Buy Now"}
                  </span>
                  {product.inStock !== false && (
                    <span className="text-base">{"→"}</span>
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
