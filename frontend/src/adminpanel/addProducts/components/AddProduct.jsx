import React, { useEffect, useState } from 'react';
import {
  TextField,
  Button,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Typography,
  Paper,
  Box,
  Stack,
  IconButton
} from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import { useDispatch, useSelector } from "react-redux";
import CloseIcon from '@mui/icons-material/Close';
import { selectBrands } from '../../addbrand/AddBrandSlice';
import { selectCategory } from "../../category/CategorySlice";
import { toast } from 'react-toastify';
import { addProductAsync, resetProductAddStatus, selectProductAddStatus } from '../../../features/products/ProductsSlice';
import { useNavigate } from 'react-router-dom';

const AddProduct = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const { control, register, handleSubmit, formState: { errors }, reset, clearErrors, setError,watch } = useForm();
  const brands = useSelector(selectBrands);
  const category = useSelector(selectCategory);
  const [thumbnailPreview, setThumbnailPreview] = useState(null);
  const [multiplePreviews, setMultiplePreviews] = useState([]);
  const [thumbnailFile, setThumbnailFile] = useState(null);
  const [multipleFiles, setMultipleFiles] = useState([]);
  const productAddStatus = useSelector(selectProductAddStatus);

  useEffect(() => {
    if (productAddStatus === 'fulfilled') {
      toast.success('Product added successfully!');
      reset();
      navigate("/admin-dashboard/product-list")
    } else if (productAddStatus === 'rejected') {
      toast.error('Failed to add product!');
    }
  }, [productAddStatus, reset, navigate]);

  // Handle Form Submission
  const onSubmit = (data) => {
    const formData = new FormData();
    formData.append('title', data.title);
    formData.append('description', data.description);
    formData.append('price', data.price);
    formData.append('discountPercentage', data.discountPercentage);
    formData.append('category', category.find((cat) => cat._id === data.category)?.name || '');
    formData.append('brand', brands.find((brand) => brand._id === data.brand)?.name || '');
    formData.append('stockQuantity', data.stockQuantity);
    formData.append('sku', data.sku);

    if (data.technicalSpecification) {
      formData.append('technicalSpecification', data.technicalSpecification);
    }
    if (data.warranty) {
      formData.append('warranty', data.warranty);
    }
    if (data.videoLink) {
      formData.append('videoLink', data.videoLink);
    }

    if (thumbnailFile) {
      formData.append('thumbnail', thumbnailFile);
    }

    multipleFiles.forEach(file => {
      formData.append('images', file);
    });

    dispatch(addProductAsync(formData))
  };

  const getYouTubeVideoId = (url) => {
    const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/))([\w-]{11})/);
    return match ? match[1] : '';
  };
  const watchedVideoLink = watch('videoLink');
  
  // Handle Thumbnail Image Upload
  const handleThumbnailChange = (event) => {
    const file = event.target.files[0];
    const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg', 'image/svg+xml'];

    if (file) {
      if (!allowedTypes.includes(file.type)) {
        setError('thumbnail', { message: 'Only JPG, JPEG,SVG or PNG files are allowed' });
        setThumbnailPreview(null);
        setThumbnailFile(null);
        return;
      }

      if (file.size > 2 * 1024 * 1024) {
        setError('thumbnail', { message: 'File size exceeds 2MB' });
        setThumbnailPreview(null);
        setThumbnailFile(null);
        return;
      }
      setThumbnailFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setThumbnailPreview(reader.result);
      };
      reader.readAsDataURL(file);

      clearErrors('thumbnail');
    } else {
      setThumbnailPreview(null);
      setThumbnailFile(null);
    }
  };


  // Remove Thumbnail Image
  const handleRemoveThumbnail = () => {
    setThumbnailPreview(null);
    setThumbnailFile(null);
    const inputFile = document.getElementById('thumbnail-upload');
    if (inputFile) {
      inputFile.value = null;
    }
  };

  // Handle Multiple Images Upload
  const handleMultipleImagesChange = (event) => {
    const files = Array.from(event.target.files);
    const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg', 'image/svg+xml'];

    if (files.length + multiplePreviews.length > 3) {
      alert("You can only upload up to 3 images.");
      return;
    }

    const invalidFiles = files.filter(
      (file) => file.size > 2 * 1024 * 1024 || !allowedTypes.includes(file.type)
    );

    if (invalidFiles.length > 0) {
      setError('images', {
        message: 'Images must be JPG, JPEG, PNG, or SVG and under 2MB.',
      });
      return;
    }

    clearErrors('images');
    setMultipleFiles(files); // still storing the raw files

    // Process one-by-one instead of in parallel
    files.forEach((file) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        setMultiplePreviews((prev) => [...prev, reader.result]);
      };
      reader.readAsDataURL(file);
    });
  };

  // Remove selected image
  const handleRemoveImage = (index) => {
    const updatedPreviews = multiplePreviews.filter((_, i) => i !== index);
    setMultiplePreviews(updatedPreviews);
  };

  useEffect(() => {
    return () => {
      dispatch(resetProductAddStatus())
    }
  }, [])

  return (
    <Box sx={{ p: 2, display: 'flex', justifyContent: 'center' }}>
      <Paper sx={{ p: 2, maxWidth: 600, width: '100%' }}>
        <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2, textAlign: 'center', mt: '0px' }}>
          Add Product Form
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing={2.5}> {/* Increased spacing slightly for better visual balance */}
            {/* Product Title */}
            <TextField
              label="Product Title"
              variant="outlined"
              fullWidth
              size="small"
              {...register('title', { required: "Product Title is required" })}
              error={!!errors.title}
              helperText={errors.title ? errors.title.message : ""}
            />

            {/* Brand & Category Selection */}
            <Stack direction="row" spacing={2} sx={{ width: '100%' }}>
              <FormControl fullWidth size="small" error={!!errors.brand}>
                <InputLabel id="brand-selection">Brand</InputLabel>
                <Controller
                  name="brand"
                  control={control}
                  rules={{ required: "Select brand is required" }}
                  render={({ field }) => (
                    <Select {...field} labelId="brand-selection" label="Brand">
                      {brands.map((brand) => (
                        <MenuItem key={brand._id} value={brand._id}>
                          {brand.name}
                        </MenuItem>
                      ))}
                    </Select>
                  )}
                />
                {errors.brand && <Typography color="error">{errors.brand.message}</Typography>}
              </FormControl>

              <FormControl fullWidth size="small" error={!!errors.category}>
                <InputLabel id="category-selection">Category</InputLabel>
                <Controller
                  name="category"
                  control={control}
                  rules={{ required: "Select category is required" }}
                  render={({ field }) => (
                    <Select {...field} labelId="category-selection" label="Category">
                      {category.map((cat) => (
                        <MenuItem key={cat._id} value={cat._id}>
                          {cat.name}
                        </MenuItem>
                      ))}
                    </Select>
                  )}
                />
                {errors.category && <Typography color="error">{errors.category.message}</Typography>}
              </FormControl>
            </Stack>

            {/* Stock Quantity & SKU */}
            <Stack direction="row" spacing={2} sx={{ width: '100%' }}>
              <TextField
                label="Stock Quantity"
                variant="outlined"
                fullWidth
                type="number"
                size="small"
                {...register('stockQuantity', { required: "Stock Quantity is required", valueAsNumber: true })}
                error={!!errors.stockQuantity}
                helperText={errors.stockQuantity ? errors.stockQuantity.message : ""}
              />
              <TextField
                label="SKU"
                variant="outlined"
                fullWidth
                size="small"
                {...register('sku', { required: "SKU is required" })}
                error={!!errors.sku}
                helperText={errors.sku ? errors.sku.message : ""}
              />
            </Stack>

            {/* Price & Discount Percentage */}
            <Stack direction="row" spacing={2} sx={{ width: '100%' }}>
              <TextField
                label="Price"
                variant="outlined"
                fullWidth
                type="number"
                size="small"
                {...register('price', { required: "Price is required", valueAsNumber: true })}
                error={!!errors.price}
                helperText={errors.price ? errors.price.message : ""}
              />
              <TextField
                label="Discount Percentage"
                variant="outlined"
                fullWidth
                type="number"
                size="small"
                {...register('discountPercentage')}
              />
            </Stack>

            {/* Description */}
            <TextField
              label="Description"
              variant="outlined"
              multiline
              rows={2}
              fullWidth
              size="small"
              {...register('description', { required: "Description is required" })}
              error={!!errors.description}
              helperText={errors.description ? errors.description.message : ""}
            />
            {/* Technical Specification */}
            <TextField
              label="Technical Specification"
              variant="outlined"
              fullWidth
              multiline
              rows={1}
              size="small"
              {...register('technicalSpecification')}
            />

            {/* Warranty */}
            <TextField
              label="Warranty"
              variant="outlined"
              size="small"
              {...register('warranty')}
            />
            {/* Uplaod Video link */}
            <TextField
              label="YouTube Video Link"
              variant="outlined"
              fullWidth
              size="small"
              {...register('videoLink', {
                pattern: {
                  value: /^(https?\:\/\/)?(www\.youtube\.com|youtu\.be)\/.+$/,
                  message: "Enter a valid YouTube URL"
                }
              })}
              error={!!errors.videoLink}
              helperText={errors.videoLink ? errors.videoLink.message : ""}
            />
             {watchedVideoLink && /youtu\.?be/.test(watchedVideoLink) && (
              <Box mt={2}>
                <Typography variant="subtitle2">Video Preview:</Typography>
                <iframe
                  width="100%"
                  height="300"
                  src={`https://www.youtube.com/embed/${getYouTubeVideoId(watchedVideoLink)}`}
                  title="YouTube video preview"
                  frameBorder="0"
                  allowFullScreen
                ></iframe>
              </Box>
            )}

            {/* Thumbnail Image Upload */}
            <div style={{ position: 'relative', display: 'inline-block' }}>
              {thumbnailPreview && (
                <>
                  <img
                    src={thumbnailPreview}
                    alt="Thumbnail Preview"
                    style={{
                      maxWidth: '180px',
                      height: '110px',
                      marginTop: '15px',
                      border: '2px solid #ccc',
                      borderRadius: '5px',
                      padding: '5px',
                    }}
                  />
                  <IconButton
                    onClick={handleRemoveThumbnail}
                    style={{
                      position: 'absolute',
                      top: '4px',
                      left: '163px',
                      color: '#fff',
                      backgroundColor: 'rgba(147, 120, 120, 0.5)',
                      borderRadius: '50%',
                      padding: '0px',
                    }}
                    size="small"
                  >
                    <CloseIcon />
                  </IconButton>
                </>
              )}
            </div>

            <FormControl fullWidth error={!!errors.thumbnail}>
              <input
                type="file"
                accept="image/*"
                id="thumbnail-upload"
                style={{ display: 'none' }}
                {...register('thumbnail', { required: "Thumbnail image is required" })}
                onChange={handleThumbnailChange}
              />
              <label htmlFor="thumbnail-upload">
                <Button variant="contained" component="span">
                  Upload Thumbnail
                </Button>
              </label>
              {errors.thumbnail && <Typography color="error">{errors.thumbnail.message}</Typography>}
            </FormControl>

            {/* Multiple Images Upload */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
              {multiplePreviews.map((preview, index) => (
                <div key={index} style={{ position: 'relative' }}>
                  <img
                    src={preview}
                    alt={`Multiple Preview ${index}`}
                    style={{
                      maxWidth: '120px',
                      height: '80px',
                      border: '2px solid #ccc',
                      borderRadius: '5px',
                    }}
                  />
                  <IconButton
                    onClick={() => handleRemoveImage(index)}
                    style={{
                      position: 'absolute',
                      top: '4px',
                      left: '100px',
                      color: '#fff',
                      backgroundColor: 'rgba(147, 120, 120, 0.5)',
                      borderRadius: '50%',
                      padding: '0px',
                    }}
                    size="small"
                  >
                    <CloseIcon />
                  </IconButton>
                </div>
              ))}
            </div>
            <FormControl fullWidth error={!!errors.images}>
              <input
                type="file"
                accept="image/*"
                id="multiple-images-upload"
                style={{ display: 'none' }}
                multiple
                {...register('images', { required: "Image is required" })}
                onChange={handleMultipleImagesChange}
              />
              <label htmlFor="multiple-images-upload">
                <Button variant="contained" component="span" color="primary">
                  Upload Images
                </Button>
              </label>
              {errors.images && <Typography color="error">{errors.images.message}</Typography>}
            </FormControl>

            {/* Submit Button */}
            <Button
              variant="contained"
              color="primary"
              type="submit"
              fullWidth
              sx={{ marginTop: 2 }}
            >
              Add Product
            </Button>
          </Stack>
        </form>
      </Paper>
    </Box>
  );
};

export default AddProduct;
