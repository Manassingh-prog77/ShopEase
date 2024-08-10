import React from 'react';
import PropTypes from 'prop-types';
import { useRouter } from 'next/navigation';

const Card = ({ 
  asin,
  photo, 
  title, 
  price, 
  rating, 
  numRatings, 
  minimumOfferPrice, 
  isBestSeller, 
  climatePledgeFriendly, 
  salesVolume, 
  delivery, 
  couponText 
}) => {
  const router = useRouter();

  const handleClick = (e, asin) => {
    e.preventDefault();
    router.push(`/ProductDesc?asin=${asin}`);
  };

  return (
    <div className="col-md-4 mb-4">
      <div className="card border-light shadow-sm position-relative">
        {/* Image Section */}
        <img src={photo} className="card-img-top" alt={title} />
        
        {/* Badge for Best Seller */}
        {isBestSeller && (
          <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
            Best Seller
          </span>
        )}

        {/* Card Body */}
        <div className="card-body d-flex flex-column">
          <h5 className="card-title text-truncate mb-2">{title}</h5>
          <p className="card-text fs-4 fw-bold text-primary mb-2">{price}</p>

          {/* Rating */}
          <div className="d-flex align-items-center mb-3">
            <span className="fs-5 fw-bold text-dark me-1">{rating}</span>
            <span className="text-warning me-1">
              {/* Yellow star icons */}
              <i className="fa-solid fa-star"></i>
            </span>
            <span className="text-muted">({numRatings} ratings)</span>
          </div>

          {/* Coupon Text */}
          {couponText && (
            <div className="alert alert-success mb-2" role="alert">
              {couponText}
            </div>
          )}

          {/* View Product Button */}
          <button onClick={(e) => handleClick(e, asin)} className="btn btn-primary w-100 mb-2">
            View Product
          </button>
          
          {/* Delivery Information */}
          <p className="card-text text-warning mb-0">{delivery}</p>
        </div>
      </div>
    </div>
  );
};

Card.propTypes = {
  asin: PropTypes.string.isRequired,
  photo: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  price: PropTypes.string.isRequired,
  rating: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  numRatings: PropTypes.number.isRequired,
  minimumOfferPrice: PropTypes.string,
  isBestSeller: PropTypes.bool,
  climatePledgeFriendly: PropTypes.bool,
  salesVolume: PropTypes.string,
  delivery: PropTypes.string.isRequired,
  couponText: PropTypes.string
};

export default Card;
