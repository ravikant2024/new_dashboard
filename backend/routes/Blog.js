const express = require('express');
const router = express.Router();
const blogController = require('../controllers/Blog');
const uploadBlog = require('../middleware/UploadBlogImagesMiddleware');

// Create new blog with image upload
router.post('/', uploadBlog.single('image'), blogController.createBlog);

// Get all blogs
router.get('/', blogController.getAllBlogs);

// Update a blog with optional image update
router.patch('/:id', uploadBlog.single('image'), blogController.updateBlog);
router.delete('/:id', blogController.deleteBlog);
module.exports = router;

