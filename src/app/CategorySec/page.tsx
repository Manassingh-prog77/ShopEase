"use client";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Card from "../components/Card";

export default function CategorySec() {
  const [Data, setData] = useState([]);
  const searchParams = useSearchParams();
  const query = searchParams.get("query");

  const apiKey = process.env.NEXT_PUBLIC_API_KEY;

  const options = {
    method: "GET",
    headers: {
      "x-rapidapi-host": "real-time-amazon-data.p.rapidapi.com",
      "x-rapidapi-key": apiKey,
    },
  };


  const fetchData = async () => {
    try {
      const url = `https://real-time-amazon-data.p.rapidapi.com/search?query=${query}`;
      const response = await fetch(url, options);
      const result = await response.json();
      setData(result.data.products || []);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const renderCard = (deal) => {
    return (
      <Card
        key={deal.asin}
        asin={deal.asin || "Invalid Product"}
        photo={deal.product_photo || "default-photo-url"}
        title={deal.product_title || "No Title Available"}
        price={deal.product_price || "Price Not Available"}
        rating={deal.product_star_rating || "No Rating"}
        numRatings={deal.product_num_ratings || 0}
        numOffers={deal.product_num_offers || 0}
        minimumOfferPrice={deal.product_minimum_offer_price || "Not Available"}
        isBestSeller={deal.is_best_seller || false}
        isAmazonChoice={deal.is_amazon_choice || false}
        isPrime={deal.is_prime || false}
        climatePledgeFriendly={deal.climate_pledge_friendly || false}
        salesVolume={deal.sales_volume || "Sales Volume Not Available"}
        delivery={deal.delivery || "Delivery Not Available"}
        couponText={deal.coupon_text || ""}
      />
    );
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (              
    <>
      <div className="container my-5">
        <h1 className="text-center mb-5 display-4 fw-bold text-primary">
          Category Search Section
        </h1>
        <div className="row mb-5">
          <h2 className="text-center mb-4 text-success">{query}</h2>
          {Data.map((deal) => renderCard(deal))}
        </div>
      </div>
    </>
  );
}
