const PriorityDal = require("../dataAccess/PriorityDal.js")
const ConstantMessages = require("../utils/ConstantMesssages.js")
const { SuccessDataResult, ErrorResult} = require('../utils/Result.js');

class PriorityController {

    static #TAG = "PriorityController"

    getAllPriority = async(req, res) => {
        await PriorityDal.getAllPriority()
        .then(result => {
            res.status(200).json(new SuccessDataResult(result, ConstantMessages.prioritiesFetch))
        }, (error) => {
            res.status(404).json(new ErrorResult(ConstantMessages.serverError))
            console.log(`${PriorityController.#TAG}, ${error}`)
        })
        .catch(error => {
            res.status(500).json(new ErrorResult(ConstantMessages.internalServerError)) 
            console.log(`${PriorityController.#TAG}, ${error}`)
        })
    }

    createPriority = async (req, res) => {
        const priority = req.body.priority
        await PriorityDal.createPriority(priority)
        .then(result => {
            res.status(200).json(new SuccessDataResult(result, ConstantMessages.createPriority))
        }, (error) => {
            res.status(404).json(new ErrorResult(ConstantMessages.serverError))
            console.log(`${PriorityController.#TAG}, ${error}`)
        })
        .catch(error => {
            res.status(500).json(new ErrorResult(ConstantMessages.internalServerError)) 
            console.log(`${PriorityController.#TAG}, ${error}`)
        })
    }

    updatePriority = async (req, res) => {
        const priorityData = req.body
        await PriorityDal.updatePriority(priorityData)
        .then(result => {
            res.status(200).json(new SuccessDataResult(result, ConstantMessages.updatePriority))
        }, (error) => {
            res.status(404).json(new ErrorResult(ConstantMessages.serverError))
            console.log(`${PriorityController.#TAG}, ${error}`)
        })
        .catch(error => {
            res.status(500).json(new ErrorResult(ConstantMessages.internalServerError)) 
            console.log(`${PriorityController.#TAG}, ${error}`)
        })
    }

    deletePriority = async (req, res) => {
        const id = req.body.id
        await PriorityDal.deletePriority(id)
        .then(result => {
            res.status(200).json(new SuccessDataResult(result, ConstantMessages.deletePriority))
        }, (error) => {
            res.status(404).json(new ErrorResult(ConstantMessages.serverError))
            console.log(`${PriorityController.#TAG}, ${error}`)
        })
        .catch(error => {
            res.status(500).json(new ErrorResult(ConstantMessages.internalServerError)) 
            console.log(`${PriorityController.#TAG}, ${error}`)
        })
    }
}

module.exports = new PriorityController