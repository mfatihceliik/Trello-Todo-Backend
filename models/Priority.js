const { DataTypes } = require("sequelize");
const { sequelize } = require("../database/mysql");

const Priority = sequelize.define("priorities", {
    id: {
        type: DataTypes.TINYINT,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    priority: {
        type: DataTypes.STRING
    },
}, {
    tableName: 'priorities',
    timestamps: false
})

module.exports = Priority