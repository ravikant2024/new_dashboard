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
  console.log("orders", orders)

  useEffect(() => {
    if (loggedInUser?._id) {
      dispatch(getOrderByUserIdAsync(loggedInUser._id));
    }
  }, [dispatch, loggedInUser]);

  const showMoreOrder = () => {
    navigate('/orders');
  };

  return (
    <div className="help-center-container">
    
      <div className="help-content-area">
          <div className='help-center-description'>
        <h1 className="help-center-title">Original Innovation LLP Help Center | Customer Care Support</h1>
        <p >
          Original Innovation LLP Help Centre offers quick assistance for issues related to orders,
          deliveries, returns, payments, and more.
        </p>
      </div>
        <div className='help-breadcrumb'>
          <span> Help Centre</span>
        </div>
        {!loggedInUser?.isAdmin ? (
          orders.length > 0 ? (
            <div className="help-order-list-section">
              <h3>Which item are you facing an issue with?</h3>
              <div className="help-order-list">
                {orders.flatMap(order =>
                  order.item.map(i => (
                    <Link
                      key={i._id}
                      to={`/order_details?order_id=${order._id}&item_id=${i._id}&unit_id=${i.product._id}`}
                      className="help-order-item-link"
                    >
                      <div className="help-order-item">
                        <img
                          src={i.product.thumbnail || 'https://via.placeholder.com/100'}
                          alt="Product Thumbnail"
                          className="help-order-img"
                        />
                        <div className="help-order-details">
                          <h4>{i.product.title}</h4>
                        </div>
                      </div>
                    </Link>
                  ))
                )}
              </div>

              <p className='view-more' onClick={showMoreOrder}>View More</p>
            </div>
          ) : (
            <p style={{ textAlign: "center", marginTop: "20px", color: "black", fontSize: '20px' }}>
              Order is not available.
            </p>
          )
        ) : (
          <div className="login-prompt">
            <img src={helpcenImage} alt="Login Illustration" className="login-illustration" />
            <p>Login to get help with your recent orders and issues</p>
            <button className="login-button" onClick={() => navigate("/my-account")}>
              Log In
            </button>
          </div>
        )}
      </div>

    </div>

  );
};

export default HelpCenter;
