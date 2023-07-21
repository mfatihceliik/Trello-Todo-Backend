const Category = require("../models/Category.js")

class CategoryDal {
    getAllCategories = async() => {
        const query = Category.findAll()
        return await query
    }

    getByCategoryId = async categoryId => {
        const query = Category.findOne({
            where: {
                id: categoryId
            }
        })
        return await query
    }

    createCategory = async categoryName => {
        const query = Category.create({
            categoryName: categoryName
        })
        return await query
    }

    updateCategory = async (categoryData) => {
        await Category.update({
            categoryName: categoryData.categoryName
        }, {
            where: {
                id: categoryData.id
            } 
        })
        return await this.getByCategoryId(categoryData.id)
    }

    deleteCategory = async categoryId => {
        const query = Category.destroy({
            where: {
                id: categoryId
            } 
        })
        return await query
    }
}

module.exports = new CategoryDal
