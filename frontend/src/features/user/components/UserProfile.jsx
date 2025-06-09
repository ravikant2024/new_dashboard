import React, { useEffect, useState } from 'react';
import './UserProfile.css';
import { FaUserCircle } from "react-icons/fa";
import { selectUserInfo } from '../UserSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addAddressAsync, selectAddressAddStatus, selectAddressDeleteStatus, selectAddresses, selectAddressUpdateStatus } from '../../address/AddressSlice';
import Address from '../../address/components/Address';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify'
import { deleteuseraccount } from '../../auth/AuthApi';
import { logoutAsync } from '../../auth/AuthSlice';

const UserProfile = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [openAddForm, setOpenAddForm] = useState(false)
  const userInfo = useSelector(selectUserInfo);
  const addressesData = useSelector(selectAddresses)
  const addressAddStatus = useSelector(selectAddressAddStatus)
  const addressUpdateStatus = useSelector(selectAddressUpdateStatus)
  const addressDeleteStatus = useSelector(selectAddressDeleteStatus)
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, watch, reset, formState: { errors } } = useForm()

  useEffect(() => {
    if (addressAddStatus === 'fulfilled') {
      toast.success("Address added")
    }
    else if (addressAddStatus === 'rejected') {
      toast.error("Error adding address, please try again later")
    }
  }, [addressAddStatus])

  useEffect(() => {

    if (addressUpdateStatus === 'fulfilled') {
      toast.success("Address updated")
    }
    else if (addressUpdateStatus === 'rejected') {
      toast.error("Error updating address, please try again later")
    }
  }, [addressUpdateStatus])

  useEffect(() => {

    if (addressDeleteStatus === 'fulfilled') {
      toast.success("Address deleted")
    }
    else if (addressDeleteStatus === 'rejected') {
      toast.error("Error deleting address, please try again later")
    }
  }, [addressDeleteStatus])


  const openAddressForm = () => {
    setOpenAddForm(true)
  }
  const handleaAddress = (data) => {
    const addresses = {
      type: data.type,
      street: data.street,
      country: data.country,
      phoneNumber: data.phoneNumber,
      city: data.city,
      state: data.state,
      postalCode: data.postalCode,
      email: data.email,
      bussinessAddress: {
        gstNumber: data.gstNumber,
        gstCompanyName: data.gstCompanyName,
        gstAddress: data.gstAddress
      }
    }
    const address = { ...addresses, user: userInfo._id }
    dispatch(addAddressAsync(address))
    setOpenAddForm(false)
    reset()
  }

  const handleCancelClick = () => {
    setOpenAddForm(false);
  };

  // Delete account 

  const handleDeleteAccount = async () => {
    const confirmed = window.confirm("Are you sure you want to delete your account?");
    if (!confirmed) return;

    const payload = {
      email: userInfo.email,
    };

    try {
      // setLoading(true);
      const response = await deleteuseraccount(payload);

      if (response.status === 200) {
        toast.success(response.data.message);
        dispatch(logoutAsync());
        navigate('/');
      } else {
        toast.error("Error deleting account. Please try again.");
      }
    } catch (error) {
      toast.error("An error occurred while deleting your account. Please try again.");
    } finally {

    }
  };
  return (
    <>
      <div className="profile-container">
        <div className="profile-header">
          <h2>User Profile</h2>
        </div>

        <div className="profile-info">
          <div className="profile-picture">
            {/* You can replace this with user's image */}
            <FaUserCircle size={80} />
          </div>

          <div className="profile-details">
            <p> {userInfo?.name}</p>
            <p> {userInfo?.email}</p>
          </div>
          <button className="add-btn" onClick={openAddressForm}>Add Address</button>
        </div>
        {/* Conditionally render the add address form */}
        {openAddForm && (
          <div className="address-form-container">
            <form onSubmit={handleSubmit(handleaAddress)}>
              <div className="address-form-section">
                <div className="input-group">
                  <label htmlFor="firstName">First Name *</label>
                  <input
                    type="text"
                    id="firstName"
                    placeholder="Enter your name"
                    {...register("type", {
                      required: "First Name is required",
                      pattern: {
                        value: /^[a-zA-Z\s]*$/,
                        message: "Only letters are allowed",
                      },
                    })}
                    onInput={(e) => {
                      e.target.value = e.target.value.replace(/[^a-zA-Z\s]/g, '');
                    }}
                  />
                  {errors.type && <p className="error-message">{errors.type.message}</p>}
                </div>

                <div className="input-group">
                  <label htmlFor="street">Street Address *</label>
                  <input
                    type="text"
                    id="street"
                    placeholder="Enter street"
                    {...register("street", {
                      required: "Street Address is required",
                      minLength: {
                        value: 2,
                        message: "Street number must be at least 2 digit",
                      },
                    
                    })}
                  />
                  {errors.street && <p className="error-message">{errors.street.message}</p>}
                </div>
              </div>

              <div className="address-form-section">
                <div className="input-group">
                  <label htmlFor="country">Country *</label>
                  <input
                    type="text"
                    id="country"
                    placeholder="Enter country name"
                    {...register("country", {
                      required: "Country is required",
                      pattern: {
                        value: /^[a-zA-Z\s]*$/,
                        message: "Only letters are allowed",
                      },
                    })}
                    onInput={(e) => {
                      e.target.value = e.target.value.replace(/[^a-zA-Z\s]/g, '');
                    }}
                  />
                  {errors.country && <p className="error-message">{errors.country.message}</p>}
                </div>

                <div className="input-group">
                  <label htmlFor="phone">Phone Number *</label>
                  <input
                    type="text"
                    id="phone"
                    inputMode="numeric"
                    maxLength={12}
                    placeholder="Enter phone number"
                    onInput={(e) => {
                      // Remove non-numeric characters
                      e.target.value = e.target.value.replace(/[^0-9]/g, "");
                    }}
                    {...register("phoneNumber", {
                      required: "Phone Number is required",
                      pattern: {
                        value: /^\d{10,12}$/,
                        message: "Phone number must be between 10 to 12 digits",
                      },
                    })}
                  />
                  {errors.phoneNumber && (
                    <p className="error-message">{errors.phoneNumber.message}</p>
                  )}
                </div>

              </div>

              <div className="address-form-section">
                <div className="input-group">
                  <label htmlFor="city">City *</label>
                  <input
                    type="text"
                    id="city"
                    placeholder="Enter city"
                    {...register("city", {
                      required: "City is required",
                      pattern: {
                        value: /^[a-zA-Z\s]*$/,
                        message: "Only letters are allowed",
                      },
                    })}
                    onInput={(e) => {
                      e.target.value = e.target.value.replace(/[^a-zA-Z\s]/g, '');
                    }}
                  />
                  {errors.city && <p className="error-message">{errors.city.message}</p>}
                </div>

                <div className="input-group">
                  <label htmlFor="state">State *</label>
                  <input
                    type="text"
                    id="state"
                    placeholder="Enter state"
                    {...register("state", {
                      required: "State is required",
                      pattern: {
                        value: /^[a-zA-Z\s]*$/,
                        message: "Only letters are allowed",
                      },
                    })}
                    onInput={(e) => {
                      e.target.value = e.target.value.replace(/[^a-zA-Z\s]/g, '');
                    }}
                  />
                  {errors.state && <p className="error-message">{errors.state.message}</p>}
                </div>
              </div>

              <div className="address-form-section">
                <div className="input-group">
                  <label htmlFor="postalCode">Postal Code *</label>
                  <input
                    type="text"
                    id="postalCode"
                    inputMode="numeric"
                    maxLength={6}
                    placeholder="Enter 6-digit postal code"
                    onInput={(e) => {
                      // Remove non-numeric characters and limit to 6 digits
                      e.target.value = e.target.value.replace(/[^0-9]/g, "").slice(0, 6);
                    }}
                    {...register("postalCode", {
                      required: "Postal Code is required",
                      pattern: {
                        value: /^\d{6}$/,
                        message: "Postal code must be exactly 6 digits",
                      },
                    })}
                  />
                  {errors.postalCode && (
                    <p className="error-message">{errors.postalCode.message}</p>
                  )}
                </div>


                <div className="input-group">
                  <label htmlFor="gstNumber">GST Number (Optional)</label>
                  <input
                    type="text"
                    id="gstNumber"
                    placeholder="Enter GST Number"
                    {...register("gstNumber", {
                      pattern: {
                        value: /^(?!\d+$).*/,
                        message: "Kindly provide me correct GST Number",
                      },
                    })}
                  />
                  {errors.gstNumber && <p className="error-message">{errors.gstNumber.message}</p>}
                </div>
              </div>

              <div className="address-form-section">
                <div className="input-group">
                  <label htmlFor="companyName">Company Name (Optional)</label>
                  <input
                    type="text"
                    id="gstCompanyName"
                    placeholder="Enter Company name"
                    {...register("gstCompanyName", {
                      required: false,
                      pattern: {
                        value: /^(?!\d+$).*/,
                        message: "Company Name cannot consist of only numbers.",
                      },
                    })}
                    onInput={(e) => {
                      e.target.value = e.target.value.replace(/[^a-zA-Z\s]/g, '');
                    }}
                  />
                  {errors.gstCompanyName && <p className="error-message">{errors.gstCompanyName.message}</p>}
                </div>

                <div className="input-group">
                  <label htmlFor="businessName">Business Address (Optional)</label>
                  <textarea
                    rows={4}
                    cols={70}
                    id="gstAddress"
                    placeholder="Enter Business Address"
                    {...register("gstAddress", {
                      required: false,
                      pattern: {
                        value: /^(?!\d+$).*/,
                        message: "Company address cannot consist of only numbers.",
                      },
                    })}
                  />
                  {errors.gstAddress && <p className="error-message">{errors.gstAddress.message}</p>}
                </div>
              </div>

              <div className="form-actions">
                <button type="submit" className="submit-button">
                  Submit
                </button>
                <button type="button" className="reset-button" onClick={handleCancelClick}>
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Address show  */}
        {
          addressesData.map((address) => {
            return (
              <Address key={address._id} id={address._id} city={address.city} country={address.country} phoneNumber={address.phoneNumber} postalCode={address.postalCode} state={address.state} street={address.street} type={address.type}
                gstNumber={address.bussinessAddress.gstNumber}
                gstCompanyName={address.bussinessAddress.gstCompanyName}
                gstAddress={address.bussinessAddress.gstAddress} />
            )
          })
        }

        <button onClick={handleDeleteAccount} className='delete-btn-account'>Delete Account</button>

      </div>
    </>
  );
}

export default UserProfile;

