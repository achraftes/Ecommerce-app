import { Link } from 'react-router-dom';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

function Prodact(props) {
  const { propst, showbutton } = props;
  const [isAdded, setIsAdded] = useState(false);

  const handleAddToCart = () => {
    const existingCart = localStorage.getItem('cart');
    const cart = existingCart ? JSON.parse(existingCart) : [];

    // Add the current product to the cart
    cart.push(propst);

    // Save the updated cart back to localStorage
    localStorage.setItem('cart', JSON.stringify(cart));

    setIsAdded(true); // Indicate that the product has been added
    console.log(`Produit "${propst.titel}" ajouté au panier.`);
    // You might want to provide visual feedback to the user here.
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
              <FontAwesomeIcon icon={faPlus} /> {/* Only the plus icon */}
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
