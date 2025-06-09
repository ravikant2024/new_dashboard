import React from 'react';
import { useForm } from 'react-hook-form'; // Import useForm from RHF
import '../../../css/EditAddressModal.css';
import { updateOrderById } from '../OrderApi';
import { updateOrderByIdAsync } from '../OrderSlice';
import { useDispatch } from 'react-redux';

const EditAddressModal = ({ isModalOpen, orderAddressData, closeModal, selectedOrderId,setIsModalOpen }) => {
    const dispatch = useDispatch()
    // Using react-hook-form to manage form state and validation
    const { register, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
            type: orderAddressData?.type || '',
            street: orderAddressData?.street || '',
            postalCode: orderAddressData?.postalCode || '',
            country: orderAddressData?.country || '',
            phoneNumber: orderAddressData?.phoneNumber || '',
            state: orderAddressData?.state || '',
            city: orderAddressData?.city || ''
        }
    });

    // Function to handle form submission
    const onSubmit =async (data) => {
            const changeAdddressData = {
                _id: selectedOrderId,
                address: {
                    type: data.type,
                    street: data.street,
                    postalCode: data.postalCode,
                    country: data.country,
                    phoneNumber: data.phoneNumber,
                    state: data.state,
                    city: data.city,
                }
            }
            await updateOrderById(changeAdddressData)
            dispatch(updateOrderByIdAsync(changeAdddressData))
            setIsModalOpen(false)
    
        };
      
    // If modal is closed, return null
    if (!isModalOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="modal">
                <div className="modal-header">
                    <h2>Change Address</h2>
                    <button className="close-form-modal" onClick={closeModal}>&times;</button>
                </div>
                <form onSubmit={handleSubmit(onSubmit)} className="form-container">
                    {/* Wrap Name and Street in form-row */}
                    <div className="form-row">
                        <div className="form-group">
                            <label htmlFor="name">Name</label>
                            <input
                                type="text"
                                id="name"
                                {...register('type', { required: 'Name is required' })}
                            />
                            {errors.type && <p className="error">{errors.type.message}</p>}
                        </div>
                        <div className="form-group">
                            <label htmlFor="street">Street</label>
                            <input
                                type="text"
                                id="street"
                                {...register('street', { required: 'Street is required' })}
                            />
                            {errors.street && <p className="error">{errors.street.message}</p>}
                        </div>
                    </div>
                    {/* Wrap PostalCode and Country in form-row */}
                    <div className="form-row">
                        <div className="form-group">
                            <label htmlFor="postalCode">Postal Code</label>
                            <input
                                type="text"
                                id="postalCode"
                                {...register('postalCode', { required: 'Postal Code is required' })}
                            />
                            {errors.postalCode && <p className="error">{errors.postalCode.message}</p>}
                        </div>
                        <div className="form-group">
                            <label htmlFor="country">Country</label>
                            <input
                                type="text"
                                id="country"
                                {...register('country', { required: 'Country is required' })}
                            />
                            {errors.country && <p className="error">{errors.country.message}</p>}
                        </div>
                    </div>
                    {/* Wrap Phone Number and State in form-row */}
                    <div className="form-row">
                        <div className="form-group">
                            <label htmlFor="phoneNumber">Phone Number</label>
                            <input
                                type="text"
                                id="phoneNumber"
                                {...register('phoneNumber', { required: 'Phone Number is required' })}
                            />
                            {errors.phoneNumber && <p className="error">{errors.phoneNumber.message}</p>}
                        </div>
                        <div className="form-group">
                            <label htmlFor="state">State</label>
                            <input
                                type="text"
                                id="state"
                                {...register('state', { required: 'State is required' })}
                            />
                            {errors.state && <p className="error">{errors.state.message}</p>}
                        </div>
                    </div>
                    {/* City Input Field */}
                    <div className="form-group">
                        <label htmlFor="city">City</label>
                        <input
                            type="text"
                            id="city"
                            {...register('city', { required: 'City is required' })}
                        />
                        {errors.city && <p className="error">{errors.city.message}</p>}
                    </div>
                    {/* Submit Button */}
                    <button type="submit" className="save-button">SAVE CHANGES</button>
                </form>
            </div>
        </div>
    );
};

export default EditAddressModal;
