const Category = require("../models/Category")

exports.createCategory = async (req, res) => {
  try {
    const image = req.file;

    // Check if the category name is provided
    const { name } = req.body;
    if (!name) {
      return res.status(400).json({ message: 'Category name is required' });
    }

    // If an image is uploaded, store the image URL or path in the database
    let imageUrl = null;
    if (image) {
      imageUrl = `/uploads/catImages/${image.filename}`; 
    }

    // Create a new category with the name and the image URL (if any)
    const newCategory = new Category({
      name,
      image: imageUrl, 
    });

    // Save the category to the database
    await newCategory.save();

    res.status(201).json({
      message: 'Category created successfully',
      category: newCategory,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getAll = async (req, res) => {
  try {
    const baseUrl = `${req.protocol}://${req.get('host')}`; 
    const categories = await Category.find({});

    const updatedCategories = categories.map((category) => {
      return {
        ...category.toObject(),
        image: category.image ? `${baseUrl}${category.image}` : null
      };
    });

    res.status(200).json(updatedCategories);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error fetching categories" });
  }
};

exports.deleteCategoryById = async (req, res) => {
  try {
    const { id } = req.params;
    // Check if the category exists
    const category = await Category.findById(id);
    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }
    // Delete the category by ID
    await Category.findByIdAndDelete(id);

    res.status(200).json({ message: 'Category deleted successfully' });
  } catch (error) {

    res.status(500).json({ message: 'Error deleting category' });
  }
};

exports.updateCategoryById = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    const category = await Category.findById(id);
    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }
    if (!name) {
      return res.status(400).json({ message: 'Category name is required for update' });
    }

    category.name = name;
    await category.save();

    // Return the updated category
    res.status(200).json({
      message: 'Category updated successfully',
      category
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error updating category' });
  }
};

