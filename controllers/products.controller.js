const { request, response } = require('express')
const { Products } = require('@models')
const { httpStatus } = require('@helpers')

const getProducts = async (req = request, res = response) => {
	const { limit = 5, offset = 0 } = req.query

	const query = {
		isActive: true
	}

	const products = await Products
											.find(query)
											.skip(offset)
											.limit(limit)
											.populate('user', 'name')
											.populate('category', 'name')

	res.status(httpStatus.ok).json({
		products
	})
}

const getProductByID = async (req = request, res = response) => {
	const { id } = req.params

	const product = await Products
											.findById(id)
											.populate('user', 'name')
											.populate('category', 'name')

	res.status(httpStatus.ok).json({
		product
	})
}

const saveProduct = async (req = request, res = response) => {
	const { uid } = req;
	const { name, description, price, category } = req.body

	const data = {
		name,
		description,
		price,
		category,
		user: uid
	}

	const product = await Products(data)
	product.save()

	res.status(httpStatus.ok).json({
		product
	})
}

const updateProduct = async (req = request, res = response) => {

	const { uid } = req;
	const { id } = req.params
	const { name, description, price, category, isAvailable = true } = req.body

	const data = {
		name,
		description,
		price,
		category,
		isAvailable,
		user: uid
	}

	const product = await Products.findByIdAndUpdate(id, data, { new: true })

	product.save()

	res.status(httpStatus.ok).json({
		product
	})
}

const deleteProduct = async (req = request, res = response) => {
	const { id } = req.params

	const product = await Products.findByIdAndUpdate(id, { isActive: false }, { new: true })

	res.status(httpStatus.ok).json({
		product
	})
}

module.exports = {
	getProducts,
	getProductByID,
	saveProduct,
	updateProduct,
	deleteProduct
}