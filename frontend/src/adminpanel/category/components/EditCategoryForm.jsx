import React, { useState, useEffect } from 'react';
import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    TextField,
    Button,
    Box,
    Typography
} from '@mui/material';

const EditCategoryForm = ({ open, onClose, category, onSave }) => {
    const [name, setName] = useState('');
    const [imageFile, setImageFile] = useState(null);
    const [previewImage, setPreviewImage] = useState('');
    const [categoryErrors, setCategoryErrors] = useState({}); // ✅ Validation errors

    useEffect(() => {
        if (category) {
            setName(category.name || '');
            setPreviewImage(category.image || '');
            setImageFile(null);
            setCategoryErrors({});
        }
    }, [category]);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImageFile(file);
            setPreviewImage(URL.createObjectURL(file));
        }
    };

    const handleSave = () => {
        const errors = {};

        if (!name.trim()) {
            errors.name = 'Category name is required';
        }

        setCategoryErrors(errors);

        if (Object.keys(errors).length === 0) {
            const formData = new FormData();
            formData.append('name', name);
            if (imageFile) {
                formData.append('image', imageFile);
            }

            onSave(category._id, formData);
        }
    };

    return (
        <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
            <DialogTitle sx={{ fontSize: '24px', fontWeight: 'bold' }}>Edit Category</DialogTitle>
            <DialogContent>
                <TextField
                    label="Category Name"
                    fullWidth
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    margin="normal"
                    error={!!categoryErrors.name}
                    helperText={categoryErrors.name}
                />

                {previewImage && (
                    <Box sx={{ mt: 2, mb: 2 }}>
                        <Typography variant="body2" gutterBottom>Image Preview:</Typography>
                        <img
                            src={previewImage}
                            alt="Preview"
                            style={{ width: '100%', maxHeight: '150px', objectFit: 'contain' }}
                        />
                    </Box>
                )}

                <Button
                    variant="outlined"
                    component="label"
                    fullWidth
                    sx={{ mt: 1 }}
                >
                    Upload Image
                    <input
                        type="file"
                        accept="image/*"
                        hidden
                        onChange={handleImageChange}
                    />
                </Button>
            </DialogContent>
            <DialogActions sx={{ justifyContent: 'center' }}>
                <Button
                    onClick={onClose}
                    sx={{
                        background: '#ff5252',
                        color: 'white',
                        '&:hover': { backgroundColor: '#ff1744' },
                        marginRight: '10px',
                    }}
                >
                    Cancel
                </Button>
                <Button
                    onClick={handleSave}
                    sx={{
                        background: 'green',
                        color: 'white',
                        '&:hover': { backgroundColor: '#388e3c' },
                    }}
                >
                    Save
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default EditCategoryForm;
