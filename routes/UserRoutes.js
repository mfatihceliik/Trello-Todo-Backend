const express = require('express');
const router = express.Router()
const UserController = require("../controller/UserController.js");

router.get('/getAllUsers', UserController.getAllUsers)
router.get('/getUserById/:userId', UserController.getUserById)
router.get('/getUserCards/:userId', UserController.getUserCards)
router.get('/findUserByEmail', UserController.findUserByEmail)

router.post('/createUser', UserController.createUser)
router.put('/updateUser', UserController.updateUser)
router.delete('/deleteUser', UserController.deleteUser)

module.exports = router