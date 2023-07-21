const CategoryDal = require("../dataAccess/CategoryDal.js")
const ConstantMessages = require("../utils/ConstantMesssages.js")
const { SuccessResult, SuccessDataResult, ErrorResult} = require('../utils/Result.js');

class CategoryController {

    static #TAG = "CategoryController"

    getAllCategories = async(req, res) => {
        await CategoryDal.getAllCategories()
        .then(results => {
            res.status(200).json(new SuccessDataResult(results, ConstantMessages.categoriesFetch))
        }, (error) => {
            res.status(404).json(new ErrorResult(ConstantMessages.serverError))
            console.log(`${CategoryController.#TAG}, ${error}`)
        })
        .catch(error => {
            res.status(500).json(new ErrorResult(ConstantMessages.internalServerError)) 
            console.log(`${CategoryController.#TAG}, ${error}`)
        })
    }

    getByCategoryId = async(req, res) => {
        const categoryId = parseInt(req.params.categoryId)
        await CategoryDal.getByCategoryId(categoryId)
        .then(results => {
            res.status(200).json(new SuccessDataResult(results, ConstantMessages.categoryFetch))
        }, (error) => {
            res.status(404).json(new ErrorResult(ConstantMessages.serverError))
            console.log(`${CategoryController.#TAG}, ${error}`)
        })
        .catch(error => {
            res.status(500).json(new ErrorResult(ConstantMessages.internalServerError)) 
            console.log(`${CategoryController.#TAG}, ${error}`)
        })
    }

    createCategory = async(req, res) => {
        const categoryName = req.body.categoryName
        await CategoryDal.createCategory(categoryName)
        .then(result => {
            res.status(200).json(new SuccessDataResult(result, ConstantMessages.createCategory))
        }, (error) => {
            res.status(404).json(new ErrorResult(ConstantMessages.serverError))
            console.log(`${CategoryController.#TAG}, ${error}`)
        })
        .catch(error => {
            res.status(500).json(new ErrorResult(ConstantMessages.internalServerError)) 
            console.log(`${CategoryController.#TAG}, ${error}`)
        })
    }

    updateCategory = async(req, res) => {
        const categoryData = req.body
        await CategoryDal.updateCategory(categoryData)
        .then(result => {
            res.status(200).json(new SuccessDataResult(result, ConstantMessages.updateCategory))
        }, (error) => {
            res.status(404).json(new ErrorResult(ConstantMessages.serverError))
            console.log(`${CategoryController.#TAG}, ${error}`)
        })
        .catch(error => {
            res.status(500).json(new ErrorResult(ConstantMessages.internalServerError)) 
            console.log(`${CategoryController.#TAG}, ${error}`)
        })
    }

    deleteCategory = async(req, res) => {
        const categoryId = req.body.id
        await CategoryDal.deleteCategory(categoryId)
        .then(result => {
            res.status(200).json(new SuccessResult(ConstantMessages.deleteCategory))
        }, (error) => {
            res.status(404).json(new ErrorResult(ConstantMessages.serverError))
            console.log(`${CategoryController.#TAG}, ${error}`)
        })
        .catch(error => {
            res.status(500).json(new ErrorResult(ConstantMessages.internalServerError)) 
            console.log(`${CategoryController.#TAG}, ${error}`)
        })
    }
}

module.exports = new CategoryController