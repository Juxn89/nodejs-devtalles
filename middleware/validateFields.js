const { validationResult } = require('express-validator')
const HTTP_STATUS = require('@helpers/httpStatus')

const validateFields = (req, res, next) => {
	const errors = validationResult(req)
	if(!errors.isEmpty()) {
		return res.status(HTTP_STATUS.badRequest).json(errors)
	}

	next()
}

module.exports = {
	validateFields
}