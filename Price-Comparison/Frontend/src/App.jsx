import { AnimatePresence, motion } from "framer-motion";
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

  return (
    <div className="min-h-screen overflow-x-hidden bg-ink font-body text-white">
      <Navbar />
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
