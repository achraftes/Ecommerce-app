import { Link } from 'react-router-dom';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';

function Prodact(props) {
    const { propst, showbutton } = props;
    const [isAdded, setIsAdded] = useState(false);

    const handleAddToCart = () => {
        // Ici, vous implémenterez la logique pour ajouter le produit au panier.
        // Cela pourrait impliquer la mise à jour d'un état global (via Context API ou Redux)
        // ou l'appel d'une fonction passée en props pour gérer le panier.
        console.log(`Produit "${propst.titel}" ajouté au panier.`);
        setIsAdded(true); // Indiquer que le produit a été ajouté
        // Vous pouvez également rediriger l'utilisateur vers la page du panier ici si vous le souhaitez.
    };

    return (
        <div className="card h-100">
            <img src={propst.image} className="card-img-top" alt={propst.titel} />
            <div className="card-body">
                <h5 className="card-title">{propst.titel}</h5>
                <p className="card-text">{propst.description}</p>
                <p>Price: {propst.price}$</p>
                <div className="d-flex justify-content-between align-items-center">
                    {showbutton && <Link className="btn btn-primary" to={`/product/${propst.id}`}>Details</Link>}
                    {!isAdded ? (
                        <button className="btn btn-success" onClick={handleAddToCart}>
                            Ajouter
                        </button>
                    ) : (
                        <button className="btn btn-secondary" disabled>
                            Ajouté
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Prodact;