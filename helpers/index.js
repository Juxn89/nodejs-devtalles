const dbValidators = require('./dbValidators')
const google = require('./google')
const httpStatus = require('./httpStatus')
const jwt = require('./jwt')
const uploadFile = require('./uploadFile')

module.exports = {
	...dbValidators,
	...google,
	...jwt,
	...uploadFile,
	httpStatus
}