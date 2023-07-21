const { DataTypes } = require("sequelize");
const { sequelize } = require("../database/mysql");

const List = sequelize.define("lists", {
    id: {
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
        autoIncrement: false
    },
    idBoard: {
        type: DataTypes.UUID
    },
    name: {
        type: DataTypes.STRING
    },
    closed: {
        type: DataTypes.BOOLEAN
    },
    createdDate: {
        type: DataTypes.DATE
    }
}, {
    tableName: 'lists',
    timestamps: false
})

module.exports = List