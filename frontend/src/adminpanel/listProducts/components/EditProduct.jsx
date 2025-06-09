import React, { useState, useEffect } from 'react';
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
import { useDispatch, useSelector } from 'react-redux';
import CloseIcon from '@mui/icons-material/Close';
import { selectBrands, fetchBrandsAsync } from '../../addbrand/AddBrandSlice';
import { selectCategory, fetchCategoryAsync } from '../../category/CategorySlice';
import { toast } from 'react-toastify';
import { fetchProductByIdAsync, fetchProductsAsync, resetProductUpdateStatus, selectProductUpdateStatus, selectSelectedProduct, updateProductByIdAsync } from '../../../features/products/ProductsSlice';

const EditProduct = ({ productId, setOpenDialog ,currentFilters}) => {
    const dispatch = useDispatch();
    const { control, register, handleSubmit, formState: { errors }, reset, clearErrors, setError } = useForm();
    const brands = useSelector(selectBrands);
    const category = useSelector(selectCategory);
    const product = useSelector(selectSelectedProduct);
    const [thumbnailPreview, setThumbnailPreview] = useState(null);
    const [multiplePreviews, setMultiplePreviews] = useState([])
    const [thumbnailFile, setThumbnailFile] = useState(null);
    const [multipleFiles, setMultipleFiles] = useState([]);
    const updateProductStatus=useSelector(selectProductUpdateStatus)

    useEffect(() => {
        if (updateProductStatus === 'fulfilled') {
            toast.success('Product updated successfully!');
            setOpenDialog(false); 
            dispatch(fetchProductsAsync(currentFilters)); 
        } else if (updateProductStatus === 'rejected') {
            toast.error('Failed to update product!');
        }
    }, [updateProductStatus, dispatch]);
    
    useEffect(() => {
        if (productId) {
            dispatch(fetchProductByIdAsync(productId));
        }
        dispatch(fetchBrandsAsync());
        dispatch(fetchCategoryAsync());
    }, [dispatch, productId]);
    useEffect(() => {
        if (product && product._id === productId) {
            reset({
                title: product.title,
                description: product.description,
                price: product.price,
                discountPercentage: product.discountPercentage,
                category: product.category ? product.category._id : '',
                brand: product.brand ? product.brand._id : '',
                stockQuantity: product.stockQuantity,
                sku: product.sku,
                technicalSpecification: product.technicalSpecification || '',
                warranty: product.warranty || '',
            });

            setThumbnailPreview(product.thumbnail || '');
            setMultiplePreviews(product.images || []);
        }
    }, [product, productId, reset]);

    const onSubmit = (data) => {
        const formData = new FormData();
        formData.append('title', data.title);
        formData.append('description', data.description);
        formData.append('price', data.price);
        formData.append('discountPercentage', data.discountPercentage ? Number(data.discountPercentage) : 0);
        formData.append('category', category.find((cat) => cat._id === data.category)?.name || '');
        formData.append('brand', brands.find((brand) => brand._id === data.brand)?.name || '');
        formData.append('stockQuantity', data.stockQuantity);
        formData.append('sku', data.sku);
        formData.append('technicalSpecification', data.technicalSpecification);
        formData.append('warranty', data.warranty);

        // Add thumbnail and images to form data if provided
        if (thumbnailFile) {
            formData.append('thumbnail', thumbnailFile);
        }
        if (multipleFiles.length > 0) {
            multipleFiles.forEach((file) => {
                formData.append('images', file);
            });
        }
        dispatch(updateProductByIdAsync({ productId, formData }))
            
    };

    // Thumbnail Image handling
    const handleThumbnailChange = (event) => {
        const file = event.target.files[0];
        if (!file) return setThumbnailPreview(null) && setThumbnailFile(null);
        const isValidSize = file.size <= 2 * 1024 * 1024;
        const isValidType = ['image/jpeg', 'image/png', 'image/svg+xml'].includes(file.type);

        if (!isValidSize || !isValidType) {
            setThumbnailPreview(null);
            setThumbnailFile(null);
            setError('thumbnail', { message: isValidSize ? 'Invalid file type. Allowed: JPG, PNG, SVG.' : 'Image should be less than 2MB.' });
            return;
        }

        setThumbnailFile(file);
        const reader = new FileReader();
        reader.onloadend = () => setThumbnailPreview(reader.result);
        reader.readAsDataURL(file);
        clearErrors('thumbnail');
    };

    // Multiple Images handling
    const handleMultipleImagesChange = async (event) => {
        const files = Array.from(event.target.files);

        // Check if total files exceed 3 (including existing previews)
        if (files.length + multiplePreviews.length > 3) {
            setError('images', { message: 'You can only upload up to 3 images.' });
            return;
        }

        // Validate file size and type
        const invalidFiles = files.some((file) => {
            return file.size > 2 * 1024 * 1024 || !['image/jpeg', 'image/png', 'image/svg+xml'].includes(file.type);
        });

        if (invalidFiles) {
            setError('images', { message: 'Image should be less than 2MB and in .jpg, .png, or .svg format.' });
            return;
        }

        setMultipleFiles(files);
        const newPreviews = [];
        for (const file of files.slice(0, 3 - multiplePreviews.length)) {
            const reader = new FileReader();
            const preview = await new Promise((resolve) => {
                reader.onloadend = () => resolve(reader.result);
                reader.readAsDataURL(file);
            });
            newPreviews.push(preview);
        }
        setMultiplePreviews((prev) => [...prev, ...newPreviews]);
        clearErrors('images');
    };

    const handleRemoveThumbnail = () => {
        setThumbnailPreview(null);
        setThumbnailFile(null);
        const inputFile = document.getElementById('thumbnail-upload');
        if (inputFile) {
            inputFile.value = null;
        }
    };
    const handleRemoveImage = (index) => {
        const updatedPreviews = multiplePreviews.filter((_, i) => i !== index);
        setMultiplePreviews(updatedPreviews);
        const updatedFiles = multipleFiles.filter((_, i) => i !== index);
        setMultipleFiles(updatedFiles);
    };

    const handleReset = () => {
        reset();
        setThumbnailPreview(null);
        setMultiplePreviews([]);
        setThumbnailFile(null);
        setMultipleFiles([]);
    };

   useEffect(() => {
      return () => {
        dispatch(resetProductUpdateStatus())
      }
    }, [])
    return (
        <Box sx={{ p: 1, display: 'flex', justifyContent: 'center', position: 'relative' }}>
            <Paper sx={{ p: 1, maxWidth: 600, width: '100%' }}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Stack spacing={2}>
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
                        <Stack direction="row" spacing={1} sx={{ width: '100%' }}>
                            <FormControl fullWidth size="small" error={!!errors.brand}>
                                <InputLabel id="brand-selection">Brand</InputLabel>
                                <Select
                                    defaultValue={product?.brand ? product.brand._id : ''}
                                    {...register("brand", { required: "Brand is required" })}
                                    labelId="brand-selection"
                                    label="Brand"
                                >
                                    {brands.map((brand) => (
                                        <MenuItem key={brand._id} value={brand._id}>
                                            {brand.name}
                                        </MenuItem>
                                    ))}
                                </Select>
                                {errors.brand && <Typography color="error">{errors.brand.message}</Typography>}
                            </FormControl>

                            <FormControl fullWidth size="small" error={!!errors.category}>
                                <InputLabel id="category-selection">Category</InputLabel>
                                <Select
                                    defaultValue={product?.category ? product.category._id : ''}
                                    {...register("category", { required: "Category is required" })}
                                    labelId="category-selection"
                                    label="Category"
                                >
                                    {category.map((item) => (
                                        <MenuItem key={item._id} value={item._id}>
                                            {item.name}
                                        </MenuItem>
                                    ))}
                                </Select>
                                {errors.category && <Typography color="error">{errors.category.message}</Typography>}
                            </FormControl>
                        </Stack>

                        {/* Description */}
                        <TextField
                            label="Description"
                            variant="outlined"
                            fullWidth
                            multiline
                            rows={1}
                            size="small"
                            {...register('description', { required: "Description is required" })}
                            error={!!errors.description}
                            helperText={errors.description ? errors.description.message : ""}
                        />

                        {/* Stock Quantity & SKU */}
                        <Stack direction="row" spacing={1} sx={{ width: '100%' }}>
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
                        <Stack direction="row" spacing={1} sx={{ width: '100%' }}>
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

                        {/* Technical Specifications */}
                        <TextField
                            label="Technical Specifications"
                            variant="outlined"
                            fullWidth
                            multiline
                            rows={3}
                            size="small"
                            {...register('technicalSpecification')}
                            error={!!errors.technicalSpecification}
                            helperText={errors.technicalSpecification ? errors.technicalSpecification.message : ""}
                        />

                        {/* Warranty */}
                        <TextField
                            label="Warranty Details"
                            variant="outlined"
                            size="small"
                            {...register('warranty')}
                            error={!!errors.warranty}
                            helperText={errors.warranty ? errors.warranty.message : ""}
                        />

                        {/* Thumbnail Image Upload */}
                        <div style={{ position: 'relative', display: 'inline-block' }}>
                            {thumbnailPreview && (
                                <div style={{ position: 'relative', display: 'inline-block' }}>
                                    <img
                                        src={thumbnailPreview}
                                        alt="Thumbnail Preview"
                                        style={{
                                            maxWidth: '180px',
                                            height: '110px',
                                            marginTop: '15px',
                                            border: '1px solid black',
                                            objectFit: 'contain'
                                        }}
                                    />
                                    <IconButton
                                        onClick={handleRemoveThumbnail}
                                        sx={{
                                            position: 'absolute',
                                            top: '6px',
                                            right: '-5px',
                                            backgroundColor: 'white',
                                            border: '1px solid black',
                                            padding: '2px',
                                            width: '20px',
                                            height: '20px',
                                            zIndex: 10,
                                            '&:hover': {
                                                backgroundColor: 'red',
                                                color: 'white',
                                            },
                                        }}
                                    >
                                        <CloseIcon sx={{ fontSize: 14 }} />
                                    </IconButton>
                                </div>
                            )}
                            <input
                                id="thumbnail-upload"
                                type="file"
                                {...register('thumbnail')}
                                style={{ display: 'none' }}
                                accept="image/*"
                                onChange={handleThumbnailChange}
                            />
                            <Button
                                variant="outlined"
                                sx={{ mt: 2, marginRight: 40, width: 200 }}
                                onClick={() => document.getElementById('thumbnail-upload').click()}
                            >
                                Upload Thumbnail
                            </Button>
                            {errors.thumbnail && <Typography color="error">{errors.thumbnail.message}</Typography>}
                        </div>

                        {/* Multiple Images Upload */}
                        <div>
                            <input
                                type="file"
                                id="multiple-images-upload"
                                multiple
                                accept="image/*"
                                {...register('images')}
                                onChange={handleMultipleImagesChange}
                                style={{ display: 'none' }}
                            />
                            <Button
                                variant="outlined"
                                sx={{ mt: 2, marginRight: 40, width: 200 }}
                                onClick={() => document.getElementById('multiple-images-upload').click()}
                            >
                                Upload Images
                            </Button>
                            {errors.images && <Typography color="error">{errors.images.message}</Typography>}
                            {/* Image Previews */}
                            <div>
                                {multiplePreviews.map((image, index) => (
                                    <div key={index} style={{ position: 'relative', display: 'inline-block' }}>
                                        <img
                                            src={image}
                                            alt={`Preview ${index}`}
                                            style={{
                                                maxWidth: '180px',
                                                height: '110px',
                                                marginTop: '15px',
                                                border: '1px solid black',
                                                objectFit: 'contain',
                                                marginRight: '15px',
                                            }}
                                        />
                                        <IconButton
                                            onClick={() => handleRemoveImage(index)}
                                            sx={{
                                                position: 'absolute',
                                                top: '9px',
                                                right: '0',
                                                marginRight: '10px',
                                                backgroundColor: 'white',
                                                border: '1px solid black',
                                                padding: '2px',
                                                width: '20px',
                                                height: '20px',
                                                '&:hover': {
                                                    backgroundColor: 'red',
                                                    color: 'white',
                                                },
                                            }}
                                        >
                                            <CloseIcon sx={{ fontSize: 14 }} />
                                        </IconButton>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Submit Button */}
                        <Stack direction="row" justifyContent="space-between" spacing={2}>
                            <Button variant="outlined" onClick={handleReset}>Reset</Button>
                            <Button type="submit" variant="contained">Update Product</Button>
                        </Stack>
                    </Stack>
                </form>
            </Paper>
        </Box>
    );
};

export default EditProduct;
