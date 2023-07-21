const { DataTypes } = require("sequelize");
const { sequelize } = require("../database/mysql");

const Board = sequelize.define("boards", {
    id: {
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
        autoIncrement: false
    },
    name: {
        type: DataTypes.STRING
    },
    description: {
        type: DataTypes.STRING
    },
    closed: {
        type: DataTypes.BOOLEAN
    },
    pinned: {
        type: DataTypes.BOOLEAN
    },
    createdDate: {
        type: DataTypes.DATE
    }
}, {
    tableName: 'boards',
    timestamps: false
})

module.exports = Board