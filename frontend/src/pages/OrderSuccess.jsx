import '../css/OrderSuccess.css'
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import { CustomStorageManager } from '../classes/storageManager';
import { axiosInstance } from '../config/axios';
import { resetCartByUserIdAsync } from '../features/cart/CartSlice';
import { useEffect, useState } from 'react';
import Loader from "react-js-loader";
import { selectUserInfo } from '../features/user/UserSlice';

let hitFlag = 0;

const OrderSuccess = () => {
    const location = useLocation();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [orderStatus, setOrderStatus] = useState('');
    const [orderId, setOrderId] = useState('');
    const [order, setOrder] = useState(null);
    const [parsedPaymentResponse, setParsedPaymentResponse] = useState(null);
    const [loading, setLoading] = useState(true);
      const userDetails=useSelector(selectUserInfo)

    // Fetch order data from local storage
    useEffect(() => {
        const fetchOrderData = async () => {
            // const storedOrder = await CustomStorageManager.fetch('kalyanOrder');
            const storedOrder = await CustomStorageManager.fetch('getOrderData');
            const order = storedOrder ? JSON.parse(storedOrder) : null;
            setOrder(order);  // Set the order in state
        };

        fetchOrderData();
    }, []);

    // Parse payment response from query params
    useEffect(() => {
        const getQueryParams = (url) => {
            return new URLSearchParams(url.search);
        };

        const queryParams = getQueryParams(location);
        const paymentResponse = queryParams.get('paymentResponse');
        const parsedResponse = paymentResponse ? JSON.parse(decodeURIComponent(paymentResponse)) : null;
        setParsedPaymentResponse(parsedResponse); // Set the parsed payment response
    }, [location]);

    // Fetch order status and create order in the system
    useEffect(() => {
        const fetchOrderStatus = async () => {
            if (order && parsedPaymentResponse) {
                setLoading(true);
                const newOrder = {
                    user: order.user,
                    item: order.item,
                    address: order.address,
                    paymentMode: order.paymentMode,
                    total: order.total,
                    email: order.email,
                    guestFlag: order.guestFlag,
                    paymentResponse: parsedPaymentResponse,
                };

                try {
                    const res = await axiosInstance.post("http://localhost:8081/orders", newOrder);
                    setOrderId(res.data._id);
                    const paymentStatus = res.data.paymentDetails.ResponseCode;

                    if (paymentStatus === '00') {
                        setOrderStatus('SUCCESS');
                        dispatch(resetCartByUserIdAsync(order.userId));
                    } else {
                        setOrderStatus('FAILED');
                    }
                } catch (error) {
                    setOrderStatus('FAILED');
                } finally {
                    setLoading(false);
                }
            }
        };

        if (hitFlag === 0 && order && parsedPaymentResponse) {
            hitFlag = 1;
            fetchOrderStatus();
        }
    }, [order, parsedPaymentResponse]);

    const conformationMessage = orderStatus === 'SUCCESS'
        ? `Your Order #${orderId} is confirmed`
        : `Your Order #${orderId} is not confirmed`;

    const paymentStatusMessage = orderStatus === 'SUCCESS'
        ? 'Your order was successful! Thank you for your purchase.'
        : 'Payment failed. Please try again or contact support for assistance.';


        const handleButtonClick = () => {
          // dispatch(resetCurrentOrder());  
          navigate('/orders');  
        };
    return (
        <div className="container">
        {loading ? (
          <div className="loading">
           <Loader type="spinner-circle" bgColor={"red"} size={100} />
          </div>
        ) : (
          <div className="order-success" >
            <div className="order-success-details">
              <h6 className="greeting">Hey {userDetails?.name}</h6>
              <h5 className="confirmation-message" >
                {conformationMessage}
              </h5>
              <p className="payment-status" >
                {paymentStatusMessage}
              </p>
            </div>
            {!order?.guestFlag ? (
              orderStatus === 'SUCCESS' ? (
                <button
                  // onClick={() => dispatch(resetCurrentOrder())}
                  onClick={handleButtonClick}
                  component={Link}
                  to="/orders"
                       className='order-success-button'
                >
                  Check order status in my orders
                </button>
              ) : (
                <button onClick={() => navigate('/cart')}   className='order-success-button'>Go to cart</button>
              )
            ) : (
              orderStatus === 'SUCCESS' ? (
                <button
              className='order-success-button'
                  onClick={() => navigate('/order-tracking')}
                >
                  Track Order
                </button>
              ) : (
                <button onClick={() => navigate('/')}  className='order-success-button'>
                  Go to homepage
                </button>
              )
            )}
          </div>
        )}
      </div>
      
    );
};

export default OrderSuccess;
