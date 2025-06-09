const express = require("express")
const categoryController = require("../controllers/Category")
const uploadCatImage  = require('../middleware/uploadCatImageMiddleware')
const router = express.Router()

router
    .post('/create', uploadCatImage.single('image'),categoryController.createCategory)
    .get("/", categoryController.getAll)
    .delete('/:id', categoryController.deleteCategoryById)
    .patch('/:id',  uploadCatImage.single('image'),categoryController.updateCategoryById);


module.exports = router