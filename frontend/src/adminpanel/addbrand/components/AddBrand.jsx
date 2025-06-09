import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { TextField, Button, Box, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { addBrandAsync, selectBrandAddStatus, selectBrandErrors } from "../AddBrandSlice";
import { toast } from 'react-toastify';

const AddBrand = () => {
  const dispatch = useDispatch();
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const addStatus = useSelector(selectBrandAddStatus);
  const errorstatus = useSelector(selectBrandErrors);

  useEffect(() => {
    if (addStatus === "fulfilled") {
      toast.success("Brand added successfully!");
      reset();
    }
    if (addStatus === "rejected" && errorstatus) {
      toast.error(`Error: ${errorstatus}`);
    }
  }, [addStatus, errorstatus, reset]);


  const onSubmit = (data) => {
    dispatch(addBrandAsync(data));
  };
  // useEffect(() => {
  //     return () => {
  //         dispatch(resetCategoryFetchStatus());
  //         dispatch(resetCategoryDeleteStatus());
  //     };
  // }, [dispatch]);

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
        Add Brand
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Brand Name Field */}
        <Box sx={{ marginBottom: 2 }}>
          <TextField
            fullWidth
            label="Brand Name"
            variant="outlined"
            {...register("name", {
              required: "Brand Name is required",
              maxLength: { value: 50, message: "Brand Name is too long" }
            })}
            error={!!errors.name}
            helperText={errors.name ? errors.name.message : ""}
          />
        </Box>

        {/* Submit Button */}
        <Box>
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Add Brand
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default AddBrand;
