const db = require("../database/mysql")
const { Op } = require('sequelize');
const Card = require("../models/Card.js")
const User = require("../models/User.js")
const Category = require("../models/Category.js")
const Priority = require("../models/Priority.js")
const Image = require("../models/Image");

class CardDal {

    getAllCards = async (page, size) => {
        const query = Card.findAndCountAll({
            include: [
                { model: Priority },
                { model: Category },
                { model: Image },
                { model: User, attributes: { exclude: ['password'] } }
                
            ],
            limit: size,
            offset: (page - 1) * size
        })

        return await query
    }

    getCardById = async cardId => {
        const query = Card.findOne({
            where: {
                id: cardId
            },
            attributes: { exclude: ['password'] },
            include: [
                { model: Priority },
                { model: Category },
                { model: Image },
                { model: User, attributes: { exclude: ['password'] } }
            ]
        })

        return await query
    }

    getCardsByfilters = async (cardId, idBoard, idList, userId, categoryId, priorityId, title, createdDate, isClosed, page, size) => {
        const whereClause = {}
        if(cardId != null) whereClause.id = cardId
        if(idBoard != null) whereClause.idBoard = idBoard
        if(idList != null) whereClause.idList = idList
        if(userId != null) whereClause.userId = userId
        if(categoryId != null) whereClause.categoryId = categoryId
        if(priorityId != null) whereClause.priorityId = priorityId
        if(title != null) whereClause.title = { [Op.like]: `%${title}%` }
        if(createdDate != null) whereClause.createdDate = createdDate
        if(isClosed != null) whereClause.isClosed = isClosed

        const query = Card.findAndCountAll({
            where: whereClause,
            include: [
                { model: Priority },
                { model: Category },
                { model: Image },
                { model: User, attributes: { exclude: ['password'] } }
            ],
            limit: size,
            offset: (page - 1) * size
        })

        return await query
    }

    createCard = async (cardData, trelloData) => {

        const query = Card.create({
            id: trelloData.id,
            idBoard: trelloData.idBoard,
            idList: trelloData.idList,
            userId: cardData.userId,
            categoryId: cardData.categoryId,
            priorityId: cardData.priorityId,
            cardStatusId: cardData.cardStatusId,
            title: trelloData.name,
            description: trelloData.desc,
            isClosed: trelloData.closed
        })

        return await query
    }

    updateCard = async (cardData, trelloData) => {

        await Card.update({
            idBoard: trelloData.idBoard,
            idList: trelloData.idList,
            userId: cardData.userId,
            categoryId: cardData.categoryId,
            priorityId: cardData.priorityId,
            title: trelloData.name,
            description: trelloData.desc,
            isClosed: trelloData.closed
        }, {
            where: {
                id: cardData.id
            }
        })

        return this.getCardById(cardData.id)
    }

    deleteCard = async idCard => {
        const query = await Card.destroy({
            where: {
                id: idCard
            }
        })

        return query
    }
}

module.exports = new CardDal