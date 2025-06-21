import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import "./orderDetail.css"
import { fetchOrderByIdAsync, selectOrderById, selectOrders } from "../OrderSlice";
import { useDispatch, useSelector } from "react-redux";
import { HiOutlineChatBubbleOvalLeftEllipsis } from "react-icons/hi2";
import { AiOutlineHome } from "react-icons/ai";
import { FaUser } from "react-icons/fa6";

const OrderDetail = () => {
    const dispatch = useDispatch()
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const orderId = queryParams.get("order_id");
    const itemId = queryParams.get("item_id");
    const orders = useSelector(selectOrderById);
    const order = orders?.data?._id === orderId ? orders.data : null;
    
    const item = order?.item.find(i => i._id === itemId);

    const addressData = order?.address;
    const product = item?.product;



    useEffect(() => {
        if (orderId) {
            dispatch(fetchOrderByIdAsync(orderId));
        }
    }, [dispatch, orderId]);
    return (
        <>
            <div className="main-orderdetails">
                <div className="order-receipt-wrapper">
                    {/* <!-- Left Section --> */}
                    <div className="order-receipt-left">
                        <div className="order-receipt-header">
                            <div className="order-receipt-info">
                                <h3 className="order-receipt-title">
                                    {product?.title}
                                </h3>
                                <p className="order-receipt-color">Model: {product?.sku || "N/A"}</p>
                                {/* <p className="order-receipt-seller">Seller: BUZZINDIA</p> */}
                                      <h4 className="order-receipt-price">₹{Math.round(order?.total).toLocaleString("en-IN")}</h4>
                            </div>
                            <img
                                src={product?.thumbnail }
                                alt="Product"
                                className="order-receipt-product-image"
                            />
                        </div>
                        <hr />
                        <div className="order-receipt-status-box">
                            <div className="order-receipt-timeline">
                                <p>
                                    {/* {order?.status},{" "}
                                    {new Date(order?.createdAt).toLocaleDateString(undefined, {
                                        day: "numeric", month: "long", year: "numeric"
                                    })} */}
                                </p>

                                <p> Delivered, Jun 01</p>
                                <p> Delivered, Jun 01</p>

                                <p> Delivered, Jun 01</p>
                                <p> Delivered, Jun 01</p>
                            </div>
                            {/* <a href="#">See All Updates →</a> */}
                            {/* <p className="order-receipt-return">Return policy ended on Jun 08</p> */}
                        </div>
                        <hr />
                        <div className="order-receipt-rating">
                            <span className="order-receipt-star green">☆</span>
                            <span className="order-receipt-star">☆</span>
                            <span className="order-receipt-star">☆</span>
                            <span className="order-receipt-star">☆</span>
                            <span className="order-receipt-star">☆</span>
                            <div className="order-receipt-review-btn">Add Review</div>
                        </div>
                        <hr />
                        <div className="order-receipt-chat"><HiOutlineChatBubbleOvalLeftEllipsis className="order-chat-icon" /> <span className="">Chat with us</span></div>
                    </div>
                    {/* <!-- Right Section --> */}
                    <div className="order-receipt-right">
                        {/* <div className="order-receipt-invoice-btn">📄 Download Invoice</div> */}

                        <div className="order-receipt-delivery">
                            <h4>Delivery details</h4>
                            {addressData?.map((data, index) => (
                                <div key={index} className="orderdetails-address">
                                    <p><AiOutlineHome /> {data.street}, {data.city}, {data.state} – {data.postalCode}, {data.country}</p>
                                    <hr />
                                    <p><FaUser /> {data.type}, {data.phoneNumber}</p>
                                </div>
                            ))}
                        </div>
                        {/* Product Details */}
                        <div className="order-receipt-price-details">
                            <h4>Price Details</h4>
                            <p>List price <span className="strike">₹{product?.price}</span></p>
                            <p>Selling price <span>₹{product?.price}</span></p>
                            <p>Discount <span>- ₹0</span></p>
                            <p>Delivery Charge <span className="free">Free</span></p>
                          
                            <hr />
                            <p className="order-receipt-total">Total Amount <span>₹{Math.round(order?.total).toLocaleString("en-IN")}</span></p>
                            <p className="order-receipt-credit">• {order?.paymentMode.charAt(0).toUpperCase() + order?.paymentMode.slice(1)}: ₹{Math.round(order?.total).toLocaleString("en-IN")}</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default OrderDetail
