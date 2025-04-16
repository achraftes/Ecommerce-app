import { Link, useLocation, useNavigate } from 'react-router-dom';
import './Navbar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart, faSearch, faGamepad } from '@fortawesome/free-solid-svg-icons';
import { useState, useEffect } from 'react';


function Navbar() {
    const location = useLocation();
    const navigate = useNavigate();
    const [cartCount, setCartCount] = useState(0);
    const [searchTerm, setSearchTerm] = useState('');
    

    useEffect(() => {
        const storedCart = localStorage.getItem('cart');
        if (storedCart) {
            setCartCount(JSON.parse(storedCart).length);
        }

        const handleStorageChange = () => {
            const updatedCart = localStorage.getItem('cart');
            setCartCount(updatedCart ? JSON.parse(updatedCart).length : 0);
        };

        window.addEventListener('storage', handleStorageChange);
        return () => window.removeEventListener('storage', handleStorageChange);
    }, []);

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleSearchSubmit = (event) => {
        event.preventDefault();
        if (searchTerm.trim()) {
            navigate(`/products?search=${searchTerm}`);
            setSearchTerm('');
        }
    };

    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
            <div className="container">
                <Link className="navbar-brand d-flex align-items-center" to="/">
                    <img src={"56.jpg"} className='IMG' alt="magasin.png" />
                    <span>EasyShop</span>
                </Link>
                <button className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarSupportedContent"
                    aria-controls="navbarSupportedContent"
                    aria-expanded="false"
                    aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link className={`nav-link ${location.pathname === '/' ? 'active' : ''}`} to="/">Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link className={`nav-link ${location.pathname === '/about' ? 'active' : ''}`} to="/about">About</Link>
                        </li>
                        <li className="nav-item">
                            <Link className={`nav-link ${location.pathname === '/products' ? 'active' : ''}`} to="/products">Products</Link>
                        </li>
                        <li className="nav-item">
                            <Link className={`nav-link ${location.pathname === '/services' ? 'active' : ''}`} to="/services">Services</Link>
                        </li>
                        <li className="nav-item">
                            <Link className={`nav-link ${location.pathname === '/contact' ? 'active' : ''}`} to="/contact">Contact</Link>
                        </li>
                        {/* Nouveau lien pour la page de jeu */}
                        <li className="nav-item">
                            <Link className={`nav-link ${location.pathname === '/game' ? 'active' : ''}`} to="/game">
                                <FontAwesomeIcon icon={faGamepad} className="me-1" /> Jeux
                            </Link>
                        </li>
                    </ul>
                    <div className="d-flex align-items-center ms-3">
                        <form className="d-flex me-2" role="search" onSubmit={handleSearchSubmit}>
                            <input
                                className="form-control me-2"
                                type="search"
                                placeholder="Search products...."
                                aria-label="Search"
                                value={searchTerm}
                                onChange={handleSearchChange}
                            />
                            <button className="btn btn-outline-success" type="submit">
                                <FontAwesomeIcon icon={faSearch} />
                            </button>
                        </form>
                        <Link to="/cart" className="cart-link me-2">
                            <div className="icon-wrapper">
                                <FontAwesomeIcon icon={faShoppingCart} className="cart-icon" />
                                {cartCount > 0 && <span className="cart-count">{cartCount}</span>}
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;