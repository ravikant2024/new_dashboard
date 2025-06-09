import React, { useEffect } from "react";
import "./Modal.css";
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from "react-redux";
import { resetAddressUpdateStatus, selectAddressUpdateStatus, updateAddressByIdAsync } from "../../address/AddressSlice";
import { toast } from "react-toastify";

const EditAddressModal = ({ isModalOpen, onClose, loggedInUser, editingAddress, setGuestUserAddress, setIsModalOpen }) => {
  const dispatch = useDispatch()
  const updateAddressStatus = useSelector(selectAddressUpdateStatus)
  const { register, handleSubmit, formState: { errors }, reset } = useForm();

  useEffect(() => {
    if (updateAddressStatus === 'fulfilled') {
      toast.success("Updated address successfully!");
      onClose();
      dispatch(resetAddressUpdateStatus());
    } else if (updateAddressStatus === 'rejected') {
      toast.error("Address not updated");
      dispatch(resetAddressUpdateStatus());
    }
  }, [updateAddressStatus, dispatch, onClose]);

  // Set the form values when the modal is opened
  useEffect(() => {
    if (isModalOpen && editingAddress) {
      reset({
        type: editingAddress.type || '',
        street: editingAddress.street || '',
        country: editingAddress.country || '',
        email: editingAddress.email || '',
        phoneNumber: editingAddress.phoneNumber || '',
        city: editingAddress.city || '',
        state: editingAddress.state || '',
        postalCode: editingAddress.postalCode || '',
        gstNumber: editingAddress?.bussinessAddress?.gstNumber || '',
        gstCompanyName: editingAddress?.bussinessAddress?.gstCompanyName || '',
        gstAddress: editingAddress?.bussinessAddress?.gstAddress || ''
      });
    }
  }, [isModalOpen, editingAddress, reset]);


  // Handle the save action
  const onSubmit = (formData) => {
    const addressEditData = {
      type: formData.type,
      street: formData.street,
      country: formData.country,
      phoneNumber: formData.phoneNumber,
      city: formData.city,
      state: formData.state,
      postalCode: formData.postalCode,
      email: formData.email,
      bussinessAddress: {
        gstNumber: formData.gstNumber,
        gstCompanyName: formData.gstCompanyName,
        gstAddress: formData.gstAddress
      }
    }
    const update = { ...addressEditData, _id: editingAddress._id }
    let guestAddresses = JSON.parse(localStorage.getItem("guestAddressesData")) || [];
    const index = guestAddresses.findIndex(item => item.id === editingAddress.id);
    if (index !== -1) {
      guestAddresses[index] = { ...guestAddresses[index], ...update };
      localStorage.setItem("guestAddressesData", JSON.stringify(guestAddresses));
      setGuestUserAddress([...guestAddresses])
      setIsModalOpen(false);
    } else {

      dispatch(updateAddressByIdAsync(update))
    }
  };

  if (!isModalOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="modal-close" onClick={onClose}>X</button>
        <h2>Edit Address</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="input-group">
            <div className="form-field">
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
              {errors.type && <span>{errors.type.message}</span>}
            </div>
            <div className="form-field">
              <label htmlFor="street">Street Address *</label>
              <input
                type="text"
                id="street"
                placeholder="Enter street"
                {...register("street", { required: "Street address is required", minLength: { value: 1, message: "Street address is too short" } })}
              />
              {errors.street && <span>{errors.street.message}</span>}
            </div>
          </div>
          {loggedInUser._id == import.meta.env.VITE_GUESTUSER_ID && (
            <div className="input-group">
              <div className="form-field">
                <label htmlFor="email">Email *</label>
                <input
                  type="text"
                  id="email"
                  placeholder="Enter email"
                  {...register("email", {
                    required: "email is required", pattern: {
                      value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                      message: "Invalid email"
                    }
                  })}
                />
                {errors.email && <span>{errors.email.message}</span>}
              </div>
            </div>
          )}

          <div className="input-group">
            <div className="form-field">
              <label htmlFor="country">Country *</label>
              <input
                type="text"
                id="country"
                placeholder="Enter country name"
                {...register("country", {
                  required: "Country is required", pattern: {
                    value: /^[a-zA-Z\s]*$/,
                    message: "Invalid country"
                  }
                })}
                onInput={(e) => {
                  e.target.value = e.target.value.replace(/[^a-zA-Z\s]/g, '');
                }}
              />
              {errors.country && <span>{errors.country.message}</span>}
            </div>
            <div className="form-field">
              <label htmlFor="phone">Phone Number *</label>
              <input
                type="text"
                id="phone"
                placeholder="Enter phone number"
                {...register("phoneNumber", { required: "Phone number is required", pattern: { value: /^\d{10}$/, message: "Invalid phone number" } })}
                onInput={(e) => {
                  e.target.value = e.target.value.replace(/[^0-9]/g, '');
                }}
              />
              {errors.phoneNumber && <span>{errors.phoneNumber.message}</span>}
            </div>
          </div>

          <div className="input-group">
            <div className="form-field">
              <label htmlFor="city">City *</label>
              <input
                type="text"
                id="city"
                placeholder="Enter city"
                {...register("city", { required: "City is required", pattern: { value: /^[a-zA-Z\s]*$/, message: "Invalid city" } })}
                onInput={(e) => {
                  e.target.value = e.target.value.replace(/[^a-zA-Z\s]/g, '');
                }}
              />
              {errors.city && <span>{errors.city.message}</span>}
            </div>

            <div className="form-field">
              <label htmlFor="state">State *</label>
              <input
                type="text"
                id="state"
                placeholder="Enter state"
                {...register("state", { required: "State is required", pattern: { value: /^[a-zA-Z\s]*$/, message: "Invalid state" } })}
                onInput={(e) => {
                  e.target.value = e.target.value.replace(/[^a-zA-Z\s]/g, '');
                }}
              />
              {errors.state && <span>{errors.state.message}</span>}
            </div>
          </div>

          <div className="input-group">
            <div className="form-field">
              <label htmlFor="postalCode">Postal Code *</label>
              <input
                type="text"
                id="postalCode"
                placeholder="Enter postal code"
                {...register("postalCode", { required: "Postal code is required", minLength: { value: 6, message: "Invalid postal code" }, maxLength: { value: 6, message: "Invalid postal code" } })}
                onInput={(e) => {
                  e.target.value = e.target.value.replace(/\D/g, "");
                }}
              />
              {errors.postalCode && <span>{errors.postalCode.message}</span>}
            </div>

            <div className="form-field">
              <label htmlFor="gstNumber">GST Number (Optional)</label>
              <input
                type="text"
                id="gstNumber"
                placeholder="Enter GST Number"
                {...register("gstNumber", { pattern: { value: /^(?!\d+$).*$/, message: "Invalid GST Number" } })}
              />
              {errors.gstNumber && <span>{errors.gstNumber.message}</span>}
            </div>
          </div>

          <div className="input-group">
            <div className="form-field">
              <label htmlFor="gstCompanyName">Company Name (Optional)</label>
              <input
                type="text"
                id="gstCompanyName"
                placeholder="Enter Company name"
                {...register("gstCompanyName", { pattern: { value: /^(?!\d+$).*$/, message: "Invalid company name" } })}
              />
              {errors.gstCompanyName && <span>{errors.gstCompanyName.message}</span>}
            </div>

            <div className="form-field">
              <label htmlFor="gstAddress">Business Address (Optional)</label>
              <textarea
                rows={4}
                cols={30}
                type="text"
                id="gstAddress"
                placeholder="Enter Business Address"
                {...register("gstAddress", { pattern: { value: /^(?!\d+$).*$/, message: "Invalid business address" } })}
              />
              {errors.gstAddress && <span >{errors.gstAddress.message}</span>}
            </div>
          </div>

          <div>
            <button type="submit" className="update-submit">Update Address</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditAddressModal;
