const express = require('express');
const router = express.Router()
const CardController = require("../controller/CardController.js");

router.get('/getAllCards', CardController.getAllCards)
router.get('/getCardById/:cardId', CardController.getCardById)
router.get('/getCardsByfilters', CardController.getCardsByfilters)

router.post('/createCard', CardController.createCard)

router.put('/updateCard', CardController.updateCard)

router.delete('/deleteCard', CardController.deleteCard)

module.exports = router