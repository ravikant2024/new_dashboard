// OrderHistory.js

import React, { useEffect, useState } from 'react';
import './OrderHistory.css';
import { IoArrowBack } from 'react-icons/io5';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { toast } from 'react-toastify';
import { getOrderByUserIdAsync, selectOrderFetchStatus, selectOrders, selectOrderUpdateStatus } from '../OrderSlice';
import { selectLoggedInUser } from '../../auth/AuthSlice';
import { addToCartAsync, selectCartItemAddStatus, selectCartItems } from '../../cart/CartSlice';
import EditAddressModal from './EditAddressModal';

const OrderHistory = () => {
    const dispatch = useDispatch();
    const orders = useSelector(selectOrders);
    const loggedInUser = useSelector(selectLoggedInUser);
    const cartItems = useSelector(selectCartItems);
    const cartItemAddStatus = useSelector(selectCartItemAddStatus);
    const orderFetchStatus = useSelector(selectOrderFetchStatus);
    const updateAddrrssStatus = useSelector(selectOrderUpdateStatus);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [orderAddressData, setOrderAddressData] = useState()
    const [selectedOrderId, setSelectedOrderId] = useState(null);

    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: "instant"
        });
    }, []);

    useEffect(() => {
        if (loggedInUser?._id) {
            dispatch(getOrderByUserIdAsync(loggedInUser._id));
        }
    }, [dispatch, loggedInUser]);

    useEffect(() => {
        if (cartItemAddStatus === 'fulfilled') {
            toast.success("Product added to cart");
        } else if (cartItemAddStatus === 'rejected') {
            toast.error('Error adding product to cart, please try again later');
        }
    }, [cartItemAddStatus]);

    useEffect(() => {
        if (orderFetchStatus === 'rejected') {
            toast.error("Error fetching orders, please try again later");
        }
    }, [orderFetchStatus]);

    useEffect(() => {
        if (updateAddrrssStatus === 'fulfilled') {
            toast.success("Address updated successfully!");
        } else if (updateAddrrssStatus === 'rejected') {
            toast.error('Error updating address, please try again later');
        }
    }, [updateAddrrssStatus]);

    const isProductInCart = (product) => {
        return cartItems.some(item => item.product._id === product._id);
    };

    const handleAddToCart = (product) => {
        const item = { user: loggedInUser._id, product: product._id, quantity: 1 };
        dispatch(addToCartAsync(item));
    };

    const handleChangeAddress = (address, orderId) => {
        setOrderAddressData(address);
        setIsModalOpen(true);
        setSelectedOrderId(orderId);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        // setSelectedAddress(null);
    };

    return (
        <div className="order-history-container">
            <div className="order-history-header">
                <Link to='/'>
                    <IoArrowBack size={40} style={{ color: 'black' }} />
                </Link>
                <h1>Order History</h1>
            </div>

            <p className="order-subtitle">
                Check the status of recent orders, manage returns, and discover similar products.
            </p>

            {orders.length > 0 ? (
                orders.map((items, index) => (
                    <div className="order-card" key={index}>
                        <div className="order-header">
                            <div className="order-details-history">
                                <div className="order-item-header">Order Number</div>
                                <div className="order-item-header">Date Placed</div>
                                <div className="order-item-header">Total Amount</div>
                                <div className="order-item-header">Item :</div>

                                <div className="order-item-value">{items?._id}</div>
                                <div className="order-item-value">{new Date(items.createdAt).toDateString()}</div>
                                <div className="order-item-value">₹{items?.total}</div>
                                <div className="order-item-value">{items?.item.length}</div>
                            </div>
                        </div>

                        {
                            items.address.map((addressData, index) => (
                                <div className="delivery-section" key={index}>
                                    <div>
                                        <h4>Delivery Address</h4>
                                        <p><strong>{addressData.type}</strong></p>
                                        <p>{addressData.street}, {addressData.city}- {addressData.postalCode}</p>
                                        <p>{addressData.state}, {addressData.country}</p>
                                        <p><strong>Phone number:</strong> {addressData.phoneNumber}</p>
                                    </div>
                                    <button className="btn change-address" onClick={() => handleChangeAddress(addressData, items._id)}>
                                        Change Address
                                    </button>
                                </div>
                            ))
                        }
                        {isModalOpen && (
                            <EditAddressModal
                                isModalOpen={isModalOpen}
                                orderAddressData={orderAddressData}
                                closeModal={closeModal}
                                selectedOrderId={selectedOrderId}
                                setIsModalOpen={setIsModalOpen}
                            />
                        )}

                        {
                            items.item.map((data, index) => (
                                <div className="order-history" key={index}>
                                    <img src={data.product.thumbnail} alt="Product" />
                                    <div className="history-product-details">
                                        <h4>{data.product.title}</h4>
                                        <div className="product-price">₹{data.product.price}</div>
                                        <p>{data.product.brand}</p>
                                        <p>Qty: {data.quantity}</p>
                                        <div className="product-description">{data.product.description}</div>
                                        <div className="order-buttons">
                                            <button className="btn">Help</button>
                                            <Link to={`/product-details/${data.product._id}`}>
                                                <button className="btn">View Product</button>
                                            </Link>
                                            {isProductInCart(data.product) ? (
                                                <Link to="/cart">
                                                    <button className="btn">Already in Cart</button>
                                                </Link>
                                            ) : (
                                                <button className="btn" onClick={() => handleAddToCart(data.product)}>
                                                    Buy Again
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))
                        }

                        <p className="order-status">Status: {items.status}</p>
                    </div>
                ))
            ) : (
                <div className='no-any-orders'>No orders available</div>
            )}
        </div>
    );
};

export default OrderHistory;