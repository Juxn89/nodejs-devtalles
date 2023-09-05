const { Router } = require('express')
const { login } = require('../controllers/auth.controller')
const { check } = require('express-validator')
const { validateFields } = require('../middleware/validateFields')

const router = Router()

router.post('/login', [
	check('email', 'Email is required').isEmail(),
	check('password', 'Password is required').not().isEmpty(),
	validateFields
],login)

module.exports = router