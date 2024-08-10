"use client";
import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function Navbar() {
  const [query, setQuery] = useState("");
  const router = useRouter();

  const handleChange = (e) => {
    setQuery(e.target.value);
  }

  const handleClick = (e) => {
    e.preventDefault();
    if (query) {
      router.push(`/Product?search=${encodeURIComponent(query)}`);
    } else {
      router.push("/Product");
    }
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-primary shadow-sm fixed-top">
      <div className="container-fluid">
        <Link className="navbar-brand text-white fw-bold" href="/">ShopEase</Link>
        <button
          className="navbar-toggler border-0"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link text-white" aria-current="page" href="/">Home</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-white" href="/discover">Discover</Link>
            </li>
            <li className="nav-item">
              <Link
                className="nav-link text-white"
                href="/Orders"
                role="button"
              >
                Your Orders
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-white" href="/AboutUs">About Us</Link>
            </li>
          </ul>
          <form className="d-flex mx-auto mb-2 mb-lg-0" style={{ maxWidth: '600px', width: '100%' }} onSubmit={handleClick}>
            <input
              className="form-control me-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
              value={query}
              onChange={handleChange}
            />
            <button className="btn btn-outline-light" type="submit">
              <i className="fas fa-search text-primary text-white"></i>
            </button>
          </form>
          <ul className="navbar-nav ms-3 mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link text-white" href="/Profile">
                <i className="fas fa-user me-2"></i> Profile
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-white" href="/Cart">
                <i className="fas fa-shopping-cart me-2"></i> Cart
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
