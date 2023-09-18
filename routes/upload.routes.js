const { Router } = require('express')
const { check } = require('express-validator')

const { validateFields, validateUploadFile } = require('@middleware')
const { collectionsAllowed } = require('@helpers')
const { uploadFile, updateCategoryPicture, getCollection } = require('@controllers/uploads.controller')

const router = Router()

router.get('/:collection/:id', [	
	check('id').isMongoId(),
	check('collection').custom( c => collectionsAllowed(c, ['users', 'products']) ),
	validateFields
], getCollection)

router.post('/', [
	validateUploadFile
], uploadFile)

router.put('/:collection/:id', [
	validateUploadFile,
	check('id').isMongoId(),
	check('collection').custom( c => collectionsAllowed(c, ['users', 'products']) ),
	validateFields
], updateCategoryPicture)

module.exports = router