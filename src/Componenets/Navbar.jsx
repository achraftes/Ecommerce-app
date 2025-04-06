import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
    return (
        <>
            <nav className="navbar navbar-expand-lg bg-body-tertiary">
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/">
                        <i><img src={"56.jpg"} className='IMG' alt="magasin.png"/></i>
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
                                <Link className="nav-link active"
                                    aria-current="page"
                                    to={'/'}>Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link"
                                    to="/about">About</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link"
                                    to="/products">Products</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link"
                                    to="/services">Services</Link>
                            </li>
                            <li className="nav-item dropdown">
                                <Link className="nav-link dropdown-toggle"
                                    to="#"
                                    role="button"
                                    data-bs-toggle="dropdown"
                                    aria-expanded="false">
                                    Categories
                                </Link>
                                <ul className="dropdown-menu">
                                    <li><Link className="dropdown-item" to="/category/electronics">Electronics</Link></li>
                                    <li><Link className="dropdown-item" to="/category/clothing">Clothing</Link></li>
                                    <li><hr className="dropdown-divider" /></li>
                                    <li><Link className="dropdown-item" to="/category/all">All Categories</Link></li>
                                </ul>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link"
                                    to="/contact">Contact</Link>
                            </li>
                        </ul>
                        <form className="d-flex ms-3" role="search">
                            <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                            <button className="btn btn-outline-success" type="submit">Search</button>
                        </form>
                    </div>
                </div>
            </nav>
        </>
    );
}

export default Navbar;