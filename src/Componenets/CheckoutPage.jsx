import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';

function CheckoutPage() {
    const [cartItems] = useState(() => {
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

    const generateInvoicePDF = () => {
        const doc = new jsPDF();
        const totalPrice = calculateTotalPrice();
        const date = new Date().toLocaleDateString();
        const orderNumber = Math.floor(100000 + Math.random() * 900000);

        doc.setFontSize(22);
        doc.text("Facture de commande", 105, 20, { align: 'center' });
        
        doc.setFontSize(12);
        doc.text(`Numéro de commande: #${orderNumber}`, 20, 40);
        doc.text(`Date: ${date}`, 20, 50);
        
        doc.setFontSize(14);
        doc.text("Informations du client", 20, 70);
        doc.setFontSize(12);
        doc.text(`Nom: ${shippingInfo.fullName}`, 20, 80);
        doc.text(`Email: ${shippingInfo.email}`, 20, 90);
        doc.text(`Adresse de livraison: ${shippingInfo.address}`, 20, 100);
        
        const tableColumn = ["Produit", "Prix"];
        const tableRows = [];
        
        cartItems.forEach(item => {
            const productData = [
                item.titel,
                `$${item.price.toFixed(2)}`
            ];
            tableRows.push(productData);
        });
        
        doc.setFontSize(14);
        doc.text("Détails des produits", 20, 120);
        
        autoTable(doc, {
            startY: 130,
            head: [tableColumn],
            body: tableRows,
        });
        
        let finalY = doc.lastAutoTable?.finalY + 10 || 130 + (tableRows.length * 10) + 20;
        
        doc.setFontSize(14);
        doc.text(`Total: $${totalPrice}`, 150, finalY, { align: 'right' });
        
        doc.setFontSize(14);
        doc.text("Informations de paiement", 20, finalY + 20);
        doc.setFontSize(12);
        
        const maskedCardNumber = paymentInfo.cardNumber.length >= 4 
            ? `**** **** **** ${paymentInfo.cardNumber.slice(-4)}`
            : "****";
        doc.text(`Carte: ${maskedCardNumber}`, 20, finalY + 30);
        
        doc.setFontSize(12);
        doc.text("Merci pour votre commande!", 105, finalY + 50, { align: 'center' });
        
        doc.save(`facture_${orderNumber}.pdf`);
    };

    const handleSubmitOrder = (e) => {
        e.preventDefault();
        
        if (!shippingInfo.fullName || !shippingInfo.email || !shippingInfo.address || 
            !paymentInfo.cardNumber || !paymentInfo.expiryDate || !paymentInfo.cvv) {
            alert('Veuillez remplir tous les champs obligatoires.');
            return;
        }
        
        try {
            generateInvoicePDF();
            alert('Commande confirmée! Votre facture a été téléchargée.');
            
            // On ne vide PAS le panier
            // Redirection optionnelle :
            // window.location.href = '/order-confirmation'
            
        } catch (error) {
            console.error("Erreur PDF:", error);
            alert("Erreur lors de la génération de la facture.");
        }
    };

    if (cartItems.length === 0) {
        return (
            <div className="container mt-5">
                <h2>Votre panier est vide</h2>
                <Link to="/products" className="btn btn-primary">Voir les produits</Link>
            </div>
        );
    }

    return (
        <div className="container mt-5">
            <h2>Finalisation de commande</h2>
            <div className="mb-4">
                <h4>Récapitulatif du panier</h4>
                <ul className="list-group">
                    {cartItems.map(item => (
                        <li key={item.id} className="list-group-item">
                            <div className="d-flex align-items-center">
                                <Link to={`/products/${item.id}`}>
                                    <img
                                        src={item.image}
                                        alt={item.titel}
                                        style={{ width: '60px', height: '60px', marginRight: '15px', objectFit: 'cover' }}
                                    />
                                </Link>
                                <div>
                                    <Link to={`/products/${item.id}`} className="text-decoration-none text-dark">
                                        <h5 className="mb-1">{item.titel}</h5>
                                    </Link>
                                    <p className="mb-0">Prix unitaire: ${item.price}</p>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
                <div className="list-group-item d-flex justify-content-between bg-light">
                    <h5 className="mb-0">Total:</h5>
                    <h5 className="mb-0">${calculateTotalPrice()}</h5>
                </div>
            </div>

            <form onSubmit={handleSubmitOrder}>
                <div className="row">
                    <div className="col-md-6">
                        <h4>Informations de livraison</h4>
                        <div className="mb-3">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Nom complet"
                                name="fullName"
                                value={shippingInfo.fullName}
                                onChange={handleShippingChange}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <input
                                type="email"
                                className="form-control"
                                placeholder="Adresse email"
                                name="email"
                                value={shippingInfo.email}
                                onChange={handleShippingChange}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <textarea
                                className="form-control"
                                placeholder="Adresse de livraison"
                                rows="3"
                                name="address"
                                value={shippingInfo.address}
                                onChange={handleShippingChange}
                                required
                            ></textarea>
                        </div>
                    </div>

                    <div className="col-md-6">
                        <h4>Informations de paiement</h4>
                        <div className="mb-3">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Numéro de carte (4242 4242 4242 4242)"
                                name="cardNumber"
                                value={paymentInfo.cardNumber}
                                onChange={handlePaymentChange}
                                pattern="\d{16}"
                                required
                            />
                        </div>
                        <div className="row g-3">
                            <div className="col-6">
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="MM/AA"
                                    name="expiryDate"
                                    value={paymentInfo.expiryDate}
                                    onChange={handlePaymentChange}
                                    pattern="\d{2}/\d{2}"
                                    required
                                />
                            </div>
                            <div className="col-6">
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="CVV"
                                    name="cvv"
                                    value={paymentInfo.cvv}
                                    onChange={handlePaymentChange}
                                    pattern="\d{3}"
                                    required
                                />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="d-grid gap-2 mt-4">
                    <button type="submit" className="btn btn-lg btn-primary">
                        Payer ${calculateTotalPrice()}
                    </button>
                    <Link to="/cart" className="btn btn-secondary">
                        Modifier le panier
                    </Link>
                </div>
            </form>
        </div>
    );
}

export default CheckoutPage;