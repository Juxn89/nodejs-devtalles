const { Router } = require('express')
const { check } = require('express-validator')

const { validateFields } = require('@middleware/')

const { login, googleSingIn } = require('@controllers/auth.controller')

const router = Router()

router.post('/login', [
	check('email', 'Email is required').isEmail(),
	check('password', 'Password is required').not().isEmpty(),
	validateFields
],login)

router.post('/google', [
	check('gtoken', 'Google token or ID token is mandatory').not().isEmpty(),
	validateFields
], googleSingIn)

module.exports = router