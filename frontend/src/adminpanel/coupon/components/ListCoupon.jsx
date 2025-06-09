import React, { useEffect, useState } from 'react';
import { Button, Paper, Table, TableBody,Menu,MenuItem, TableCell, TableContainer, TableHead, TableRow, Typography, IconButton } from '@mui/material';
import { format } from 'date-fns';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { deleteCouponByIdAsync, getAllCouponAsync, selectAllCoupons, selectDeleteCouponStatus, selectUpdateCouponStatus, updateCouponAsync } from '../CouponSlice';
import EditCouponForm from './EditCoupon';
import { useNavigate } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import MoreVertIcon from '@mui/icons-material/MoreVert';
const discountTypes = [
  { value: 'percentage', label: 'Percentage' },
  { value: 'fixed', label: 'Fixed' },
];

const CouponList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const couponData = useSelector(selectAllCoupons);
  const [selectedCoupon, setSelectedCoupon] = useState(null);
    const [anchorEl, setAnchorEl] = useState(null);
  const updateStatus = useSelector(selectUpdateCouponStatus)
  const deleteStatus = useSelector(selectDeleteCouponStatus)

  useEffect(() => {
    dispatch(getAllCouponAsync());
  }, [dispatch]);


  useEffect(() => {
    if (updateStatus === 'fulfilled') {
      toast.success('Coupon updated successfully!');
    } else if (updateStatus === 'rejected') {
      toast.error('Coupon not updated successfully!');
    }
  }, [updateStatus]);

  useEffect(() => {
    if (deleteStatus === 'fulfilled') {
      toast.success('Coupon delete successfully!');
    }
    if (deleteStatus === "rejected") {
      toast.error('Coupon not delete successfully!');
    }
  }, [deleteStatus])

  // back page
  const handleBackClick = () => {
    navigate('/admin-dashboard')
  }

  const handleEditClick = (data) => {
    setSelectedCoupon(data);
  };

  const handleCancelEdit = () => {
    setSelectedCoupon(null);
  };

  const handleUpdateSubmit = (updatedCoupon) => {
    dispatch(updateCouponAsync(updatedCoupon)).then(() => {
      dispatch(getAllCouponAsync());
    });
    setSelectedCoupon(null);
  };

  // Corrected delete handler function
  const handleDeleteCoupon = (id) => {
    dispatch(deleteCouponByIdAsync(id))
  };

  // Open More Action
  const handleMenuClick=(e)=>{
    setAnchorEl(e.currentTarget);
  }
// Close more action
  const handleMenuClose = () => {
    setAnchorEl(null);
   
  };
  return (
    <Paper style={{ padding: '20px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
          {/* Back Arrow Icon */}
          <IconButton onClick={handleBackClick} sx={{ marginRight: 1 }}>
            <ArrowBackIcon size={40} />
          </IconButton>

          {/* Coupon List Title */}
          <h3>
            Coupon List
            {couponData?.count > 0 && ` (${couponData.count})`}
          </h3>
        </Typography>
        <Button sx={{ marginLeft: 'auto', backgroundColor: 'black' }} onClick={() => navigate('/admin-dashboard/add-coupon')}>Add Coupon</Button>
      </div>

      {selectedCoupon ? (
        // Render the EditCouponForm if a coupon is selected
        <EditCouponForm
          couponData={selectedCoupon}
          discountTypes={discountTypes}
          onSubmit={handleUpdateSubmit}
          onCancel={handleCancelEdit}
        />
      ) : (
        <>

          <TableContainer>
            <Table>
              <TableHead>

                <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
                  <TableCell>S.No</TableCell>
                  <TableCell>Coupon Code</TableCell>
                  <TableCell>Coupon Name</TableCell>
                  <TableCell>Description</TableCell>
                  <TableCell>Discount</TableCell>
                  <TableCell>Start Date</TableCell>
                  <TableCell>Expire Date</TableCell>
                  <TableCell>Issued Count</TableCell>
                  <TableCell>Max Issuance</TableCell>
                  <TableCell>Max Money Discount</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Action</TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {couponData?.data?.map((coupon, index) => {
                  return (

                    <TableRow key={coupon._id}>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>{coupon.couponId}</TableCell>
                      <TableCell>{coupon.name}</TableCell>
                      <TableCell>{coupon.description}</TableCell>
                      <TableCell>
                        {coupon.discountPercentage}%
                      </TableCell>
                      <TableCell>{coupon.startDate}</TableCell>
                      <TableCell>{coupon.endDate}</TableCell>
                      <TableCell>{coupon.issuedCount}</TableCell>
                      <TableCell>{coupon.maxIssuance - coupon.issuedCount}/{coupon.maxIssuance}</TableCell>
                      <TableCell>{coupon.maxMoneyDiscount}</TableCell>
                      <TableCell>{coupon.isActive ? 'Yes' : 'No'}</TableCell>
                      <Button onClick={(e) => handleMenuClick(e, coupon)}>
                        <MoreVertIcon />
                      </Button>
                      {/* <TableCell>
                            <Button
                              variant="outlined"
                              color="primary"
                              style={{ marginRight: '10px' }}
                              sx={{
                                backgroundColor: 'green',
                                color: 'white',
                                '&:hover': {
                                  backgroundColor: 'orange'
                                }
                              }}
                              onClick={() => handleEditClick(coupon)}
                            >
                              Edit
                            </Button>
                            <Button
                              variant="outlined"
                              color="secondary"
                              sx={{
                                backgroundColor: 'red',
                                color: 'white',
                                '&:hover': {
                                  backgroundColor: 'darkred'
                                }
                              }}
                              onClick={() => handleDeleteCoupon(coupon._id)}
                            >
                              Delete
                            </Button>
  
                          </TableCell> */}
                    </TableRow>
                  )
                }

                )}
              </TableBody>
                  <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
                      <MenuItem >Edit</MenuItem>
                      <MenuItem >Delete</MenuItem>
                      <MenuItem >More</MenuItem>
                    </Menu>
            </Table>
          </TableContainer>



        </>

      )}
    </Paper>
  );
};

export default CouponList;
