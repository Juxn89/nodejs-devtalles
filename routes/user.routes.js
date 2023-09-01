const { Router } = require('express')
const { check } = require('express-validator')
const { validateFields } = require('../middleware/validateFields')
const { getUser, postUser, putUser, deleteUser, patchUser } = require('../controllers/user.controller')

const router = Router()

router.get('/', getUser)

router.post('/', [ 
	check('name', 'Name is required').not().isEmpty(),
	check('email', 'Email is not valid').isEmail(),
	check('password', 'Password is required and must be more than 6 characters').isLength({ min: 6 }),
	check('role', 'This role is not valid').isIn(['ADMIN_ROLE', 'USER_ROLE']),
	validateFields
], postUser)

router.put('/:id', putUser)

router.patch('/', patchUser)

router.delete('/', deleteUser)

module.exports = router;