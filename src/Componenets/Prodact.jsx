import { Link } from 'react-router-dom';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faCheck } from '@fortawesome/free-solid-svg-icons';

function Prodact({ propst, showbutton }) {
  const [isAdded, setIsAdded] = useState(false);

  const handleAddToCart = () => {
    const existingCart = localStorage.getItem('cart');
    const cart = existingCart ? JSON.parse(existingCart) : [];

    cart.push(propst);
    localStorage.setItem('cart', JSON.stringify(cart));

    setIsAdded(true);
    console.log(`Produit "${propst.title}" ajouté au panier.`);
  };

  return (
    <div className="card shadow-sm h-100 rounded-4 border-0">
      <img
        src={propst.image}
        className="card-img-top rounded-top-4"
        alt={propst.title}
        style={{ height: '200px', objectFit: 'cover' }}
      />
      <div className="card-body d-flex flex-column">
        <h5 className="card-title text-primary">{propst.title}</h5>
        <p className="card-text text-muted" style={{ flexGrow: 1 }}>
          {propst.description.length > 100
            ? `${propst.description.slice(0, 100)}...`
            : propst.description}
        </p>
        <h6 className="text-success fw-bold mb-3">Price: ${propst.price}</h6>

        <div className="d-flex justify-content-between align-items-center mt-auto">
          {showbutton && (
            <Link
              className="btn btn-outline-primary btn-sm rounded-pill"
              to={`/product/${propst.id}`}
            >
              Details
            </Link>
          )}
          {!isAdded ? (
            <button
              className="btn btn-success btn-sm rounded-pill"
              onClick={handleAddToCart}
            >
              <FontAwesomeIcon icon={faPlus} /> Add
            </button>
          ) : (
            <button className="btn btn-outline-secondary btn-sm rounded-pill" disabled>
              <FontAwesomeIcon icon={faCheck} /> Added
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default Prodact;
