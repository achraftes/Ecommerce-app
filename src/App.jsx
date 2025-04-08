
import './App.css';
import About from './Componenets/About';
import Contact  from './Componenets/Contact';
import Footer from './Componenets/Footer';
import Navbar from './Componenets/Navbar'
import Prodactlist from './Componenets/Prodactlist';
import ProductDetails from './Componenets/ProductDetails';
import Services from './Componenets/Services';
import Slider from './Componenets/Slider'
import { Routes, Route, } from 'react-router-dom';


function App() {
  return (
    <>
    <div className='App'>
      <Navbar />
      <Routes>
        <Route path='/' element={<> <Slider /> <Prodactlist /> </>} />
        <Route path='about' element={<About />} />
        <Route path='contact' element={<Contact />} />
        <Route path='services' element={<Services />} />
        <Route path='product/:productId' element={<ProductDetails />} />
      </Routes>
      <Footer/>

    </div>
    </>
  )
}
export default App
