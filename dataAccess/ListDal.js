const List = require("../models/List.js")

class ListDal {

    getListById = async(idList) => {
        const query = List.findOne({
            where: {
                id: idList
            }
        })

        return await query
    }

    createList = async (listData) => {
        const query = List.create({
            id: listData.id,
            idBoard: listData.idBoard,
            name: listData.name,
            closed: listData.closed
        })
        return await query
    }

    updateList = async (listData) => {
        await List.update({
            idBoard: listData.idBoard,
            name: listData.name,
            closed: listData.closed
        }, {
            where: {
                id: listData.id
            }
        })

        return this.getListById(listData.id)
    }

    deleteList = async id => {
        const query = List.destroy({
            where: {
                id: id
            }   
        })
        return await query
    }
}

module.exports = new ListDal
