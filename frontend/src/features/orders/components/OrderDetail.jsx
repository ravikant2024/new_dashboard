import { data, useParams } from "react-router-dom";
import "./orderDetail.css"
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchOrderByIdAsync, selectOrderById } from "../OrderSlice";
import { selectProducts } from "../../products/ProductsSlice";

const OrderDetail = () => {
    const { id } = useParams();
    const dispatch = useDispatch()
    const ordersDetail = useSelector(selectOrderById);
    console.log("ordersDetail", ordersDetail)

    const product = ordersDetail?.data?.item[0]?.product;
    console.log("product",product)
    const address = ordersDetail?.data?.address[0];
    useEffect(() => {
        dispatch(fetchOrderByIdAsync(id))
    }, [id]);
    // useEffect(() => {
    //     dispatch(fetchProductById(id))
    // }, [id])
    return (
        <>
            <div className="orderdetail-container">
                <div className="orderdetail-left">
                    <div className="orderdetail-header">
                        <div className="orderdetail-info">
                            <h3 className="orderdetail-product-title">
                                {product?.title}
                            </h3>
                            <h4 className="orderdetail-price">₹{product?.price}</h4>
                        </div>
                        <img src={product?.thumbnail} alt="Product" className="orderdetail-product-img" />
                    </div>

                    {/* <div className="orderdetail-status-box">
                        <p className="verified">📦 Item was opened and verified at the time of delivery.</p>
                        <ul className="orderdetail-timeline">
                            <li><span className="orderdetail-status-icon">&#x2705;</span> Order Confirmed, May 31</li>
                            <li><span className="orderdetail-status-icon">&#x2705;</span> Delivered, Jun 01</li>
                        </ul>
                        <a href="#" className="orderdetail-see-updates">See All Updates →</a>
                        <p className="orderdetail-return-info">Return policy ended on Jun 08</p>
                    </div> */}

                    <div className="orderdetail-footer">
                        <span className="orderdetail-chat-with-us">💬 Chat with us</span>
                    </div>
                </div>

                <div className="orderdetail-right">
                    {/* <button className="download-invoice">📄 Download Invoice</button> */}

                    <div className="orderdetail-delivery-details">
                        <h4>Delivery details</h4>
                        <p>🏠 {address?.street}, {address?.city}, {address?.state} - {address?.postalCode}</p>
                        <p>👤 {address?.type}, {address?.phoneNumber}</p>
                    </div>

                    <div className="orderdetail-price-details">
                        <h4>Price Details</h4>
                        <p>List price <span>₹{product?.price}</span></p>
                        <p>Selling price <span>₹ 0</span></p>
                        <p>Discount <span className="orderdetail-discount">- ₹0</span></p>
                        <p>Delivery Charge <span>₹0</span></p>
                        <p>Protect Promise Fee <span>₹9</span></p>
                        <hr />
                        <p className="orderdetail-total">Total Amount <span>₹{ordersDetail?.data.total}</span></p>
                        {/* <p className="orderdetail-paid">• Credit Card: ₹808.0</p> */}
                    </div>
                </div>
            </div>

        </>
    )
}

export default OrderDetail
