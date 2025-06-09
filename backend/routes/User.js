const express = require("express")
const userController = require("../controllers/User")
const router = express.Router()

router
    .get("/:id", userController.getById)
    .patch("/:id", userController.updateById)
    .get("/", userController.getAllUsers)
    .patch('/:id/role',userController.updateUserRoleById);

module.exports = router