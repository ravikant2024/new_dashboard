import React from 'react';
import { TextField, Button, Card, CardContent, Typography, Avatar, Box } from '@mui/material';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { updateUserByIdAsync } from '../../../features/user/UserSlice';

const Setting = () => {
const dispatch=useDispatch()
  const { register, handleSubmit, formState: { errors } } = useForm();

  // Handle form submission
  const onSubmit = (data) => {
    dispatch(updateUserByIdAsync(data))
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      sx={{ minHeight: '100vh', backgroundColor: '#f4f6f8', padding: 2 }}
    >
      <Card sx={{ maxWidth: 600, width: '100%', padding: 3 }}>
        <CardContent>
          <Typography variant="h5" component="h2" gutterBottom sx={{ textAlign: 'center' }}>
            Settings
          </Typography>

          {/* Profile Picture Section */}
          <Box display="flex" flexDirection="column" alignItems="center" sx={{ marginBottom: 2 }}>
            <Avatar
              alt="User Avatar"
              src="/path/to/avatar.jpg"
              sx={{ width: 80, height: 80, marginBottom: 2 }}
            />
            <Button variant="contained" color="primary">
              Change Profile Picture
            </Button>
          </Box>

          {/* Form Section */}
          <form onSubmit={handleSubmit(onSubmit)}>
            {/* Full Name Field */}
            <TextField
              label="Full Name"
              variant="outlined"
              fullWidth
              {...register('fullName', { required: 'Full Name is required' })}
              error={!!errors.fullName}
              helperText={errors.fullName?.message}
              sx={{ marginBottom: 2 }}
            />

            {/* Email Address Field */}
            <TextField
              label="Email Address"
              variant="outlined"
              fullWidth
              type="email"
              {...register('email', {
                required: 'Email is required',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                  message: 'Invalid email address',
                },
              })}
              error={!!errors.email}
              helperText={errors.email?.message}
              sx={{ marginBottom: 2 }}
            />

            {/* Current Password Field */}
            <TextField
              label="Current Password"
              variant="outlined"
              fullWidth
              type="password"
              {...register('currentPassword', { required: 'Current password is required' })}
              error={!!errors.currentPassword}
              helperText={errors.currentPassword?.message}
              sx={{ marginBottom: 2 }}
            />

            {/* New Password Field */}
            <TextField
              label="New Password"
              variant="outlined"
              fullWidth
              type="password"
              {...register('newPassword', { required: 'New password is required' })}
              error={!!errors.newPassword}
              helperText={errors.newPassword?.message}
              sx={{ marginBottom: 2 }}
            />

            {/* Save Changes Button */}
            <Button
              variant="contained"
              sx={{ backgroundColor: 'rgb(255, 133, 51)', color: 'white' }}
              fullWidth
              type="submit"
            >
              Save Changes
            </Button>
          </form>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Setting;
