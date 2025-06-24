import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "./orderDetail.css"
import { fetchOrderByIdAsync, selectOrderById } from "../OrderSlice";
import { useDispatch, useSelector } from "react-redux";
import { HiOutlineChatBubbleOvalLeftEllipsis } from "react-icons/hi2";
import { AiOutlineHome } from "react-icons/ai";
import { FaUser } from "react-icons/fa6";
import { fetchShippingchargeByAddress, selectShippingChargeByAddress } from "../../../adminpanel/deliveryCharge/deliveryChargeSlice";
import { TAXES } from "../../../constants";
import ReactStarRating from 'react-star-rating-component';
import { createReviewAsync, fetchReviewsByProductIdAsync, selectReviews, updateReviewByIdAsync } from "../../review/ReviewSlice";
import { selectLoggedInUser } from "../../auth/AuthSlice";
import AddReviewModal from "../../review/components/AddReviewModal";

const OrderDetail = () => {
    const dispatch = useDispatch();
    const location = useLocation();
    const [rating, setRating] = useState(0);
    const [showThankYou, setShowThankYou] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const shippingCharge = useSelector(selectShippingChargeByAddress);
    const loggedInUser = useSelector(selectLoggedInUser)
    const fetchReviewData = useSelector(selectReviews);
    const queryParams = new URLSearchParams(location.search);
    const orderId = queryParams.get("order_id");
    const itemId = queryParams.get("item_id");
    const orders = useSelector(selectOrderById);
    console.log("orders",orders)
    const order = orders?.data?._id === orderId ? orders.data : null;
    console.log("order",order)
    const item = order?.item.find(i => i._id === itemId);
    const addressData = order?.address;
    const product = item?.product;
    console.log("product",product)
    const items = orders?.data?.item || [];
    console.log("items",items)
    // calculate tax
    const totalTax = items.reduce((acc, item) => {
        const price = item?.product?.price || 0;
        return acc + (price * TAXES);
    }, 0);

    // Fetch order details by id
    useEffect(() => {
        if (orderId) {
            dispatch(fetchOrderByIdAsync(orderId));
        }
    }, [dispatch, orderId]);

    // Fetch user address
    useEffect(() => {
        if (addressData) {
            dispatch(fetchShippingchargeByAddress({
                city: addressData?.[0].city,
                state: addressData?.[0].state,
                country: addressData?.[0].country
            }));
        }

    }, [dispatch, addressData]);
    // get review on the basis of Id
    useEffect(() => {
        if (product?._id) {
            dispatch(fetchReviewsByProductIdAsync(product?._id))
        }
    }, [dispatch, product?._id])

    // Show rating
    useEffect(() => {
        const review = fetchReviewData?.find(
            r => r.product === product?._id && r.user?._id === loggedInUser?._id
        );
        if (review) setRating(review.rating);
    }, [fetchReviewData, loggedInUser?._id, product?._id]);

    // Track status
    const formattedDate = new Date(order?.createdAt).toLocaleDateString("en-IN", {
        day: "numeric", month: "short"
    });

    const statusTimelineSteps = [
        {
            key: "order_placed",
            label: `Order Placed, ${formattedDate}`,
            show: true,
        },
        {
            key: "order_pending",
            label: `Order Pending, ${formattedDate}`,
            show: order?.status === "Pending",
            className: "pending",
        },
        {
            key: "order_processed",
            label: `Order Processed, ${formattedDate}`,
            show: ['Dispatched', 'Out for delivery', 'Delivered', 'Cancelled', 'Contact Customer', 'Redispatched', 'Refund'].includes(order?.status),
        },
        {
            key: "out_for_delivery",
            label: `Out for Delivery, ${formattedDate}`,
            show: ['Out for delivery', 'Delivered', 'Redispatched'].includes(order?.status),
        },
        {
            key: "delivered",
            label: `Delivered, ${formattedDate}`,
            show: order?.status === "Delivered",
        },
        {
            key: "cancelled",
            label: `Order Cancelled, ${formattedDate}`,
            show: order?.status === "Cancelled",
            className: "cancelled",
        },
        {
            key: "contact_customer",
            label: `Contacting Customer, ${formattedDate}`,
            show: order?.status === "Contact Customer",
        },
        {
            key: "redispatched",
            label: `Order Redispatched, ${formattedDate}`,
            show: order?.status === "Redispatched",
        },
        {
            key: "refund",
            label: `Refund Initiated, ${formattedDate}`,
            show: order?.status === "Refund",
        },
    ];

    /// Add and update product rating
    const onStarClick = async (nextValue) => {
        setRating(nextValue);
        const existingReview = fetchReviewData?.find(
            (r) => r.product === product?._id && r.user?._id === loggedInUser?._id
        );
        const payload = {
            order: order._id,
            user: loggedInUser._id,
            rating: nextValue,
            product: product._id,
        };

        try {
            if (existingReview) {
                await dispatch(updateReviewByIdAsync({ _id: existingReview._id, ...payload }));
            } else {
                await dispatch(createReviewAsync(payload));
            }
            setShowThankYou(true);
            setTimeout(() => setShowThankYou(false), 3000);
        } catch (err) {
            console.error("Review submission failed:", err);
        }
    };

    return (
        <>
            <div className="main-orderdetails">
                <div className="order-receipt-wrapper">
                    {/* Left Section */}
                    <div className="order-receipt-left">
                        {/* `/product-details/${id}` */}
                        <Link to={`/product-details/${product?._id}`}  className="order-details-link">
                            <div className="order-receipt-header">
                                <div className="order-receipt-info">
                                    <h3 className="order-receipt-title">{product?.title}</h3>
                                    <p className="order-receipt-color">Model: {product?.sku || "N/A"}</p>
                                    <p className="order-receipt-seller">Quantity: {order?.item?.length}</p>
                                    <h4 className="order-receipt-price">₹{Math.round(order?.total).toLocaleString("en-IN")}</h4>
                                </div>
                                <img
                                    src={product?.thumbnail}
                                    alt="Product"
                                    className="order-receipt-product-image"
                                />
                            </div>
                        </Link>
                        <hr />
                        <div className="order-receipt-status-box">
                            <div className="order-receipt-timeline">
                                {statusTimelineSteps
                                    .filter(step => step.show)
                                    .map((step, index, steps) => {
                                        const isLast = index === steps.length - 1;
                                        return (
                                            <div key={step.key} className="timeline-step">
                                                <div className="check-container">
                                                    <div className="check-icon">&#10003;</div>
                                                    {!isLast && <div className="timeline-connector"></div>}
                                                </div>
                                                <div className={`timeline-content ${step.className || ""}`}>
                                                    <p>{step.label}</p>
                                                </div>
                                            </div>
                                        );
                                    })}
                            </div>

                            {order?.status === "Delivered" && (
                                <p className="order-receipt-return">
                                    Return policy ended on{" "}
                                    {new Date(new Date(order?.createdAt).getTime() + 7 * 24 * 60 * 60 * 1000).toLocaleDateString("en-IN", {
                                        day: "numeric",
                                        month: "short"
                                    })}
                                </p>
                            )}
                        </div>
                        <hr />
                        <div className="order-receipt-rating">
                            <ReactStarRating
                                name="orderRating"
                                starCount={5}
                                value={rating}
                                onStarClick={onStarClick}
                                starColor="rgb(82, 210, 82)"
                                emptyStarColor="#ccc"
                                className="order-receipt-star"
                            />

                            <div className="order-receipt-review-btn" onClick={() => setShowModal(true)}>
                                Add Review
                            </div>
                        </div>
                        {showThankYou && (
                            <div className="thank-you-modal-overlay">
                                <div className="thank-you-modal">
                                    <p>Thanks for rating!</p>
                                </div>
                            </div>
                        )}

                        <hr />
                        <div className="order-receipt-chat">
                            <HiOutlineChatBubbleOvalLeftEllipsis className="order-chat-icon" /> <span className="">Chat with us</span>
                        </div>
                    </div>

                    {/* Right Section */}
                    <div className="order-receipt-right">
                        {/* <div className="order-receipt-invoice-btn">📄 Download Invoice</div> */}
                        <div className="order-receipt-delivery">
                            <h4>Delivery details</h4>
                            {addressData?.map((data, index) => (
                                <div key={index} className="orderdetails-address">
                                    <p><FaUser /> {data.type}, {data.phoneNumber}</p>
                                    <hr />
                                    <p><AiOutlineHome /> {data.street}, {data.city}, {data.state} – {data.postalCode}, {data.country}</p>
                                </div>
                            ))}
                        </div>

                        <div className="order-receipt-price-details">
                            <h4>Price Details</h4>
                            <p>List price <span>₹{product?.price}</span></p>
                            <p>Quantity <span>{order?.item?.length}</span></p>
                            <p>Discount <span>- ₹0</span></p>
                            <p>Delivery Charge <span className="free">{shippingCharge}</span></p>
                            <p>Tax <span>₹{Math.round(totalTax)}</span></p>

                            <hr />
                            <p className="order-receipt-total">Total Amount <span>₹{Math.round(order?.total).toLocaleString("en-IN")}</span></p>
                            <p className="order-receipt-credit">
                                • {order?.paymentMode.charAt(0).toUpperCase() + order?.paymentMode.slice(1)}: ₹{Math.round(order?.total).toLocaleString("en-IN")}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            {showModal && (
                <AddReviewModal
                    product={product}
                    setShowModal={setShowModal}
                    order={order}
                    loggedInUser={loggedInUser}
                    fetchReviewData={fetchReviewData}
                />
            )}
        </>
    );
}

export default OrderDetail;
