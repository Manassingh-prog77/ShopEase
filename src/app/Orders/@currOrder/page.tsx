"use client";
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import 'bootstrap/dist/css/bootstrap.min.css';
import Cookies from 'js-cookie';

const Orders = () => {
  const [orders, setOrders] = useState([]);

  const router = useRouter();
  const AuthToken = Cookies.get('authToken');
  if(!AuthToken){
    router.push("/Login")
  }

  const options = {
    method: 'GET',
    headers: {
      'auth-token': AuthToken,
    }
  };

  const fetchdata = async () => {
    const data = await fetch("http://localhost:5000/api/orders/currentOrders", options);
    const response = await data.json();
    console.log(response);
    setOrders(response);
  };

  useEffect(() => {
    fetchdata();
  }, []);

  const handleViewDetails = (orderId) => {
    // Navigate to OrderDesc page with the orderId as a query parameter
    router.push(`/OrderDesc?orderId=${encodeURIComponent(orderId)}`);
  };

  return (
    <div className="container my-4">
      <h2 className="mb-4 text-primary border-bottom border-primary pb-2">Current Orders</h2>
      {orders.length === 0 ? (
        <div className="alert alert-warning text-center" role="alert">
          <h6 className="alert-heading">No Orders to Display</h6>
          <p>There are currently no orders available. Please check back later.</p>
        </div>
      ) : (
        <div className="table-responsive">
          <table className="table table-striped table-bordered">
            <thead className="thead-light">
              <tr>
                <th>Product Name</th>
                <th>Quantity</th>
                <th>Photo</th>
                <th>Total Bill</th>
                <th>Order Status</th>
                <th>Actions</th> {/* Added Actions column */}
              </tr>
            </thead>
            <tbody>
              {orders.map((order, index) => (
                <tr key={index}>
                  <td>
                    <h6 className="mb-1">{order.name}</h6>
                    <p className="text-muted mb-0">{order.price}</p>
                  </td>
                  <td>{order.quantity}</td>
                  <td>
                    <img
                      src={"https://m.media-amazon.com/images/I/31Sl1DustrL.jpg"}
                      alt={order.name}
                      className="img-thumbnail"
                      style={{ width: '50px', height: '50px' }}
                    />
                  </td>
                  <td>
                    <h6 className="mb-1">{order.totalBill}</h6>
                  </td>
                  <td>
                    <h6 className="mb-1">{order.OrderStatus}</h6>
                  </td>
                  <td>
                    <button
                      className="btn btn-primary"
                      onClick={() => handleViewDetails(order.orderId)} // Pass the orderId to the handler
                    >
                      View Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Orders;
