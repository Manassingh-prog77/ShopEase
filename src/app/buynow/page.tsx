"use client";
import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useRouter } from 'next/navigation';
import { useSearchParams } from 'next/navigation';
import Cookies from 'js-cookie';

interface BuyData {
  asin: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

export default function BuyNow() {
  const [ProductData, SetProductData] = useState<BuyData>({
    asin: '',
    name: '',
    price: 0,
    quantity: 1,
    image: ''
  });
  const router = useRouter();
  const AuthToken = Cookies.get('authToken');
  if(!AuthToken){
    router.push('/Login');
  }
  const searchParams = useSearchParams();

  useEffect(() => {
    const buyData: BuyData = {
      asin: searchParams.get('asin') || '',
      name: searchParams.get('name') || '',
      price: parseFloat(searchParams.get('price') || '0'),
      quantity: parseInt(searchParams.get('quantity') || '1', 10),
      image: searchParams.get('image') || ''
    };

    SetProductData(buyData);
  }, [searchParams]);
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zip: '',
    paymentMethod: 'Card',
  });
  const [showAlert, setShowAlert] = useState(false);
  const authToken = AuthToken

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Send form data to the first API
      const response = await fetch('http://localhost:5000/api/delivery/addDetails', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'auth-token': authToken
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        throw new Error('Failed to send delivery details');
      }

      // If successful, call the second API to remove item from the cart
      console.log(ProductData);
      const removeResponse = await fetch('http://localhost:5000/api/buy/buynow', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'auth-token': authToken
        },body : JSON.stringify(ProductData)
      });

      if (!removeResponse.ok) {
        throw new Error('Failed to remove item from cart');
      }

    } catch (error) {
      console.error('Error:', error);
      // Handle error here (e.g., show an error message)
    }
    setShowAlert(true);
    setTimeout(() => {
      setShowAlert(false);
      router.push("/");
    }, 3000);
  };

  return (
    <div className="container mt-5 mb-5">
       {showAlert && (
        <div className="alert alert-success alert-dismissible fade show" role="alert">
          Your Order has been placed successfully !! Redirecting to Home Page....
          <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
      )}
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card shadow">
            <div className="card-body">
              <h2 className="card-title mb-4 text-center">Enter Your Details</h2>
              <form onSubmit={handleSubmit}>
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label htmlFor="name" className="form-label">Full Name</label>
                    <input
                      type="text"
                      className="form-control"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="col-md-6 mb-3">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input
                      type="email"
                      className="form-control"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label htmlFor="phone" className="form-label">Phone</label>
                    <input
                      type="tel"
                      className="form-control"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="col-md-6 mb-3">
                    <label htmlFor="address" className="form-label">Address</label>
                    <input
                      type="text"
                      className="form-control"
                      id="address"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-4 mb-3">
                    <label htmlFor="city" className="form-label">City</label>
                    <input
                      type="text"
                      className="form-control"
                      id="city"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="col-md-4 mb-3">
                    <label htmlFor="state" className="form-label">State</label>
                    <input
                      type="text"
                      className="form-control"
                      id="state"
                      name="state"
                      value={formData.state}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="col-md-4 mb-3">
                    <label htmlFor="zip" className="form-label">Zip Code</label>
                    <input
                      type="text"
                      className="form-control"
                      id="zip"
                      name="zip"
                      value={formData.zip}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
                <div className="mb-3">
                  <label htmlFor="paymentMethod" className="form-label">Payment Method</label>
                  <select
                    className="form-select"
                    id="paymentMethod"
                    name="paymentMethod"
                    value={formData.paymentMethod}
                    onChange={handleChange}
                    required
                  >
                    <option value="Card">Credit Card/Debit Card</option>
                    <option value="NetBanking">NetBanking</option>
                    <option value="Cash On Delivery">Cash On Delivery</option>
                  </select>
                </div>
                <button type="submit" className="btn btn-primary btn-lg w-100">
                  Complete Purchase
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
