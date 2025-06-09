const express=require('express')
const {addSale}=require("../controllers/Sales/addSale");
const router=express.Router()


router
    .post("/addSale",addSale)
module.exports=router