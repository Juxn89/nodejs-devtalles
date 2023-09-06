const { request, response } = require("express");
const httpStatus = require('@helpers/httpStatus')

const isAdmin = (req = request, res = response, next) => {
	if(!req.user) {
		return res.status(httpStatus.unauthorized).json({
			msg: 'User not logged'
		})
	}
	
	const { role } = req.user;

	if(role !== 'ADMIN_ROLE') {
		return res.status(httpStatus.unauthorized).json({
			msg: 'You are not a Admin.'
		})
	}

	next()
}

const hasFollowingRole = (...rest) => {
	return (req, res, next) => {
		if(!rest.includes(req.user.role)) {
			return res.status(httpStatus.unauthorized).json({
				msg: 'You are not allowed to do this'
			})
		}

		next()
	}
}

module.exports = {
	isAdmin,
	hasFollowingRole
}