// src/components/Sidebar.js
import React from 'react';
import { Link } from 'react-router-dom';

const CatSidebar = ({ filteredCatData, name }) => {

  return (
    <div className="cat-sidebar">
      <h4> Show All Categories</h4>
      <div className="cat-sidebar-content">
        <h3>
          {name.charAt(0).toUpperCase() + name.slice(1)} <span className="count">({filteredCatData?.length})</span>
        </h3>
        <ul>
          {filteredCatData.map((product) => (
            <li key={product._id}>
              <Link to={`/product-details/${product._id}`}>
                {product.title}
                <span className="count">({product.stockQuantity})</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CatSidebar;