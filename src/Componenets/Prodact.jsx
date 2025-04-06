import React from 'react'
import { Link } from 'react-router-dom';

function Prodact(props) {
    const { propst, showbutton } = props;
    return (
        <div className="card h-100">
            <img src={propst.image} className="card-img-top" alt={propst.titel} />
            <div className="card-body">
                <h5 className="card-title">{propst.titel}</h5>
                <p className="card-text">{propst.description}</p>
                <p>Price: {propst.price}$</p>
                {showbutton && <Link className="btn btn-primary" to={`/product/${propst.id}`}>Details</Link>}
            </div>
        </div>
    );
}

export default Prodact;
