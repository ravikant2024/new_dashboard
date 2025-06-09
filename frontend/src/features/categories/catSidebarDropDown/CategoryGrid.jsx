import React, { useState, useMemo, useEffect } from 'react';
import CategoryCardItems from './CategoryItem';
import { selectLoggedInUser } from '../../auth/AuthSlice';
import { toast } from 'react-toastify'
import { createWishlistItemAsync, deleteWishlistItemByIdAsync, resetWishlistItemAddStatus, resetWishlistItemDeleteStatus, selectWishlistItemAddStatus, selectWishlistItemDeleteStatus, selectWishlistItems } from '../../wishlist/WishlistSlice';
import { useDispatch, useSelector } from 'react-redux';

const sortOptions = [
  { value: '', label: 'Sort by' },
  { value: 'lowToHigh', label: 'Sort by Price: Low to High' },
  { value: 'highToLow', label: 'Sort by Price: High to Low' },
  { value: 'averageRating', label: 'Sort by Average Rating' }
];

const CategoryGrid = ({ filteredCatData, name }) => {
  const dispatch = useDispatch()
  const [sortOrder, setSortOrder] = useState('');
  const loggedInUser = useSelector(selectLoggedInUser)
  const wishlistItems = useSelector(selectWishlistItems)
  const wishlistItemAddStatus = useSelector(selectWishlistItemAddStatus)
  const wishlistItemDeleteStatus = useSelector(selectWishlistItemDeleteStatus)
  const isAdminUser = loggedInUser && loggedInUser._id != "77f2434c53bbe09c7c63f666";

// Add wishlist status
useEffect(() => {
  if (wishlistItemAddStatus === 'fulfilled') {
    toast.success("Product added to wishlist");
    dispatch(resetWishlistItemAddStatus()); 
  } else if (wishlistItemAddStatus === 'rejected') {
    toast.error("Error adding product to wishlist, please try again later");
    dispatch(resetWishlistItemAddStatus());
  }
}, [wishlistItemAddStatus, dispatch]);

// Remove wishlist status
useEffect(() => {
  if (wishlistItemDeleteStatus === 'fulfilled') {
    toast.success("Product removed from wishlist");
    dispatch(resetWishlistItemDeleteStatus());
  } else if (wishlistItemDeleteStatus === 'rejected') {
    toast.error("Error removing product from wishlist, please try again later");
    dispatch(resetWishlistItemDeleteStatus());
  }
}, [wishlistItemDeleteStatus, dispatch]);



  const handleSortChange = (order) => {
    setSortOrder(order);
  };

  const sortedData = useMemo(() => {
    if (!filteredCatData) return [];

    switch (sortOrder) {
      case 'lowToHigh':
        return [...filteredCatData].sort((a, b) => a.price - b.price);
      case 'highToLow':
        return [...filteredCatData].sort((a, b) => b.price - a.price);
      case 'averageRating':
        return [...filteredCatData].sort((a, b) => (b.averageRating || 0) - (a.averageRating || 0));
      default:
        return filteredCatData;
    }
  }, [filteredCatData, sortOrder]);


  const handleAddRemoveFromWishlist = (e, productId) => {
    if (loggedInUser && isAdminUser) {
      const isInWishlist = wishlistItems.some(item => item.product?._id === productId);
  
      if (isInWishlist) {
        const item = wishlistItems.find(item => item.product?._id === productId);
        if (item && item._id) {
          dispatch(deleteWishlistItemByIdAsync(item._id));
        }
      } else {
        dispatch(createWishlistItemAsync({ user: loggedInUser._id, product: productId }));
      }
    } else {
      toast.error("Please log in to add/remove items from the wishlist.");
    }
  };

  useEffect(() => {
    return () => {
      dispatch(resetWishlistItemDeleteStatus())
      dispatch(resetWishlistItemAddStatus())
    }
  }, [dispatch])

  return (
    <div className="main-content">
      <div className="category-header">
        <h1 className="category-title">{name.charAt(0).toUpperCase() + name.slice(1)}</h1>
        <select className="sorting-dropdown" onChange={(e) => handleSortChange(e.target.value)}>
          {sortOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
      <hr />
      <div className="category-grid">
        {sortedData.length > 0 ? (
          sortedData.map((items) => (
            <CategoryCardItems
              key={items._id}
              id={items._id}
              sku={items?.sku}
              title={items.title}
              thumbnail={items?.thumbnail}
              price={items.price}
              description={items?.description}
              discountPercentage={items?.discountPercentage}
              averageRating={items?.averageRating} // make sure it's passed to card
              handleAddRemoveFromWishlist={handleAddRemoveFromWishlist}
            />
          ))
        ) : (
          <div className="noProductAvailable">
            <p>No Products Available.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoryGrid;
