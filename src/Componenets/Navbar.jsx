// import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navbar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';

function Navbar() {
    const location = useLocation(); // Récupère l'URL actuelle

    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
            <div className="container">
                <Link className="navbar-brand d-flex align-items-center" to="/">
                    <img src={"56.jpg"} className='IMG' alt="magasin.png"/>
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
                <div className="collapse navbar-collapse"
                    id="navbarSupportedContent">
                    <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link
                                className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}
                                aria-current={location.pathname === '/' ? "page" : undefined}
                                to={'/'}>Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link
                                className={`nav-link ${location.pathname === '/about' ? 'active' : ''}`}
                                to="/about">About</Link>
                        </li>
                        <li className="nav-item">
                            <Link
                                className={`nav-link ${location.pathname === '/products' ? 'active' : ''}`}
                                to="/products">Products</Link>
                        </li>
                        <li className="nav-item">
                            <Link
                                className={`nav-link ${location.pathname === '/services' ? 'active' : ''}`}
                                to="/services">Services</Link>
                        </li>
                        <li className="nav-item dropdown">
                            <Link
                                className={`nav-link dropdown-toggle ${location.pathname.includes('/category') ? 'active' : ''}`}
                                to="#"
                                role="button"
                                data-bs-toggle="dropdown"
                                aria-expanded="false">
                                Categories
                            </Link>
                            <ul className="dropdown-menu">
                                <li><Link
                                    className={`dropdown-item ${location.pathname === '/category/electronics' ? 'active' : ''}`}
                                    to="/category/electronics">Electronics</Link></li>
                                <li><Link
                                    className={`dropdown-item ${location.pathname === '/category/clothing' ? 'active' : ''}`}
                                    to="/category/clothing">Clothing</Link></li>
                                <li><hr className="dropdown-divider" /></li>
                                <li><Link
                                    className={`dropdown-item ${location.pathname === '/category/all' ? 'active' : ''}`}
                                    to="/products">All Categories</Link></li>
                            </ul>
                        </li>
                        <li className="nav-item">
                            <Link
                                className={`nav-link ${location.pathname === '/contact' ? 'active' : ''}`}
                                to="/contact">Contact</Link>
                        </li>
                    </ul>
                    <div className="d-flex align-items-center ms-3">
                        <form className="d-flex me-2" role="search">
                            <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                            <button className="btn btn-outline-success" type="submit">Search</button>
                        </form>
                        <Link to="/cart" className="nav-link">
                            <FontAwesomeIcon icon={faShoppingCart} size="lg" />
                            {/* Vous pouvez ajouter un badge ici pour afficher le nombre d'articles dans le panier */}
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;