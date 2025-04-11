import React, { useState, useEffect } from 'react';

function CartPage() {
    // Ici, vous aurez besoin d'un moyen de récupérer les produits ajoutés au panier.
    // Cela dépendra de votre système de gestion d'état (Context API, Redux, etc.).
    // Pour cet exemple, nous allons simuler un état local du panier.

    // **Important:** Remplacez cet état simulé par votre logique réelle de récupération du panier.
    const [cartItems, setCartItems] = useState(() => {
        // Essayez de récupérer le panier depuis le localStorage au chargement
        const storedCart = localStorage.getItem('cart');
        return storedCart ? JSON.parse(storedCart) : [];
    });

    useEffect(() => {
        // Sauvegardez le panier dans le localStorage à chaque mise à jour
        localStorage.setItem('cart', JSON.stringify(cartItems));
    }, [cartItems]);

    const handleRemoveFromCart = (productId) => {
        const updatedCart = cartItems.filter(item => item.id !== productId);
        setCartItems(updatedCart);
    };

    const calculateTotalPrice = () => {
        return cartItems.reduce((total, item) => total + item.price, 0).toFixed(2);
    };

    if (cartItems.length === 0) {
        return (
            <div className="container mt-5">
                <h2>Votre panier est vide</h2>
                <p>N'hésitez pas à parcourir nos produits et à ajouter des articles.</p>
                {/* Vous pouvez ajouter un lien pour retourner à la page des produits */}
                <Link to="/products" className="btn btn-primary">Voir les produits</Link>
            </div>
        );
    }

    return (
        <div className="container mt-5">
            <h2>Votre panier</h2>
            <ul className="list-group mb-3">
                {cartItems.map(item => (
                    <li key={item.id} className="list-group-item d-flex justify-content-between align-items-center">
                        <div>
                            <strong>{item.titel}</strong>
                            <p className="mb-0">Prix: {item.price}$</p>
                            {/* Vous pouvez afficher d'autres informations du produit ici */}
                        </div>
                        <button className="btn btn-danger btn-sm" onClick={() => handleRemoveFromCart(item.id)}>
                            Supprimer
                        </button>
                    </li>
                ))}
            </ul>
            <div className="d-flex justify-content-between">
                <h4>Total: ${calculateTotalPrice()}</h4>
                <button className="btn btn-success">Passer à la caisse</button>
            </div>
        </div>
    );
}

export default CartPage;