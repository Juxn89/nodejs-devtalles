const { request, response } = require('express')

const { httpStatus } = require('@helpers')
const Category = require('../models/Categories')

const getCategories = (req = request, res = response) => {
	res.status(httpStatus.ok).json({
		msg: ''
	})
}

const getCategoryByID = (req = request, res = response) => {
	res.status(httpStatus.ok).json({
		msg: ''
	})
}

const saveCategory = async (req = request, res = response) => {
	const { name } = req.body;
	const { user } = req;

	const category = await Category.findOne({ name })

	if(category) {
		return res.status(httpStatus.badRequest).json({
			msg: `Category with name "${ name }" already exists.`
		})
	}

	const data = {
		name,
		user: user._id
	}

	const newCategory = new Category(data);
	newCategory.save()
	
	res.status(httpStatus.ok).json({
		msg: 'Save category',
		newCategory
	})
}

const updateCategory = (req = request, res = response) => {
	res.status(httpStatus.ok).json({
		msg: ''
	})
}

const deleteCategories = (req = request, res = response) => {
	res.status(httpStatus.ok).json({
		msg: ''
	})
}

module.exports = {
	getCategories,
	getCategoryByID,
	saveCategory,
	updateCategory,
	deleteCategories
}