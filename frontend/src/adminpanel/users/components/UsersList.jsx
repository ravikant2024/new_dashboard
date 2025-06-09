import React, { useEffect, useState } from 'react';
import { Button, Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { getAllUsersAsync, selectUsersList, updateUserRoleAsync } from '../../../features/user/UserSlice';

const UsersList = () => {
    const dispatch = useDispatch();
    const usersList = useSelector(selectUsersList);
    const [editingUser, setEditingUser] = useState(null);
    const [newRole, setNewRole] = useState('');

    useEffect(() => {
        dispatch(getAllUsersAsync());
    }, [dispatch]);

    // Trigger when user clicks "Edit" to start editing a user's role
    const handleRoleChange = (user) => {
        setEditingUser(user);
        setNewRole(user.role || 'Normal User');
    };

    // Triggered when user clicks "Save" after selecting a new role
    const handleRoleUpdate = () => {
        const payload = {
            userId: editingUser._id,
            newRole: newRole
        };
        dispatch(updateUserRoleAsync(payload)).then(() => {
            dispatch(getAllUsersAsync());
        });
        setEditingUser(null);
    };

    return (
        <Box sx={{ padding: 2, marginTop: 2 }}>
            <Typography variant="h5" gutterBottom sx={{ color: 'white', textAlign: 'center', marginBottom: 4 }}>
                User List
            </Typography>

            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="user list table">
                    <TableHead>
                        <TableRow>
                            <TableCell sx={{ fontWeight: 'bold', fontFamily: 'Arial, sans-serif' }}>S. No.</TableCell>
                            <TableCell sx={{ fontWeight: 'bold', fontFamily: 'Arial, sans-serif' }}>User ID</TableCell>
                            <TableCell sx={{ fontWeight: 'bold', fontFamily: 'Arial, sans-serif' }}>Name</TableCell>
                            <TableCell sx={{ fontWeight: 'bold', fontFamily: 'Arial, sans-serif' }}>Email</TableCell>
                            <TableCell sx={{ fontWeight: 'bold', fontFamily: 'Arial, sans-serif' }}>Verified</TableCell>
                            <TableCell sx={{ fontWeight: 'bold', fontFamily: 'Arial, sans-serif' }}>Role</TableCell>
                            <TableCell sx={{ fontWeight: 'bold', fontFamily: 'Arial, sans-serif' }}>Actions</TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {usersList?.map((user, index) => (
                            <TableRow key={user._id}>
                                <TableCell>{index + 1}</TableCell> {/* Serial Number */}
                                <TableCell>{user._id}</TableCell>
                                <TableCell>{user.name}</TableCell>
                                <TableCell>{user.email}</TableCell>
                                <TableCell>{user.isVerified ? 'Yes' : 'No'}</TableCell>
                                <TableCell>
                                    {editingUser && editingUser._id === user._id ? (
                                        <select value={newRole} onChange={(e) => setNewRole(e.target.value)} sx={{ padding: '6px' }}>
                                            <option value="Normal User">Normal User</option>
                                            <option value="Admin">Admin</option>
                                            <option value="Subadmin">Subadmin</option>
                                            <option value="Ops">Ops</option>
                                        </select>
                                    ) : (
                                        user.isAdmin ? 'Admin' :
                                            user.isSubAdmin ? 'Subadmin' :
                                                user.isOps ? 'Ops' : 'Normal User'
                                    )}
                                </TableCell>
                                <TableCell>
                                    <Button
                                        variant="outlined"
                                        color="primary"
                                        size="small"
                                        sx={{ marginRight: 1 }}
                                        onClick={() => {
                                            if (editingUser && editingUser._id === user._id) {
                                                handleRoleUpdate();
                                            } else {
                                                handleRoleChange(user);
                                            }
                                        }}
                                    >
                                        {editingUser && editingUser._id === user._id ? 'Update' : 'Edit'}
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

        </Box>
    );
};

export default UsersList;
