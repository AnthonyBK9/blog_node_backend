const router = require('express').Router()
const servicesCategories = require('./categories.services')


router.route('/')
    .get(servicesCategories.getCategoriesAll)
    .post(servicesCategories.createCategory)

router.route('/:id')
    .get(servicesCategories.getCategoryById)
    .patch(servicesCategories.patchCategory)
    .delete(servicesCategories.deleteCategory)


module.exports = router