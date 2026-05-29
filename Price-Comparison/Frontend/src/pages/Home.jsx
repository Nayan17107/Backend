import { motion } from "framer-motion";
import SearchBar from "../components/SearchBar.jsx";

const suggestions = ["iPhone 15 Pro", 'Samsung 65" TV', "boAt Earbuds", "Nike Air Max", "Laptop under Rs.50,000"];
const floatingCards = [
  { store: "Flipkart", logo: "https://1000logos.net/wp-content/uploads/2021/02/Flipkart-logo.png", price: "Rs.52,999", x: "2%", y: "28%", rotate: "-4deg", color: "#2563eb"},
  { store: "Amazon", logo: "https://1000logos.net/wp-content/uploads/2016/10/Amazon-Logo-768x432.png", price: "Rs.49,999", x: "84%", y: "27%", rotate: "6deg", color: "#f59e0b" },
  { store: "Croma", logo: "https://cdn.iconscout.com/icon/free/png-512/free-croma-icon-svg-download-png-10673445.png?f=webp&w=512", price: "Rs.54,490", x: "5%", y: "74%", rotate: "-3deg", color: "#22c55e" }
];

const FloatingCard = ({ card, index }) => (
  <div
    className="float-card absolute hidden w-[200px] rounded-[22px] border bg-[#101827]/90 p-4 shadow-2xl backdrop-blur md:block"
    style={{
      left: card.x,
      top: card.y,
      "--rotate": card.rotate,
      animationDelay: `${index * 0.6}s`,
      borderColor: `${card.color}55`
    }}
  >
    <div className="mb-3 aspect-[16/9] rounded-xl border border-white/15 bg-[#0a0f1a] flex items-center justify-center overflow-hidden">
      <img 
        src={card.logo} 
        alt={`${card.store} logo`} 
        className={`h-full w-full object-contain ${card.store === "Amazon" ? "invert brightness-0" : ""} ${card.store === "Croma" ? "p-0 scale-110" : "p-2"}`}
        // onError={(e) => {
        //   // e.target.style.display = 'none';
        // }}
      />
    </div>
    <span className="inline-flex items-center gap-2 rounded-lg border px-3 py-1 text-sm font-black" style={{ color: card.color, borderColor: `${card.color}66`, background: `${card.color}16` }}>
      {card.store}
    </span>
    <p className="mt-3 font-heading text-2xl font-black" style={{ color: card.color }}>
      {card.price}
    </p>
  </div>
);

const Home = () => (
  <section className="relative min-h-screen overflow-hidden px-4 pb-16 pt-[178px]">
    <div className="absolute inset-0 bg-[#090f1f]" />
    <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.035)_1px,transparent_1px)] bg-[size:70px_70px]" />
    <div className="absolute left-1/2 top-[46%] h-[360px] w-[760px] -translate-x-1/2 rounded-full bg-cyan-500/5 blur-3xl" />

    {floatingCards.map((card, index) => (
      <FloatingCard key={card.store} card={card} index={index} />
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
    </div>
  </section>
);

export default Home;
