const dbValidators = require('./dbValidators')
const google = require('./google')
const httpStatus = require('./httpStatus')
const jwt = require('./jwt')

module.exports = {
	...google,
	...dbValidators,
	httpStatus,
	...jwt
}