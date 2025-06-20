const express=require('express')
const orderController=require("../controllers/Order")
const router=express.Router()


router
    .post("/",orderController.create)
    .get("/",orderController.getAll)
    .get("/user/:id",orderController.getByUserId)
    .patch("/:id",orderController.updateById)
    .post("/addMessage",orderController.addMessage)
    .post("/initiatePayment",orderController.initiatePayment)
    .get("/fetchOrderById",orderController.fetchOrderById)
module.exports=router