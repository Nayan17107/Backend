import './App.css'
import Header from './Components/Header/Header.jsx'
import Contact from './Components/Contact/Contact.jsx';
import Footer from './Components/Footer/Footer.jsx'
import 'bootstrap-icons/font/bootstrap-icons.css';
import Home from './Components/Home/Home.jsx';
import Garden from './Components/Garden-comp/Garden.jsx';
import FoodWasteComp from './Components/Food-Waste/Food.jsx';
import WaterPage from './Components/Water/Water.jsx';

function App() {
  return (
    <>
      <Header/>
      <Home/>
      {/* <Garden/> */}
      {/* <FoodWasteComp/> */}
      {/* <WaterPage/> */}
      <Contact/>
      <Footer/>
    </>
  )
}

export default App;