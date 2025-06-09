const express=require('express')
const otaController=require('../controllers/Device/ota')
const router=express.Router()

router
    .post("/addOta",otaController.addOta)
    .post("/fetchOtaIndex",otaController.fetchOtaIndex)
    .post("/fetchOtaData1",otaController.fetchOtaData)
    .post("/fetchOtaList",otaController.fetchOtaVersions);

module.exports=router