import './App.css'
import Header from './Components/Header/Header.jsx'
import Contact from './Components/Contact/Contact.jsx';
import Footer from './Components/Footer/Footer.jsx'
import 'bootstrap-icons/font/bootstrap-icons.css';
import Home from './Components/Home/Home.jsx';
import Garden from './Components/Garden-comp/Garden.jsx';

function App() {
  return (
    <>
      <Header/>
      {/* <Home/> */}
      {/* <Garden/> */}
      <Contact/>
      <Footer/>
    </>
  )
}

export default App;