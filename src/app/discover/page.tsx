"use client";
import React, { useEffect, useState } from 'react';
import Card from '../components/Card';
import 'bootstrap/dist/css/bootstrap.min.css';

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export default function Discover() {
  const [mobilePhonesData, setMobilePhonesData] = useState([]);
  const [homeDecorData, setHomeDecorData] = useState([]);
  const [menFashionData, setMenFashionData] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const apiKey = process.env.NEXT_PUBLIC_API_KEY;

  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'x-rapidapi-host': 'real-time-amazon-data.p.rapidapi.com',
      'x-rapidapi-key': apiKey
    }
  };

  const fetchData = async () => {
    try {
      const queries = [
        { query: 'MobilePhones', setter: setMobilePhonesData },
        { query: 'HomeDecor', setter: setHomeDecorData },
        { query: 'MenFashion', setter: setMenFashionData }
      ];

      for (const { query, setter } of queries) {
        const url = `https://real-time-amazon-data.p.rapidapi.com/search?query=${query}`;
        const response = await fetch(url, options);
        const result = await response.json();
        setter(result.data.products.slice(0, 12) || []);
        await delay(5000); // Wait for 5 seconds before making the next API call
      }

      setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const renderCard = (deal) => {
    return (
      <Card
        key={deal.asin}
        asin={deal.asin || 'Invalid Product'}
        photo={deal.product_photo || 'default-photo-url'}
        title={deal.product_title || 'No Title Available'}
        price={deal.product_price || 'Price Not Available'}
        rating={deal.product_star_rating || 'No Rating'}
        numRatings={deal.product_num_ratings || 0}
        numOffers={deal.product_num_offers || 0}
        minimumOfferPrice={deal.product_minimum_offer_price || 'Not Available'}
        isBestSeller={deal.is_best_seller || false}
        isAmazonChoice={deal.is_amazon_choice || false}
        isPrime={deal.is_prime || false}
        climatePledgeFriendly={deal.climate_pledge_friendly || false}
        salesVolume={deal.sales_volume || 'Sales Volume Not Available'}
        delivery={deal.delivery || 'Delivery Not Available'}
        couponText={deal.coupon_text || ''}
      />
    );
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center" style={{height:"80vh"}}>
  <div className="spinner-border text-info" role="status">
    <span className="visually-hidden">Loading...</span>
  </div>
</div>);
  }

  return (
    <div className="container my-5">
      <h1 className="text-center mb-5 display-4 fw-bold text-primary">Discover Deals</h1>
      <div className="row mb-5">
        <h2 className="text-center mb-4 text-success">Mobile Phones</h2>
        {mobilePhonesData.map(deal => (
          renderCard(deal)
        ))}
      </div>
      <div className="row mb-5">
        <h2 className="text-center mb-4 text-danger">Home Decor</h2>
        {homeDecorData.map(deal => (
          renderCard(deal)
        ))}
      </div>
      <div className="row mb-5">
        <h2 className="text-center mb-4 text-info">Fashion</h2>
        {menFashionData.map(deal => (
          renderCard(deal)
        ))}
      </div>
    </div>
  );
}
