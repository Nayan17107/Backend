import { motion } from "framer-motion";
import { getStoreMeta } from "../utils/storeColors";

const sortOptions = [
  ["low", "Price: Low to High"],
  ["high", "Price: High to Low"],
  ["rated", "Best Rated"]
];

const FilterPanel = ({ filters, setFilters, stores, sort = "low", setSort, isMobile = false, onClose }) => {
  const toggleStore = (store) => {
    setFilters((current) => ({
      ...current,
      stores: current.stores.includes(store) ? current.stores.filter((item) => item !== store) : [...current.stores, store]
    }));
  };
  const reset = () => setFilters({ min: 0, max: 200000, stores: [], inStock: false, rating: 0 });

  return (
    <motion.aside
      initial={isMobile ? { y: "100%" } : { x: -28, opacity: 0 }}
      animate={isMobile ? { y: 0 } : { x: 0, opacity: 1 }}
      exit={isMobile ? { y: "100%" } : { x: -28, opacity: 0 }}
      transition={{ type: "spring", stiffness: 260, damping: 28 }}
      className={`${isMobile ? "fixed inset-x-0 bottom-0 z-[60] max-h-[82vh] rounded-t-[28px] bg-[#111827] p-5 pb-6" : "sticky top-[150px] max-h-[calc(100vh-170px)] self-start rounded-[22px] p-5"} flex flex-col overflow-hidden border border-[#1d2940] bg-[#111827]`}
    >
      <div className="mb-6 flex shrink-0 items-center justify-between">
        <h2 className="font-heading text-xl font-black text-white">Filters</h2>
        {isMobile && (
          <button onClick={onClose} className="rounded-full px-4 font-bold text-white/50">
            Close
          </button>
        )}
      </div>

      <div className="no-scrollbar min-h-0 flex-1 space-y-7 overflow-auto pr-1">
        <section>
          <p className="mb-4 text-xs font-black uppercase tracking-[0.2em] text-white/28">Sort By</p>
          <div className="space-y-3">
            {sortOptions.map(([value, label]) => (
              <button
                key={value}
                onClick={() => setSort?.(value)}
                className={`w-full rounded-2xl border px-5 py-4 text-left text-base font-black transition ${
                  sort === value ? "border-cyan-400/50 bg-cyan-400/12 text-cyan-300" : "border-transparent text-white/42 hover:text-white"
                }`}
              >
                {value === "low" ? "↑ " : value === "high" ? "↓ " : "★ "}
                {label}
              </button>
            ))}
          </div>
        </section>

        <div className="h-px bg-white/8" />

        <section>
          <p className="mb-4 text-xs font-black uppercase tracking-[0.2em] text-white/28">Store</p>
          <div className="space-y-4">
            {stores.map((store) => {
              const meta = getStoreMeta(store);
              return (
                <label key={store} className="flex min-h-11 min-w-0 items-center gap-3 text-base font-black text-white/48">
                  <input
                    type="checkbox"
                    checked={filters.stores.includes(store)}
                    onChange={() => toggleStore(store)}
                    className="h-[18px] w-[18px] shrink-0 rounded border-slate-600 bg-transparent accent-cyan-400"
                  />
                  <span className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-lg text-xs text-white" style={{ backgroundColor: `${meta.color}33` }}>
                    {meta.initials}
                  </span>
                  <span className="min-w-0 truncate">{meta.label}</span>
                </label>
              );
            })}
          </div>
        </section>
      </div>

      <div className="mt-5 shrink-0 border-t border-white/8 pt-4">
        <button onClick={reset} className="w-full rounded-2xl border border-cyan-400/30 bg-cyan-400/10 px-4 py-4 font-black text-cyan-200 shadow-[0_12px_32px_rgba(6,182,212,0.08)] transition hover:bg-cyan-400/15 hover:text-white">
          Reset Filters
        </button>
      </div>
    </motion.aside>
  );
};

export default FilterPanel;
