const ListDal = require("../dataAccess/ListDal.js")
const TrelloService = require("../middlewares/AxiosTrelloService.js")
const ConstantMessages = require("../utils/ConstantMesssages.js")
const { SuccessDataResult, ErrorResult } = require('../utils/Result.js');

class ListController {

    static #TAG = "ListController"

    createList = async (req, res) => {
        const { idBoard, name, closed } = req.body

        const axiosResult = await TrelloService.createList(idBoard, name, closed)
        if (axiosResult.success) {
            await ListDal.createList(axiosResult.data)
                .then(result => {
                    res.status(200).json(new SuccessDataResult(result, ConstantMessages.createBoard))
                }, (error) => {
                    res.status(404).json(new ErrorResult(ConstantMessages.serverError))
                    console.log(`${ListController.#TAG}, ${error}`)
                })
                .catch(error => {
                    res.status(500).json(new ErrorResult(ConstantMessages.internalServerError))
                    console.log(`${ListController.#TAG}, ${error}`)
                })
        }else {
            res.status(400).json(axiosResult)
        }
    }

    updateList = async (req, res) => {
        const { id, idBoard, name, closed } = req.body
        const axiosResult = await TrelloService.updateList(id, idBoard, name, closed)
        if (axiosResult.success) {
            await ListDal.updateList(axiosResult.data)
                .then(result => {
                    res.status(200).json(new SuccessDataResult(result, ConstantMessages.updateList))
                }, (error) => {
                    res.status(404).json(new ErrorResult(ConstantMessages.serverError))
                    console.log(`${ListController.#TAG}, ${error}`)
                })
                .catch(error => {
                    res.status(500).json(new ErrorResult(ConstantMessages.internalServerError))
                    console.log(`${ListController.#TAG}, ${error}`)
                })
        }else {
            res.status(400).json(axiosResult)
        }
    }
}

module.exports = new ListController