import './App.css';
import Header from './Components/Header/Header.jsx';
import Contact from './Components/Contact/Contact.jsx';
import Footer from './Components/Footer/Footer.jsx';
import 'bootstrap-icons/font/bootstrap-icons.css';
import Home from './Components/Home/Home.jsx';
import Garden from './Components/Garden-comp/Garden.jsx';
import FoodWasteComp from './Components/Food-Waste/Food.jsx';
import WaterPage from './Components/Water/Water.jsx';
import Gardening from './Components/Gardening/Gardening.jsx';
import Blog from './Components/Blog/Blog.jsx';
import Gift from './Components/Gift/Gift.jsx';
import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  const [list] = useState(["Garden", "FoodWasteComp", "WaterPage", "Gardening", "Blog", "Gift"]);

  return (
    <Router>
      <Header />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Garden" element={<Garden list={list} />} />
        <Route path="/FoodWasteComp" element={<FoodWasteComp list={list} />} />
        <Route path="/WaterPage" element={<WaterPage list={list} />} />
        <Route path="/Gardening" element={<Gardening list={list} />} />
        <Route path="/Blog" element={<Blog list={list} />} />
        <Route path="/Gift" element={<Gift list={list} />} />
      </Routes>

      <Contact />
      <Footer />
      <div className="reviews-tab">★ REVIEWS</div>
    </Router>
  );
}

export default App;
