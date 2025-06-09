const Blog = require('../models/Blog');

exports.createBlog = async (req, res) => {
  try {
    const imagePath = req.file ? `/uploads/blogImages/${req.file.filename}` : null;

    const blog = new Blog({
      title: req.body.title,
      content: req.body.content,
      category: req.body.category,
      image: imagePath
    });

    const savedBlog = await blog.save();
    res.status(201).json(savedBlog);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find().sort({ createdAt: -1 });

    const host = req.protocol + '://' + req.get('host');

    const blogsWithFullImagePath = blogs.map(blog => ({
      ...blog.toObject(),
      image: blog.image ? host + blog.image : null
    }));

    res.status(200).json(blogsWithFullImagePath);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
exports.updateBlog = async (req, res) => {
  try {
    const blogId = req.params.id;
    const existingBlog = await Blog.findById(blogId);

    if (!existingBlog) {
      return res.status(404).json({ message: 'Blog not found' });
    }

    const imagePath = req.file ? `/uploads/blogImages/${req.file.filename}` : existingBlog.image;

    const updatedData = {
      title: req.body.title || existingBlog.title,
      content: req.body.content || existingBlog.content,
      category: req.body.category || existingBlog.category,
      image: imagePath
    };

    const updatedBlog = await Blog.findByIdAndUpdate(blogId, updatedData, { new: true });

    const host = req.protocol + '://' + req.get('host');
    updatedBlog.image = updatedBlog.image ? host + updatedBlog.image : null;

    res.status(200).json(updatedBlog);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteBlog = async (req, res) => {
  try {
    const blogId = req.params.id;
    const deletedBlog = await Blog.findByIdAndDelete(blogId);

    if (!deletedBlog) {
      return res.status(404).json({ message: 'Blog not found' });
    }

    res.status(200).json({ message: 'Blog deleted successfully', _id: blogId });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


