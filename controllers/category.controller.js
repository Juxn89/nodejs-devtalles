const { request, response } = require('express')

const { httpStatus } = require('@helpers')
const Category = require('../models/Categories')

const getCategories = async (req = request, res = response) => {
	const { limit = 1, offset = 0 } = req.query

	const categories = await Category
													.find({ isActive: true })
													.skip(offset)
													.limit(limit)

	if(!categories) {
		return res.status(httpStatus.notFound).json({
			msg: `Categories not found`
		})
	}

	res.status(httpStatus.ok).json({
		categories
	})
}

const getCategoryByID = async (req = request, res = response) => {
	const { id } = req.params
	const category = await Category
									.findById(id)
									.populate('user', 'name')

	res.status(httpStatus.ok).json({
		category
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

const updateCategory = async (req = request, res = response) => {
	const { uid } = req.user;
	const { id } = req.params;
	const { name, isActive } = req.body;

	const existCategoryWithName = await Category.find({ name });

	console.log(existCategoryWithName)

	if(existCategoryWithName.length > 0) {
		return res.status(httpStatus.badRequest).json({
			msg: `Category with name "${name}" already exists.`
		})
	}
	
	const data = {
		name,
		isActive,
		user: uid
	}

	const category = await Category.findByIdAndUpdate(id, data, { new: true })

	res.status(httpStatus.ok).json({
		category
	})
}

const deleteCategories = async (req = request, res = response) => {
	const { id } = req.params;

	const category = await Category.findByIdAndUpdate(id, { isActive: false }, { new: true })

	res.status(httpStatus.ok).json({
		category
	})
}

module.exports = {
	getCategories,
	getCategoryByID,
	saveCategory,
	updateCategory,
	deleteCategories
}