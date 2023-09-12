const { Router } = require('express')
const { check } = require('express-validator')

const { validateJWT, validateFields, isAdmin } = require('@middleware/')
const { existProductByName, isValidProductPrice, existProductbyID } = require('@helpers')
const { getProducts, getProductByID, saveProduct, updateProduct, deleteProduct } = require('@controllers/products.controller')

const router = Router()

router.get('/', getProducts)

router.get('/:id', [
	check('id').isMongoId(),
	check('id').custom( existProductbyID ),
	validateFields
], getProductByID)

router.post('/', [
	validateJWT,
	check('name', 'Product name is mandatory').not().isEmpty(),
	check('description', 'Product description is mandatory').not().isEmpty(),
	check('price', 'Price is mandatory').not().isEmpty(),
	check('price', 'Price must be a number').isNumeric(),
	check('category', 'Category ID is mandatory').isMongoId(),
	check('name').custom( existProductByName ),
	check('price').custom( isValidProductPrice ),
	validateFields
], saveProduct)

router.put('/:id', [
	validateJWT,
	check('id', 'Product ID is mandatory').not().isEmpty(),
	check('id').isMongoId(),
	check('name', 'Product name is mandatory').not().isEmpty(),
	check('description', 'Product description is mandatory').not().isEmpty(),
	check('price', 'Price is mandatory').not().isEmpty(),
	check('price', 'Price must be a number').isNumeric(),
	check('category', 'Category ID is mandatory').isMongoId(),
	check('id').custom( existProductbyID ),
	check('price').custom( isValidProductPrice ),
	validateFields
], updateProduct)

router.delete('/:id', [	
	validateJWT,
	isAdmin,
	check('id', 'Product ID is mandatory').not().isEmpty(),
	check('id').isMongoId(),
	check('id').custom( existProductbyID ),
	validateFields
], deleteProduct)

module.exports = router;