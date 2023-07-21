const BoardDal = require("../dataAccess/BoardDal.js")
const TrelloService = require("../middlewares/AxiosTrelloService.js")
const ConstantMessages = require("../utils/ConstantMesssages.js")
const { SuccessDataResult, SuccessResult, ErrorResult } = require('../utils/Result.js');


class BoardController {

    static #TAG = "BoardController"

    createBoard = async(req, res) => {
        const { name, description, closed, pinned } = req.body
        const axiosResult = await TrelloService.createBoard(name, description, closed, pinned)
        if(axiosResult.success) {
            await BoardDal.createBoard(axiosResult.data)
            .then(result => {
                res.status(200).json(new SuccessDataResult(result, ConstantMessages.createBoard))
            }, (error) => {
                res.status(404).json(new ErrorResult(ConstantMessages.serverError))
                console.log(`${BoardController.#TAG}, ${error}`)
            })
            .catch(error => {
                res.status(500).json(new ErrorResult(ConstantMessages.internalServerError))
                console.log(`${BoardController.#TAG}, ${error}`)
            })
        }else {
            res.status(400).json(axiosResult)
        }
    }

    updateBoard = async(req, res) => {
        const boardData = req.body
        const axiosResult = await TrelloService.updateBoard(boardData.id, boardData.name, boardData.description, boardData.closed, boardData.pinned)
        if(axiosResult.success) {
            await BoardDal.updateBoard(boardData)
            .then(result => {
                res.status(200).json(new SuccessDataResult(result, ConstantMessages.updateBoard))
            }, (error) => {
                res.status(404).json(new ErrorResult(ConstantMessages.serverError))
                console.log(`${BoardController.#TAG}, ${error}`)
            })
            .catch(error => {
                res.status(500).json(new ErrorResult(ConstantMessages.internalServerError))
                console.log(`${BoardController.#TAG}, ${error}`)
            })
        }else {
            res.status(400).json(axiosResult)
        }
    }

    deleteBoard = async(req, res) => {
        const idBoard = req.body.id
        const axiosResult = await TrelloService.deleteBoard(idBoard)
        if(axiosResult.success) {
            await BoardDal.deleteBoard(idBoard)
            .then(result => {
                res.status(200).json(new SuccessResult(ConstantMessages.deleteBoard))
            }, (error) => {
                res.status(404).json(new ErrorResult(ConstantMessages.serverError))
                console.log(`${BoardController.#TAG}, ${error}`)
            })
            .catch(error => {
                res.status(500).json(new ErrorResult(ConstantMessages.internalServerError))
                console.log(`${BoardController.#TAG}, ${error}`)
            })
        }else {
            res.status(400).json(axiosResult)
        }
    }
}

module.exports = new BoardController