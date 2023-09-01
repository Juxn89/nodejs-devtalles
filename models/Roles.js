const { Schema, model } = require('mongoose')

const roleSchema = Schema({
	role: {
		type: String,
		required: [true, 'Role is mandatory']
	}
})

module.exports = model('Roles', roleSchema)