const jwtMiddleware = require('@middleware/jwtMiddleware')
const validateFields = require('@middleware/validateFields')
const validateFile = require('@middleware/validateFile')
const validateRoles = require('@middleware/validateRoles')

module.exports = {
	...jwtMiddleware,
	...validateFields,
	...validateFile,
	...validateRoles
}