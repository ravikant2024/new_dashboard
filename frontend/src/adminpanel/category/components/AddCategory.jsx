import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { TextField, Button, Box, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { toast } from 'react-toastify';
import { addCategoryAsync, resetCategoryAddStatus, selectCategoryAddStatus } from "../CategorySlice";
import { useNavigate } from "react-router-dom";

const AddCategory = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    
    const addCategoryStatus = useSelector(selectCategoryAddStatus);
    const [image, setImage] = useState(null);  // State to store the uploaded image

    useEffect(() => {
        if (addCategoryStatus === "fulfilled") {
            toast.success("Category added successfully!");
            reset();
            navigate("/admin-dashboard/category-list");
        }
    }, [addCategoryStatus, reset, navigate]);

    const onSubmit = (data) => {
        // Prepare form data
        const formData = new FormData();
        formData.append("name", data.name);
        if (image) {
            formData.append("image", image);
        }
        dispatch(addCategoryAsync(formData)); // Dispatch the form data (including image)
    };

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setImage(file);
        }
    };

    useEffect(() => {
        return () => {
            dispatch(resetCategoryAddStatus());
        };
    }, [dispatch]);

    return (
        <Box
            sx={{
                maxWidth: 500,
                margin: "auto",
                padding: 3,
                backgroundColor: "#f5f5f5",
                borderRadius: "8px",
                boxShadow: 3,
                marginTop: 5
            }}
        >
            <Typography variant="h5" gutterBottom>
                Add Category
            </Typography>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Box sx={{ marginBottom: 2 }}>
                    <TextField
                        fullWidth
                        label="Category Name"
                        variant="outlined"
                        {...register("name", {
                            required: "Category Name is required",
                            maxLength: { value: 50, message: "Category Name is too long" }
                        })}
                        error={!!errors.name}
                        helperText={errors.name ? errors.name.message : ""}
                    />
                </Box>

                {/* Image Upload Section */}
                <Box sx={{ marginBottom: 2 }}>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                    />
                    {image && (
                        <Typography variant="body2" color="textSecondary" sx={{ marginTop: 1 }}>
                            Selected Image: {image.name}
                        </Typography>
                    )}
                </Box>

                <Box>
                    <Button type="submit" variant="contained" color="primary" fullWidth>
                        Add Category
                    </Button>
                </Box>
            </form>
        </Box>
    );
};

export default AddCategory;
