import { Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material'
import React, { useEffect } from 'react'
import { fetchAllContactsAsync, selectAllContacts } from '../../features/contact/ContactSlice';
import { useDispatch, useSelector } from 'react-redux';

const ContactUserList = () => {
    const dispatch = useDispatch()
    const contacts = useSelector(selectAllContacts);

    useEffect(() => {
        dispatch(fetchAllContactsAsync());
    }, [dispatch]);

    return (
        <div>
            <Box sx={{ padding: 2, marginTop: 2 }}>
                <Typography variant="h5" gutterBottom sx={{ color: 'black', textAlign: 'center', marginBottom: 4 }}>
                    User Contact Us List
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
                            </TableRow>
                        </TableHead>

                        <TableBody>
                            {contacts?.map((user, index) => (
                                <TableRow key={user._id}>
                                    <TableCell>{index + 1}</TableCell>
                                    <TableCell>{user.firstName}</TableCell>
                                    <TableCell>{user.lastName}</TableCell>
                                    <TableCell>{user.email}</TableCell>
                                    <TableCell sx={{ wordWrap: 'break-word', maxWidth: 300, whiteSpace: 'normal' }}>
                                        {user.message}
                                    </TableCell>

                                    <TableCell>{user.phone}</TableCell>
                                        <TableCell>{user.add}</TableCell>

                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>

            </Box>
        </div>
    )
}

export default ContactUserList
