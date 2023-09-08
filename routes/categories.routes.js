const { Router } = require('express')
const { check } = require('express-validator')

const { 
	getCategories, 
	getCategoryByID, 
	saveCategory, 
	updateCategory, 
	deleteCategories } = require('@controllers/category.controller')

const { validateJWT, validateFields } = require('../middleware/')

const router = Router();

router.get('/', getCategories)

router.get('/:id', getCategoryByID)

router.post('/', [
	validateJWT,
	check('name', 'Name is mandatory').not().isEmpty(),
	validateFields
], saveCategory)

router.put('/:id', updateCategory)

router.delete('/:id', deleteCategories)

module.exports = router