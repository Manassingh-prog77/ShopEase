import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { useRouter } from 'next/navigation';

export default function CompactCategorySection() {
  const router = useRouter();

  const categories = [
    { id: 1, name: "Clothing", img: "clothing.png" },
    { id: 2, name: "Electronics", img: "electronic.png" },
    { id: 3, name: "Home & Furniture", img: "home.png" },
    { id: 4, name: "Sports", img: "sports.png" },
    { id: 5, name: "Cosmetics", img: "cosmetics.png" },
    { id: 6, name: "Toys", img: "toys.png" }
  ];

  const handleCategoryClick = (categoryName) => {
    router.push(`/CategorySec?query=${categoryName}`);
  };

  return (
    <section className="bg-light py-3">
      <div className="container">
        <ul className="d-flex justify-content-evenly align-items-center list-unstyled">
          {categories.map(category => (
            <li
              key={category.id}
              className="text-center custom-hover-effect"
              onClick={() => handleCategoryClick(category.name)}
              style={{ cursor: 'pointer' }}
            >
              <div className="imageContainer">
                <img src={category.img} className="roundedCircle" alt={category.name} />
              </div>
              <p className="mb-0">{category.name}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
