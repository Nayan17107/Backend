import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const placeholders = ['Samsung 65" TV', "iPhone 15 Pro", "boAt Earbuds", "Nike Air Max", "Laptop under 50000"];

const SearchBar = ({ defaultValue = "", compact = false }) => {
  const navigate = useNavigate();
  const [query, setQuery] = useState(defaultValue);
  const [placeholderIndex, setPlaceholderIndex] = useState(0);

  useEffect(() => setQuery(defaultValue), [defaultValue]);

  useEffect(() => {
    const timer = setInterval(() => {
      setPlaceholderIndex((current) => (current + 1) % placeholders.length);
    }, 1800);
    return () => clearInterval(timer);
  }, []);

  const submit = (event) => {
    event.preventDefault();
    const trimmed = query.trim();
    if (trimmed) navigate(`/results?query=${encodeURIComponent(trimmed)}`);
  };

  return (
    <motion.form
      onSubmit={submit}
      whileTap={{ scale: 0.995 }}
      className={`mx-auto grid w-full items-center gap-4 ${compact ? "grid-cols-[minmax(0,1fr)_126px]" : "max-w-[725px] grid-cols-[minmax(0,1fr)_138px]"} max-[560px]:grid-cols-1`}
    >
      <label className="group flex min-h-[68px] min-w-0 items-center gap-4 rounded-[22px] border border-slate-700/80 bg-[#121827]/95 px-5 shadow-[0_22px_70px_rgba(0,0,0,0.28)] transition focus-within:border-cyan-400/60 sm:px-7">
        <span className="text-2xl opacity-60">🔍</span>
        <input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder={`Try "${placeholders[placeholderIndex]}"...`}
          className="min-h-0 min-w-0 flex-1 bg-transparent text-base font-bold text-white outline-none placeholder:text-white/45 sm:text-lg"
        />
      </label>
      <motion.button
        whileTap={{ scale: 0.94 }}
        className="min-h-[58px] rounded-[20px] bg-gradient-to-r from-cyan-400 to-blue-500 px-7 text-lg font-black text-white shadow-[0_18px_40px_rgba(14,165,233,0.34)]"
        type="submit"
      >
        Search
      </motion.button>
    </motion.form>
  );
};

export default SearchBar;
