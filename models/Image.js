const { DataTypes } = require("sequelize");
const { sequelize } = require("../database/mysql");

const Image = sequelize.define("images", {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    attachmentId: {
        type: DataTypes.UUID
    },
    cardId: {
        type: DataTypes.UUID
    },
    imageUrl: {
        type: DataTypes.STRING
    },
}, {
    tableName: 'images',
    timestamps: false
})

module.exports = Image