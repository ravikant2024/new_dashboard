import React, { useEffect, useRef, useState } from 'react';
import './navbar.css';
import logo from '../../assets/logo.jpg';
import { CiHeart, CiSearch } from "react-icons/ci";
import { MdOutlineShoppingBag } from "react-icons/md";
import { RiArrowDropDownLine } from "react-icons/ri";
import SideBar from './SideBar';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { selectLoggedInUser } from '../auth/AuthSlice';
import { resetCartByUserIdAsync, selectCartItems } from '../cart/CartSlice';
import { resetWishlistItemAddStatus, selectWishlistItems } from '../wishlist/WishlistSlice';
import { selectProducts } from '../products/ProductsSlice';

function Navbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const categoriesContainerRef = useRef(null);

  const [isOpen, setIsOpen] = useState(false);
  const [searchInputValue, setSearchInputValue] = useState('');
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [openDropdown, setOpenDropdown] = useState(null);

  const loggedInUser = useSelector(selectLoggedInUser);
  const cartItems = useSelector(selectCartItems);
  const wishlistItems = useSelector(selectWishlistItems);
  const products = useSelector(selectProducts);

  useEffect(() => {
    if (loggedInUser?._id === '77f2434c53bbe09c7c63f666') {
      dispatch(resetCartByUserIdAsync(loggedInUser._id));
    }
  }, [dispatch, loggedInUser]);

  const toggleDropdown = (name) => {
    setOpenDropdown((prev) => (prev === name ? null : name));
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchInputValue(value);

    if (value.trim() === '') {
      setFilteredProducts([]);
      return;
    }

    const filtered = products.filter(product =>
      product.title.toLowerCase().includes(value.toLowerCase()) ||
      product.brand.toLowerCase().includes(value.toLowerCase()) ||
      product.category.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredProducts(filtered);
  };
  const handleSearch = () => {
    if (searchInputValue.trim() !== '') {
      navigate(`/search-product-list?q=${encodeURIComponent(searchInputValue.trim())}`);
      setSearchInputValue('');
      setFilteredProducts([]);
    }
  };
  
  const handleWishList = () => {
    dispatch(resetWishlistItemAddStatus());
    navigate('/wishlist');
  };

  const handleCartClick = () => {
    navigate('/cart');
  };

  const toggleCategories = () => {
    setIsOpen(prev => !prev);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (categoriesContainerRef.current && !categoriesContainerRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <>
      <div className="navbar">
        <div className="top-header-section">
          {/* Logo */}
          <div className="logo-container">
            <Link to="/">
              <div className="logo">
                <img src={logo} alt="logo" />
              </div>
              <div className="company-name">
                <h1>Original Innovation LLP</h1>
              </div>
            </Link>
          </div>

          <div className="search-cart-wrapper">
            <div className="search-bar">
              <input
                type="text"
                placeholder="Search for products..."
                value={searchInputValue}
                onChange={handleInputChange}
                onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  handleSearch();
                }
              }}
              />
              {searchInputValue && (
                <CiSearch
                  size={25}
                  className="search-icon"
                   onClick={handleSearch}
                />
              )}

              {/* Search Results Dropdown */}
              {filteredProducts.length > 0 ? (
                <div className="search-results-dropdown">
                  {filteredProducts.map(product => (
                    <div
                      key={product._id}
                      className="search-result-item"
                      onClick={() => {
                        navigate(`/search-product-list?q=${encodeURIComponent(product.title)}`);

                        setSearchInputValue('');
                        setFilteredProducts([]);
                      }}
                    >
                      <img src={product.thumbnail} alt={product.title} width={40} />
                      <div className="product-info">
                        <p>{product.title}</p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                searchInputValue && (
                  <div className="search-results-dropdown">
                    <div className="no-results">No data found</div>
                  </div>
                )
              )}

            </div>

            {/* Cart and Wishlist */}
            <div className="cart">
              <div className="wishlist-icon-wrapper" onClick={handleWishList} data-tooltip-id="global-tooltip" data-tooltip-content="Wishlist">
                <CiHeart size={40} className="heart-icon" />
                <span className="wishlist-item-count">{wishlistItems.length}</span>
              </div>
              <div className="cart-icon-wrapper" onClick={handleCartClick} data-tooltip-id="global-tooltip" data-tooltip-content="Cart">
                <MdOutlineShoppingBag size={40} className="cart-icon" />
                <span className="cart-item-count">{cartItems.length}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Nav Section */}
        <div className="nav-section">
          {/* Categories */}
          <div className="categories-container" ref={categoriesContainerRef}>
            <button onClick={toggleCategories}>
              <span className="categories-icon">☰</span>
              <span className="categories-text">All Categories</span>
            </button>

            <div className={`category-dropdown ${isOpen ? 'show' : ''}`}>
              <SideBar closeSidebar={() => setIsOpen(false)} />
            </div>
          </div>

          {/* Navigation Links */}
          <ul className="nav-links">
            <li><Link to="/">Home</Link></li>
            <li className={`dropdown ${openDropdown === "shop" ? "open" : ""}`}>
              <a href="#" className="dropdown-link" onClick={(e) => {
                e.preventDefault();
                toggleDropdown("shop");
              }}>
                Shop <RiArrowDropDownLine size={30} />
              </a>
              <ul className="dropdown-menu">
                <li><Link to="/order-tracking">Track your order</Link></li>
              </ul>
            </li>
            <li className={`dropdown ${openDropdown === "blogs" ? "open" : ""}`}>
              <a href="#" className="dropdown-link" onClick={(e) => {
                e.preventDefault();
                toggleDropdown("blogs");
              }}>
                Blogs <RiArrowDropDownLine size={30} />
              </a>
              <ul className="dropdown-menu">
                <li><Link to="view-all-blogs">Blog</Link></li>
                <li><Link to="view-all-video">Videos</Link></li>
              </ul>
            </li>
            <li><Link to="/bulk-enquiry">Bulk Enquiry</Link></li>
            <li><Link to="/latest-products">New Arrivals</Link></li>
            
          </ul>
        </div>
      </div>
    </>
  );
}

export default Navbar;
