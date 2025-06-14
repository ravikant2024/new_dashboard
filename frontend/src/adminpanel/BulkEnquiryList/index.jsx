import { Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllBulkEnquiryAsync, selectAllBulkEnquiry } from '../../features/bulkEnquiry/BulkEnquirySlice';

const BulkEnquiryList = () => {
    const dispatch = useDispatch()
    const bulkEnquiryData = useSelector(selectAllBulkEnquiry);

    useEffect(() => {
        dispatch(fetchAllBulkEnquiryAsync());
    }, [dispatch]);

    return (
        <div>
            <Box sx={{ padding: 2, marginTop: 2 }}>
                <Typography variant="h5" gutterBottom sx={{ color: 'black', textAlign: 'center', marginBottom: 4 }}>
                    Bulk Enquiry List
                </Typography>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="user list table">
                        <TableHead>
                            <TableRow>
                                <TableCell sx={{ fontWeight: 'bold', fontFamily: 'Arial, sans-serif' }}>S.No.</TableCell>
                                <TableCell sx={{ fontWeight: 'bold', fontFamily: 'Arial, sans-serif' }}>First Name</TableCell>
                                <TableCell sx={{ fontWeight: 'bold', fontFamily: 'Arial, sans-serif' }}>Last Name</TableCell>
                                <TableCell sx={{ fontWeight: 'bold', fontFamily: 'Arial, sans-serif' }}>Email</TableCell>
                                <TableCell sx={{ fontWeight: 'bold', fontFamily: 'Arial, sans-serif' }}>Message</TableCell>
                                <TableCell sx={{ fontWeight: 'bold', fontFamily: 'Arial, sans-serif' }}>Phone</TableCell>
                                <TableCell sx={{ fontWeight: 'bold', fontFamily: 'Arial, sans-serif' }}>Company Name</TableCell>
                                <TableCell sx={{ fontWeight: 'bold', fontFamily: 'Arial, sans-serif' }}>Address</TableCell>
                                <TableCell sx={{ fontWeight: 'bold', fontFamily: 'Arial, sans-serif' }}>GST</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {bulkEnquiryData?.map((user, index) => (
                                <TableRow key={user._id}>
                                    <TableCell>{index + 1}</TableCell>
                                    <TableCell>{user.firstName}</TableCell>
                                    <TableCell>{user.lastName}</TableCell>
                                    <TableCell>{user.email}</TableCell>
                                    <TableCell sx={{ wordWrap: 'break-word', maxWidth: 300, whiteSpace: 'normal' }}>
                                        {user.message}
                                    </TableCell>
                                    <TableCell>{user.phone}</TableCell>
                                    <TableCell>{user.address}</TableCell>
                                    <TableCell>{user.company}</TableCell>
                                    <TableCell>{user.gst}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>

            </Box>
        </div>
    )
}

export default BulkEnquiryList
