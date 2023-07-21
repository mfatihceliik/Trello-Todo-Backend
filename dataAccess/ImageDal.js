const Image = require("../models/Image.js")

class ImageDal {

    getAllImage = async() => {
        const query = Image.findAll()
        
        return await query
    }

    createImage = async(imageData, cardId) => {
        const query = Image.create({
            cardId: cardId,
            attachmentId: imageData.id,
            imageUrl: imageData.url
        })
        return await query
    }

    deleteImage = async attachmentId => {
        const query = Image.destroy({
            where: {
                attachmentId: attachmentId
            }
        })

        return await query
    }
}

module.exports = new ImageDal
