const express = require('express');
const router = express.Router()
const BoardController = require("../controller/BoardController.js");

router.post('/createBoard', BoardController.createBoard)
router.put('/updateBoard', BoardController.updateBoard)
router.delete('/deleteBoard', BoardController.deleteBoard)

module.exports = router