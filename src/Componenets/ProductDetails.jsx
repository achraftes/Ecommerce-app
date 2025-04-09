import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Prodact from './Prodact';

function ProductDetails() {
  const api_url = "https://fakestoreapi.com/products";
  const [product, setProduct] = useState(null);
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
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;
