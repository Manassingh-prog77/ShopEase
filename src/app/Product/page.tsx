"use client";
import React, { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useRouter, useSearchParams } from "next/navigation";

interface Product {
  asin: string;
  product_title: string;
  product_price: string;
  product_original_price: string;
  product_star_rating: string;
  product_num_ratings: number;
  product_url: string;
  product_photo: string;
  delivery: string;
}

export default function ProductList() {
  const [products, setProducts] = useState<Product[]>([]);
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get('search') || '';
  const router = useRouter();

  const apiKey = process.env.NEXT_PUBLIC_API_KEY;

  const fetchData = async () => {
    let url = `https://real-time-amazon-data.p.rapidapi.com/search?query=${searchQuery}`;
    const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'x-rapidapi-host': 'real-time-amazon-data.p.rapidapi.com',
        'x-rapidapi-key': apiKey
      }
    };
    try {
      let response = await fetch(url, options);
      let data = await response.json();
      setProducts(data.data.products);
    } catch (error) {
      console.error("Error fetching product data:", error);
    }
  };

  const viewDetails = (asin: string) => {
    router.push(`/ProductDesc?asin=${asin}`);
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="container my-5">
      <h2 className="display-4 mb-4 text-center mb-5 display-4 fw-bold text-primary">{searchQuery && <p>Search Results for: {searchQuery}</p>}</h2>
      <div className="list-group">
        {products.length > 0 ? (
          products.map((product) => (
            <div key={product.asin} className="list-group-item d-flex align-items-start border-0 rounded-3 shadow-sm mb-4 bg-light">
              <div className="w-100 d-flex align-items-center">
                <div className="flex-shrink-0">
                  <img
                    src={product.product_photo}
                    alt={product.product_title}
                    className="img-fluid rounded-start"
                    style={{ maxWidth: '150px', objectFit: 'cover' }}
                  />
                </div>
                <div className="flex-grow-1 ms-3">
                  <h5 className="mb-2 fw-bold text-dark">{product.product_title}</h5>
                  <p className="mb-2 text-muted">
                    <small>{product.delivery}</small>
                  </p>
                  <div className="d-flex align-items-center mb-2">
                    <span className="fs-5 fw-bold text-success">{product.product_price}</span>
                    <span className="text-muted text-decoration-line-through ms-3">{product.product_original_price}</span>
                  </div>
                  <p className="mb-2 text-muted">
                    <small>{product.product_num_ratings.toLocaleString()} ratings</small>
                  </p>
                  <button
                    onClick={() => viewDetails(product.asin)}
                    className="btn btn-primary rounded-pill px-4 py-2 mt-2"
                  >
                    View Product
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="d-flex justify-content-center" style={{height:"80vh"}}>
          <div className="spinner-border text-info" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
        )}
      </div>
    </div>
  );
}
