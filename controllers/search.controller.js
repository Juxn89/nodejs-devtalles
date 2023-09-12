const { request, response } = require('express')
const { isValidObjectId } = require('mongoose')

const { httpStatus } = require('@helpers')
const { Users, Products, Categories } = require('../models')

const collectionsAllowed = [
	'categories',
	'products',
	'roles',
	'users'
]

const searchUser = async (term = '', res = response) => {
	if( isValidObjectId(term)) {
		const user = await Users.findById(term)

		return res.status(httpStatus.ok).json({
			results: user ? [ user ] : []
		})
	}

	const regex = new RegExp(term, 'i')
	const users = await Users.find({
		$or: [{ name: regex }, { email: regex }],
		$and: [ { isActive: true } ]
	})
	res.status(httpStatus.ok).json({
		results: users
	})
}

const searchCategories = async (term = '', res = response) => {
	if( isValidObjectId(term)) {
		const category = await Categories.findById(term)

		return res.status(httpStatus.ok).json({
			results: category ? [ category ] : []
		})
	}

	const regex = new RegExp(term, 'i')
	const categories = await Categories.find({ name: regex, isActive: true })

	res.status(httpStatus.ok).json({
		results: categories
	})
}

const serachProducts = async (term = '', res = response) => {
	if( isValidObjectId(term)) {
		const product = await Products.findById(term).populate('category', 'name')

		return res.status(httpStatus.ok).json({
			results: product ? [ product ] : []
		})
	}

	const regex = new RegExp(term, 'i')
	const products = await Products.find({ name: regex, isActive: true }).populate('category', 'name')

	res.status(httpStatus.ok).json({
		results: products
	})
}

const search = (req = request, res = response) => {
	const { collection, term } = req.params

	if(!collectionsAllowed.includes(collection)) {
		return res.status(httpStatus.notFound).json({
			msg: `Collection with name "${collection}" not found`
		})
	}

	switch (collection) {
		case 'categories':
			searchCategories(term, res)
			break;
		case 'products':
			serachProducts(term, res)
			break;
		case 'users':
			searchUser(term, res)
			break
		default:
			return res.status(httpStatus.notFound).json({
				msg: `Collection not implemented`
			})
	}
}

module.exports = {
	search
}