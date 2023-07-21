const User = require("../models/User.js")
const Card = require("../models/Card.js")
const Image = require("../models/Image.js")
const Category = require("../models/Category.js")
const Priority = require("../models/Priority.js")

class UserDal {

    getAllUsers = async(page, size) => {
        const query = User.findAndCountAll({
            limit: size,
            offset: (page - 1) * size
        })

        return await query
    }
    
    getUserById = async userId => {
        const query = User.findOne({
            where: {
                id: userId
            },
        })

        return await query
    }

    getUserCards = async userId => {
        const query = User.findAll({
            where: {
                id: userId
            },
            attributes: { exclude: ['password'] },
            include: [
                { model: Card, include: [
                    { model: Image },
                    { model: Priority },
                    { model: Category },
                ], 
                order: [['createdDate', 'DESC']],
                limit: 5
            }],
        })

        return await query
    }

    findUserByEmail = async email => {
        const query = User.findOne({
            where: {
                email: email
            }
        })

        return await query
    }

    createUser = async (userData) => {
        const query = User.create({
            name: userData.name,
            surname: userData.surname,
            email: userData.email,
            password: userData.password
        })

        return await query
    }

    updateUser = async(userData) => {
        await User.update({   
            name: userData.name,
            surname: userData.username,
            email: userData.email,
            password: userData.password
        }, {
            where: {
                id: userData.id
            }
        })

        return await this.getUserById(userData.id)
    }
    
    deleteUser = async id => {
        const query = User.destroy({
            where: {
                id: id
            }
        })
        
        return await query
    }
}

module.exports = new UserDal