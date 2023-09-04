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

const existUserByID = async (id) => {
	const existUser = await Users.findById(id)
	if(!existUser) {
		throw new Error(`This ID ${id} doesn't exist`)
	}
}

module.exports = {
	validateRole,
	emailAlreadyExists,
	existUserByID
}