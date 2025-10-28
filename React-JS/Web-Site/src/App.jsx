import './App.css'
import Header from './Components/Header/Header.jsx'
import Contact from './Components/Contact/Contact.jsx';
import Footer from './Components/Footer/Footer.jsx'
import 'bootstrap-icons/font/bootstrap-icons.css';
import Home from './Components/Home/Home.jsx';

function App() {
  return (
    <>
      <Header/>
      <Home/>
      <Contact/>
      <Footer/>
    </>
  )
}

export default App;