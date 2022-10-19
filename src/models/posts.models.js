const { DataTypes } = require('sequelize')
const db = require('../utils/database')
const Categories = require('./categories.models')
const Users = require('./users.models')

const Posts = db.define('posts',{ 
    id: { 
        primaryKey: true,
        type: DataTypes.UUID,
        allowNull: false
    },
    title: { 
        type: DataTypes.STRING,
        allowNull: false
    },
    content: { 
        type: DataTypes.TEXT,
        allowNull: false
    },
    createdBy: {
        type: DataTypes.UUID,
        allowNull: false,
        field: 'created_by',
        references: { //? Llave foranea de Users
            key: 'id',
            model: Users
        }
    },
    categoryId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'category_id',
        references: { //? Llave foranea de Categories
            key: 'id',
            model: Categories
        }
    }
})

module.exports = Posts