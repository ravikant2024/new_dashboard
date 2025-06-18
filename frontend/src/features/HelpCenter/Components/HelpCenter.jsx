import React, { useEffect } from 'react';
import './helpCenter.css';
import helpcenImage from '../../../assets/help-centre-login.png';
import { useDispatch, useSelector } from 'react-redux';
import { selectLoggedInUser } from '../../auth/AuthSlice';
import { getOrderByUserIdAsync, selectOrders } from '../../orders/OrderSlice';
import { Link, useNavigate } from 'react-router-dom';

const HelpCenter = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const loggedInUser = useSelector(selectLoggedInUser);
  const orders = useSelector(selectOrders);
  // console.log("orders",orders)

  useEffect(() => {
    if (loggedInUser?._id) {
      dispatch(getOrderByUserIdAsync(loggedInUser._id));
    }
  }, [dispatch, loggedInUser]);

  return (
    <div className="help-center-container">
      <h1 className="help-center-title">Original Innovation LLP Help Center</h1>
      <p className="help-center-description">
        Original Innovation LLP Help Centre offers quick assistance for issues related to orders,
        deliveries, returns, payments, and more. With user-friendly filters and dedicated support,
        customers can easily resolve queries and enjoy a smooth online shopping experience.
        Professional help is available via the support number or page for fast and efficient service.
      </p>

      <div className="help-content-area">
        <div className="help-main-content">
          <span className="breadcrumb">Help Centre</span>
          {!loggedInUser.isAdmin===false ? (
            <div className="login-prompt">
              <img src={helpcenImage} alt="Login Illustration" className="login-illustration" />
              <p>Login to get help with your recent orders and issues</p>
              <button className="login-button" onClick={() => navigate("/my-account")}>
                Log In
              </button>
            </div>
          ) : (
            <div className="help-order-list-section">
              <h3>Which item are you facing an issue with?</h3>
              <div className="help-order-list">
                {orders.map((order) =>
                  order.item.map((orderItem) => (
                    <Link
                      key={orderItem._id}
                      to={`/order_details/${order._id}`}
                      className="help-order-item-link"
                    >
                      <div className="help-order-item">
                        <img
                          src={orderItem.product.thumbnail}
                          alt="image"
                          className="help-order-img"
                        />
                        <div className="help-order-details">
                          <h4>{orderItem.product.title}</h4>
                        </div>
                      </div>
                    </Link>
                  ))
                )}
              </div>
            </div>

            
          )}
        </div>
      </div>
    </div>
  );
};

export default HelpCenter;
