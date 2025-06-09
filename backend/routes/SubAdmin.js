const express=require('express')
const router=express.Router()
const {signup}=require("../controllers/SubAdmin/signup");
const {login}=require("../controllers/SubAdmin/login");
const {fetchSubadmin}=require("../controllers/SubAdmin/fetchSubadmin");
const { addMacIdToDevices}=require('../controllers/SubAdmin/addMacIdToDevices');
const { checkUserExists } = require('../controllers/SubAdmin/checkUserExits');
router
    .post("/signup",signup)
    .post('/login',login)
    .get('/fetchSubadmin',fetchSubadmin)
    .post('/addMacIdToDevices',addMacIdToDevices)
    .get('/checkUser',checkUserExists)


module.exports=router