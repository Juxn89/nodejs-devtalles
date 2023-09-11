const { Roles, Users, Categories } = require('@models')

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

const existCategoryID = async (id) => {
	const existCategoryID = await Categories.findById(id)
	if(!existCategoryID) {
		throw new Error(`Category with ID "${id}" not found`)
	}
}

module.exports = {
	validateRole,
	emailAlreadyExists,
	existCategoryID,
	existUserByID
}