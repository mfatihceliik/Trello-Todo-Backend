const express = require('express');
const router = express.Router()
const PriorityController = require("../controller/PriorityController.js");

router.get('/getAllPriorities', PriorityController.getAllPriority)
router.post('/createPriority', PriorityController.createPriority)
router.put('/updatePriority', PriorityController.updatePriority)
router.delete('/deletePriority', PriorityController.deletePriority)

module.exports = router