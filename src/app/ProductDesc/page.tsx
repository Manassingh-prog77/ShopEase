"use client";
import React, { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useSearchParams, useRouter } from "next/navigation";
import Cookies from "js-cookie";

interface ProductInformation {
  "Package Dimensions": string;
  "Item model number": string;
  "Department": string;
  "Date First Available": string;
  "Manufacturer": string;
  "ASIN": string;
  "Best Sellers Rank": string;
  "Customer Reviews": string;
}

interface Product {
  asin: string;
  product_title: string;
  product_price: string;
  product_original_price: string | null;
  product_star_rating: string;
  product_num_ratings: number;
  product_url: string;
  product_photo: string;
  product_description: string;
  product_information: ProductInformation;
  product_photos: string[];
  customers_say: string;
  review_aspects: {
    Comfort: string;
    Appearance: string;
    Fit: string;
  };
  product_variations: {
    size: Array<{ asin: string; value: string; is_available: boolean }>;
    color: Array<{ asin: string; value: string; photo: string; is_available: boolean }>;
  };
}

interface Review {
  review_id: string;
  review_title: string;
  review_comment: string;
  review_star_rating: number;
  review_author: string;
  review_author_avatar: string;
  review_images: string[];
  review_video: string;
  review_date: string;
  is_verified_purchase: boolean;
  helpful_vote_statement: string;
  reviewed_product_asin: string;
}

export default function ProductDescription() {
  const [product, setProduct] = useState<Product | null>(null);
  const [mainImage, setMainImage] = useState("");
  const [reviews, setReviews] = useState<Review[]>([]);
  const [expandedReview, setExpandedReview] = useState<{ [key: string]: boolean }>({});
  const [showAlert, setShowAlert] = useState(false);
  const [alertmsg, setAlertmsg] = useState("");

  const apiKey = process.env.NEXT_PUBLIC_API_KEY;

  const searchParams = useSearchParams();
  const asin = searchParams.get('asin');
  const router = useRouter();
  const AuthToken = Cookies.get('authToken');
  if(!AuthToken){
    router.push("/Login")
  }

  const fetchData = async () => {
    if (!asin) return;

    const productUrl = `https://real-time-amazon-data.p.rapidapi.com/product-details?asin=${asin}`;
    const reviewUrl = `https://real-time-amazon-data.p.rapidapi.com/product-reviews?asin=${asin}`;

    const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'x-rapidapi-host': 'real-time-amazon-data.p.rapidapi.com',
        'x-rapidapi-key': apiKey
      }
    };

    try {
      const [productResponse, reviewResponse] = await Promise.all([
        fetch(productUrl, options),
        fetch(reviewUrl, options)
      ]);

      const productData = await productResponse.json();
      const reviewData = await reviewResponse.json();

      setProduct(productData.data);
      if (productData.data.product_photos.length > 0) {
        setMainImage(productData.data.product_photos[0]);
      }
      setReviews(reviewData.data.reviews);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [asin]);

  const toggleReview = (reviewId: string) => {
    setExpandedReview((prevState) => ({
      ...prevState,
      [reviewId]: !prevState[reviewId]
    }));
  };

  const addToCart = async () => {
    if (!product) return;

    const priceWithoutDollar = parseFloat(product.product_price.replace('$', ''));
    const cartData = {
      asin: product.asin,
      name: product.product_title,
      price: priceWithoutDollar,
      quantity: 1,
      image: mainImage,
    };

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': AuthToken,
      },
      body: JSON.stringify(cartData),
    };

    try {
      const response = await fetch('http://localhost:5000/api/cart/addtocart', options);
      if (response.ok) {
        setAlertmsg("Product added to cart");
        setShowAlert(true);
        setTimeout(() => setShowAlert(false), 3000); // Hide alert after 3 seconds
      } else {
        console.error('Failed to add product to cart');
      }
    } catch (error) {
      console.error('Error adding product to cart:', error);
    }
  };

  const buyNow = () => {
    if (!product) return;

    const priceWithoutDollar = parseFloat(product.product_price.replace('$', ''));
    const buyData = {
      asin: product.asin,
      name: product.product_title,
      price: priceWithoutDollar,
      quantity: 1,
      image: mainImage
    };
    const query = Object.keys(buyData)
      .map(key => `${key}=${encodeURIComponent(buyData[key])}`)
      .join('&');

    router.push(`/buynow?${query}`);
  };

  if (!product) {
    return ( <div className="d-flex justify-content-center" style={{height:"80vh"}}>
      <div className="spinner-border text-info" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>);
  }

  const getStarRating = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <span key={index} className={`bi ${index < rating ? 'bi-star-fill' : 'bi-star'}`}></span>
    ));
  };

  return (
    <div className="container my-5">
      {showAlert && (
        <div className="alert alert-success alert-dismissible fade show" role="alert">
          {alertmsg}
          <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
      )}
      <div className="row">
        <div className="col-md-6 mb-4">
          <div className="position-relative">
            <img
              src={mainImage}
              alt={product.product_title}
              className="img-fluid rounded shadow-sm"
              style={{ maxHeight: '500px', objectFit: 'cover' }}
            />
          </div>
          <div className="d-flex flex-wrap mt-2">
            {product.product_photos.map((photo, index) => (
              <img
                key={index}
                src={photo}
                alt={`Thumbnail ${index + 1}`}
                className="img-thumbnail me-2 mb-2 cursor-pointer"
                style={{ width: '80px', height: '80px', objectFit: 'cover' }}
                onClick={() => setMainImage(photo)}
              />
            ))}
          </div>
        </div>
        <div className="col-md-6">
          <h1 className="display-6">{product.product_title}</h1>
          <p className="lead">Price: {product.product_price}</p>
          <button className="btn btn-warning me-2" onClick={addToCart}>Add to Cart</button>
          <button className="btn btn-danger" onClick={buyNow}>Buy Now</button>
          <div className="mt-4">
            <h4>Product Details</h4>
            <p>{product.product_description}</p>
            <ul className="list-group list-group-flush">
              {Object.entries(product.product_information).map(([key, value]) => (
                <li key={key} className="list-group-item">
                  <strong>{key}:</strong> {value}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="mt-5">
        <h2 className="mb-4">Customer Reviews</h2>
        {reviews.map(review => (
          <div key={review.review_id} className="card mb-4 shadow-sm border-light" style={{ borderRadius: '0.5rem' }}>
            <div className="card-body">
              <div className="d-flex align-items-center mb-3">
                <img src={review.review_author_avatar} alt={review.review_author} className="rounded-circle me-3" style={{ width: '50px', height: '50px', objectFit: 'cover' }} />
                <div>
                  <h5 className="card-title mb-1">{review.review_title}</h5>
                  <h6 className="card-subtitle mb-2 text-muted">{review.review_author}</h6>
                  <div className="mb-2">
                    {getStarRating(review.review_star_rating)}
                  </div>
                  <small className="text-muted">{review.review_date}</small>
                </div>
              </div>
              <p className="card-text">{expandedReview[review.review_id] ? review.review_comment : `${review.review_comment.substring(0, 100)}...`}</p>
              {review.review_images.length > 0 && (
                <div className="mb-2">
                  {review.review_images.map((image, index) => (
                    <img
                      key={index}
                      src={image}
                      alt={`Review image ${index + 1}`}
                      className="img-thumbnail me-2"
                      style={{ width: '100px', height: '100px', objectFit: 'cover' }}
                    />
                  ))}
                </div>
              )}
              {review.review_video && (
                <div className="mb-2">
                  <video controls className="w-100">
                    <source src={review.review_video} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                </div>
              )}
              <button className="btn btn-link" onClick={() => toggleReview(review.review_id)}>
                {expandedReview[review.review_id] ? 'Show Less' : 'Read More'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
  