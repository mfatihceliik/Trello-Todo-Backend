const ImageDal = require("../dataAccess/ImageDal.js")
const TrelloService = require("../middlewares/AxiosTrelloService.js")
const ConstantMessages = require("../utils/ConstantMesssages.js")
const { SuccessDataResult, ErrorResult} = require('../utils/Result.js');

class ImageController {

    static #TAG = "ImageController"

    getAllImage = async(req, res) => {
        await ImageDal.getAllImage()
        .then(result => {
            res.status(200).json(new SuccessDataResult(result, ConstantMessages.prioritiesFetch))
        }, (error) => {
            res.status(404).json(new ErrorResult(ConstantMessages.serverError))
            console.log(`${ImageController.#TAG}, ${error}`)
        })
        .catch(error => {
            res.status(500).json(new ErrorResult(ConstantMessages.internalServerError)) 
            console.log(`${ImageController.#TAG}, ${error}`)
        })
    }

    createImage = async (req, res) => {
        const {cardId, imageUrl} = req.body

        const axiosResult = await TrelloService.createAttachment(cardId, imageUrl)
        if(axiosResult.success) {
            await ImageDal.createImage(axiosResult.data, cardId)
            .then(result => {
                res.status(200).json(new SuccessDataResult(result, ConstantMessages.createImage))
            }, (error) => {
                console.log(error) 
                res.status(404).json(new ErrorResult(ConstantMessages.serverError))
                console.log(`${ImageController.#TAG}, ${error}`)
            })
            .catch(error => {
                console.log(error) 
                res.status(500).json(new ErrorResult(ConstantMessages.internalServerError))
                console.log(`${ImageController.#TAG}, ${error}`)
            })
        }else {
            res.status(400).json(axiosResult)
        }
    }

    deleteImage = async (req, res) => {
        const { cardId, attachmentId }  = req.body
        const axiosResult = await TrelloService.deleteAttachemnt(cardId, attachmentId)
        if(axiosResult.success) {
            await ImageDal.deleteImage(attachmentId)
            .then(result => {
                res.status(200).json(new SuccessDataResult(result, ConstantMessages.deleteImage))
            }, (error) => {
                console.log(`${ImageController.#TAG}, ${error}`)
                res.status(404).json(new ErrorResult(ConstantMessages.serverError))
            })
            .catch(error => {
                console.log(`${ImageController.#TAG}, ${error}`) 
                res.status(500).json(new ErrorResult(ConstantMessages.internalServerError))
            })
        }else {
            res.status(400).json(axiosResult)
        }
    }
}

module.exports = new ImageController