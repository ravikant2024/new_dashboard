const express = require('express');
const { addDevice,registration } = require("../controllers/Device/addDevice"); // Destructure the addDevice function
const { updateCapabilities,updateSelectedCapabilities,updateLimits,restart } = require("../controllers/Device/updateCapabilities");
const router = express.Router();
const { fetchDevicesBySubAdminId,fetchSubadminDevices,fetchDeviceByMacId,fetchDeviceById, addSearchMacId } = require('../controllers/Device/fetchSubAdminDevices');
const {reconfigureCapabilitites}=require("../controllers/Device/reconfigureCapabilities");
const {ping}=require('../controllers/Device/ping');
const { searchLogsInTimeRange } = require('../controllers/Device/elasticSeach');
router.post('/addDevice', addDevice);
router.post('/updateCapabilities',updateSelectedCapabilities);
router.get('/registration',registration)
router.post('/fetchDevicesBySubAdminId', fetchSubadminDevices); // Adjusted route
router.post('/reconfigureCapabilitites', reconfigureCapabilitites); // Adjusted route
router.post('/updateLimits', updateLimits); // Adjusted route
router.post('/restart', restart); // Adjusted route
router.post('/ping', ping); // Adjusted route
router.get('/fetchDeviceById', fetchDeviceById);
router.get('/fetchDeviceByMacId', fetchDeviceByMacId);
router.post('/searchLogsInTimeRange',searchLogsInTimeRange);
router.post('/addPreviousSearch',addSearchMacId);
module.exports = router;
