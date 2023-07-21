const express = require('express');
const router = express.Router()
const ListController = require("../controller/ListController.js");

router.post('/createList', ListController.createList)
router.put('/updateList', ListController.updateList)

module.exports = router