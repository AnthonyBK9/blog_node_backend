const { DataTypes } = require('sequelize')
const db = require('../utils/database')

const Categories = db.define('categories', {
    id: {
        primaryKey: true,
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    //? Evita que sequelize agregue las columnas de createdAt y updatedAt
    timestamps: false,
})

module.exports = Categories