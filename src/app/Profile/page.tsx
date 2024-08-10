"use client";
import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';

const ProfileSection = () => {
  const [customer, setCustomer] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: ''
  });

  const AUTH_TOKEN = Cookies.get('authToken');
  if(! AUTH_TOKEN){
    router.push("/Login")
  }
  const fetchData = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/auth/getuser", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'auth-token': AUTH_TOKEN,
        },
      });
      const data = await response.json();
      setCustomer(data);
      setFormData({
        name: data.name || '',
        email: data.email || '',
        phone: data.phone || '',
        address: data.address || ''
      });
    } catch (error) {
      console.error('Failed to fetch user data', error);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/api/auth/updateUser", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'auth-token': AUTH_TOKEN,
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        const updatedData = await response.json();
        setCustomer(updatedData);
        setIsEditing(false);
      } else {
        console.error('Failed to update user information');
      }
    } catch (error) {
      console.error('Error updating user information', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="container my-5">
      <div className="row">
        <div className="col-md-4">
          <div className="card shadow-sm border-0">
            <div className="card-body text-center">
              <i className="fas fa-address-card fa-3x mb-3"></i>
              <h5 className="card-title">{customer.name}</h5>
              <p className="text-muted">{customer.membership}</p>
            </div>
          </div>
        </div>
        <div className="col-md-8">
          <div className="card shadow-sm border-0 mb-3">
            <div className="card-body">
              <h5 className="card-title display-4 text-center mb-4 fw-bold text-primary">Profile Information</h5>
              <div className="mb-3">
                <p className="card-text"><strong>Email:</strong> {customer.email}</p>
              </div>
              <div className="mb-3">
                <p className="card-text"><strong>Phone:</strong> {customer.phone}</p>
              </div>
              <div className="mb-3">
                <p className="card-text"><strong>Address:</strong> {customer.address}</p>
              </div>
              <div className="mb-3">
                <p className="card-text"><strong>Member Since:</strong> {customer.date ? formatDate(customer.date) : 'N/A'}</p>
              </div>
              <button onClick={() => setIsEditing(true)} className="btn btn-primary">Edit Profile</button>
            </div>
          </div>
          {isEditing && (
            <div className="card shadow-sm border-0">
              <div className="card-body">
                <h5 className="card-title">Edit Profile</h5>
                <form onSubmit={handleFormSubmit}>
                  <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input
                      type="text"
                      className="form-control"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input
                      type="email"
                      className="form-control"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="phone" className="form-label">Phone</label>
                    <input
                      type="text"
                      className="form-control"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="address" className="form-label">Address</label>
                    <input
                      type="text"
                      className="form-control"
                      id="address"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <button type="submit" className="btn btn-success">Save Changes</button>
                  <button onClick={() => setIsEditing(false)} className="btn btn-secondary ms-2">Cancel</button>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileSection;
