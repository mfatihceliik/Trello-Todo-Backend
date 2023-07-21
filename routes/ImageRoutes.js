const express = require('express');
const router = express.Router()
const ImageController = require('../controller/ImageController.js');

router.get('/getAllImage', ImageController.getAllImage)
router.post('/createImage', ImageController.createImage)
router.delete('/deleteImage', ImageController.deleteImage)

module.exports = router