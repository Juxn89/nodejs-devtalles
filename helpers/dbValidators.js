const { Roles, Users, Categories, Products } = require('@models')

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

const existProductbyID = async (id) => {
	const existProduct = await Products.findById(id)

	if(!existProduct) {
		throw new Error(`Product with ID "${ id }" doesn't exist`)
	}
}

const existProductByName = async (name) => {
	const existProduct = await Products.findOne({name})

	if(existProduct) {
		throw new Error(`Product with name "${ name }" already exists`)
	}
}

const isValidProductPrice = async (price) => {
	if(price < 0) {
		throw new Error(`Price must be a possitive number`)
	}
}

const collectionsAllowed = (collection, collectionAllowed = [] ) => {
	const isIncluded = collectionAllowed.includes(collection)

	if(!isIncluded) {
		throw new Error(`"${collection}" is not a collection allowed`)
	}

	return true
}

module.exports = {
	collectionsAllowed,
	emailAlreadyExists,
	existCategoryID,
	existProductbyID,
	existProductByName,
	existUserByID,
	isValidProductPrice,
	validateRole
}