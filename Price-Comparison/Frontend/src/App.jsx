import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import Home from "./pages/Home.jsx";
import Results from "./pages/Results.jsx";
import Favorites from "./pages/Favorites.jsx";

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -18 }
};

const App = () => {
  const location = useLocation();
  const [theme, setTheme] = useState(() => localStorage.getItem("pricepulse-theme") || "dark");
  const isLight = theme === "light";

  useEffect(() => {
    localStorage.setItem("pricepulse-theme", theme);
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  const toggleTheme = () => {
    setTheme((current) => (current === "dark" ? "light" : "dark"));
  };

  return (
    <div className={`${isLight ? "theme-light" : "theme-dark"} min-h-screen overflow-x-hidden bg-ink font-body text-white`}>
      <Navbar theme={theme} onToggleTheme={toggleTheme} />
      <AnimatePresence mode="wait">
        <motion.main
          key={location.pathname + location.search}
          variants={pageVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={{ duration: 0.25, ease: "easeOut" }}
          className="pb-24 md:pb-0"
        >
          <Routes location={location}>
            <Route path="/" element={<Home />} />
            <Route path="/results" element={<Results />} />
            <Route path="/favorites" element={<Favorites />} />
          </Routes>
        </motion.main>
      </AnimatePresence>
      <Footer />
    </div>
  );
};

export default App;
