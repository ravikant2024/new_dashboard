import {
    Table, TableBody, TableCell, TableContainer,
    TableHead, TableRow, Paper, Typography,
    IconButton, Dialog, DialogTitle, DialogContent,
    DialogActions, TextField, Button
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { fetchShippingChargeslist, selectAllShippingCharges } from './deliveryChargeSlice';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const DeliveryChargeList = () => {
    const dispatch = useDispatch();
    const shippingChargeData = useSelector(selectAllShippingCharges);
    const [openEdit, setOpenEdit] = useState(false);
    const [selectedRow, setSelectedRow] = useState(null);

    useEffect(() => {
        dispatch(fetchShippingChargeslist());
    }, [dispatch]);

    const handleEdit = (row) => {
        setSelectedRow(row);
        setOpenEdit(true);
    };

    const handleEditClose = () => {
        setOpenEdit(false);
        setSelectedRow(null);
    };

    const handleEditSave = () => {
        // Here you would dispatch an action to save the updated data
        setOpenEdit(false);
    };

    const handleDelete = (id) => {
        // Dispatch delete action here
    };

    return (
        <TableContainer component={Paper} sx={{ maxWidth: 900, mx: 'auto', mt: 5 }}>
            <Typography variant="h5" align="center" sx={{ py: 2 }}>
                Shipping Charges by City
            </Typography>
            <Table>
                <TableHead>
                    <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
                        <TableCell sx={{ width: 60 }}>S.No</TableCell>
                        <TableCell sx={{ width: 150 }}>City</TableCell>
                        <TableCell sx={{ width: 150 }}>State</TableCell>
                        <TableCell sx={{ width: 150 }}>Country</TableCell>
                        <TableCell sx={{ width: 150 }}>Shipping Charge</TableCell>
                        <TableCell sx={{ width: 150, pl: 5 }}>Action</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {shippingChargeData.map((data, i) => {
                        const { _id, city, country, state, shipping_charge } = data;
                        return (
                            <TableRow key={_id}>
                                <TableCell>{i + 1}</TableCell>
                                <TableCell>{city}</TableCell>
                                <TableCell>{state || '-'}</TableCell>
                                <TableCell>{country}</TableCell>
                                <TableCell>₹{shipping_charge}</TableCell>
                                <TableCell>
                                    <IconButton
                                        color="primary"
                                        onClick={() => handleEdit(data)}
                                        sx={{ mr: 1 }}
                                    >
                                        <EditIcon />
                                    </IconButton>
                                    <IconButton
                                        color="error"
                                        onClick={() => handleDelete(_id)}
                                    >
                                        <DeleteIcon />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        );
                    })}
                </TableBody>
            </Table>

            <Dialog open={openEdit} onClose={handleEditClose}>
                <DialogTitle>Edit Shipping Charge</DialogTitle>
                <DialogContent sx={{ minWidth: 400 }}>
                    <TextField
                        margin="dense"
                        label="City"
                        fullWidth
                        value={selectedRow?.city || ''}
                        onChange={(e) =>
                            setSelectedRow({ ...selectedRow, city: e.target.value })
                        }
                    />
                    <TextField
                        margin="dense"
                        label="State"
                        fullWidth
                        value={selectedRow?.state || ''}
                        onChange={(e) =>
                            setSelectedRow({ ...selectedRow, state: e.target.value })
                        }
                    />
                    <TextField
                        margin="dense"
                        label="Country"
                        fullWidth
                        value={selectedRow?.country || ''}
                        onChange={(e) =>
                            setSelectedRow({ ...selectedRow, country: e.target.value })
                        }
                    />
                    <TextField
                        margin="dense"
                        label="Shipping Charge"
                        type="number"
                        fullWidth
                        value={selectedRow?.shipping_charge || ''}
                        onChange={(e) =>
                            setSelectedRow({ ...selectedRow, shipping_charge: e.target.value })
                        }
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleEditClose}>Cancel</Button>
                    <Button onClick={handleEditSave} variant="contained" color="primary">
                        Save
                    </Button>
                </DialogActions>
            </Dialog>




        </TableContainer>
    );
};

export default DeliveryChargeList;
