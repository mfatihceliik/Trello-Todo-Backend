const CardDal = require("../dataAccess/CardDal.js")
const Pagination = require("../utils/Pagination.js");
const TrelloService = require("../middlewares/AxiosTrelloService.js")
const ConstantMessages = require("../utils/ConstantMesssages.js")
const { SuccessResult, SuccessDataResult, ErrorResult, PaginationDataResult} = require('../utils/Result.js');

class CardController {

    static #TAG = "CardController"
    
    getAllCards = async(req, res) => {

        const pageAsNumber = Number.parseInt(req.query.page)
        const sizeAsNumber = Number.parseInt(req.query.size)

        let page = 1;
        let size = 5;
        if(!Number.isNaN(pageAsNumber) && pageAsNumber > 0) {
            page = pageAsNumber
        } else {
            console.log(`${CardController.#TAG}, ${ConstantMessages.paginationCheckPageMessage}`)
            return res.status(404).json(new ErrorResult(ConstantMessages.paginationCheckPageMessage))
        }
        
        if(!Number.isNaN(sizeAsNumber) && sizeAsNumber > 0) {
            size = sizeAsNumber
        }else {
            console.log(`${CardController.#TAG}, ${ConstantMessages.paginationCheckSizeMessage}`)
            return res.status(404).json(new ErrorResult(ConstantMessages.paginationCheckSizeMessage))
        }
        
        await CardDal.getAllCards(parseInt(page), parseInt(size))
        .then(results => {
            
            const pageInfo = new Pagination(results.count, Math.ceil(results.count / size), page, size)

            res.status(200).json(new PaginationDataResult(pageInfo, results.rows, ConstantMessages.cardsFetch))
        }, (error) => {
            res.status(404).json(new ErrorResult(ConstantMessages.serverError))
            console.log(`${CardController.#TAG}, ${error}`)
        })
        .catch(error => {
            res.status(500).json(new ErrorResult(ConstantMessages.internalServerError)) 
            console.log(`${CardController.#TAG}, ${error}`)
        })
    }

    getCardById = async(req, res) => {
        const cardId = parseInt(req.params.cardId)
        await CardDal.getCardById(cardId)
        .then(result => {
            res.status(200).json(new SuccessDataResult(result, ConstantMessages.cardFetch))
        }, (error) => {
            res.status(404).json(new ErrorResult(ConstantMessages.serverError))
            console.log(`${CardController.#TAG}, ${error}`)
        })
        .catch(error => {
            res.status(500).json(new ErrorResult(ConstantMessages.internalServerError)) 
            console.log(`${CardController.#TAG}, ${error}`)
        })
    }

    getCardsByfilters = async (req, res) => {

        const pageAsNumber = Number.parseInt(req.query.page)
        const sizeAsNumber = Number.parseInt(req.query.size)

        let page = 0;
        let size = 5;
        if(!Number.isNaN(pageAsNumber) && pageAsNumber >= 0) {
            page = pageAsNumber
        } else {
            console.log(`${CardController.#TAG}, ${ConstantMessages.paginationCheckPageMessage}`)
            return res.status(404).json(new ErrorResult(ConstantMessages.paginationCheckPageMessage))
        }
        
        if(!Number.isNaN(sizeAsNumber) && sizeAsNumber > 0) {
            size = sizeAsNumber
        }else {
            console.log(`${CardController.#TAG}, ${ConstantMessages.paginationCheckSizeMessage}`)
            return res.status(404).json(new ErrorResult(ConstantMessages.paginationCheckSizeMessage))
        }

        const { cardId, idBoard, idList, userId, categoryId, priorityId, title, createdDate, isClosed } = req.body

        await CardDal.getCardsByfilters(cardId, idBoard, idList, userId, categoryId, priorityId, title, createdDate, isClosed, page, size)
        .then(results => {

            const pageInfo = new Pagination(results.count, Math.ceil(results.count / size), page, size)

            res.status(200).json(new PaginationDataResult(pageInfo, results, ConstantMessages.filteredCardsFetch))
        }, (error) => {
            res.status(404).json(new ErrorResult(ConstantMessages.serverError))
            console.log(`${CardController.#TAG}, ${error}`)
        })
        .catch(error => {
            res.status(500).json(new ErrorResult(ConstantMessages.internalServerError)) 
            console.log(`${CardController.#TAG}, ${error}`)
        })
    }

    createCard = async(req, res) => {
        const cardData = req.body
        const axiosResult = await TrelloService.createCard(cardData.idList, cardData.title, cardData.description)
        if(axiosResult.success) {
            await CardDal.createCard(cardData, axiosResult.data)
            .then(result => {
                res.status(200).json(new SuccessDataResult(result, ConstantMessages.createCard))
            }, (error) => {
                res.status(404).json(new ErrorResult(ConstantMessages.serverError))
                console.log(`${CardController.#TAG}, ${error}`)
            })
            .catch(error => {
                res.status(500).json(new ErrorResult(ConstantMessages.internalServerError))
                console.log(`${CardController.#TAG}, ${error}`)
            })
        }else {
            res.status(400).json(axiosResult)
        }
    }

    updateCard = async(req, res) => {
        const cardData = req.body

        const axiosResult = await TrelloService.updateCard(cardData.id, cardData.title, cardData.description)
        if(axiosResult.success) {
            await CardDal.updateCard(cardData, axiosResult.data)
            .then(result => {
                res.status(200).json(new SuccessDataResult(result, ConstantMessages.updateCard))
            }, (error) => {
                res.status(404).json(new ErrorResult(ConstantMessages.serverError))
                console.log(`${CardController.#TAG}, ${error}`)
            })
            .catch(error => {
                res.status(500).json(new ErrorResult(ConstantMessages.internalServerError))
                console.log(`${CardController.#TAG}, ${error}`)
            })
        }else {
            res.status(400).json(axiosResult)
        }
    }

    deleteCard = async(req, res) => {
        const idCard = req.body.id
        const axiosResult = await TrelloService.deleteCard(idCard)
        if(axiosResult.success) {
            await CardDal.deleteCard(idCard)
            .then(result => {
                res.status(200).json(new SuccessResult(ConstantMessages.deleteCard))
            }, (error) => {
                res.status(404).json(new ErrorResult(ConstantMessages.serverError))
                console.log(`${CardController.#TAG}, ${error}`)
            })
            .catch(error => {
                res.status(500).json(new ErrorResult(ConstantMessages.internalServerError)) 
                console.log(`${CardController.#TAG}, ${error}`) 
            })
        }else {
            res.status(400).json(axiosResult)
        }
    }
}

module.exports = new CardController