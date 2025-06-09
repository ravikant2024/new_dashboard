import React, { useEffect, useRef, useState } from 'react';
import {
    Dialog, DialogTitle, DialogContent, DialogActions,
    TextField, Button
} from '@mui/material';
import JoditEditor from 'jodit-react';

const EditBlog = ({ open, onClose, blog, onSave }) => {
    const editor = useRef(null);
    const [formData, setFormData] = useState({
        title: '',
        content: '',
        category: '',
        image: '' 
    });
    const [preview, setPreview] = useState('');

    useEffect(() => {
        if (blog) {
            setFormData({
                title: blog.title || '',
                content: blog.content || '',
                category: blog.category || '',
                image: blog.image || ''
            });

            if (blog.image && typeof blog.image === 'string') {
                setPreview(blog.image);
            }
        }
    }, [blog]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleEditorChange = (newContent) => {
        setFormData((prev) => ({
            ...prev,
            content: newContent
        }));
    };

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            setFormData((prev) => ({
                ...prev,
                image: file
            }));

            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSave = () => {
        const data = new FormData();
        data.append('title', formData.title);
        data.append('content', formData.content);
        data.append('category', formData.category);

        if (formData.image instanceof File) {
            data.append('image', formData.image);
        } else {
            data.append('image', formData.image); // For existing image URLs
        }

        onSave(data); // Backend should accept FormData
        onClose();
    };

    return (
        <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth
            sx={{
                '& .MuiDialog-paper': {
                    width: '80%',
                    maxWidth: 'none',
                },
            }}
        >
            <DialogTitle>Edit Blog</DialogTitle>
            <DialogContent dividers>
                <TextField
                    fullWidth
                    label="Title"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    margin="normal"
                />

                <div style={{ marginTop: 20, marginBottom: 20 }}>
                    <label style={{ fontWeight: 'bold', display: 'block', marginBottom: 8 }}>Content</label>
                    <JoditEditor
                        ref={editor}
                        value={formData.content}
                        config={{ placeholder: '' }}
                        onChange={handleEditorChange}
                    />
                </div>

                <TextField
                    fullWidth
                    label="Category"
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    margin="normal"
                />

                <Button
                    variant="contained"
                    component="label"
                    sx={{ mt: 2 }}
                >
                    Upload Blog Image
                    <input
                        type="file"
                        hidden
                        accept="image/*"
                        onChange={handleImageUpload}
                    />
                </Button>

                {preview && (
                    <div style={{ marginTop: 10 }}>
                        <img
                            src={preview}
                            alt="Preview"
                            style={{ maxWidth: '100%', maxHeight: 300, borderRadius: 8 }}
                        />
                    </div>
                )}
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="secondary">Cancel</Button>
                <Button onClick={handleSave} color="primary" variant="contained">Save</Button>
            </DialogActions>
        </Dialog>
    );
};

export default EditBlog;
