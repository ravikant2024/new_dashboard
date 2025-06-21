const express=require('express')
const productController=require("../controllers/Product")
const { uploadFields } = require('../middleware/uploadMiddleware')
const router=express.Router()

router
    .post("/",uploadFields,productController.create)
    .get("/",productController.filterProduct)
    .get("/:id",productController.getById)
    .get("/:id",productController.getAll)
    .patch("/undelete/:id",productController.undeleteById)
    // .delete("/:id",productController.deleteById)
    .patch('/:id', uploadFields, productController.updateProductById) 
    .delete('/:id', productController.deleteProductById);


module.exports=router