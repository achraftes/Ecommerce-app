// Services.jsx
// import React from 'react';

function Services() {
  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-12">
          <h1 className="display-4">Our Services</h1>
          <p className="lead">We offer a wide range of professional services to meet your needs.</p>
          
          <div className="row mt-5">
            <div className="col-md-4 mb-4">
              <div className="card h-100 text-center p-4">
                <div className="card-body">
                  <div className="mb-4">
                    <i className="fas fa-truck fa-4x text-primary"></i>
                  </div>
                  <h4 className="card-title">Fast Delivery</h4>
                  <p className="card-text">We ensure that all products are delivered in the shortest possible time with the highest standards of care.</p>
                </div>
              </div>
            </div>
            
            <div className="col-md-4 mb-4">
              <div className="card h-100 text-center p-4">
                <div className="card-body">
                  <div className="mb-4">
                    <i className="fas fa-headset fa-4x text-primary"></i>
                  </div>
                  <h4 className="card-title">24/7 Support</h4>
                  <p className="card-text">Our customer support team is available round the clock to assist you with any questions or concerns.</p>
                </div>
              </div>
            </div>
            
            <div className="col-md-4 mb-4">
              <div className="card h-100 text-center p-4">
                <div className="card-body">
                  <div className="mb-4">
                    <i className="fas fa-exchange-alt fa-4x text-primary"></i>
                  </div>
                  <h4 className="card-title">Easy Returns</h4>
                  <p className="card-text">Not satisfied with your purchase? Return it within 30 days for a full refund, no questions asked.</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="row mt-4">
            <div className="col-md-4 mb-4">
              <div className="card h-100 text-center p-4">
                <div className="card-body">
                  <div className="mb-4">
                    <i className="fas fa-shield-alt fa-4x text-primary"></i>
                  </div>
                  <h4 className="card-title">Secure Payments</h4>
                  <p className="card-text">All transactions are secure and encrypted, ensuring your payment information is always protected.</p>
                </div>
              </div>
            </div>
            
            <div className="col-md-4 mb-4">
              <div className="card h-100 text-center p-4">
                <div className="card-body">
                  <div className="mb-4">
                    <i className="fas fa-tools fa-4x text-primary"></i>
                  </div>
                  <h4 className="card-title">Installation Services</h4>
                  <p className="card-text">We offer professional installation services for selected products to ensure they work perfectly.</p>
                </div>
              </div>
            </div>
            
            <div className="col-md-4 mb-4">
              <div className="card h-100 text-center p-4">
                <div className="card-body">
                  <div className="mb-4">
                    <i className="fas fa-gift fa-4x text-primary"></i>
                  </div>
                  <h4 className="card-title">Gift Wrapping</h4>
                  <p className="card-text">Make your gift special with our custom gift wrapping service available for all products.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Services;