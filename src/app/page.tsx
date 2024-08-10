"use client";
import React, { useEffect, useState } from 'react';
import Welcome from './components/Welcome';
import HeroSection from './components/HeroSection';
import Card from './components/Card';
import CompactCategorySection from './components/Category';

export default function Home() {
  const [data, setData] = useState([]);
  const[data2, setData2] = useState([]);
  
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
      const url = 'https://real-time-amazon-data.p.rapidapi.com/search?query=electronics';
      const response = await fetch(url, options);
      const result = await response.json();
      setData(result.data.products || []);
      
      const url2 = 'https://real-time-amazon-data.p.rapidapi.com/search?query=homeappliances';
      const response2 = await fetch(url2, options);  
      const result2 = await response2.json();
      setData2(result2.data.products || []);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const renderCard = (deal) => {
    return (
      <Card
        key={deal.asin}
        asin={deal.asin || 'Invalid Call'}
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

  return (
    <>
      <CompactCategorySection />
      <Welcome />
      <HeroSection />
      <div className="container my-5">
        <h1 className="text-center mb-5 display-4 fw-bold text-primary">Current Deals</h1>
        <div className="row">
          {data.slice(0, 12).map(deal => (
            renderCard(deal)
          ))}
          {data2.slice(0, 12).map(deal => (
            renderCard(deal)
          ))}
        </div>
      </div>
    </>
  );
}
