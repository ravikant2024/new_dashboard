import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { useNavigate } from "react-router"
import { deleteCategoryByIdAsync, fetchCategoryAsync, resetCategoryDeleteStatus, resetCategoryFetchStatus, resetCategoryUpdateStatus, selectCategory, selectCategoryDeleteStatus, selectCategoryErrors, selectCategoryUpdateStatus, updateCategoryByIdAsync } from '../CategorySlice';
import EditCategoryForm from './EditCategoryForm';


const ListCategory = () => {
    const Navigate = useNavigate()
    const dispatch = useDispatch();
    const category = useSelector(selectCategory);
    const categoryDeleteStatus = useSelector(selectCategoryDeleteStatus);
    const [openEditForm, setOpenEditForm] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const categoryUpdateStatus = useSelector(selectCategoryUpdateStatus);
    const categoryErrors = useSelector(selectCategoryErrors);

    const commonCellStyle = {
        fontWeight: 'bold',
        fontFamily: 'Arial, sans-serif',
        paddingTop: 0.5,
        paddingBottom: 0.5,
        fontSize: '1rem',
    };

    useEffect(() => {
        if (categoryDeleteStatus === 'fulfilled') {
            toast.success("Category deleted successfully!");
        } else if (categoryDeleteStatus === 'rejected') {
            toast.error('Error deleting category');
        }
    }, [categoryDeleteStatus, dispatch]);

    useEffect(() => {
        if (categoryUpdateStatus === 'fulfilled') {
            toast.success("Category updated successfully!");
        } else if (categoryUpdateStatus === 'rejected') {
            toast.error(categoryErrors || "Error updating category");
        }
    }, [categoryUpdateStatus, categoryErrors]);

    useEffect(() => {
        dispatch(fetchCategoryAsync());
    }, [dispatch]);

    const handleEditCategory = (id) => {
        const categoryToEdit = category.find((cat) => cat._id === id);
        setSelectedCategory(categoryToEdit);
        setOpenEditForm(true);
    };

    const updateCategory = (id, updatedData) => {
        dispatch(updateCategoryByIdAsync({ id, formData: updatedData })).then(() => {
            dispatch(fetchCategoryAsync());
        });
        setOpenEditForm(false);
    };


    const handleDelete = (id) => {
        dispatch(deleteCategoryByIdAsync(id));
    };

    useEffect(() => {
        return () => {
            dispatch(resetCategoryFetchStatus());
            dispatch(resetCategoryDeleteStatus());
            dispatch(resetCategoryUpdateStatus());
        };
    }, [dispatch]);

    return (
        <div>
            <TableContainer
                component={Paper}
                sx={{
                    maxWidth: '95%',  
                    padding: '20px',   
                    marginLeft: '10px'

                }}
            >
                <Typography
                    variant="h5"
                    gutterBottom
                    sx={{
                        marginLeft: '10px',
                        fontWeight: 'bold',
                        marginTop: '20px',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center'
                    }}
                >
                    Category List ({category?.length})
                    <Button
                        variant="contained"
                        color="primary"
                        sx={{ ml: 'auto', mr: 2 }}
                        onClick={() => Navigate('/admin-dashboard/add-category')} >
                        Add Category
                    </Button>
                </Typography>

                <hr />
                <Table sx={{ minWidth: 650, marginTop: '0px' }} aria-label="category list table">
                    <TableHead>
                        <TableRow>
                            <TableCell sx={commonCellStyle}>S. No.</TableCell>
                            <TableCell sx={commonCellStyle}>Category Name</TableCell>
                            <TableCell sx={{ ...commonCellStyle, textAlign: 'center' }}>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {category?.map((cat, index) => (
                            <TableRow key={cat._id}>
                                <TableCell sx={{ paddingTop: 1, paddingBottom: 1 }}>{index + 1}</TableCell>
                                <TableCell sx={{ paddingTop: 1, paddingBottom: 1 }}>{cat.name}</TableCell>
                                <TableCell sx={{ textAlign: 'center', paddingTop: 1, paddingBottom: 1 }}>
                                    <Button
                                        variant="outlined"
                                        size="small"
                                        sx={{ marginRight: 2 }}
                                        onClick={() => handleEditCategory(cat._id)}
                                    >
                                        Edit
                                    </Button>
                                    <Button
                                        variant="outlined"
                                        color="error"
                                        size="small"
                                        onClick={() => handleDelete(cat._id)}
                                    >
                                        Delete
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>

                </Table>
            </TableContainer>

            {/* Edit Category Form Dialog */}
            <EditCategoryForm
                open={openEditForm}
                onClose={() => setOpenEditForm(false)}
                category={selectedCategory}
                onSave={updateCategory}
            />
        </div>

    );
};

export default ListCategory;
