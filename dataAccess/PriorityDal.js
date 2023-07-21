const Priority = require("../models/Priority.js")

class PriorityDal {
    getAllPriority = async() => {
        const query = Priority.findAll()
        
        return await query
    }

    createPriority = async priority => {
        const query = Priority.create({
            priority: priority
        })

        return await query
    }

    updatePriority = async(priorityData) => {
        const query = Priority.update({
            priority: priorityData.priority
        }, {
            where: {
                id: priorityData.id
            }
        })

        return await query
    }

    deletePriority = async id => {
        const query = Priority.destroy({
            where: {
                id: id
            }
        })

        return await query
    }
}

module.exports = new PriorityDal
