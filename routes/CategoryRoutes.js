const express = require('express');
const router = express.Router()
const CategoryController = require("../controller/CategoryController.js");

router.get('/getAllCategories', CategoryController.getAllCategories)
router.get('/getByCategoryId/:categoryId', CategoryController.getByCategoryId)
router.put('/updateCategory', CategoryController.updateCategory)
router.delete('/deleteCategory', CategoryController.deleteCategory)
router.post('/createCategory', CategoryController.createCategory)

module.exports = router