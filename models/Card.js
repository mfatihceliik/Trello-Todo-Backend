const { DataTypes } = require("sequelize");
const { sequelize } = require("../database/mysql.js");

const Card = sequelize.define("cards", {
    id: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true,
        autoIncrement: false
    },
    idBoard: {
        type: DataTypes.STRING
    },
    idList: {
        type: DataTypes.STRING
    },
    userId: {
        type: DataTypes.INTEGER
    },
    categoryId: {
        type: DataTypes.TINYINT
    },
    priorityId: {
        type: DataTypes.TINYINT
    },
    title: {
        type: DataTypes.STRING
    },
    description: {
        type: DataTypes.STRING
    },
    isClosed: {
        type: DataTypes.BOOLEAN
    },
    createdDate: {
        type: DataTypes.DATE
    }
}, {
    tableName: 'cards',
    timestamps: false
})




module.exports = Card