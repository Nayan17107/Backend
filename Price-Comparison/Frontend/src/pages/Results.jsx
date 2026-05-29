import { AnimatePresence, motion } from "framer-motion";
import { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import FilterPanel from "../components/FilterPanel.jsx";
import LoadingSkeleton from "../components/LoadingSkeleton.jsx";
import PriceCompareList from "../components/PriceCompareList.jsx";
import PriceHistoryChart from "../components/PriceHistoryChart.jsx";
import ProductCard from "../components/ProductCard.jsx";
import SearchBar from "../components/SearchBar.jsx";
import useSearch from "../hooks/useSearch.js";
import { priceNumber } from "../utils/formatPrice.js";
import { getStoreMeta } from "../utils/storeColors.js";

const Results = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("query") || "";
  const { data, loading, error } = useSearch(query);
  const [sort, setSort] = useState("low");
  const [visible, setVisible] = useState(12);
  const [viewMode, setViewMode] = useState("card"); // "card" or "list"
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [filters, setFilters] = useState({ min: 0, max: 200000, stores: [], inStock: false, rating: 0 });

  const stores = useMemo(() => [...new Set((data.products || []).map((product) => product.source))], [data.products]);
  const filteredProducts = useMemo(() => {
    return (data.products || [])
      .filter((product) => {
        const price = product.numericPrice || priceNumber(product.price);
        const storeOk = filters.stores.length === 0 || filters.stores.includes(product.source);
        return price >= filters.min && price <= filters.max && storeOk;
      })
      .sort((a, b) => {
        if (sort === "high") return (b.numericPrice || priceNumber(b.price)) - (a.numericPrice || priceNumber(a.price));
        if (sort === "rated") return Number(b.rating || 0) - Number(a.rating || 0);
        return (a.numericPrice || priceNumber(a.price)) - (b.numericPrice || priceNumber(b.price));
      });
  }, [data.products, filters, sort]);

  const visibleProducts = filteredProducts.slice(0, visible);
  const prices = filteredProducts.map((product) => product.numericPrice || priceNumber(product.price)).filter((price) => price < Number.MAX_SAFE_INTEGER);
  const range = prices.length
    ? `\u20b9${Math.min(...prices).toLocaleString("en-IN")} - \u20b9${Math.max(...prices).toLocaleString("en-IN")}`
    : "No prices";
  const bestStore = filteredProducts[0]?.source || "None";
  const storeCounts = useMemo(
    () =>
      stores
        .map((store) => ({
          ...getStoreMeta(store),
          source: store,
          count: filteredProducts.filter((product) => product.source === store).length
        }))
        .filter((store) => store.count > 0)
        .sort((a, b) => b.count - a.count),
    [filteredProducts, stores]
  );

  return (
    <section className="relative min-h-screen overflow-hidden bg-[#090f1f] px-4 pb-32 pt-[154px] md:px-7 md:pb-16">
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.028)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.028)_1px,transparent_1px)] bg-[size:70px_70px]" />
      <div className="relative z-10 mx-auto max-w-[1266px]">
        <SearchBar defaultValue={query} compact />

        {!query && (
          <div className="mt-10 rounded-[22px] border border-[#1d2940] bg-[#111827] p-8 text-center text-white/50">
            Type a product above to compare Indian marketplace prices.
          </div>
        )}

        {query && (
          <>
            <div className="mt-10">
              <p className="mb-5 font-heading text-sm font-black uppercase tracking-[0.28em] text-cyan-300">India Shopping Comparison</p>
              <h1 className="font-heading text-[clamp(2rem,5vw,3.4rem)] font-black text-white [overflow-wrap:anywhere] sm:text-[clamp(2.4rem,5vw,3.4rem)]">
                Results for <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">"{query}"</span>
              </h1>
            </div>

            <div className="mt-10 grid gap-4 md:grid-cols-3">
              {[
                ["📦", `${filteredProducts.length} results`, "Matching your search"],
                ["💰", range, "Price range found"],
                ["🏆", bestStore, "Best deal store"]
              ].map(([icon, value, label]) => (
                <div key={label} className="rounded-[20px] border border-[#1d2940] bg-[#111827] p-5 sm:p-8">
                  <div className="flex min-w-0 items-center gap-4 sm:gap-6">
                    <span className="shrink-0 text-3xl">{icon}</span>
                    <span className="min-w-0">
                      <span className="block break-words font-heading text-xl font-black text-white sm:text-2xl">{value}</span>
                      <span className="mt-1 block text-sm font-bold text-white/28">{label}</span>
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {storeCounts.length > 0 && (
              <div className="mt-8 rounded-[22px] border border-[#1d2940] bg-[#111827] p-5 sm:p-7">
                <div className="mb-5 flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <p className="mb-2 font-heading text-xs font-black uppercase tracking-[0.28em] text-cyan-300">Stores Found</p>
                    <h2 className="font-heading text-xl font-black text-white">Available Marketplaces</h2>
                  </div>
                  <p className="hidden text-sm font-bold text-white/28 md:block">Tap to filter</p>
                </div>
              <div className="no-scrollbar flex gap-3 overflow-x-auto pb-1">
                {storeCounts.map((store) => {
                  const active = filters.stores.includes(store.source);
                  return (
                      <motion.button
                        key={store.source}
                        whileHover={{ y: -4, scale: 1.015 }}
                        whileTap={{ scale: 0.97 }}
                        onClick={() => setFilters((current) => ({ ...current, stores: active ? [] : [store.source] }))}
                        className="flex w-[168px] shrink-0 items-center gap-3 rounded-2xl border bg-[#182131] px-4 py-4 text-left transition sm:w-[206px] sm:gap-4 sm:px-5"
                        style={{ borderColor: active ? store.color : "#27344d" }}
                      >
                        <span
                          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl text-base font-black text-white sm:h-12 sm:w-12 sm:text-lg"
                          style={{ backgroundColor: store.color, boxShadow: `0 14px 30px ${store.color}30` }}
                        >
                          {store.initials}
                        </span>
                        <span className="min-w-0">
                          <span className="block truncate font-heading text-lg font-black text-white">{store.label}</span>
                          <span className="text-sm font-bold text-white/35">{store.count} products</span>
                        </span>
                      </motion.button>
                  );
                })}
              </div>
              </div>
            )}

            <div className="mt-7 flex items-center justify-between md:hidden">
              <button onClick={() => setMobileFiltersOpen(true)} className="rounded-2xl border border-[#27344d] bg-[#111827] px-5 py-3 font-black">
                Filters
              </button>
            </div>

            {/* View Mode Toggle */}
            <div className="mt-7 flex items-center justify-end gap-2">
              <span className="hidden text-sm font-black text-white/40 sm:inline">View:</span>
              <div className="flex gap-2 rounded-2xl border border-[#27344d] bg-[#182131] p-1">
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setViewMode("card")}
                  className={`flex items-center gap-2 rounded-xl px-4 py-2 font-black transition ${
                    viewMode === "card"
                      ? "bg-gradient-to-r from-cyan-400 to-blue-500 text-white"
                      : "text-white/50 hover:text-white"
                  }`}
                  title="Card View"
                >
                  <span className="text-lg">▦</span>
                  <span className="hidden sm:inline text-sm">Card</span>
                </motion.button>
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setViewMode("list")}
                  className={`flex items-center gap-2 rounded-xl px-4 py-2 font-black transition ${
                    viewMode === "list"
                      ? "bg-gradient-to-r from-cyan-400 to-blue-500 text-white"
                      : "text-white/50 hover:text-white"
                  }`}
                  title="List View"
                >
                  <span className="text-lg">☰</span>
                  <span className="hidden sm:inline text-sm">List</span>
                </motion.button>
              </div>
            </div>

            <div className="mt-7 grid gap-6 md:grid-cols-[240px_minmax(0,1fr)] xl:grid-cols-[270px_minmax(0,1fr)]">
              <div className="hidden md:block md:sticky md:top-[154px] md:h-[calc(100vh-154px)] md:overflow-y-auto md:pr-2">
                <FilterPanel filters={filters} setFilters={setFilters} stores={stores} sort={sort} setSort={setSort} />
              </div>
              <div className="min-w-0 space-y-8 pb-8">
                {loading && <LoadingSkeleton />}
                {!loading && error && <div className="rounded-[22px] border border-red-400/30 bg-red-500/10 p-6 text-red-200">{error}</div>}
                {!loading && !error && (
                  <>
                    {/* Card View */}
                    {viewMode === "card" && (
                      <>
                        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 2xl:grid-cols-3">
                          {visibleProducts.map((product, index) => (
                            <ProductCard key={`${product.id}-${index}`} product={product} index={index} bestPrice={index === 0 && sort === "low"} />
                          ))}
                        </div>
                        {visible < filteredProducts.length && (
                          <div className="mt-8 text-center">
                            <button onClick={() => setVisible((current) => current + 9)} className="rounded-2xl bg-gradient-to-r from-cyan-400 to-blue-500 px-8 py-4 font-black text-white">
                              Load More
                            </button>
                          </div>
                        )}
                      </>
                    )}

                    {/* List View */}
                    {viewMode === "list" && (
                      <>
                        <PriceCompareList products={filteredProducts} />
                        <PriceHistoryChart query={query} />
                      </>
                    )}
                  </>
                )}
              </div>
            </div>
          </>
        )}
      </div>

      <AnimatePresence>
        {mobileFiltersOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 bg-black/60 lg:hidden" onClick={() => setMobileFiltersOpen(false)} />
            <FilterPanel filters={filters} setFilters={setFilters} stores={stores} sort={sort} setSort={setSort} isMobile onClose={() => setMobileFiltersOpen(false)} />
          </>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Results;
