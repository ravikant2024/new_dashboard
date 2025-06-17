import React, { useEffect, useState } from 'react';
import './truckOrder.css';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import ChangeOrderAddress from './ChangeOrderAddress';
import { fetchOrderByIdAsync, resetCurrentOrder, resetOrderUpdateStatus, selectOrderById, selectOrderUpdateStatus } from '../../orders/OrderSlice';
import { useDispatch, useSelector } from 'react-redux';

const TrackOrderForm = () => {
  const dispatch = useDispatch();
  const [openModal, setOpenModal] = useState(false);
  const [searchId, setSearchId] = useState('');
  const [selectedOrderId, setSelectedOrderId] = useState(null);
  const [orderAddressData, setOrderAddressData] = useState();
  const order = useSelector(selectOrderById);
  const addressUpdateStatus = useSelector(selectOrderUpdateStatus)

  // Handle input change
  const handleChange = (e) => {
    setSearchId(e.target.value);
  };

  // Handle search button click
  const handleSearchData = async (e) => {
    e.preventDefault();

    if (!searchId.trim()) {
      alert("Please enter a valid Order ID");
      return;
    }
    dispatch(fetchOrderByIdAsync(searchId));
   setSearchId('');
  };

  // Close modal
  const closeModal = () => {
    setOpenModal(false);
  };

  // Change order address
  const handleChangeOrderAddress = (orderId, addressData) => {
    setSelectedOrderId(orderId);
    setOpenModal(true);
    setOrderAddressData(addressData);
  };

  // Show toast if the address update is successful
  useEffect(() => {
    if (addressUpdateStatus === 'fulfilled') {
      toast.success("Address updated successfully!");
    } else if (addressUpdateStatus === 'rejected') {
      toast.error("Failed to update the address!");
    }
  }, [addressUpdateStatus]);

  useEffect(() => {
    dispatch(resetOrderUpdateStatus());
    dispatch(resetCurrentOrder());

    return () => {
      dispatch(resetCurrentOrder());
    };
  }, [dispatch, addressUpdateStatus]);

  return (
    <>
      <div className="track-order-search-section">
        <div className="track-order-search-title">Search Order By Id</div>
        <div className="track-order-search-input-container">
          <input
            type="text"
            value={searchId}
            onChange={handleChange}
            placeholder="Search by order Id"
            className="track-order-search-input"
          />
          <button className="track-order-search-button" onClick={handleSearchData}>
            SEARCH
          </button>
        </div>
      </div>

      {order?.data ? (
        <div className="track-order-card">
          <div className="track-order-header">
            <div className="track-order-details-history">
              <div className="track-order-item-header">Order Number</div>
              <div className="track-order-item-header">Date Placed</div>
              <div className="track-order-item-header">Total Amount</div>
              <div className="track-order-item-header">Item :</div>

              <div className="track-order-item-value">{order?.data._id}</div>
              <div className="track-order-item-value">{new Date(order?.data?.createdAt).toDateString()}</div>
              <div className="track-order-item-value">₹{order?.data?.total}</div>
              <div className="track-order-item-value">{order?.data?.item?.length}</div>
            </div>
          </div>

          {order?.data.address.map((addressData, index) => (
            <div className="track-delivery-section" key={index}>
              <div>
                <h4>Delivery Address</h4>
                <p><strong>{addressData.type}</strong></p>
                <p>{addressData.street}, {addressData.city}- {addressData.postalCode}</p>
                <p>{addressData.state}, {addressData.country}</p>
                <p><strong>Phone number:</strong> {addressData.phoneNumber}</p>
              </div>
              <button
                className="track-btn track-change-address"
                onClick={() => handleChangeOrderAddress(order?.data?._id, addressData)}
              >
                Change Address
              </button>
            </div>
          ))}

          {/* Product Information */}
          {order?.data?.item?.length > 0 ? (
            order?.data.item.map((product) => (
              <div className="track-order-history" key={product.product._id}>
                <img src={product.product.thumbnail} alt="Product" />
                <div className="track-history-product-details">
                  <h4>{product.product.title}</h4>
                  <div className="track-product-price">₹{product.product.price}</div>
                  <p>{product.product.brand}</p>
                  <p>Qty: {product.quantity}</p>
                  <div className="track-product-description">
                    {product.product.description}
                  </div>
                  <div className="track-order-buttons">
                    <Link to={`/product-details/${product.product._id}`}>
                      <button className="track-btn">View Product</button>
                    </Link>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p>No items in this order</p>
          )}
          <p className="track-order-status">Status:  {order?.data.status}</p>
        </div>
      ) : (
        <h1 style={{textAlign:'center'}}>No orders available</h1>
      )}

      {openModal && (
        <ChangeOrderAddress
          openModal={openModal}
          selectedOrderId={selectedOrderId}
          closeModal={closeModal}
          setOpenModal={setOpenModal}
          orderAddressData={orderAddressData}
        />
      )}
    </>
  );
};

export default TrackOrderForm;
