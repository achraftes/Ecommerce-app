import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function CartPage() {
    const [cartItems, setCartItems] = useState(() => {
        const storedCart = localStorage.getItem('cart');
        return storedCart ? JSON.parse(storedCart) : [];
    });

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cartItems));
    }, [cartItems]);

    const handleRemoveFromCart = (productId) => {
        const updatedCart = cartItems.filter(item => item.id !== productId);
        setCartItems(updatedCart);
    };

    const calculateTotalPrice = () => {
        return cartItems.reduce((total, item) => total + item.price, 0).toFixed(2);
    };

    const navigate = useNavigate();

    const handleCheckout = () => {
        navigate('/checkout');
    };

    if (cartItems.length === 0) {
        return (
            <div className="container mt-5 text-center">
                <h2 className="mb-3">🛒 Votre panier est vide</h2>
                <p>N'hésitez pas à parcourir nos produits et à ajouter des articles.</p>
                <Link to="/products" className="btn btn-primary mt-3">Voir les produits</Link>
            </div> 
        );
    }

    return (
        <div className="container mt-5">
            <h2 className="mb-4">🛍️ Votre panier</h2>
            <ul className="list-group mb-4">
                {cartItems.map(item => (
                    <li key={item.id} className="list-group-item d-flex justify-content-between align-items-center shadow-sm rounded mb-2 p-3">
                        <div className="d-flex align-items-center">
                            <Link to={`/products/${item.id}`}>
                                <img 
                                    src={item.image} 
                                    alt={item.title} 
                                    className="rounded"
                                    style={{ width: '70px', height: '70px', marginRight: '15px', objectFit: 'cover', border: '1px solid #ddd' }} 
                                />
                            </Link>
                            <div>
                                <Link to={`/products/${item.id}`} className="text-decoration-none text-dark">
                                    <h5 className="mb-1">{item.title}</h5>
                                </Link>
                                <p className="mb-0 fw-semibold text-success">Prix: {item.price}$</p>
                            </div>
                        </div>
                        <button className="btn btn-outline-danger btn-sm" onClick={() => handleRemoveFromCart(item.id)}>
                            ❌ Supprimer
                        </button>
                    </li>
                ))}
            </ul>
            <div className="d-flex justify-content-between align-items-center border-top pt-3">
                <h4 className="fw-bold">Total: ${calculateTotalPrice()}</h4>
                <button className="btn btn-success btn-lg" onClick={handleCheckout}>
                    ✅ Passer à la caisse
                </button>
            </div>
        </div>
    );
}

export default CartPage;
