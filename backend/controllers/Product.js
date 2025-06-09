const { Schema, default: mongoose } = require("mongoose")
const Product = require('../models/Product');

exports.create = async (req, res) => {
    try {
        // Handle the uploaded files
        const thumbnail = req.files['thumbnail'] ? req.files['thumbnail'][0].path : null;
        const images = req.files['images'] ? req.files['images'].map(file => file.path) : [];

        // Extract other form data
        const { title, description, price, discountPercentage, category, brand, stockQuantity, sku, technicalSpecification, warranty,videoLink } = req.body;

        // Validate required fields
        if (!title || !description || !price || !category || !brand || !stockQuantity || !sku) {
            return res.status(400).json({ message: 'Please fill in all required fields.' });
        }

        // Create a new product document
        const createdProduct = new Product({
            title,
            description,
            price,
            discountPercentage,
            category,
            brand,
            stockQuantity,
            sku,
            thumbnail,
            images,
            technicalSpecification,
            warranty,
            videoLink
        });

        await createdProduct.save();
        res.status(201).json(createdProduct);

    } catch (error) {
        console.error('Error creating product:', error);
        res.status(500).json({
            message: 'Error adding product, please try again later',
            error: error.message || error
        });
    }
};


exports.getAll = async (req, res) => {
    try {
        const filter = {};
        const sort = {};
        let skip = 0;
        let limit = 0;

        // Build filter object based on query parameters
        if (req.query.brand) {
            filter.brand = { $in: req.query.brand.split(',') }; 
        }
        if (req.query.category) {
            filter.category = { $in: req.query.category.split(',') }; 
        }
        if (req.query.user) {
            filter['isDeleted'] = false; 
        }

        // Sorting logic
        if (req.query.sort) {
            sort[req.query.sort] = req.query.order === 'asc' ? 1 : -1;
        }

        // Pagination logic
        if (req.query.page && req.query.limit) {
            const pageSize = parseInt(req.query.limit);
            const page = parseInt(req.query.page);
            skip = pageSize * (page - 1);
            limit = pageSize;
        }

        const totalDocs = await Product.countDocuments(filter);
        const results = await Product.find(filter).sort(sort).skip(skip).limit(limit).exec();
        // Construct the base URL dynamically
        const baseUrl = `${req.protocol}://${req.get('host')}`;
        results.forEach((product) => {
            if (product.thumbnail) {
                product.thumbnail = `${baseUrl}/${product.thumbnail}`;
            }
            product.images = product.images.map(image => `${baseUrl}/${image}`);
        });

        // Set total count header for pagination
        res.set("X-Total-Count", totalDocs);
        res.status(200).json(results);
    } catch (error) {
        console.error("API Error:", error);
        res.status(500).json({ message: 'Error fetching products, please try again later' });
    }
};

exports.getById = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findById(id).populate("brand").populate("category");

        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        const baseUrl = `${req.protocol}://${req.get('host')}`;
        const productData = product.toObject();

        // Add full URL for thumbnail
        if (productData.thumbnail) {
            productData.thumbnail = `${baseUrl}/${productData.thumbnail}`;
        }

        // Add full URLs for images
        if (productData.images && productData.images.length > 0) {
            productData.images = productData.images.map(img => `${baseUrl}/${img}`);
        }

        // videoLink will already be included as part of productData
        // Optionally, add embeddable version:
        if (productData.videoLink) {
            const match = productData.videoLink.match(/(?:youtu\.be\/|v=|embed\/)([^?&]+)/);
            if (match && match[1]) {
                productData.videoEmbedUrl = `https://www.youtube.com/embed/${match[1]}`;
            }
        }

        res.status(200).json(productData);
    } catch (error) {
        console.error('Error in getById:', error);
        res.status(500).json({ message: 'Error getting product details, please try again later' });
    }
};


exports.updateById = async (req, res) => {
    try {
        const { id } = req.params
        const updated = await Product.findByIdAndUpdate(id, req.body, { new: true })
        console.log("updated", updated)
        res.status(200).json(updated)
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Error updating product, please try again later' })
    }
}

exports.undeleteById = async (req, res) => {
    try {
        const { id } = req.params
        const unDeleted = await Product.findByIdAndUpdate(id, { isDeleted: false }, { new: true }).populate('brand')
        res.status(200).json(unDeleted)
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Error restoring product, please try again later' })
    }
}

exports.deleteById = async (req, res) => {
    try {
        const { id } = req.params
        const deleted = await Product.findByIdAndUpdate(id, { isDeleted: true }, { new: true }).populate("brand")
        res.status(200).json(deleted)
    } catch (error) {
        res.status(500).json({ message: 'Error deleting product, please try again later' })
    }
}

// Update a product by its ID
exports.updateProductById = async (req, res) => {
    try {
        const productId = req.params.id;
        const updatedData = req.body;

        // Retrieve the product from the database before updating it
        const existingProduct = await Product.findById(productId);

        if (!existingProduct) {
            return res.status(404).json({ message: 'Product not found' });
        }

        // If files are uploaded, handle the thumbnail and images
        if (req.files) {
            // Handle thumbnail upload
            if (req.files.thumbnail) {
                updatedData.thumbnail = req.files.thumbnail[0].path;  // Update thumbnail if uploaded
            } else {
                // If no new thumbnail, retain the old one
                updatedData.thumbnail = existingProduct.thumbnail;
            }

            // Handle multiple images upload
            if (req.files.images && req.files.images.length > 0) {
                updatedData.images = req.files.images.map(file => file.path);  // Update images if uploaded
            } else {
                // If no new images, retain the old images
                updatedData.images = existingProduct.images;
            }
        } else {
            // If no files are uploaded, keep existing images and thumbnail
            updatedData.thumbnail = existingProduct.thumbnail;
            updatedData.images = existingProduct.images;
        }

        // Ensure the required fields are present in the update request
        if (!updatedData.title || !updatedData.description || !updatedData.price || !updatedData.category || !updatedData.brand || !updatedData.stockQuantity || !updatedData.sku || !updatedData.technicalSpecification || !updatedData.warranty) {
            return res.status(400).json({ message: 'Please fill in all required fields.' });
        }

        // Update the product in the database
        const updatedProduct = await Product.findByIdAndUpdate(
            productId,
            updatedData,
            { new: true, runValidators: true }  // Ensure validators are run when updating
        );

        // Return the updated product
        res.status(200).json({ message: 'Product successfully updated', product: updatedProduct });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};


// Delete productById //

exports.deleteProductById = async (req, res) => {
    try {
        const productId = req.params.id;
        const deletedProduct = await Product.findByIdAndDelete(productId);
        if (!deletedProduct) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.status(200).json({ message: 'Product successfully deleted', product: deletedProduct });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};


