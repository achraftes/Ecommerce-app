import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';

function CheckoutPage() {
    const [cartItems, setCartItems] = useState(() => {
        const storedCart = localStorage.getItem('cart');
        return storedCart ? JSON.parse(storedCart) : [];
    });
    const [orderNumber, setOrderNumber] = useState('');
    const [orderCompleted, setOrderCompleted] = useState(false);

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

    const calculateTotalPrice = () => {
        return cartItems.reduce((total, item) => total + item.price, 0).toFixed(2);
    };

    const handleShippingChange = (e) => {
        setShippingInfo({ ...shippingInfo, [e.target.name]: e.target.value });
    };

    const handlePaymentChange = (e) => {
        setPaymentInfo({ ...paymentInfo, [e.target.name]: e.target.value });
    };

    const generateInvoicePDF = (orderNumber) => {
        const doc = new jsPDF();
        const totalPrice = calculateTotalPrice();
        const date = new Date().toLocaleDateString();

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
        const tableRows = cartItems.map(item => [item.titel, `$${item.price.toFixed(2)}`]);

        doc.setFontSize(14);
        doc.text("Détails des produits", 20, 120);

        autoTable(doc, {
            startY: 130,
            head: [tableColumn],
            body: tableRows,
        });

        let finalY = doc.lastAutoTable?.finalY + 10;
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

        // Validation des champs
        if (!shippingInfo.fullName || !shippingInfo.email || !shippingInfo.address || 
            !paymentInfo.cardNumber || !paymentInfo.expiryDate || !paymentInfo.cvv) {
            
            const errorAlert = document.createElement('div');
            errorAlert.className = 'alert alert-danger alert-dismissible fade show position-fixed top-0 start-50 translate-middle-x mt-3';
            errorAlert.style.zIndex = '1050';
            errorAlert.innerHTML = `
                <strong><i class="bi bi-exclamation-triangle-fill me-2"></i>Attention!</strong> Veuillez remplir tous les champs obligatoires.
                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            `;
            document.body.appendChild(errorAlert);
            
            setTimeout(() => errorAlert.remove(), 5000);
            return;
        }

        try {
            const newOrderNumber = Math.floor(100000 + Math.random() * 900000);
            setOrderNumber(newOrderNumber);
            generateInvoicePDF(newOrderNumber);

            // Vidage du panier
            localStorage.removeItem('cart');
            setCartItems([]);
            setOrderCompleted(true);

        } catch (error) {
            console.error("Erreur PDF:", error);
            const errorAlert = document.createElement('div');
            errorAlert.className = 'alert alert-danger alert-dismissible fade show position-fixed top-0 start-50 translate-middle-x mt-3';
            errorAlert.innerHTML = `
                <strong><i class="bi bi-x-circle-fill me-2"></i>Erreur!</strong> Impossible de générer la facture.
                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            `;
            document.body.appendChild(errorAlert);
            setTimeout(() => errorAlert.remove(), 5000);
        }
    };

    if (cartItems.length === 0) {
        return (
            <div className="container mt-5">
                {orderCompleted && (
                    <div className="alert alert-success mb-4 shadow-sm" role="alert">
                        <div className="d-flex align-items-center">
                            <div className="me-3 text-success bg-success bg-opacity-10 p-2 rounded-circle">
                                <i className="bi bi-check-circle-fill fs-3"></i>
                            </div>
                            <div>
                                <h4 className="alert-heading mb-1">Commande confirmée!</h4>
                                <p className="mb-0">
                                    Merci pour votre achat. Votre commande #{orderNumber} a été traitée avec succès.
                                </p>
                                <hr />
                                <p className="mb-0 small">
                                    Un email de confirmation a été envoyé à {shippingInfo.email}
                                </p>
                            </div>
                        </div>
                    </div>
                )}
                
                <h2>Votre panier est vide</h2>
                <Link to="/products" className="btn btn-primary">Voir les produits</Link>
            </div>
        );
    }

    return (
        <div className="container py-5">
            <h2 className="text-center mb-5">🛒 Finalisation de commande</h2>

            <div className="card mb-4 shadow-sm">
                <div className="card-body">
                    <h4 className="card-title mb-4">🧾 Récapitulatif du panier</h4>
                    <ul className="list-group">
                        {cartItems.map(item => (
                            <li key={item.id} className="list-group-item d-flex align-items-center">
                                <img
                                    src={item.image}
                                    alt={item.titel}
                                    className="me-3 rounded"
                                    style={{ width: '60px', height: '60px', objectFit: 'cover' }}
                                />
                                <div>
                                    <h6 className="mb-1">{item.titel}</h6>
                                    <p className="mb-0 text-muted">Prix unitaire: ${item.price.toFixed(2)}</p>
                                </div>
                            </li>
                        ))}
                    </ul>
                    <div className="alert alert-success text-end mt-3 fw-bold">
                        Total: ${calculateTotalPrice()}
                    </div>
                </div>
            </div>

            <form onSubmit={handleSubmitOrder}>
                <div className="row">
                    <div className="col-md-6">
                        <div className="card mb-4 shadow-sm">
                            <div className="card-body">
                                <h4 className="card-title mb-4">📦 Informations de livraison</h4>
                                <div className="mb-3">
                                    <label className="form-label">Nom complet</label>
                                    <input type="text" className="form-control" name="fullName" required 
                                        value={shippingInfo.fullName} onChange={handleShippingChange} />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Email</label>
                                    <input type="email" className="form-control" name="email" required 
                                        value={shippingInfo.email} onChange={handleShippingChange} />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Adresse</label>
                                    <textarea className="form-control" rows="3" name="address" required 
                                        value={shippingInfo.address} onChange={handleShippingChange}></textarea>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-6">
                        <div className="card mb-4 shadow-sm">
                            <div className="card-body">
                                <h4 className="card-title mb-4">💳 Paiement</h4>
                                <div className="mb-3">
                                    <label className="form-label">Numéro de carte</label>
                                    <input type="text" className="form-control" name="cardNumber" 
                                        placeholder="4242 4242 4242 4242" pattern="\d{16}" required 
                                        value={paymentInfo.cardNumber} onChange={handlePaymentChange} />
                                </div>
                                <div className="row">
                                    <div className="col-6 mb-3">
                                        <label className="form-label">Expiration</label>
                                        <input type="text" className="form-control" name="expiryDate" 
                                            placeholder="MM/AA" pattern="\d{2}/\d{2}" required 
                                            value={paymentInfo.expiryDate} onChange={handlePaymentChange} />
                                    </div>
                                    <div className="col-6 mb-3">
                                        <label className="form-label">CVV</label>
                                        <input type="text" className="form-control" name="cvv" 
                                            placeholder="CVV" pattern="\d{3}" required 
                                            value={paymentInfo.cvv} onChange={handlePaymentChange} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="d-grid gap-2">
                    <button type="submit" className="btn btn-lg btn-primary">
                        💰 Payer ${calculateTotalPrice()}
                    </button>
                    <Link to="/cart" className="btn btn-secondary">
                        🛍️ Modifier le panier
                    </Link>
                </div>
            </form>
        </div>
    );
}

export default CheckoutPage;