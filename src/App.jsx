import './App.css';
import About from './Componenets/About';
import CartPage from './Componenets/CartPage';
import ChatButtonFloating from './Componenets/ChatButtonFloating';
import CheckoutPage from './Componenets/CheckoutPage';
import Contact from './Componenets/Contact';
import Footer from './Componenets/Footer';
import GamePage from './Componenets/GamePage';
import Navbar from './Componenets/Navbar';
import Prodactlist from './Componenets/Prodactlist';
import ProductDetails from './Componenets/ProductDetails';
import Services from './Componenets/Services';
import Slider from './Componenets/Slider';

import { Routes, Route } from 'react-router-dom';

function App() {
    return (
        <>
            <div className='App'>
                <Navbar />
                <Routes>
                    <Route path='/' element={<><Slider /><Prodactlist /></>} />
                    <Route path='/products' element={<Prodactlist />} />
                    <Route path='about' element={<About />} />
                    <Route path="/cart" element={<CartPage />} />
                    <Route path="/game" element={<GamePage />} />
                    <Route path="/checkout" element={<CheckoutPage />} /> {/* Changed path to /checkout */}
                    <Route path='contact' element={<Contact />} />
                    <Route path='services' element={<Services />} />
                    <Route path='product/:productId' element={<ProductDetails />} />
                </Routes> 
                 <ChatButtonFloating/>
                
                 <br />  <br />
                <Footer />
            </div>
        </>
    );
}

export default App;