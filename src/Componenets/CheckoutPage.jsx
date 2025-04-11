import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function CheckoutPage() {
    const [cartItems, setCartItems] = useState(() => {
        const storedCart = localStorage.getItem('cart');
        return storedCart ? JSON.parse(storedCart) : [];
    });

    const calculateTotalPrice = () => {
        return cartItems.reduce((total, item) => total + item.price, 0).toFixed(2);
    };

    const [shippingInfo, setShippingInfo] = useState({
        fullName: '',
        email: '',
        address: '',
    });

    const [paymentInfo, setPaymentInfo] = useState({
        cardNumber: '',
        expiryDate: '',
        cvv: '',
    });

    const handleShippingChange = (e) => {
        setShippingInfo({ ...shippingInfo, [e.target.name]: e.target.value });
    };

    const handlePaymentChange = (e) => {
        setPaymentInfo({ ...paymentInfo, [e.target.name]: e.target.value });
    };

    const handleSubmitOrder = (e) => {
        e.preventDefault();
        console.log('Order submitted:', { cartItems, shippingInfo, paymentInfo });
        // In a real application, you would send this data to your backend for processing.
        alert('Order submitted successfully!');
        localStorage.removeItem('cart'); // Clear the cart after submission
        setCartItems([]);
        // Optionally, redirect the user to an order confirmation page.
    };

    if (cartItems.length === 0) {
        return (
            <div className="container mt-5">
                <h2>Votre panier est vide</h2>
                <p>Veuillez ajouter des articles à votre panier avant de passer à la caisse.</p>
                <Link to="/products" className="btn btn-primary">Voir les produits</Link>
            </div>
        );
    }

    return (
        <div className="container mt-5">
            <h2>Checkout</h2>
            <p>Veuillez vérifier les articles dans votre panier:</p>
            <ul className="list-group mb-3">
                {cartItems.map(item => (
                    <li key={item.id} className="list-group-item d-flex justify-content-between align-items-center">
                        <div className="d-flex align-items-center">
                            {item.image && (
                                <img
                                    src={item.image}
                                    alt={item.titel}
                                    style={{ width: '50px', height: '50px', marginRight: '10px', objectFit: 'cover' }}
                                />
                            )}
                            <div>
                                <strong>{item.titel}</strong>
                                <p className="mb-0">Prix: ${item.price}</p>
                            </div>
                        </div>
                    </li>
                ))}
                <li className="list-group-item d-flex justify-content-between">
                    <strong>Total:</strong>
                    <span>${calculateTotalPrice()}</span>
                </li>
            </ul>

            <h3>Informations de livraison</h3>
            <form onSubmit={handleSubmitOrder}>
                <div className="mb-3">
                    <label className="form-label">Nom complet</label>
                    <input
                        type="text"
                        className="form-control"
                        name="fullName"
                        value={shippingInfo.fullName}
                        onChange={handleShippingChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Adresse e-mail</label>
                    <input
                        type="email"
                        className="form-control"
                        name="email"
                        value={shippingInfo.email}
                        onChange={handleShippingChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Adresse de livraison</label>
                    <textarea
                        className="form-control"
                        rows="3"
                        name="address"
                        value={shippingInfo.address}
                        onChange={handleShippingChange}
                        required
                    ></textarea>
                </div>

                <h3 className="mt-4">Informations de paiement</h3>
                <div className="mb-3">
                    <label className="form-label">Numéro de carte</label>
                    <input
                        type="text"
                        className="form-control"
                        name="cardNumber"
                        value={paymentInfo.cardNumber}
                        onChange={handlePaymentChange}
                        required
                    />
                </div>
                <div className="row">
                    <div className="col-md-6">
                        <div className="mb-3">
                            <label className="form-label">Date d'expiration</label>
                            <input
                                type="text"
                                className="form-control"
                                name="expiryDate"
                                value={paymentInfo.expiryDate}
                                onChange={handlePaymentChange}
                                placeholder="MM/YY"
                                required
                            />
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="mb-3">
                            <label className="form-label">CVV</label>
                            <input
                                type="text"
                                className="form-control"
                                name="cvv"
                                value={paymentInfo.cvv}
                                onChange={handlePaymentChange}
                                required
                            />
                        </div>
                    </div>
                </div>

                <button type="submit" className="btn btn-success btn-lg">Confirmer la commande</button>
                <Link to="/cart" className="btn btn-secondary ms-2">Retour au panier</Link>
            </form>
        </div>
    );
}

export default CheckoutPage;