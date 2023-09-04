const { Roles, Users } = require('../models')

const validateRole = async (role = '') => {
	const roleExists = await Roles.findOne({ role })
	if(!roleExists) {
		throw new Error(`${ role } role is not valid`)
	}
}

const emailAlreadyExists = async (email = '') => {
	const existEmail = await Users.findOne({ email })
	if(existEmail) {
		throw new Error(`This email is already registered`)
	}
}

module.exports = {
	validateRole,
	emailAlreadyExists
}