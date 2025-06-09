// src/pages/PageNotFound.js
import React from 'react';

const PageNotFound = ({ isAdmin }) => {
  return (
    <div className="page-not-found">
      <h1>404 - Page Not Found</h1>
      {isAdmin ? (
        <p>The page you are looking for does not exist in the admin section.</p>
      ) : (
        <p>The page you are looking for does not exist in the user section.</p>
      )}

      {/* Inline CSS */}
      <style jsx>{`
        .page-not-found {
          text-align: center;
          padding: 50px;
          font-size: 1.5rem;
          color: #333;
        }

        .page-not-found h1 {
          font-size: 3rem;
          color: red;
        }

        .page-not-found p {
          font-size: 1.2rem;
          color: #666;
        }
      `}</style>
    </div>
  );
};

export default PageNotFound;
