import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import ProductCard from "../components/ProductCard.jsx";
import useFavorites from "../hooks/useFavorites.js";

const Favorites = () => {
  const { favorites } = useFavorites();

  return (
    <section className="relative min-h-screen overflow-hidden bg-[#090f1f] px-4 pb-16 pt-[154px] md:px-7">
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.028)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.028)_1px,transparent_1px)] bg-[size:70px_70px]" />
      <div className="absolute right-0 top-32 h-72 w-72 rounded-full bg-cyan-500/10 blur-3xl" />

      <div className="relative z-10 mx-auto max-w-[1266px]">
        <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} className="mb-10">
          <p className="mb-4 font-heading text-sm font-black uppercase tracking-[0.28em] text-cyan-300">Saved Deals</p>
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <h1 className="font-heading text-[clamp(2.8rem,6vw,5rem)] font-black leading-none tracking-[-0.05em] text-white">
                Favorite
                <span className="block bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">Products</span>
              </h1>
              <p className="mt-4 max-w-xl text-lg font-semibold text-white/42">
                Keep the deals you want to compare again before buying.
              </p>
            </div>
            <div className="rounded-[22px] border border-[#1d2940] bg-[#111827] px-7 py-5">
              <p className="text-sm font-black uppercase tracking-[0.2em] text-white/30">Saved</p>
              <p className="font-heading text-4xl font-black text-cyan-300">{favorites.length}</p>
            </div>
          </div>
        </motion.div>

        {favorites.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            className="mx-auto max-w-3xl rounded-[28px] border border-[#1d2940] bg-[#111827] p-8 text-center shadow-[0_30px_80px_rgba(0,0,0,0.25)] md:p-12"
          >
            <div className="mx-auto mb-8 flex h-44 w-44 items-center justify-center rounded-[36px] border border-cyan-400/25 bg-gradient-to-br from-cyan-400/20 to-blue-500/10 text-7xl shadow-[0_24px_60px_rgba(14,165,233,0.16)]">
              ♥
            </div>
            <h2 className="font-heading text-4xl font-black tracking-[-0.03em] text-white">No favorites yet</h2>
            <p className="mx-auto mt-4 max-w-md text-lg font-semibold text-white/42">
              Search a product, compare Indian stores, and tap the heart on any deal you want to save.
            </p>
            <Link
              to="/results"
              className="mt-8 inline-flex min-h-[58px] items-center rounded-2xl bg-gradient-to-r from-cyan-400 to-blue-500 px-8 text-lg font-black text-white shadow-[0_18px_40px_rgba(14,165,233,0.28)] transition hover:-translate-y-1"
            >
              Search Products
            </Link>
          </motion.div>
        ) : (
          <motion.div initial="hidden" animate="show" variants={{ hidden: {}, show: { transition: { staggerChildren: 0.08 } } }} className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
            {favorites.map((favorite, index) => (
              <ProductCard key={favorite._id} product={favorite} index={index} favoriteMode />
            ))}
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default Favorites;
