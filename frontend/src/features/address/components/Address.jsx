import React, { useState } from 'react'
import "./Address.css"
import { deleteAddressByIdAsync, updateAddressByIdAsync } from '../AddressSlice'
import { useDispatch } from 'react-redux'
import { useForm } from 'react-hook-form'
const Address = ({ id, type, street, postalCode, country, phoneNumber, state, city, gstNumber, gstCompanyName, gstAddress }) => {
  const dispatch = useDispatch()
  const [edit, setEdit] = useState(false)
  const { register, handleSubmit, watch, reset, setValue, formState: { errors } } = useForm({
    defaultValues: {
      type: type || '',
      street: street || '',
      postalCode: postalCode || '',
      country: country || '',
      phoneNumber: phoneNumber || '',
      state: state || '',
      city: city || '',
      gstNumber: gstNumber || '',
      gstCompanyName: gstCompanyName || '',
      gstAddress: gstAddress || ''
    }
  })

  const handleUpdateAddress = (data) => {
    const profileAddressEdit = {
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
    const update = { ...profileAddressEdit, _id: id }
    setEdit(false)
    dispatch(updateAddressByIdAsync(update))
  }

  /// Remove address ///
  const handleRemoveAddress = () => {
    dispatch(deleteAddressByIdAsync(id))
  }


  return (
    <>
      {
        edit ? (
          <div className="address-form-container">
            <form onSubmit={handleSubmit(handleUpdateAddress)}>
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
                    placeholder="Enter phone number"
                    {...register("phoneNumber", {
                      required: "Phone Number is required",
                      pattern: {
                        value: /^\d+$/,
                        message: "Phone number must be numeric value",
                      },
                      minLength: {
                        value: 10,
                        message: "Phone number must be at least 10 digits",
                      },
                      maxLength: {
                        value: 10,
                        message: "Phone number maximum 10 digits",
                      },
                    })}
                  />
                  {errors.phone && <p className="error-message">{errors.phone.message}</p>}
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
                    placeholder="Enter postal code"
                    {...register("postalCode", {
                      required: "Postal Code is required",
                      minLength: {
                        value: 6,
                        message: "Postal code must be at least 6 digits",
                      },
                      maxLength: {
                        value: 6,
                        message: "Postal code must be at most 6 digits",
                      },
                    })}
                  />
                  {errors.postalCode && <p className="error-message">{errors.postalCode.message}</p>}
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
                  Update Address
                </button>
                <button type="button" className="reset-button" onClick={() => { setEdit(false); reset() }}>
                  Cancel
                </button>
              </div>
            </form>
          </div>

        ) : (
          <div className="address-card" key={id}>
            <div className="name">
              {type}
            </div>
            <div className="address-details">
              <p>Street -{street}</p>
              <p>Postal Code - {postalCode}</p>
              <p>Country - {country}</p>
              <p>Phone Number - {phoneNumber}</p>
              <p>State - {state}</p>
              <p>City - {city}</p>
              <p>GST Number -{gstNumber} </p>
              <p>Company Name - {gstCompanyName}</p>
              <p>Company Address -{gstAddress} </p>
            </div>
            <div className="actions">
              <button className="edit-button" onClick={() => setEdit(true)}>EDIT</button>
              <button className="remove-button" onClick={handleRemoveAddress}>REMOVE</button>
            </div>
          </div >
        )
      }

    </>
  )
}

export default Address
