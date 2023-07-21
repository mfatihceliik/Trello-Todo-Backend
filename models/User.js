const { DataTypes } = require("sequelize");
const { sequelize } = require("../database/mysql");
const Card = require("./Card");
const Image = require("./Image.js")
const Priority = require("./Priority");
const Category = require("./Category");

const User = sequelize.define("users", {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING
    },
    surname: {
        type: DataTypes.STRING
    },
    email: {
        type: DataTypes.STRING
    },
    password: {
        type: DataTypes.STRING
    }
}, {
    tableName: 'users',
    timestamps: false
})


User.hasMany(Card, { foreignKey: 'userId' })
Card.belongsTo(User, { foreignKey: "userId"})
Card.belongsTo(Priority, { foreignKey: 'priorityId' });
Card.belongsTo(Category, { foreignKey: 'categoryId' });
Card.hasMany(Image, { foreignKey: 'cardId', sourceKey: 'id'})
Card.belongsTo(Image, { foreignKey: 'id', targetKey: 'cardId' })

module.exports = User