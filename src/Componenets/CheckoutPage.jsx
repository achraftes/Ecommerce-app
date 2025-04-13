import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';

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

    // Fonction pour générer et télécharger le PDF de facture
    const generateInvoicePDF = () => {
        const doc = new jsPDF();
        const totalPrice = calculateTotalPrice();
        const date = new Date().toLocaleDateString();
        const orderNumber = Math.floor(100000 + Math.random() * 900000); // Génère un numéro de commande aléatoire

        // En-tête de la facture
        doc.setFontSize(22);
        doc.text("Facture de commande", 105, 20, { align: 'center' });
        
        doc.setFontSize(12);
        doc.text(`Numéro de commande: #${orderNumber}`, 20, 40);
        doc.text(`Date: ${date}`, 20, 50);
        
        // Informations du client
        doc.setFontSize(14);
        doc.text("Informations du client", 20, 70);
        doc.setFontSize(12);
        doc.text(`Nom: ${shippingInfo.fullName}`, 20, 80);
        doc.text(`Email: ${shippingInfo.email}`, 20, 90);
        doc.text(`Adresse de livraison: ${shippingInfo.address}`, 20, 100);
        
        // Détails des produits
        const tableColumn = ["Produit", "Prix"];
        const tableRows = [];
        
        cartItems.forEach(item => {
            const productData = [
                item.titel,
                `$${item.price.toFixed(2)}`
            ];
            tableRows.push(productData);
        });
        
        // Ajout du tableau des produits avec autoTable importé séparément
        doc.setFontSize(14);
        doc.text("Détails des produits", 20, 120);
        
        // Utiliser autoTable comme fonction importée
        autoTable(doc, {
            startY: 130,
            head: [tableColumn],
            body: tableRows,
        });
        
        // Total - en accédant aux propriétés après création du tableau
        let finalY = 130;
        if (doc.lastAutoTable) {
            finalY = doc.lastAutoTable.finalY + 10;
        } else {
            finalY = 130 + (tableRows.length * 10) + 20;
        }
        
        doc.setFontSize(14);
        doc.text(`Total: $${totalPrice}`, 150, finalY, { align: 'right' });
        
        // Informations de paiement
        doc.setFontSize(14);
        doc.text("Informations de paiement", 20, finalY + 20);
        doc.setFontSize(12);
        
        // Protection des infos de carte - ne montrer que les 4 derniers chiffres si disponibles
        let maskedCardNumber = "****";
        if (paymentInfo.cardNumber.length >= 4) {
            maskedCardNumber = `**** **** **** ${paymentInfo.cardNumber.slice(-4)}`;
        }
        doc.text(`Carte: ${maskedCardNumber}`, 20, finalY + 30);
        
        // Message de remerciement
        doc.setFontSize(12);
        doc.text("Merci pour votre commande!", 105, finalY + 50, { align: 'center' });
        
        // Télécharger le PDF
        doc.save(`facture_${orderNumber}.pdf`);
    };

    const handleSubmitOrder = (e) => {
        e.preventDefault();
        
        // Vérification que les champs sont bien remplis
        if (!shippingInfo.fullName || !shippingInfo.email || !shippingInfo.address || 
            !paymentInfo.cardNumber || !paymentInfo.expiryDate || !paymentInfo.cvv) {
            alert('Veuillez remplir tous les champs obligatoires.');
            return;
        }
        
        console.log('Order submitted:', { cartItems, shippingInfo, paymentInfo });
        
        try {
            // Générer et télécharger le PDF
            generateInvoicePDF();
            
            // Afficher un message de confirmation
            alert('Commande confirmée! Votre facture va être téléchargée automatiquement.');
            
            // Effacer le panier
            localStorage.removeItem('cart');
            setCartItems([]);
            
            // Optionnellement, redirigez l'utilisateur vers une page de confirmation de commande
        } catch (error) {
            console.error("Erreur lors de la génération du PDF:", error);
            alert("Une erreur s'est produite lors de la génération de votre facture. Veuillez réessayer.");
        }
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
                        placeholder="XXXX XXXX XXXX XXXX"
                        maxLength="19"
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
                                maxLength="5"
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
                                placeholder="XXX"
                                maxLength="4"
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