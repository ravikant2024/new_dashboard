import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { TextField, Button, MenuItem, Select, InputLabel, FormControl, FormHelperText, Container, Box, Typography } from '@mui/material';
import { clearCouponError, clearCouponSuccessMessage, createCouponAsync, selectAddStatus, selectCouponError } from '../CouponSlice';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

// Discount types array
const discountTypes = [
  { value: 'percentage', label: 'Percentage' },
  { value: 'fixed', label: 'Fixed' },
];

const AddCoupon = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const addCouponStatus = useSelector(selectAddStatus);
  const errorStatus = useSelector(selectCouponError);

  useEffect(() => {
    if (addCouponStatus === "fulfilled") {
      toast.success('Coupon created successfully!');
      reset();
      dispatch(clearCouponSuccessMessage());
      navigate('/admin-dashboard/list-coupon');  
    }

    if (addCouponStatus === "rejected" && errorStatus) {
      toast.error(`Error: ${errorStatus}`);
      dispatch(clearCouponError());
    }
  }, [addCouponStatus, errorStatus, dispatch, reset, navigate]); 

  // Handle form submit
  const onSubmit = (data) => {
    const formattedData = {
      couponId: data.code,  // You might want to use a code as couponId
      name: data.name,
      description: data.description,
      maxIssuance: data.maxIssuance,
      maxMoneyDiscount: data.maxMoneyDiscount,
      discountPercentage: data.discountPercentage,
      isPercentage: data.discountType === 'percentage',
      startDate: data.startDate,
      endDate: data.endDate,
    };
    dispatch(createCouponAsync(formattedData));
  };

  const handleCancel = () => {
    navigate('/admin-dashboard/list-coupon');
  };

  return (
    <Container maxWidth="sm">
      <Box
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 1,
          padding: 3,
          border: '1px solid #ddd',
          borderRadius: 2,
          marginTop: '14px',
          backgroundColor: 'white',
        }}
      >
        <Typography variant="h5" sx={{ textAlign: 'center' }}>Add Coupon</Typography>
        
        {/* Coupon Name */}
        <TextField
          label="Coupon Name"
          variant="outlined"
          fullWidth
          required
          {...register('name', { required: 'Name is required' })}
          error={!!errors.name}
          helperText={errors.name?.message}
        />

        {/* Coupon Code */}
        <TextField
          label="Coupon Code"
          variant="outlined"
          fullWidth
          required
          {...register('code', { required: 'Code is required' })}
          error={!!errors.code}
          helperText={errors.code?.message}
        />

        {/* Description */}
        <TextField
          label="Description"
          variant="outlined"
          fullWidth
          required
          {...register('description', { required: 'Description is required' })}
          error={!!errors.description}
          helperText={errors.description?.message}
        />

        {/* Max Issuance */}
        <TextField
          label="Max Issuance"
          variant="outlined"
          fullWidth
          type="number"
          {...register('maxIssuance', { required: 'Max Issuance is required' })}
          error={!!errors.maxIssuance}
          helperText={errors.maxIssuance?.message}
        />

        {/* Max Money Discount */}
        <TextField
          label="Max Money Discount"
          variant="outlined"
          fullWidth
          type="number"
          {...register('maxMoneyDiscount', { required: 'Max Money Discount is required' })}
          error={!!errors.maxMoneyDiscount}
          helperText={errors.maxMoneyDiscount?.message}
        />

        {/* Discount Percentage */}
        <TextField
          label="Discount Percentage"
          variant="outlined"
          fullWidth
          type="number"
          {...register('discountPercentage', { required: 'Discount Percentage is required' })}
          error={!!errors.discountPercentage}
          helperText={errors.discountPercentage?.message}
        />

        {/* Dynamic Discount Type */}
        <FormControl fullWidth error={!!errors.discountType}>
          <InputLabel>Discount Type</InputLabel>
          <Select
            label="Discount Type"
            {...register('discountType', { required: 'Discount type is required' })}
          >
            {discountTypes.map((type) => (
              <MenuItem key={type.value} value={type.value}>
                {type.label}
              </MenuItem>
            ))}
          </Select>
          {errors.discountType && <FormHelperText>{errors.discountType.message}</FormHelperText>}
        </FormControl>

        {/* Start Date */}
        <TextField
          label="Start Date"
          variant="outlined"
          fullWidth
          required
          type="datetime-local"
          {...register('startDate', { required: 'Start date is required' })}
          error={!!errors.startDate}
          helperText={errors.startDate?.message}
          InputLabelProps={{
            shrink: true,
          }}
        />

        {/* End Date */}
        <TextField
          label="End Date"
          variant="outlined"
          fullWidth
          required
          type="datetime-local"
          {...register('endDate', { required: 'End date is required' })}
          error={!!errors.endDate}
          helperText={errors.endDate?.message}
          InputLabelProps={{
            shrink: true,
          }}
        />

        {/* Buttons */}
        <Box
          sx={{
            display: 'flex',
            gap: 2,
            marginTop: 2,
          }}
        >
          <Button variant="contained" color="primary" fullWidth type="submit">
            Create Coupon
          </Button>
          <Button variant="contained" color="secondary" fullWidth type="button" onClick={() => handleCancel()}>
            Cancel
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default AddCoupon;
