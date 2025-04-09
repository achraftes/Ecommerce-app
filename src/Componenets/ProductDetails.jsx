import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Prodact from './Prodact';

function ProductDetails() {
  const api_url = "https://fakestoreapi.com/products";
  const [product, setProduct] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [showPaymentForm, setShowPaymentForm] = useState(false);
  const { productId } = useParams();

  useEffect(() => {
    fetch(`${api_url}/${productId}`)
      .then((res) => res.json())
      .then((data) => setProduct(data))
      .catch((error) => console.error("Error fetching product:", error));
  }, [productId]);

  if (!product) {
    return <p className="text-center">Loading product details...</p>;
  }

  return (
    <div className="container mt-5">
      {!showForm ? (
        <>
          <div className="product-details-intro text-center mb-4">
            <h2>Product Details</h2>
            <p>This product is designed with high-quality materials to ensure durability and satisfaction. Perfect for daily use, it meets industry standards and offers excellent value for money.</p>
          </div>
          <div className="row">
            <div className="col-md-4">
              <img src={product.image} className="img-fluid rounded" alt={product.title} style={{ maxHeight: '300px' }} />
            </div>
            <div className="col-md-8">
              <h4>{product.title}</h4>
              <p className="text-muted">Category: {product.category}</p>
              <p style={{ fontSize: '14px' }}>{product.description}</p>
              <h5 className="text-danger">Price: ${product.price}</h5>
              <p className="text-warning">Rating: {product.rating?.rate} ({product.rating?.count} reviews)</p>
              <p><strong>Brand:</strong> {product.brand || 'N/A'}</p>
              <p><strong>Stock Availability:</strong> {product.stock ? 'In Stock' : 'Out of Stock'}</p>
              <p><strong>Weight:</strong> {product.weight ? `${product.weight} kg` : 'N/A'}</p>
              <button className="btn btn-success mt-3" onClick={() => setShowForm(true)}>Buy Now</button>
            </div>
          </div>
        </>
      ) : !showPaymentForm ? (
        <div className="purchase-form">
          <h2 className="text-center">Purchase Product</h2>
          <p><strong>Product:</strong> {product.title}</p>
          <p><strong>Price:</strong> ${product.price}</p>
          <form>
            <div className="mb-3">
              <label className="form-label">Full Name</label>
              <input type="text" className="form-control" placeholder="Enter your full name" required />
            </div>
            <div className="mb-3">
              <label className="form-label">Email Address</label>
              <input type="email" className="form-control" placeholder="Enter your email" required />
            </div>
            <div className="mb-3">
              <label className="form-label">Shipping Address</label>
              <textarea className="form-control" rows="3" placeholder="Enter your address" required></textarea>
            </div>
            <div className="mb-3">
              <label className="form-label">Quantity</label>
              <input type="number" className="form-control" min="1" defaultValue="1" required />
            </div>
            <button type="button" className="btn btn-primary" onClick={() => setShowPaymentForm(true)}>Proceed to Payment</button>
            <button type="button" className="btn btn-secondary ms-2" onClick={() => setShowForm(false)}>Cancel</button>
          </form>
        </div>
      ) : (
        <div className="payment-form">
          <h2 className="text-center">Enter Payment Details</h2>
          <div className="card shadow-lg p-4 mb-4">
            <form>
              <div className="mb-3">
                <label className="form-label">Card Number</label>
                <input type="text" className="form-control form-control-lg" placeholder="Enter your card number" required />
              </div>
              <div className="row">
                <div className="col-md-6">
                  <div className="mb-3">
                    <label className="form-label">Expiration Date</label>
                    <input type="text" className="form-control" placeholder="MM/YY" required />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="mb-3">
                    <label className="form-label">CVV</label>
                    <input type="text" className="form-control" placeholder="Enter CVV" required />
                  </div>
                </div>
              </div>
              <button type="submit" className="btn btn-success btn-lg w-100">Confirm Payment</button>
              <button type="button" className="btn btn-secondary btn-lg w-100 mt-2" onClick={() => setShowPaymentForm(false)}>Cancel</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProductDetails;
