import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import './BulkEnquiryForm.css';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch, useSelector } from 'react-redux';
import { createBulkEnquiryAsync, resetFormStatus, selectBulkEnquiryError, selectBulkEnquiryStatus } from '../BulkEnquirySlice';

const BulkEnquiryForm = () => {
  const dispatch = useDispatch();
  const error = useSelector(selectBulkEnquiryError);
  const status = useSelector(selectBulkEnquiryStatus);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    try {
      await dispatch(createBulkEnquiryAsync(data)).unwrap();
    } catch (err) {
      console.error('Error submitting contact form:', err);
    }
  };

  useEffect(() => {
    if (status === 'fulfilled') {
      toast.success('Message sent successfully!');
      reset();
    } else if (error) {
      toast.error(`Failed to send message: ${error}`);
    }
  }, [status, error, dispatch, reset]);

  useEffect(() => {
    return () => {
      dispatch(resetFormStatus());
    };
  }, [dispatch]);

  return (
    <div className="contact-container">
      <div className="contact-card">
        <h2>Looking to buy something?</h2>
        <p className="sub-heading">Tell us your requirment and get free quotes</p>
        <div className="contact-form">
          <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="firstName">First Name</label>
                <input
                  type="text"
                  placeholder="Enter your first name"
                  {...register('firstName', {
                    required: 'First Name is required',
                    pattern: {
                      value: /^[a-zA-Z\s]*$/,
                      message: 'Only letters are allowed',
                    },
                  })}
                  onInput={(e) => {
                    e.target.value = e.target.value.replace(/[^a-zA-Z\s]/g, '');
                  }}
                />
                {errors.firstName && <p className="error-message">{errors.firstName.message}</p>}
              </div>
              <div className="form-group">
                <label htmlFor="lastName">Last Name</label>
                <input
                  type="text"
                  placeholder="Enter your last name"
                  {...register('lastName', {
                    required: 'Last Name is required',
                    pattern: {
                      value: /^[a-zA-Z\s]*$/,
                      message: 'Only letters are allowed',
                    },
                  })}
                  onInput={(e) => {
                    e.target.value = e.target.value.replace(/[^a-zA-Z\s]/g, '');
                  }}
                />
                {errors.lastName && <p className="error-message">{errors.lastName.message}</p>}
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="email">Email Address</label>
                <input
                  type="email"
                  placeholder="Enter your email"
                  {...register('email', {
                    required: 'Email is required',
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: 'Invalid email address',
                    },
                  })}
                />
                {errors.email && <p className="error-message">{errors.email.message}</p>}
              </div>

              <div className="form-group">
                <label htmlFor="phone">Phone Number</label>
                <input
                  type="text"
                  maxLength={12}
                  id="phone"
                  placeholder="Enter phone number"
                  {...register('phone', {
                    required: 'Phone Number is required',
                    minLength: {
                      value: 10,
                      message: 'Phone number must be at least 10 digits',
                    },
                    maxLength: {
                      value: 12,
                      message: 'Phone number must not exceed 12 digits',
                    },
                    pattern: {
                      value: /^\d+$/,
                      message: 'Only numeric digits are allowed',
                    },
                  })}
                  onInput={(e) => {
                    e.target.value = e.target.value.replace(/[^0-9]/g, '');
                  }}
                />
                {errors.phone && <p className="error-message">{errors.phone.message}</p>}
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="company">Company Name (Optional)</label>
                <input
                  type="text"
                  placeholder="Enter your company name"
                  {...register('company', {
                    maxLength: {
                      value: 100,
                      message: 'Company name is too long',
                    },
                  })}
                />
                {errors.company && <p className="error-message">{errors.company.message}</p>}
              </div>
              <div className="form-group">
                <label htmlFor="gst">GST Number (Optional)</label>
                <input
                  type="text"
                  placeholder="Enter GST number"
                  maxLength={15}
                  {...register('gst', {
                    pattern: {
                      value: /^[0-9A-Z]{15}$/,
                      message: 'GST number must be 15 uppercase alphanumeric characters',
                    },
                  })}
                />
                {errors.gst && <p className="error-message">{errors.gst.message}</p>}
              </div>
            </div>
            <div>
              <div className="form-group">
                <label htmlFor="address">Address</label>
                <input
                  type="text"
                  placeholder="Enter your address"
                  {...register('address', {
                    required: 'Address is required',
                    maxLength: {
                      value: 200,
                      message: 'Address is too long',
                    },
                  })}
                />
                {errors.address && <p className="error-message">{errors.address.message}</p>}
              </div>
            </div>
            <div className="form-group full-width">
              <label htmlFor="message">Enter Product</label>
              <textarea
                className="textarea"
                rows="5"
                placeholder="Your Message"
                {...register('message', {
                  required: 'Please enter your message.',
                })}
              ></textarea>
              {errors.message && <p className="error-message">{errors.message.message}</p>}
            </div>


            <button type="submit" className="submit-button">
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default BulkEnquiryForm;
