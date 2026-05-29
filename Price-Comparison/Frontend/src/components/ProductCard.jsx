import { motion } from "framer-motion";
import { formatPrice, priceNumber } from "../utils/formatPrice";
import { getStoreMeta } from "../utils/storeColors";
import useFavorites from "../hooks/useFavorites";

const ProductCard = ({ product, index = 0, bestPrice = false, favoriteMode = false }) => {
  const { addFavorite, deleteFavorite } = useFavorites();
  const store = getStoreMeta(product.source);
  const image = product.image || "https://placehold.co/520x360/0b111d/64748b?text=Product";
  const numericPrice = product.numericPrice || priceNumber(product.price);
  const oldPrice = numericPrice < Number.MAX_SAFE_INTEGER ? `\u20b9${Math.round(numericPrice * 1.22).toLocaleString("en-IN")}` : "";
  const discount = product.discount || (bestPrice ? "Best Price" : "");

  const save = () => {
    if (favoriteMode) {
      deleteFavorite(product._id);
      return;
    }
    addFavorite(product);
  };

  return (
    <motion.article
      initial={{ opacity: 0, y: 26 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -8, scale: 1.01 }}
      transition={{ delay: index * 0.08, duration: 0.35 }}
      className="group relative overflow-hidden rounded-[18px] border border-[#1d2940] bg-[#111827] shadow-[0_24px_70px_rgba(0,0,0,0.24)] transition hover:-translate-y-1 hover:border-blue-500/60 sm:rounded-[22px]"
      style={{ borderColor: bestPrice ? "#1d4ed8" : undefined }}
    >
      {bestPrice && (
        <motion.div
          initial={{ scale: 0.8, y: -8 }}
          animate={{ scale: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 380, damping: 18 }}
          className="absolute left-4 top-3 z-20 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.14em] text-white shadow-lg shadow-cyan-500/25 sm:left-5 sm:top-4 sm:px-4 sm:py-2 sm:text-xs"
        >
          ⚡ Best Price
        </motion.div>
      )}

      {discount && !bestPrice && (
        <div className="absolute right-3 top-3 z-20 rounded-full bg-red-500 px-3 py-1.5 text-xs font-black text-white sm:right-4 sm:top-4 sm:px-4 sm:py-2 sm:text-sm">
          {discount.length > 8 ? "Deal" : discount}
        </div>
      )}

      <div className="relative h-[170px] overflow-hidden bg-[#0b111d] sm:h-[250px]">
        <img src={image} alt={product.title} className="h-full w-full object-cover opacity-80 transition duration-500 group-hover:scale-105" loading="lazy" />
        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#111827] to-transparent" />
        <span className="absolute bottom-3 left-4 inline-flex items-center gap-2 rounded-full border border-emerald-400/40 bg-emerald-400/10 px-2.5 py-1 text-[10px] font-black uppercase tracking-[0.16em] text-emerald-300 sm:bottom-4 sm:left-5 sm:px-3 sm:text-xs">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-300" />
          {product.inStock === false ? "Out of Stock" : "In Stock"}
        </span>
      </div>

      <div className="space-y-4 p-4 sm:space-y-5 sm:p-5">
        <motion.a
          href={product.url}
          target="_blank"
          rel="noreferrer"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="flex min-h-[58px] items-center justify-between rounded-2xl border px-4 transition hover:brightness-110 sm:min-h-[74px] sm:rounded-[18px] sm:px-5"
          style={{ borderColor: `${store.color}80`, background: `${store.color}20` }}
        >
          <span className="flex min-w-0 items-center gap-4">
            <span
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-sm font-black text-white shadow-lg sm:h-12 sm:w-12 sm:rounded-2xl sm:text-lg"
              style={{ backgroundColor: store.color, boxShadow: `0 16px 34px ${store.color}35` }}
            >
              {store.initials}
            </span>
            <span className="min-w-0">
              <span className="block text-[10px] font-black uppercase tracking-[0.16em] text-white/35 sm:text-xs">Available at</span>
              <span className="block truncate font-heading text-base font-black sm:text-xl" style={{ color: store.color }}>
                {store.label}
              </span>
            </span>
          </span>
          <span className="text-white/45">→</span>
        </motion.a>

        <div>
          <h3 className="line-clamp-2 min-h-[44px] text-base font-black leading-6 text-white/78 sm:min-h-[58px] sm:text-lg sm:leading-7">{product.title}</h3>
          <div className="mt-3 flex items-center gap-1 text-xs sm:mt-4 sm:text-sm">
            <span className="text-yellow-400">★★★★</span>
            <span className="text-slate-600">★</span>
            <span className="ml-2 text-white/40">{product.rating ? Number(product.rating).toFixed(1) : "4.2"}</span>
          </div>
        </div>

        <div>
          <div className="flex items-end gap-3">
            <p className="font-heading text-[28px] font-black leading-none text-cyan-400 sm:text-[34px]">{formatPrice(product.price)}</p>
            {oldPrice && <p className="pb-1 text-xs font-bold text-white/18 line-through sm:text-sm">{oldPrice}</p>}
          </div>
          <p className="mt-2 truncate text-xs font-semibold text-white/28 sm:mt-3 sm:text-sm">🚚 {product.delivery || "Delivery varies"}</p>
        </div>

        <div className="grid grid-cols-[minmax(0,1fr)_50px] gap-2 sm:grid-cols-[minmax(0,1fr)_58px] sm:gap-3">
          <motion.a
            href={product.url}
            target="_blank"
            rel="noreferrer"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="flex min-h-[50px] min-w-0 items-center justify-center rounded-xl border border-[#27344d] bg-[#182131] text-sm font-black transition hover:border-blue-500 sm:min-h-[58px] sm:rounded-2xl sm:text-base"
            style={{ color: store.color }}
            title={product.linkLabel || `Buy on ${store.label}`}
          >
            <span className="max-w-full truncate px-2">
              {product.linkLabel?.includes("Google") ? "View Product" : `Buy on ${store.label}`} →
            </span>
          </motion.a>
          <motion.button
            whileTap={{ scale: 0.82 }}
            transition={{ type: "spring", stiffness: 420, damping: 12 }}
            onClick={save}
            className="flex h-[50px] min-h-[50px] w-[50px] shrink-0 items-center justify-center rounded-xl border border-[#27344d] bg-[#1a2333] text-lg text-white shadow-[0_12px_28px_rgba(0,0,0,0.18)] transition hover:border-rose-300/50 hover:bg-rose-500/20 sm:h-[58px] sm:min-h-[58px] sm:w-[58px] sm:rounded-2xl sm:text-xl"
            aria-label={favoriteMode ? "Remove favorite" : "Save favorite"}
          >
            {favoriteMode ? "💖" : "🤍"}
          </motion.button>
        </div>
      </div>
    </motion.article>
  );
};

export default ProductCard;
