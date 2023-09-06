const jwtMiddleware = require('@middleware/jwtMiddleware')
const validateFields = require('@middleware/validateFields')
const validateRoles = require('@middleware/validateRoles')

module.exports = {
	...jwtMiddleware,
	...validateFields,
	...validateRoles
}