const jwt = require('jsonwebtoken')
const { request, response } = require('express')

const { Users } = require('../models')

const { jwtSecret } = require('../config')
const httpStatus = require('../helpers/httpStatus')

const validateJWT = async (req = request, res = response, next) => {
	const token = req.header('x-token')

	if(!token) {
		return res.status(httpStatus.unauthorized).json({
			msg: 'Token is missing'
		})
	}

	try {
		const { uid } = jwt.verify(token, jwtSecret)
		const currentUser = await Users.findById(uid)

		if(!currentUser) {
			return res.status(httpStatus.notFound).json({
				msg: 'User not found'
			})
		}

		if(!currentUser.isActive){
			return res.status(httpStatus.notFound).json({
				msg: 'User not found'
			})
		}

		req.uid = uid;
		req.user = currentUser

		next()
	} catch (error) {
		console.log(error)
		res.status(httpStatus.unauthorized).json({
			msg: 'Invalid token'
		})
	}
}

module.exports = {
	validateJWT
}