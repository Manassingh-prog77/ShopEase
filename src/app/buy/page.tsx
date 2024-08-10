"use client";
import { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";


export default function Buy() {
  const [cartItems, setCartItems] = useState([]);
  const router = useRouter();
  const AuthToken = Cookies.get('authToken');
  if(!AuthToken){
    router.push("/Login");
  }

  const fetchData = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/orders/cartData", {
        method: 'GET',
        headers: {
          'auth-token': AuthToken
        }
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setCartItems(data);
    } catch (error) {
      console.error('Fetch error:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const calculateGST = (amount) => {
    return (amount * 0.18).toFixed(2); // Assuming 18% GST
  };

  const calculateTotalWithGST = () => {
    return calculateTotal() + parseFloat(calculateGST(calculateTotal()));
  };

  const handleBilling = () =>{
    router.push(`/buy/billing`);
  }

  const total = calculateTotal();
  const gst = calculateGST(total);
  const grandTotal = calculateTotalWithGST();

  return (
    <div className="container mt-5 mb-5">
      <div className="card">
        <div className="card-header">
          <h5 className="card-title">Confirm Your Purchase</h5>
        </div>
        <div className="card-body">
          <h4 className="mb-4">Review Your Order</h4>
          <div className="list-group mb-4">
            {cartItems.map(item => (
              <div key={item.asin} className="list-group-item d-flex align-items-center">
                <img src={item.image} alt={item.name} className="img-thumbnail me-3" style={{ width: '100px', height: '100px', objectFit: 'cover' }} />
                <div className="w-100">
                  <h6 className="mb-1">{item.name}</h6>
                  <p className="mb-1">Price: ${item.price.toFixed(2)}</p>
                  <p className="mb-1">Quantity: {item.quantity}</p>
                  <p className="mb-1">
                    <strong>Total: ${(item.price * item.quantity).toFixed(2)}</strong>
                  </p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4">
            <h5>Summary</h5>
            <div className="d-flex justify-content-between">
              <span>Total Amount:</span>
              <span>${total.toFixed(2)}</span>
            </div>
            <div className="d-flex justify-content-between">
              <span>GST (18%):</span>
              <span>${gst}</span>
            </div>
            <div className="d-flex justify-content-between">
              <strong>Grand Total:</strong>
              <strong>${grandTotal.toFixed(2)}</strong>
            </div>
          </div>
        </div>
        <div className="card-footer d-flex justify-content-end">
          <button type="button" className="btn btn-secondary me-2">Cancel</button>
          <button type="button" className="btn btn-primary" onClick={handleBilling}>Confirm Purchase</button>
        </div>
      </div>
    </div>
  );
}
