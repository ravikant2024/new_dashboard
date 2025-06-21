import React, { useState } from 'react';
import {
    TextField,
    Button,
    Container,
    Typography,
    Paper,
    Box,
    Stack
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { createShippingCharge, resetShippingStatus, selectShippingStatus } from './deliveryChargeSlice';
import { useEffect } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const AddDeliveryCharge = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const shippingStatus = useSelector(selectShippingStatus);

    const [form, setForm] = useState({
        delhi_ncr: '',
        india_other: '',
        international: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = {
            delhi_ncr: parseFloat(form.delhi_ncr),
            india_other: parseFloat(form.india_other),
            international: parseFloat(form.international),
        };
        await dispatch(createShippingCharge(formData)).unwrap();
    }

    useEffect(() => {
        if (shippingStatus === 'fulfilled') {
            toast.success('Delivery Charge added successfully!');
            setForm({
                delhi_ncr: '',
                india_other: '',
                international: ''
            });
            navigate("/admin-dashboard");
            dispatch(resetShippingStatus());
            
        } else if (shippingStatus === 'rejected') {
            toast.error('Failed to add product!');
            dispatch(resetShippingStatus());
        }
    }, [shippingStatus, dispatch, navigate]);



    return (
        <Container maxWidth="sm">
            <Paper elevation={3} sx={{ p: 4, mt: 4 }}>
                <Typography variant="h5" gutterBottom>
                    Shipping Charges
                </Typography>
                <form onSubmit={handleSubmit}>
                    <Box
                        sx={{
                            maxWidth: 400,
                            mx: 'auto',
                            mt: 2,
                            p: 1,
                            borderRadius: 2,
                            boxShadow: 1,
                            backgroundColor: '#fff',
                        }}
                    >
                        <Stack spacing={2}>
                            <TextField
                                label="Delhi NCR Charge (₹)"
                                name="delhi_ncr"
                                type="number"
                                fullWidth
                                // required
                                value={form.delhi_ncr}
                                onChange={handleChange}
                            />

                            <TextField
                                label="Other Indian Cities Charge (₹)"
                                name="india_other"
                                type="number"
                                fullWidth
                                // required
                                value={form.india_other}
                                onChange={handleChange}
                            />

                            <TextField
                                label="International Charge (₹)"
                                name="international"
                                type="number"
                                fullWidth
                                // required
                                value={form.international}
                                onChange={handleChange}
                            />

                            <Button variant="contained" color="primary" type="submit" fullWidth>
                                Save Charges
                            </Button>
                        </Stack>
                    </Box>
                </form>
            </Paper>


        </Container>
    );
};

export default AddDeliveryCharge;
