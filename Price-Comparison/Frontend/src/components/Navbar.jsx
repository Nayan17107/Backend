import { Link, NavLink } from "react-router-dom";
import useFavorites from "../hooks/useFavorites";

const tickerItems = [
  ["🛒", "Flipkart"],
  ["📦", "Amazon"],
  ["🏬", "Croma"],
  ["👗", "Myntra"],
  ["🔥", "Hot Deals"],
  ["💰", "Best Offers"],
  ["🚚", "Free Delivery"],
  ["⚡", "Live Prices"]
];

const Navbar = () => {
  const { favorites } = useFavorites();
  const navLink = ({ isActive }) =>
    `flex min-h-[48px] items-center rounded-2xl px-6 text-base font-black transition ${
      isActive
        ? "border border-cyan-400/40 bg-cyan-400/10 text-cyan-300 shadow-[0_0_28px_rgba(6,182,212,0.18)]"
        : "text-white/45 hover:text-white"
    }`;

  return (
    <>
      <header className="fixed left-0 right-0 top-0 z-50 border-b border-white/5 bg-[#080d19]/95 backdrop-blur-xl">
        <nav className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 md:px-8">
          <Link to="/" className="flex items-center gap-3">
            <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-400 to-blue-500 text-xl shadow-[0_12px_34px_rgba(14,165,233,0.38)]">
              ⚡
            </span>
            <span className="font-heading text-2xl font-black tracking-[-0.02em] text-white drop-shadow">PricePulse</span>
          </Link>

          <div className="hidden items-center gap-3 md:flex">
            <NavLink to="/" className={navLink}>
              Home
            </NavLink>
            <NavLink to="/results" className={navLink}>
              Search
            </NavLink>
            <NavLink to="/favorites" className={navLink}>
              Favorites ({favorites.length})
            </NavLink>
          </div>
        </nav>
        <div className="h-10 overflow-hidden bg-gradient-to-r from-cyan-500 via-blue-500 to-violet-500">
          <div className="ticker-track flex h-full min-w-max items-center gap-12 whitespace-nowrap">
            {[...tickerItems, ...tickerItems].map(([icon, label], index) => (
              <span key={`${label}-${index}`} className="flex items-center gap-3 text-sm font-black uppercase tracking-[0.24em] text-white">
                <span>{icon}</span>
                {label}
              </span>
            ))}
          </div>
        </div>
      </header>

      <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-white/10 bg-[#080d19]/95 px-3 py-2 backdrop-blur-xl md:hidden">
        <div className="mx-auto grid max-w-sm grid-cols-3 gap-2">
          {[
            { to: "/", label: "Home", icon: "⌂" },
            { to: "/results", label: "Search", icon: "⌕" },
            { to: "/favorites", label: "Saved", icon: "♥" }
          ].map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `flex min-h-12 flex-col items-center justify-center rounded-2xl text-xs font-bold ${
                  isActive ? "bg-cyan-400/10 text-cyan-300" : "text-white/45"
                }`
              }
            >
              <span className="text-lg">{item.icon}</span>
              <span>{item.label}</span>
            </NavLink>
          ))}
        </div>
      </nav>
    </>
  );
};

export default Navbar;
