import React, { useEffect, useState } from 'react';
import './cart.css';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import { MdDelete } from "react-icons/md";
import {
    deleteCartItemByIdAsync,
    selectCartItemRemoveStatus,
    selectCartItems,
    updateCartItemByIdAsync,
    resetCartItemRemoveStatus,
} from '../CartSlice';


const Cart = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const cartItems = useSelector(selectCartItems);
    console.log("cartItems",cartItems)
    const cartItemRemoveStatus = useSelector(selectCartItemRemoveStatus);
    const cartitemsQty = cartItems.filter(item => item.quantity > 0);

    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: "instant"
        });
    }, []);


    // Calculate cart total
    const calculateTotal = () => {
        return cartItems.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
    };
    // Go to homepage
    const handleRuturnHompage = () => {
        navigate('/');
    };

    // Handle remove item from cart
    const handleRemoveItems = (id) => {
        const deleteItems = cartItems.find(item => item._id === id);
        if (deleteItems) {
            dispatch(deleteCartItemByIdAsync(id));
        }
    };

    // Decrease quantity
    const handleDecreaseQty = (id) => {
        const item = cartItems.find(item => item._id === id);
        if (item) {
            const newQty = item.quantity - 1; 
            const updatedItem = { _id: id, quantity: newQty };

            dispatch(updateCartItemByIdAsync(updatedItem));
        }
    };

    // Increase quantity
    const handleIncreaseQty = (id) => {
        const item = cartItems.find(item => item._id === id);
        if (item) {
            const updatedItem = { ...item, quantity: item.quantity + 1 };
            dispatch(updateCartItemByIdAsync(updatedItem));
        }
    };

    // Proceed to checkout
    const handleCheckout = () => {
        navigate('/checkout');
    };

    // Show Toast for Add/Remove actions
    useEffect(() => {
        if (cartItemRemoveStatus === 'fulfilled') {
            toast.success("Product removed from cart");
        } else if (cartItemRemoveStatus === 'rejected') {
            toast.error("Error removing product from cart, please try again later");
        }
    }, [cartItemRemoveStatus, dispatch]);

    useEffect(() => {
        return () => {
            dispatch(resetCartItemRemoveStatus());
        };
    }, [dispatch]);


    return (
        <div>
            {cartitemsQty.length === 0 ? (
                <div className="cartempty-container">
                    <div className='cart-empty'>
                        <h1>Your cart is empty</h1>
                        <button onClick={handleRuturnHompage}>Return to shop</button>
                    </div>
                </div>
            ) : (
                <div className="cart-container">
                    <table className="cart-table">
                        <thead>
                            <tr>
                                <th>Product</th>
                                <th>Price</th>
                                <th>Quantity</th>
                                <th>Subtotal</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>

                            {cartItems.map(item => {
                                const subtotal = item.product.price * item.quantity;
                                return (
                                    <tr key={item._id}>
                                        <td className="product-cart-info">
                                            {/* <button className="delete-btn" onClick={() => handleRemoveItems(item._id)}>×</button> */}
                                            <img src={item.product.thumbnail}
                                                alt="Product Image" className="product-img" />
                                            <span className="product-name">{item.product.title}</span>
                                        </td>
                                        <td className="product-price">₹ {item.product.price}</td>

                                        <td className="product-quantity">
                                            <div className="cart-quantity">
                                                <button
                                                    onClick={() => handleDecreaseQty(item._id)}
                                                >
                                                    -
                                                </button>
                                                <span>{item.quantity}</span>
                                                <button
                                                    onClick={() => handleIncreaseQty(item._id)}
                                                >
                                                    +
                                                </button>
                                            </div>
                                        </td>

                                        <td className="product-subtotal">₹ {subtotal}</td>
                                        <td className="product-remove-cart"   onClick={() => handleRemoveItems(item._id)}><MdDelete size={25}/></td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>

                    <div className="cart-actions">
                        <div className="cart-summary">
                            <div className="summary-item">
                                <span>Subtotal:</span>
                                <span>₹ {calculateTotal()}</span>
                            </div>

                            <div className="cart-buttons">
                                <button className="checkout" onClick={handleCheckout}>Proceed to checkout</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Cart;
