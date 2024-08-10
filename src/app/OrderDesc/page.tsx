"use client";
import React, { useEffect, useState } from 'react';
import {useSearchParams, useRouter } from 'next/navigation';
import 'bootstrap/dist/css/bootstrap.min.css';
import Cookies from 'js-cookie';


const OrderDescription = () => {
  const [deliveryData, setDeliveryData] = useState(null);
  const [buyData, setBuyData] = useState(null);
  
  const searchParams = useSearchParams();
  const router = useRouter();
  
  // Extract orderId from query parameters
  const orderId  = searchParams.get('orderId');
  const authToken = Cookies.get('authToken');

  useEffect(() => {
    if (!orderId) return; // Do not fetch data if orderId is not available

    const fetchDeliveryData = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/delivery/deliveryDetails', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'auth-token': authToken
          },
          body: JSON.stringify({orderId})
        });
        const data = await response.json();
        if (response.ok) {
          setDeliveryData(data);
        } else {
          console.error(data.message);
        }
      } catch (error) {
        console.error('Error fetching delivery data:', error);
      }
    };

    const fetchBuyData = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/orders/orderDetails', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'auth-token': authToken
          },
          body: JSON.stringify({orderId})
        });
        const data = await response.json();
        if (response.ok) {
          setBuyData(data);
        } else {
          console.error(data.message);
        }
      } catch (error) {
        console.error('Error fetching buy data:', error);
      }
    };

    fetchDeliveryData();
    fetchBuyData();
  }, [orderId, authToken]);

  if (!deliveryData || !buyData) {
    return ( <div className="d-flex justify-content-center" style={{height:"80vh"}}>
      <div className="spinner-border text-info" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>);
  }

  const handleBackToHome = () => {
    router.back();
  };

  return (
    <div className="container mt-5 mb-5">
      <div className="row">
        <div className="col-md-8 mx-auto">
          <div className="card shadow">
            <div className="card-body">
              <h2 className="card-title mb-4 text-center">Order Description</h2>
              <div className="row">
                {/* Delivery Details */}
                <div className="col-md-6">
                  <h4 className="mb-3">Delivery Details</h4>
                  <ul className="list-group">
                    <li className="list-group-item"><strong>Name:</strong> {deliveryData.name}</li>
                    <li className="list-group-item"><strong>Email:</strong> {deliveryData.email}</li>
                    <li className="list-group-item"><strong>Phone:</strong> {deliveryData.phone}</li>
                    <li className="list-group-item"><strong>Address:</strong> {deliveryData.address}</li>
                    <li className="list-group-item"><strong>City:</strong> {deliveryData.city}</li>
                    <li className="list-group-item"><strong>State:</strong> {deliveryData.state}</li>
                    <li className="list-group-item"><strong>Zip Code:</strong> {deliveryData.zip}</li>
                    <li className="list-group-item"><strong>Payment Method:</strong> {deliveryData.paymentMethod}</li>
                    <li className="list-group-item"><strong>Order Date:</strong> {new Date(deliveryData.createdAt).toLocaleDateString()}</li>
                  </ul>
                </div>

                {/* Product Details */}
                <div className="col-md-6">
                  <h4 className="mb-3">Product Details</h4>
                  <div className="card">
                    <img src={buyData.image} className="card-img-top" alt={buyData.name} />
                    <div className="card-body">
                      <h5 className="card-title">{buyData.name}</h5>
                      <p className="card-text"><strong>Quantity:</strong> {buyData.quantity}</p>
                      <p className="card-text"><strong>Price per Item:</strong> ${buyData.price.toFixed(2)}</p>
                      <p className="card-text"><strong>Total Bill:</strong> ${buyData.totalBill.toFixed(2)}</p>
                      <p className="card-text"><strong>Order Status:</strong> {buyData.OrderStatus}</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="text-center mt-4">
                <button className="btn btn-primary" onClick={handleBackToHome}>Back to Home</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDescription;
