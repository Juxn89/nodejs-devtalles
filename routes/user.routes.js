const { Router } = require('express')
const { check } = require('express-validator')

const { isAdmin, hasFollowingRole, validateJWT, validateFields } = require('@middleware/')

const { validateRole, emailAlreadyExists, existUserByID } = require('@helpers/dbValidators')
const { getUser, postUser, putUser, deleteUser, patchUser } = require('@controllers/user.controller')

const router = Router()

router.get('/', [	
	validateJWT
],getUser)

router.post('/', [
	check('name', 'Name is required').not().isEmpty(),
	check('email', 'Email is not valid').isEmail(),
	check('password', 'Password is required and must be more than 6 characters').isLength({ min: 6 }),
	check('email').custom( emailAlreadyExists ),
	check('role').custom( validateRole ),
	validateFields
], postUser)

router.put('/:id', [
	check('id', 'It is not a valid ID').isMongoId(),
	check('id').custom( existUserByID ),
	check('role').custom( validateRole ),
	validateFields
],putUser)

router.patch('/', patchUser)

router.delete('/:id', [
	validateJWT,
	// isAdmin
	hasFollowingRole('ADMIN_ROLE', 'SALES_ROLE')
],deleteUser)

module.exports = router;