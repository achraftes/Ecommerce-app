
import './App.css';
import About from './Componenets/About';
import Navbar from './Componenets/Navbar'
import Prodactlist from './Componenets/Prodactlist';
import ProductDetails from './Componenets/ProductDetails';
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
        <Route path='product/:productId' element={<ProductDetails />} />
        <Route path="/services" element={<Services />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/category/:categoryName" element={<Products />} />
      </Routes>

    </div>
    </>
  )
}
export default App
