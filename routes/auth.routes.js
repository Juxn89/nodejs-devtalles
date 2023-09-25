const { Router } = require('express')
const { check } = require('express-validator')

const { validateFields, validateJWT } = require('@middleware/')

const { login, googleSingIn, renewToken } = require('@controllers/auth.controller')

const router = Router()

router.get('/', [
	validateJWT
], renewToken)

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