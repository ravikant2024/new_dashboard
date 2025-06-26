import React, { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useForm } from 'react-hook-form';
import './checkout.css';
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux"
import { selectLoggedInUser } from "../../../features/auth/AuthSlice"
import { addAddressAsync, deleteAddressByIdAsync, fetchAddressByUserIdAsync, resetAddressAddStatus, resetAddressDeleteStatus, resetAddressStatus, selectAddressAddStatus, selectAddressDeleteStatus, selectAddresses, selectAddressStatus, updateAddressByIdAsync } from '../../address/AddressSlice';
import { toast } from 'react-toastify';
import { IoArrowBack } from "react-icons/io5";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import EditAddressModal from './EditAddressModal';
import { selectCartItems, updateCartItemByIdAsync } from '../../cart/CartSlice';
import { setOrder } from '../../orders/OrderDataSlice'
import { SHIPPING, TAXES } from '../../../constants';
import { CustomStorageManager } from '../../../classes/storageManager';
import { checkCouponCodeIssue, getAllCoupon } from '../../../adminpanel/coupon/CouponApi';
import { getAllCouponAsync, selectAllCoupons } from "../../../adminpanel/coupon/CouponSlice"
import { fetchShippingchargeByAddress, selectShippingChargeByAddress } from '../../../adminpanel/deliveryCharge/deliveryChargeSlice';

const baseURL = import.meta.env.VITE_API_BASE_URL_FRONTEND
const Checkout = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const [selectedAddress, setSelectedAddress] = useState(null);
  const shippingchargedata = useSelector(selectShippingChargeByAddress)
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('online')
  const cartItems = useSelector(selectCartItems);
  const addressAddStatus = useSelector(selectAddressAddStatus)
  const [isModalOpen, setIsModalOpen] = useState(false);
  // const [fetchEditAddressById, setFetchEditAddressById] = useState(null)
  const [guestUserAddress, setGuestUserAddress] = useState([])
  const [editingAddress, setEditingAddress] = useState(null);
  const loggedInUser = useSelector(selectLoggedInUser)
  const addressesData = useSelector(selectAddresses)
  const addressDeleteStatus = useSelector(selectAddressDeleteStatus)
  const [couponCode, setCouponCode] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [discountAmount, setDiscountAmount] = useState(0);
  const location = useLocation();
  const { product, quantity } = location.state || {};
  const isBuyNow = Boolean(product);
  const itemsToCheckout = isBuyNow ? [{ product, quantity }] : cartItems;

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "instant"
    })
  }, [])

  useEffect(() => {
    dispatch(getAllCouponAsync());

  }, [dispatch]);

  useEffect(() => {
    if (
      selectedAddress &&
      selectedAddress.city &&
      selectedAddress.state &&
      selectedAddress.country
    ) {
      const payload = {
        city: selectedAddress.city,
        state: selectedAddress.state,
        country: selectedAddress.country,
      };

      dispatch(fetchShippingchargeByAddress(payload));
    }
  }, [selectedAddress, dispatch]);


  // Fectch  user address 
  useEffect(() => {
    fetchAddressByUserIdAsync()
  }, [])

  useEffect(() => {
    if (addressAddStatus === 'fulfilled') {
      toast.success("Address added successfully!");
      reset();
    } else if (addressAddStatus === 'rejected') {
      toast.error("Address not added. Please try again.");
    }
  }, [addressAddStatus, reset]);

  useEffect(() => {
    if (addressDeleteStatus === 'fulfilled') {
      toast.success("Address deleted successfully!");
      dispatch(resetAddressDeleteStatus());
    } else if (addressDeleteStatus === 'rejected') {
      toast.error("Address not deleted");
      dispatch(resetAddressDeleteStatus());
    }
  }, [addressDeleteStatus, dispatch]);

  useEffect(() => {
    const savedAddresses = JSON.parse(localStorage.getItem('guestAddressesData')) || [];
    setGuestUserAddress(savedAddresses);
  }, []);

  useEffect(() => {
    const isGuest = loggedInUser?._id === import.meta.env.VITE_GUESTUSER_ID;
    const addressList = isGuest ? guestUserAddress : addressesData;
    if (!selectedAddress && addressList.length > 0) {
      setSelectedAddress(addressList[0]);
    }
  }, [guestUserAddress, addressesData, loggedInUser, selectedAddress]);


  const calculateTotal = () => {
    return itemsToCheckout.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  };

  // Tax calculation (18% tax rate)
  const calculateTax = (amount) => {
    return (amount * TAXES).toFixed(2);
  };

  // Function to calculate total and tax based on coupon status
  const getSubtotal = () => {
    return calculateTotal();
  };

  // Function to calculate total (including shipping and tax)
  const getTotal = () => {
    const subtotal = getSubtotal();
    const taxdata = parseFloat(calculateTax(subtotal));
    const shipping = parseFloat(shippingchargedata);
    return subtotal + taxdata + shipping - discountAmount;
  };


  // Function to calculate tax for display
  const getTax = () => {
    const subtotal = getSubtotal();
    return calculateTax(subtotal);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  // Edit guest user data //
  const handleEditGuestUserAddress = (id) => {
    let data = JSON.parse(localStorage.getItem("guestAddressesData")) || [];
    const item = data.find(item => item._id === id);
    setEditingAddress(item)
    setIsModalOpen(true);
  }
  // Delete guest user data //
  const handleDeleteGuestUserAddress = (id) => {
    const localAddresses = JSON.parse(localStorage.getItem('guestAddressesData')) || [];
    const deleteByIdAddresses = localAddresses.filter(address => address._id !== id);
    localStorage.setItem('guestAddressesData', JSON.stringify(deleteByIdAddresses));
    setGuestUserAddress(deleteByIdAddresses);
    if (deleteByIdAddresses.length > 0) {
      setSelectedAddress(deleteByIdAddresses[0]);
    } else {
      setSelectedAddress(null);
    }
  }
  // Function to handle form submission
  const handleaAddress = (data) => {
    const addressData = {
      type: data.type,
      street: data.street,
      country:data.country,
      phoneNumber: data.phoneNumber,
      city: data.city,
      state:data.state,
      postalCode: data.postalCode,
      email: data.email,
      bussinessAddress: {
        gstNumber: data.gstNumber,
        gstCompanyName: data.gstCompanyName,
        gstAddress: data.gstAddress
      }
    }
    if (loggedInUser._id === import.meta.env.VITE_GUESTUSER_ID) {
      const guestAddress = { ...addressData, user: loggedInUser._id, _id: uuidv4() };
      const existingGuestAddresses = JSON.parse(localStorage.getItem('guestAddressesData')) || [];
      const addedGuestAddresses = [...existingGuestAddresses, guestAddress];
      localStorage.setItem('guestAddressesData', JSON.stringify(addedGuestAddresses));
      setGuestUserAddress(addedGuestAddresses)

    } else {
      const address = { ...addressData, user: loggedInUser._id };
      dispatch(addAddressAsync(address));
    }
    reset();
  };

  // Reset form fields
  const handleReset = () => {
    reset();
  };

  // Edit address 
  const handleEditAddress = (addressId) => {
    const data = addressesData.find((address) => address._id === addressId);
    setEditingAddress(data)
    setIsModalOpen(true);
  };

  // Delete address
  const handleDeleteAddress = (id) => {
    dispatch(deleteAddressByIdAsync(id))
    setSelectedAddress()
  }

  // Decrease Quantity

  const handleDecreaseQty = (id) => {
    if (isBuyNow) return;
    const item = cartItems.find(item => item._id === id);
    if (item) {
      const newQty = item.quantity - 1;
      const updatedItem = { _id: id, quantity: newQty };
      dispatch(updateCartItemByIdAsync(updatedItem));
    }
  };

  // Increase Quantity
  const handleIncreaseQty = (id) => {
    if (isBuyNow) return;
    const item = cartItems.find(item => item._id === id);
    if (item) {
      const updatedItem = { ...item, quantity: item.quantity + 1 };
      dispatch(updateCartItemByIdAsync(updatedItem));
    }
  };

  // Handle Apply Coupon Logic
  const handleApplyCoupon = async () => {
    if (!couponCode) {
      return toast.error("Please enter a coupon code");
    }

    if (!loggedInUser?._id) {
      return toast.error("User not found");
    }

    const guestUserId = import.meta.env.VITE_GUESTUSER_ID;
    if (loggedInUser._id === guestUserId) {
      return toast.error("Guest users cannot apply coupons");
    }

    try {
      const res = await getAllCoupon();
      const coupons = res.data;

      const coupon = coupons.find(
        c => c.couponId.toLowerCase() === couponCode.trim().toLowerCase()
      );

      if (!coupon) {
        return toast.error("Invalid coupon code");
      }

      const checkRes = await checkCouponCodeIssue(coupon._id, loggedInUser._id);
      if (!checkRes.success) {
        return toast.error(checkRes.message || "Coupon not valid");
      }

      const now = Date.now();
      if (coupon.startDate && now < new Date(coupon.startDate).getTime()) {
        return toast.error("Coupon not active yet");
      }

      if (coupon.endDate && now > new Date(coupon.endDate).getTime()) {
        return toast.error("Coupon has expired");
      }

      const subtotal = getSubtotal();
      let discount = 0;

      if (coupon.isPercentage) {
        discount = (subtotal * coupon.discountPercentage) / 100;
        if (coupon.maxMoneyDiscount && discount > coupon.maxMoneyDiscount) {
          discount = coupon.maxMoneyDiscount;
        }
      } else {
        discount = coupon.discountPercentage;
      }
      setAppliedCoupon(coupon);
      setDiscountAmount(discount);
      toast.success("Coupon applied successfully!");
      setCouponCode("");

    } catch (err) {
      toast.error(err?.message || "Failed to apply coupon");
    }
  };

  // Pay and order
  const handleCreateOrder = async () => {
    const orderTotal = getTotal();
    const order = {
      user: loggedInUser._id,
      address: selectedAddress,
      paymentMode: selectedPaymentMethod,
      total: orderTotal,
      email: loggedInUser.email,
      guestFlag: loggedInUser._id === import.meta.env.VITE_GUESTUSER_ID,
      item: itemsToCheckout.map(item => ({
        productId: item.product._id,
        quantity: item.quantity,
      })),
    };
    if (loggedInUser._id === import.meta.env.VITE_GUESTUSER_ID) {
      if (selectedPaymentMethod === 'online') {
        const order = {
          user: loggedInUser._id,
          address: {
            city: selectedAddress.city,
            country: selectedAddress.country,
            id: selectedAddress.id,
            phoneNumber: selectedAddress.phoneNumber,
            postalCode: selectedAddress.postalCode,
            state: selectedAddress.state,
            street: selectedAddress.street,
            type: selectedAddress.type,
            user: selectedAddress.user,
          },
          paymentMode: selectedPaymentMethod,
          total: orderTotal,
          guestFlag: loggedInUser._id === import.meta.env.VITE_GUESTUSER_ID,
          item: itemsToCheckout.map(item => ({
            productId: item.product._id,
            quantity: item.quantity,
          })),
        }
        const payload = {
          address: order.address,
          products: order.item,
          returnUrl: `${baseURL}/order-success`,
          userId: order.user,
          guestFlag: order.guestFlag,
          paymentMode: selectedPaymentMethod,
          // total: orderTotal + SHIPPING + TAXES,
          total: orderTotal,
          email: selectedAddress.email,
          user: loggedInUser._id,
          item: itemsToCheckout,
        }
        dispatch(setOrder(order));
        await CustomStorageManager.store('getOrderData', JSON.stringify(payload));
        navigate('/payment_page', { state: { payload } });
      }
    }
    else {
      if (selectedPaymentMethod === 'online') {
        const address = {
          city: order.address.city,
          state: order.address.state,
          street: order.address.street,
          postalCode: order.address.postalCode,
          phoneNumber: order.address.phoneNumber,
          type: order.address.type,
          country: order.address.country
        }
        const payload = {
          address: address,
          products: order.item,
          returnUrl: `${baseURL}/order-success`,
          userId: order.user,
          guestFlag: order.guestFlag,
          paymentMode: selectedPaymentMethod,
          total: orderTotal,
          email: loggedInUser.email,
          user: loggedInUser._id,
          item: itemsToCheckout,
        }
        dispatch(setOrder(order));
        await CustomStorageManager.store('getOrderData', JSON.stringify(payload));
        navigate('/payment_page', { state: { payload } });
      }
    }
  }

  return (
    <>
      <div className="checkout-container">
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
          <Link to='/cart'>  <IoArrowBack size={40} style={{ color: 'black' }} />
          </Link>
          <h1 style={{ marginLeft: '10px', fontSize: '20px' }}>Shipping Address</h1>
        </div>
        {/* Add address */}
        <div className="address-form">
          <form onSubmit={handleSubmit(handleaAddress)}>
            <div className="name-fields">
              <div className="form-group">
                <label htmlFor="firstName">First Name *</label>
                <input
                  type="text"
                  id="firstName"
                  placeholder='Enter your name'
                  {...register("type", {
                    required: "First Name is required", pattern: {
                      value: /^[a-zA-Z\s]*$/,
                      message: "Only letters are allowed",
                    },
                  })}
                  onInput={(e) => {
                    e.target.value = e.target.value.replace(/[^a-zA-Z\s]/g, '');
                  }}
                />
                {errors.type && <p className="error">{errors.type.message}</p>}
              </div>
              <div className="form-group">
                <label htmlFor="street">Street Address *</label>
                <input
                  type="text"
                  id="street"
                  placeholder='Enter street'
                  {...register("street", {
                    required: "Street Address is required",
                    minLength: {
                      value: 2,
                      message: "Street number must be at least 2 digits"
                    },

                  })}
                />
                {errors.street && <p className="error">{errors.street.message}</p>}
              </div>
            </div>
            {loggedInUser?._id == import.meta.env.VITE_GUESTUSER_ID && (
              <div className="form-group">
                <label htmlFor="email">Email *</label>
                <input
                  type="text"
                  id="email"
                  placeholder='Enter your email'
                  {...register("email", {
                    required: "Email is required", pattern: {
                      value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                      message: "Invalid email address",
                    },
                  })}
                />
                {errors.email && <p className="error">{errors.email.message}</p>}
              </div>
            )}

            <div className="name-fields">
              <div className="form-group">
                <label htmlFor="city">City *</label>
                <input
                  type="text"
                  id="city"
                  placeholder='Enter city'
                  {...register("city", {
                    required: "City is required", pattern: {
                      value: /^[a-zA-Z\s]*$/,
                      message: "Only letters are allowed",
                    },
                  })}
                  onInput={(e) => {
                    e.target.value = e.target.value.replace(/[^a-zA-Z\s]/g, '');
                  }}
                />
                {errors.city && <p className="error">{errors.city.message}</p>}
              </div>
              <div className="form-group">
                <label htmlFor="state">State *</label>
                <input
                  type="text"
                  id="state"
                  placeholder='Enter state'
                  {...register("state", {
                    required: "State is required", pattern: {
                      value: /^[a-zA-Z\s]*$/,
                      message: "Only letters are allowed",
                    },
                  })}
                  onInput={(e) => {
                    e.target.value = e.target.value.replace(/[^a-zA-Z\s]/g, '');
                  }}
                />
                {errors.state && <p className="error">{errors.state.message}</p>}
              </div>
            </div>
            <div className="name-fields">
              <div className="form-group">
                <label htmlFor="country">Country *</label>
                <input
                  type="text"
                  id="country"
                  placeholder='Enter country name'
                  {...register("country", {
                    required: "Country is required", pattern: {
                      value: /^[a-zA-Z\s]*$/,
                      message: "Only letters are allowed",
                    },
                  })}
                  onInput={(e) => {
                    e.target.value = e.target.value.replace(/[^a-zA-Z\s]/g, '');
                  }}
                />
                {errors.country && <p className="error">{errors.country.message}</p>}
              </div>
              <div className="form-group">
                <label htmlFor="phone">Phone Number *</label>
                <input
                  type="text"
                  inputMode="numeric"
                  maxLength={12}
                  id="phone"
                  placeholder="Enter phone number"
                  {...register("phoneNumber", {
                    required: "Phone Number is required",
                    minLength: {
                      value: 10,
                      message: "Phone number must be at least 10 digits",
                    },
                    maxLength: {
                      value: 12,
                      message: "Phone number must not exceed 12 digits",
                    },
                    pattern: {
                      value: /^\d+$/, // Only digits
                      message: "Only numeric digits are allowed",
                    },
                  })}
                  onInput={(e) => {
                    e.target.value = e.target.value.replace(/[^0-9]/g, '');
                  }}
                />

                {errors.phoneNumber && <p className="error">{errors.phoneNumber.message}</p>}
              </div>
            </div>

            <div className="name-fields">
              <div className="form-group">
                <label htmlFor="postalCode">Postal Code *</label>
                <input
                  type="text"
                  inputMode="numeric"
                  id="postalCode"
                  placeholder="Enter postal code"
                  maxLength={6}
                  {...register("postalCode", {
                    required: "Postal Code is required",
                    minLength: {
                      value: 6,
                      message: "Postal code must be exactly 6 digits",
                    },
                    maxLength: {
                      value: 6,
                      message: "Postal code must be exactly 6 digits",
                    },
                    pattern: {
                      value: /^\d{6}$/,
                      message: "Only numeric digits are allowed (6 digits)",
                    },
                  })}
                  onInput={(e) => {
                    e.target.value = e.target.value.replace(/\D/g, "");
                  }}
                />
                {errors.postalCode && <p className="error">{errors.postalCode.message}</p>}
              </div>

              <div className="form-group">
                <label htmlFor="gstNumber">GST Number (Optional)</label>
                <input
                  type="text"
                  placeholder="Enter GST Number"
                  maxLength={15}
                  id="gstNumber"
                  {...register("gstNumber", {
                    pattern: {
                      value: /^(\d{2}[A-Z]{5}\d{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1})?$/,
                      message: "Please enter a valid 15-character GST Number",
                    },
                  })}
                />
                {errors.gstNumber && <p className="error">{errors.gstNumber.message}</p>}
              </div>

            </div>

            <div className="name-fields">
              <div className="form-group">
                <label htmlFor="companyName">Company Name (Optional)</label>
                <input
                  type="text"
                  id="gstCompanyName"
                  placeholder='Enter Company name'
                  {...register("gstCompanyName", {
                    required: false,
                    pattern: {
                      value: /^(?!\d+$).*/,
                      message: "Company Name cannot consist of only numbers.",
                    }
                  })}
                />
                {errors.gstCompanyName && <p className="error">{errors.gstCompanyName.message}</p>}
              </div>
              <div className="form-group ">
                <label htmlFor="businessName">Business Address (Optional)</label>
                <textarea
                  rows="4"
                  type="text"
                  className='textarea'
                  id="gstAddress"
                  placeholder='Enter Business Address '
                  {...register("gstAddress", {
                    required: false,
                    pattern: {
                      value: /^(?!\d+$).*/,
                      message: "Company address cannot consist of only numbers.",
                    },
                  })}
                />
                {errors.gstAddress && <p className="error">{errors.gstAddress.message}</p>}
              </div>
            </div>

            {/* Submit button Container */}
            <div className="button-container">
              <button type="submit" className="add-button">Submit</button>
              <button type="button" onClick={handleReset} className="reset-button">Reset</button>
            </div>
          </form>
        </div>

        {/* Display Predefined Addresses with Radio Buttons */}
        <div className="shipping-address-header">
          <h3>Choose from Existing Addresses</h3>
        </div>
        <div className="address-list">
          {(loggedInUser?._id === import.meta.env.VITE_GUESTUSER_ID && guestUserAddress) ? (
            guestUserAddress.map((address) => (
              <div className="shipping-address" key={address._id}>
                <div className="radio-label-wrapper">
                  <input
                    type="radio"
                    name="shipping-address"
                    id={`address-${address._id}`}
                    checked={selectedAddress?._id === address._id}
                    onChange={() => setSelectedAddress(address)}
                  />
                  <label htmlFor={`address-${address._id}`}>
                    <p><strong>Name:</strong> {address.type}</p>
                    <p><strong>Street:</strong> {address.street}</p>
                    <p><strong>Country:</strong> {address.country}</p>
                    <p><strong>Phone:</strong> {address.phoneNumber}</p>
                    <p><strong>Email:</strong> {address.email}</p>
                    <p><strong>City:</strong> {address.city}</p>
                    <p><strong>State:</strong> {address.state}</p>
                    <p><strong>Postal Code:</strong> {address.postalCode}</p>
                    <p><strong>GST Number:</strong> {address.bussinessAddress.gstNumber}</p>
                    <p><strong>Company Name:</strong> {address.bussinessAddress.gstCompanyName}</p>
                    <p><strong>Business Address:</strong> {address.bussinessAddress.gstAddress}</p>
                    <p><strong>Business ID:</strong> {address.bussinessAddress._id}</p>
                  </label>
                </div>
                <div className="address-actions">
                  <FaEdit size={20} className="edit-btn" title="edit" onClick={() => handleEditGuestUserAddress(address._id)} />
                  <MdDelete size={20} className="remove-btn" title="remove" onClick={() => handleDeleteGuestUserAddress(address._id)} />
                </div>
              </div>
            ))
          ) : (
            addressesData.map((address) => (
              <div className="shipping-address" key={address._id}>
                <div className="radio-label-wrapper">
                  <input
                    type="radio"
                    name="shipping-address"
                    id={`address-${address._id}`}
                    checked={selectedAddress?._id === address._id}
                    onChange={() => setSelectedAddress(address)}
                  />
                  <label htmlFor={`address-${address._id}`}>
                    <p><strong>Name:</strong> {address.type}</p>
                    <p><strong>Street:</strong> {address.street}</p>
                    <p><strong>Country:</strong> {address.country}</p>
                    <p><strong>Phone:</strong> {address.phoneNumber}</p>
                    <p><strong>City:</strong> {address.city}</p>
                    <p><strong>State:</strong> {address.state}</p>
                    <p><strong>Postal Code:</strong> {address.postalCode}</p>
                    <p><strong>GST Number:</strong> {address.bussinessAddress.gstNumber}</p>
                    <p><strong>Company Name:</strong> {address.bussinessAddress.gstCompanyName}</p>
                    <p><strong>Business Address:</strong> {address.bussinessAddress.gstAddress}</p>
                  </label>
                </div>
                <div className="address-actions">
                  <FaEdit size={20} className="edit-btn" title="edit" onClick={() => handleEditAddress(address._id)} />
                  <MdDelete size={20} className="remove-btn" title="remove" onClick={() => handleDeleteAddress(address._id)} />
                </div>
              </div>
            ))
          )}
        </div>
        {/* Order summary */}
        <div className='main-order-container'>
          <h2 className='order-heading'>Order Summary</h2>
          {
            itemsToCheckout.length > 0 ? (
              <>
                <div className="order-list">
                  <div className="order-items">
                    {
                      itemsToCheckout.map((items, index) => (
                        <div className="order-item" key={index}>
                          <img src={items.product.thumbnail} alt={items.product.thumbnail} />
                          <div className="order-details">
                            <div className="order-item-details">
                              <p>{items.product.title}</p>
                              <p className="order-item-price">{items.quantity} x ₹{items.product.price}</p>
                            </div>

                            <p className="order-brand">OILLP</p>
                            {!isBuyNow && (
                              <div className="order-quantity">
                                <button onClick={() => handleDecreaseQty(items._id)}>-</button>
                                <span>{items.quantity}</span>
                                <button onClick={() => handleIncreaseQty(items._id)}>+</button>
                              </div>
                            )}
                          </div>
                        </div>
                      ))
                    }
                  </div>


                </div>

                <div className='coupon-Order-Container'>
                  <div className='apply-coupon'>
                    <input
                      type="text"
                      placeholder="Enter coupon code"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                    />
                    <button
                      onClick={handleApplyCoupon}
                      className="apply-coupon-btn"

                    // style={{
                    //   cursor: couponApplyStatus === 'fulfilled' ? 'not-allowed' : 'pointer',
                    //   backgroundColor: couponApplyStatus === 'fulfilled' ? '#7575a3' : '#4CAF50'
                    // }}
                    >
                      {/* {couponApplyStatus === 'fulfilled' ? 'Coupon Applied' : 'Apply Coupon'} */}
                      Apply Coupon
                    </button>
                    {appliedCoupon && (
                      <div className="coupon-success-message">
                        <span>Coupon Code Applied!</span>
                      </div>
                    )}
                    {/* {couponApplyStatus === 'fulfilled' && (
                <div className="coupon-success-message">
                  <span>Coupon Applied Successfully!</span>
                </div>
              )} */}
                    {/* {couponApplyStatus === 'rejected' && (
                <div className="coupon-error-message">
                  <span>Coupon code is either invalid or expired.</span>
                </div>
              )} */}
                  </div>

                  <div className="order-summary" style={{ flexShrink: 0 }}>
                    <div className="summary-row">
                      <p>Subtotal:</p>
                      <p>₹{calculateTotal()}</p>
                    </div>

                    <div className="summary-row">
                      <p>Shipping:</p>
                      {/* <p>₹150</p> */}
                      <p>₹{shippingchargedata}</p>
                    </div>
                    <div className="summary-row">
                      <p>Taxes (18%):</p>
                      <p>{getTax()}</p>
                    </div>
                    <div className="summary-row">
                      <p>Discount:</p>
                      <p>₹{discountAmount.toFixed(2)}</p>
                    </div>
                    <hr />
                    <div className="summary-row total">
                      <p>Total</p>
                      <p>{getTotal().toFixed(2)}</p>
                    </div>
                  </div>
                </div>
                {/* Payment Button */}
                <div className='order-payment'>
                  <button className='payandorder' onClick={handleCreateOrder}>PAY AND ORDER</button>
                </div>
              </>
            ) : <div className="checkoutempty-container">
              <div className='checkout-empty'>
                <h1>No Products avaibale in checkout </h1>
                <Link to="/"><button >Return to shop</button></Link>
              </div>
            </div>
          }

        </div>
      </div>

      <EditAddressModal
        isModalOpen={isModalOpen}
        onClose={closeModal}
        // addressData={fetchEditAddressById}
        loggedInUser={loggedInUser}
        editingAddress={editingAddress}
        setGuestUserAddress={setGuestUserAddress}
        setIsModalOpen={setIsModalOpen}
      />

    </>

  );
};

export default Checkout;
