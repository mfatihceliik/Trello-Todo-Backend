const { DataTypes } = require("sequelize");
const { sequelize } = require("../database/mysql");

const Category = sequelize.define("categories", {
    id: {
        type: DataTypes.TINYINT,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    categoryName: {
        type: DataTypes.STRING
    },
}, {
    tableName: 'categories',
    timestamps: false
})

module.exports = Category