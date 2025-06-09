const express=require('express')
const router=express.Router()
const {signup}=require("../controllers/Ops/signup");
const {login}=require("../controllers/Ops/login");

router
    .post("/signup",signup)
    .post('/login',login)


module.exports=router