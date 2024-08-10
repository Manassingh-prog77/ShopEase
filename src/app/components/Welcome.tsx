import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';

export default function HeroSection() {
  return (
    <section style={{ backgroundColor: '#f8f9fa', padding: '1rem 0', marginTop: '1rem', marginBottom: '1rem' }}>
      <div className="container">
        <div className="row align-items-center">
          <div className="col-md-6 text-center text-md-start mb-3 mb-md-0">
            <h1 style={{ fontSize: '3rem' }}>Welcome to ShopEase</h1>
            <p className="lead">Discover the best products at unbeatable prices</p>
            <a href="/discover" className="btn btn-primary">Shop Now</a>
          </div>
          <div className="col-md-6 text-center">
            <img 
              src="WelcomeHome.png" 
              alt="ShopEase Hero" 
              className="img-fluid rounded" 
              style={{ maxHeight: '50vh' }} 
            />
          </div>
        </div>
      </div>
    </section>
  );
}
