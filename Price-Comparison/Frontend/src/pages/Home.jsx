import { motion } from "framer-motion";
import SearchBar from "../components/SearchBar.jsx";

const suggestions = ["iPhone 15 Pro", 'Samsung 65" TV', "boAt Earbuds", "Nike Air Max", "Laptop under Rs.50,000"];
const floatingCards = [
  { store: "Flipkart", icon: "🛒", price: "Rs.52,999", delivery: "Free delivery", x: "2%", y: "28%", rotate: "-4deg", color: "#2f80ff" },
  { store: "Amazon", icon: "📦", price: "Rs.49,999", delivery: "Prime delivery", badge: "Lowest", x: "84%", y: "27%", rotate: "6deg", color: "#fb923c" },
  { store: "Croma", icon: "🏬", price: "Rs.54,490", delivery: "Express delivery", x: "5%", y: "74%", rotate: "-3deg", color: "#22c55e" }
];

const DealCard = ({ card, floating = false, index = 0 }) => (
  <div
    className={`${floating ? "float-card absolute hidden w-[200px] lg:block" : "w-full"} rounded-[18px] border bg-[#111827]/92 p-4 text-left shadow-2xl backdrop-blur`}
    style={
      floating
        ? {
            left: card.x,
            top: card.y,
            "--rotate": card.rotate,
            animationDelay: `${index * 0.6}s`,
            borderColor: `${card.color}55`
          }
        : { borderColor: `${card.color}66` }
    }
  >
    <div className="mb-4 flex items-center justify-between gap-3">
      <div className="flex min-w-0 items-center gap-2">
        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-base" style={{ backgroundColor: `${card.color}24` }}>
          {card.icon}
        </span>
        <span className="truncate text-sm font-black text-white/58">{card.store}</span>
      </div>
      {card.badge && (
        <span className="rounded-full border border-cyan-400/45 bg-cyan-400/12 px-3 py-1 text-[10px] font-black uppercase tracking-[0.12em] text-cyan-300">
          {card.badge}
        </span>
      )}
    </div>
    <p className="font-heading text-[26px] font-black leading-none sm:text-[30px]" style={{ color: card.color }}>
      {card.price}
    </p>
    <div className="mt-4 flex items-center gap-3">
      <span className="truncate text-xs font-semibold text-white/28">🚚 {card.delivery}</span>
    </div>
  </div>
);

const Home = () => (
  <section className="relative min-h-screen overflow-hidden px-4 pb-16 pt-[178px]">
    <div className="absolute inset-0 bg-[#090f1f]" />
    <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.035)_1px,transparent_1px)] bg-[size:70px_70px]" />
    <div className="absolute left-1/2 top-[46%] h-[360px] w-[760px] -translate-x-1/2 rounded-full bg-cyan-500/5 blur-3xl" />

    {floatingCards.map((card, index) => (
      <DealCard key={card.store} card={card} index={index} floating />
    ))}

    <div className="relative z-10 mx-auto max-w-6xl text-center">
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        className="mx-auto mb-10 inline-flex min-h-[42px] items-center gap-3 rounded-full border border-cyan-400/35 bg-cyan-400/10 px-7 font-heading text-sm font-black uppercase tracking-[0.22em] text-cyan-300"
      >
        <span className="h-2 w-2 rounded-full bg-cyan-400" />
        Real-Time Price Comparison
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 26 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.08 }}
        className="mx-auto max-w-5xl font-heading text-[clamp(3.8rem,8vw,7.1rem)] leading-[0.98] tracking-[-0.055em] text-white"
      >
        Find the Best Price
        <span className="block bg-gradient-to-r from-cyan-400 via-blue-500 to-violet-500 bg-clip-text text-transparent">
          Across India
        </span>
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.18 }}
        className="mx-auto mt-9 max-w-2xl text-xl font-semibold leading-8 text-white/42"
      >
        Search any product and instantly compare prices from Flipkart, Amazon, Croma and more — all in one place.
      </motion.p>

      <motion.div initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.26 }} className="mt-16">
        <SearchBar />
      </motion.div>

      <div className="mx-auto mt-9 flex max-w-4xl flex-wrap justify-center gap-3">
        {suggestions.map((suggestion) => (
          <a
            key={suggestion}
            href={`/results?query=${encodeURIComponent(suggestion)}`}
            className="flex min-h-11 items-center rounded-full border border-slate-700/90 bg-[#151b2b]/80 px-6 text-sm font-black text-white/50 transition hover:border-cyan-400/60 hover:text-cyan-300"
          >
            {suggestion}
          </a>
        ))}
      </div>

      <div className="mx-auto mt-7 hidden max-w-5xl grid-cols-3 gap-3 md:grid lg:hidden">
        {floatingCards.map((card, index) => (
          <DealCard key={`tablet-${card.store}`} card={card} index={index} />
        ))}
      </div>
    </div>
  </section>
);

export default Home;
