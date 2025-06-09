import { useEffect } from 'react';
import { Container, Box, TextField, FormControl, InputLabel, Select, MenuItem, FormHelperText, Button, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';

const EditCouponForm = ({ couponData, discountTypes, onSubmit, onCancel }) => {
  const { register, handleSubmit, formState: { errors }, setValue, watch } = useForm();

  // Watch for the 'discountType' value
  const discountTypeValue = watch('discountType');

  useEffect(() => {
    if (couponData) {
      setValue('_id', couponData._id);
      setValue('name', couponData.name);
      setValue('code', couponData.code);
      setValue('discount', couponData.discount);
      setValue('discountType', couponData.discountType);

      if (couponData.expiredAt) {
        const formattedDate = new Date(couponData.expiredAt).toISOString().slice(0, 16);
        setValue('expiredAt', formattedDate);
      }
    }
  }, [couponData, setValue]);

  return (
    <Container maxWidth="sm" sx={{ border: '1px solid #ddd' }}>
      <Typography variant="h6" sx={{textAlign:'center'}}>
        Edit Coupon
      </Typography>

      <Box
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 1,
          padding: 2,
          borderRadius: 2,
          marginTop: '5px',
          backgroundColor: 'white',
        }}
      >
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

        {/* Discount */}
        <TextField
          label="Discount"
          variant="outlined"
          fullWidth
          required
          type="number"
          {...register('discount', { required: 'Discount is required' })}
          error={!!errors.discount}
          helperText={errors.discount?.message}
        />

        {/* Dynamic Discount Type */}
        <FormControl fullWidth error={!!errors.discountType}>
          <InputLabel>Discount Type</InputLabel>
          <Select
            label="Discount Type"
            {...register('discountType', { required: 'Discount type is required' })}
            value={discountTypeValue || ''} // Ensure the select value is controlled
          >
            {discountTypes.map((type) => (
              <MenuItem key={type.value} value={type.value}>
                {type.label}
              </MenuItem>
            ))}
          </Select>
          {errors.discountType && <FormHelperText>{errors.discountType.message}</FormHelperText>}
        </FormControl>

        {/* Expiration Date */}
        <TextField
          label="Expiration Date"
          variant="outlined"
          fullWidth
          required
          type="datetime-local"
          {...register('expiredAt', { required: 'Expiration date is required' })}
          error={!!errors.expiredAt}
          helperText={errors.expiredAt?.message}
          InputLabelProps={{
            shrink: true,
          }}
          value={couponData?.expiredAt ? new Date(couponData.expiredAt).toISOString().slice(0, 16) : ''}
        />

        {/* Buttons in one row */}
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button variant="contained" color="primary" fullWidth type="submit">
            Update Coupon
          </Button>
          <Button variant="contained" color="secondary" fullWidth onClick={onCancel}>
            Cancel
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default EditCouponForm;
