const { Router } = require('express')
const { check } = require('express-validator')
const { existCategoryID } = require('@helpers')

const { 
	getCategories, 
	getCategoryByID, 
	saveCategory, 
	updateCategory, 
	deleteCategories } = require('@controllers/category.controller')

const { validateJWT, validateFields } = require('../middleware/')

const router = Router();

router.get('/', getCategories)

router.get('/:id', [
	check('id', 'Category ID is mandatory').not().isEmpty(),
	check('id').isMongoId(),
	check('id').custom( existCategoryID ),
	validateFields
], getCategoryByID)

router.post('/', [
	validateJWT,
	check('name', 'Name is mandatory').not().isEmpty(),
	validateFields
], saveCategory)

router.put('/:id', [
	validateJWT,
	check('id', 'Category ID is mandatory').not().isEmpty(),
	check('id').isMongoId(),
	check('id').custom( existCategoryID ),
	check('name', 'Name of category is mandatory').not().isEmpty(),
	validateFields
], updateCategory)

router.delete('/:id', [
	validateJWT,
	isAdmin,
	check('id', 'Category ID is mandatory').not().isEmpty(),
	check('id', 'ID field is not a valid Mongo ID').isMongoId(),
	check('id').custom( existCategoryID ),
	validateFields
], deleteCategories)

module.exports = router