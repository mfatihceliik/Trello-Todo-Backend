const Pagination = require("../utils/Pagination")
const UserDal = require("../dataAccess/UserDal.js") 
const ConstantMessages = require("../utils/ConstantMesssages.js")
const { SuccessDataResult, ErrorResult, PaginationDataResult, SuccessResult} = require('../utils/Result.js');


class UserController {

    static #TAG = "UserController"

    getAllUsers = async(req, res) => {
        const pageAsNumber = Number.parseInt(req.query.page)
        const sizeAsNumber = Number.parseInt(req.query.size)

        let page = 0;
        let size = 5;
        if(!Number.isNaN(pageAsNumber) && pageAsNumber > 0) {
            page = pageAsNumber
        } else {
            console.log(`${UserController.#TAG}, ${ConstantMessages.paginationCheckPageMessage}`)
            return res.status(404).json(new ErrorResult(ConstantMessages.paginationCheckPageMessage))
        }
        
        if(!Number.isNaN(sizeAsNumber) && sizeAsNumber > 0) {
            size = sizeAsNumber
        }else {
            console.log(`${UserController.#TAG}, ${ConstantMessages.paginationCheckSizeMessage}`)
            return res.status(404).json(new ErrorResult(ConstantMessages.paginationCheckSizeMessage))
        }

        await UserDal.getAllUsers(page, size)
        .then(results => {

            const pageInfo = new Pagination(results.count, Math.ceil(results.count / size), page)
            
            res.status(200).json(new PaginationDataResult(pageInfo, results.rows, ConstantMessages.usersFetch))
        }, (error) => {
            res.status(404).json(new ErrorResult(ConstantMessages.serverError))
            console.log(`${UserController.#TAG}, ${error}`)
        })
        .catch(error => {
            res.status(500).json(new ErrorResult(ConstantMessages.internalServerError)) 
            console.log(`${UserController.#TAG}, ${error}`)
        })

    }

    getUserById = async(req, res) => {
        const userId = parseInt(req.params.userId)
        await UserDal.getUserById(userId)
        .then(result => {
            res.status(200).json(new SuccessDataResult(result, ConstantMessages.userFetch))
        }, (error) => {
            res.status(404).json(new ErrorResult(ConstantMessages.serverError))
            console.log(`${UserController.#TAG}, ${error}`)
        })
        .catch(error => {
            res.status(500).json(new ErrorResult(ConstantMessages.internalServerError)) 
            console.log(`${UserController.#TAG}, ${error}`)
        })
    }

    getUserCards = async(req, res) => {
        const userId = parseInt(req.params.userId)
        await UserDal.getUserCards(userId)
        .then(results => {
            res.status(200).json(new SuccessDataResult(results, ConstantMessages.userFetch))
        }, (error) => {
            res.status(404).json(new ErrorResult(ConstantMessages.serverError))
            console.log(`${UserController.#TAG}, ${error}`)
        })
        .catch(error => {
            res.status(500).json(new ErrorResult(ConstantMessages.internalServerError)) 
            console.log(`${UserController.#TAG}, ${error}`)
        })
    }

    findUserByEmail = async(req, res) => {
        const email = req.body.email
        await UserDal.findUserByEmail(email)
        .then(result => {
            res.status(200).json(new SuccessDataResult(result, ConstantMessages.userFetch))
        }, (error) => {
            res.status(404).json(new ErrorResult(ConstantMessages.serverError))
            console.log(`${UserController.#TAG}, ${error}`)
        })
        .catch(error => {
            res.status(500).json(new ErrorResult(ConstantMessages.internalServerError)) 
            console.log(`${UserController.#TAG}, ${error}`)
        })
    }

    createUser = async(req, res) => {
        const userData = req.body
        await UserDal.createUser(userData)
        .then(results => {
            res.status(200).json(new SuccessDataResult(results, ConstantMessages.createUser))
        }, (error) => {
            res.status(404).json(new ErrorResult(ConstantMessages.serverError))
            console.log(`${UserController.#TAG}, ${error}`)
        })
        .catch(error => {
            res.status(500).json(new ErrorResult(ConstantMessages.internalServerError)) 
            console.log(`${UserController.#TAG}, ${error}`)
        })
    }

    updateUser = async(req, res) => {
        const userData = req.body
        await UserDal.updateUser(userData)
        .then(results => {
            res.status(200).json(new SuccessDataResult(results, ConstantMessages.updateUser))
        }, (error) => {
            res.status(404).json(new ErrorResult(ConstantMessages.serverError))
            console.log(`${UserController.#TAG}, ${error}`)
        })
        .catch(error => {
            res.status(500).json(new ErrorResult(ConstantMessages.internalServerError)) 
            console.log(`${UserController.#TAG}, ${error}`)
        })
    }

    deleteUser = async(req, res) => {
        const id = req.body.id
        await UserDal.deleteUser(id)
        .then(results => {
            res.status(200).json(new SuccessResult(ConstantMessages.deleteUser))
        }, (error) => {
            res.status(404).json(new ErrorResult(ConstantMessages.serverError))
            console.log(`${UserController.#TAG}, ${error}`)
        })
        .catch(error => {
            res.status(500).json(new ErrorResult(ConstantMessages.internalServerError)) 
            console.log(`${UserController.#TAG}, ${error}`)
        })
    }
}

module.exports = new UserController