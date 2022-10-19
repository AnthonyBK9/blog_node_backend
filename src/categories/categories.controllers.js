const Categories = require('../models/categories.models')
const uuid = require('uuid');

const getCategoriesAll = async () => {
    const data = await Categories.findAll()
    return data
}

const getCategoryById = async (id) => {
    const data = Categories.findOne({
        where: {
            id
        }
    })
    return data
}

const createCategory = async (data) => {
    const nuewCategory = await Categories.create({
        id: uuid.v4(),
        name: data.name
    })
    return nuewCategory
}

const updateCategory = async (id,data) => {
    const result = await Categories.update(data,{
        where: { 
            id
        }
    })
    return result
}

const deleteCategory = async (id) => {
    const data = await Categories.destroy({
        where: {
            id
        }
    })
    return data
}

module.exports = {
    getCategoriesAll,
    getCategoryById,
    createCategory,
    updateCategory,
    deleteCategory,
}