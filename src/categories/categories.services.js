const categoriesController = require('./categories.controllers')

const getCategoriesAll = (req, res) => {
    categoriesController.getCategoriesAll()
        .then(response => {
            res.status(200).json(response)
        })
        .catch(err => {
            res.status(400).json({msg: err.message})
        })
}

const getCategoryById = (req, res) => {
    const id = req.params.id
    categoriesController.getCategoryById(id)
        .then(response => {
            res.status(200).json(response)
        })    
        .catch(err => {
            res.status(400).json({msg: err.message})
        })
}

const createCategory = (req, res) => {
    const { name } = req.body
        if (name) {
            categoriesController.createCategory({name})
                .then(data => {
                    res.status(201).json(data)
                })
                .catch(err => {
                    res.status(400).json({msg: err.message})
                })
        } else {
            res.status(400).json({msg: 'Name Field must be completed', field: { name: 'string'}})
        }
}

const patchCategory = (req, res) => {
    const id = req.params.id
    const { name } = req.body
    categoriesController.updateCategory(id, {name})
        .then(data => {
            if (data[0]) {
                res.status(200).json({msg: `Category whit the id ${id}, edited successfully!`})
            } else {
                res.status(400).json({msg: 'Invalid ID'})
            }
        })
        .catch(err => {
            res.status(400).json({msg: err.message})
        })
}

const deleteCategory = (req, res) => {
    const id = req.params.id
    categoriesController.deleteCategory(id)
        .then(data => {
            res.status(204).json()
        })
        .catch(err => {
            res.status(400).json({msg: err.message})
        })
}

module.exports = {
    getCategoriesAll,
    getCategoryById,
    createCategory,
    patchCategory,
    deleteCategory
}