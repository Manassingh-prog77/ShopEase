"use client";
import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const router = useRouter();
  const AuthToken = Cookies.get('authToken')
  if(!AuthToken){
    router.push('/Login');
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

  const removeItem = async (id, asin) => {
    try {
      const response = await fetch("http://localhost:5000/api/cart/removefromcart", {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'auth-token': AuthToken
        },
        body: JSON.stringify({ asin })
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      setCartItems(cartItems.filter(item => item.id !== id));
    } catch (error) {
      console.error('Remove item error:', error);
    }
  };

  const updateCartItemQuantity = async (asin, quantity) => {
    try {
      const response = await fetch("http://localhost:5000/api/cart/updateCart", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'auth-token': AuthToken
        },
        body: JSON.stringify({ "asin":asin,
          "quantity":  quantity })
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
    } catch (error) {
      console.error('Update quantity error:', error);
    }
  };

  const increaseQuantity = async (id, asin) => {
    setCartItems(cartItems.map(item => 
      item.id === id ? { ...item, quantity: item.quantity + 1 } : item
    ));
    const updatedItem = cartItems.find(item => item.id === id);
    await updateCartItemQuantity(asin, updatedItem.quantity + 1);
  };

  const decreaseQuantity = async (id, asin) => {
    setCartItems(cartItems.map(item => 
      item.id === id ? { ...item, quantity: Math.max(item.quantity - 1, 1) } : item
    ));
    const updatedItem = cartItems.find(item => item.id === id);
    await updateCartItemQuantity(asin, Math.max(updatedItem.quantity - 1, 1));
  };

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const calculateGST = (amount) => {
    return (amount * 0.18).toFixed(2); // Assuming 18% GST
  };

  const calculateTotalWithGST = () => {
    return calculateTotal() + parseFloat(calculateGST(calculateTotal()));
  };

  const handleBill = () =>{
    router.push("/buy");
  }

  const total = calculateTotal();
  const gst = calculateGST(total);
  const grandTotal = calculateTotalWithGST();

  return (
    <>
      <div className="container my-5">
        <h1 className="display-4 text-center mb-5 fw-bold text-primary">Your Cart</h1>

        {cartItems.length === 0 ? (
          <div className="text-center">
            <p className="lead">Your cart is currently empty.</p>
          </div>
        ) : (
          <>
            <div className="row">
              {cartItems.map(item => (
                <div key={item.id} className="col-md-6 col-lg-4 mb-4">
                  <div className="card border-0 shadow rounded">
                    <img src={item.image} alt={item.name} className="card-img-top" style={{ height: '200px', objectFit: 'cover' }} />
                    <div className="card-body">
                      <h5 className="card-title">{item.name}</h5>
                      <p className="card-text">Price: ${item.price.toFixed(2)}</p>
                      <div className="d-flex align-items-center mb-3">
                        <button 
                          className="btn btn-outline-secondary btn-sm me-2" 
                          onClick={() => decreaseQuantity(item.id, item.asin)}
                        >
                          <i className="fa-solid fa-minus"></i>
                        </button>
                        <span className="h5 mb-0">{item.quantity}</span>
                        <button 
                          className="btn btn-outline-secondary btn-sm ms-2" 
                          onClick={() => increaseQuantity(item.id, item.asin)}
                        >
                          <i className="fa-solid fa-plus"></i>
                        </button>
                      </div>
                      <p className="card-text">
                        <strong>Total: ${(item.price * item.quantity).toFixed(2)}</strong>
                      </p>
                      <div className="d-flex justify-content-between align-items-center">
                        <button className="btn btn-danger btn-sm me-2" onClick={() => removeItem(item.id, item.asin)}>
                          <i className="bi bi-trash"></i> Remove
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="d-flex justify-content-between align-items-center mt-4">
              <h3 className="h2 mb-0">Total: ${total.toFixed(2)}</h3>
              <button type="button" className="btn btn-primary" onClick={handleBill}>
                Proceed to Checkout
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default CartPage;
