const Board = require("../models/Board.js")

class BoardDal {

    getBoardById = async idBoard => {
        const query = Board.findOne({
            where: {
                id: idBoard
            }
        })
        return await query
    }

    createBoard = async (boardData) => {
        const query = Board.create({
            id: boardData.id,
            name: boardData.name,
            description: boardData.desc,
            closed: boardData.closed,
            pinned: boardData.pinned
        })
        return await query
    }

    updateBoard = async (boardData) => {
        const query = await Board.update({
            name: boardData.name,
            description: boardData.desc,
            closed: boardData.closed,
            pinned: boardData.pinned
        }, {
            where: {
                id: boardData.id
            }
        })

        return this.getBoardById(boardData.id)
    }

    deleteBoard = async idBoard => {
        const query = Board.destroy({
            where: {
                id: idBoard
            }   
        })
        return await query
    }
}

module.exports = new BoardDal
