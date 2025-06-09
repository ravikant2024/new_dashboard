import React, { useEffect, useState } from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Chip,
    IconButton,
    Typography,
    Box,
    FormControl,
    Select,
    MenuItem,
    Stack,
    Button,
    InputLabel
} from '@mui/material';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import CheckCircleOutlinedIcon from '@mui/icons-material/CheckCircleOutlined';
import { useDispatch, useSelector } from 'react-redux';
import { getAllOrdersAsync, resetOrderUpdateStatus, selectOrders, selectOrderUpdateStatus, updateOrderByIdAsync } from '../../../features/orders/OrderSlice';
import { useForm } from "react-hook-form";
import { toast } from 'react-toastify';

const OrderDetails = () => {
    const dispatch = useDispatch();
    const [editIndex, setEditIndex] = useState(-1);
    const orderData = useSelector(selectOrders);
    const [selectedStatus, setSelectedStatus] = useState('');
    const [filteredOrders, setFilteredOrders] = useState(orderData);
    const orderUpdateStatus = useSelector(selectOrderUpdateStatus)
    const { register, handleSubmit, setValue, formState: { errors } } = useForm();

    const sortOrders = (ordersToSort, statusOrder) => {
        return ordersToSort.sort((a, b) => {
            const statusA = statusOrder.indexOf(a.status);
            const statusB = statusOrder.indexOf(b.status);
            return statusA - statusB;
        });
    };

    // Filter orders whenever orderData or selectedStatus changes
    useEffect(() => {
        if (selectedStatus === 'All' || selectedStatus === '') {
            setFilteredOrders(orderData);
        } else {
            const filtered = orderData.filter((order) => order.status === selectedStatus);
            const sorted = sortOrders(filtered, ['Pending', 'Dispatched', 'Out for delivery', 'Delivered', 'Cancelled']);
            setFilteredOrders(sorted);
        }
    }, [orderData, selectedStatus]);

    const handleStatusChange = (event) => {
        setSelectedStatus(event.target.value);
    };

    useEffect(() => {
        dispatch(getAllOrdersAsync());
    }, [dispatch]);

    useEffect(() => {
        if (orderUpdateStatus === 'fulfilled') {
            toast.success("Status updated");
        } else if (orderUpdateStatus === 'rejected') {
            toast.error("Error updating order status");
        }
    }, [orderUpdateStatus]); 
    
    
    useEffect(() => {
        return () => {
            dispatch(resetOrderUpdateStatus())
        }
    }, [])

    const handleUpdateOrder = async (data) => {
        const update = { ...data, _id: orderData[editIndex]._id }
        setEditIndex(-1)
        dispatch(updateOrderByIdAsync(update))

    };

    const cellStyle = {
        borderRight: '1px solid rgba(224, 224, 224, 1)',
        padding:'10px'
    };

    const statusOptions = ['All', 'Pending', 'Dispatched', 'Out for delivery', 'Delivered', 'Cancelled','Conatct Customer','Redispatched','Refund'];
    const editOptions = ['Pending', 'Dispatched', 'Out for delivery', 'Delivered', 'Cancelled','Conatct Customer','Redispatched','Refund'];

    const getStatusColor = (status) => {
        if (status === 'Pending') {
            return { bgcolor: '#dfc9f7', color: '#7c59a4' };
        }
        else if (status === 'Dispatched') {
            return { bgcolor: '#feed80', color: '#927b1e' };
        }
        else if (status === 'Out for delivery') {
            return { bgcolor: '#AACCFF', color: '#4793AA' };
        }
        else if (status === 'Delivered') {
            return { bgcolor: "#b3f5ca", color: "#548c6a" };
        }
        else if (status === 'Cancelled') {
            return { bgcolor: "#fac0c0", color: '#cc6d72' };
        }
        else if (status === 'Conatct Customer') {
            return { bgcolor: "#fac0c0", color: '#cc6d72' };
        }
        else if (status === 'Redispatched') {
            return { bgcolor: "#fac0c0", color: '#cc6d72' };
        }
        else if (status === 'Refund') {
            return { bgcolor: "#4d7499", color: '#cc6d72' };
        }
    };

    return (
        <Box sx={{ padding: 0, border: '1px solid black',marginTop:2 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 2 }}>
                <Typography variant="h5" gutterBottom style={{ color: 'white',marginLeft:5,marginTop:8 }}>
                    Order Details
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Typography variant="body1" style={{ color: 'white', marginRight: 15 }}>
                        Sort by status
                    </Typography>
                    <FormControl variant="outlined" size="small">
                        <Select
                            defaultValue=""
                            displayEmpty
                            inputProps={{ 'aria-label': 'Without label' }}
                            style={{ color: 'white', border: '1px solid white' }}
                            onChange={handleStatusChange}
                            value={selectedStatus}
                        >
                            <MenuItem value="">
                                <em>Select Status</em>
                            </MenuItem>
                            {statusOptions.map((status) => (
                                <MenuItem key={status} value={status}>
                                    {status}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Box>
            </Box>

            {filteredOrders.length ? (
                <TableContainer component={Paper} >
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell style={{ ...cellStyle, fontWeight: 'bold' }}>S.No</TableCell>
                                <TableCell style={{ ...cellStyle, fontWeight: 'bold' }}>Order Id</TableCell>
                                <TableCell style={{ ...cellStyle, fontWeight: 'bold' }}>Item</TableCell>
                                <TableCell align="right" style={{ ...cellStyle, fontWeight: 'bold' }}>
                                    Total Amount
                                </TableCell>
                                <TableCell style={{ ...cellStyle, fontWeight: 'bold' }}>Shipping Address</TableCell>
                                <TableCell style={{ ...cellStyle, fontWeight: 'bold' }}>Payment Method</TableCell>
                                <TableCell style={{ ...cellStyle, fontWeight: 'bold' }}>Order Date</TableCell>
                                <TableCell style={{ ...cellStyle, fontWeight: 'bold' }}>Status</TableCell>
                                <TableCell style={{ fontWeight: 'bold' }}>Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {filteredOrders.map((order, index) => (
                                <TableRow key={order._id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                    <TableCell component="th" scope="row" style={cellStyle}>{index + 1}</TableCell>
                                    <TableCell style={cellStyle}>{order._id}</TableCell>
                                    <TableCell style={cellStyle}>
                                        {order.item.map((product, idx) => (
                                            <Typography key={idx}>{product.product.title}</Typography>
                                        ))}
                                    </TableCell>
                                    <TableCell align="right" style={cellStyle}>₹{order.total}</TableCell>
                                    <TableCell style={cellStyle}>
                                        <Stack>
                                            <Typography><strong>Street:</strong> {order.address[0].street}</Typography>
                                            <Typography><strong>City:</strong> {order.address[0].city}</Typography>
                                            <Typography><strong>State:</strong> {order.address[0].state}</Typography>
                                            <Typography><strong>Postal Code:</strong> {order.address[0].postalCode}</Typography>
                                            <Typography><strong>Country:</strong> {order.address[0].country}</Typography>
                                            <Typography><strong>Phone:</strong> {order.address[0].phoneNumber}</Typography>
                                            <Typography><strong>Type:</strong> {order.address[0].type}</Typography>
                                        </Stack>
                                    </TableCell>
                                    <TableCell style={cellStyle}>{order.paymentMode}</TableCell>
                                    <TableCell style={cellStyle}>{new Date(order.createdAt).toDateString()}</TableCell>

                                    {/* order status */}
                                    <TableCell style={cellStyle} align="right">
                                        {editIndex === index ? (
                                            <FormControl fullWidth>
                                                <InputLabel id="demo-simple-select-label">Update status</InputLabel>
                                                <Select
                                                    defaultValue={order.status}
                                                    labelId="demo-simple-select-label"
                                                    id="demo-simple-select"
                                                    label="Update status"
                                                    {...register('status', { required: 'Status is required' })}
                                                >
                                                    {editOptions.map((option) => (
                                                        <MenuItem key={option} value={option}>
                                                            {option}
                                                        </MenuItem>
                                                    ))}
                                                </Select>
                                            </FormControl>
                                        ) : (
                                            <Chip label={order.status} sx={getStatusColor(order.status)} />
                                        )}
                                    </TableCell>

                                    {/* actions */}
                                    <TableCell align="right">
                                        {editIndex === index ? (
                                            <Button onClick={handleSubmit(handleUpdateOrder)}>
                                                <IconButton type="submit">
                                                    <CheckCircleOutlinedIcon  style={{backgroundColor:'red'}}/>
                                                </IconButton>
                                            </Button>
                                        ) : (
                                            <IconButton onClick={() => setEditIndex(index)}>
                                                <EditOutlinedIcon />
                                            </IconButton>
                                        )}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            ) : (
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '300px', color: 'white' }}>
                    <Typography variant="h6" align="center" fontWeight={400}>
                        There are no orders currently
                    </Typography>
                </Box>
            )}
        </Box>
    );
};

export default OrderDetails;
