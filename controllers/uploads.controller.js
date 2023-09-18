const fileSystem = require('fs')
const path = require('path')
const { request, response } = require('express')

const { httpStatus, saveFile } = require('@helpers')
const { Users, Products } = require('@models')

const getCollection = async (req = request, res = response) => {
	const { collection, id } = req.params
	let model;

	switch (collection) {
		case 'users':
			model = await Users.findById(id)

			if(!model){
				return res.status(httpStatus.notFound).json({ msg: `User with ID: ${ id } not found.` })
			}
			break;
		case 'products':
			model = await Products.findById(id)

			if(!model){
				return res.status(httpStatus.notFound).json({ msg: `Product with ID: ${ id } not found.` })
			}
			break
		default:
			return res.status(httpStatus.internalServerError).json({
				msg: 'Something was wrong'
			})
	}

	if(model.img) {
		const pathImage = path.join(__dirname, '../uploads', collection, model.img)

		if(fileSystem.existsSync(pathImage)) {
			return res.sendFile(pathImage)
		}
	}

	const pathNoImage = path.join(__dirname, '../assets', 'noimage.jpg')

	res.sendFile(pathNoImage)
}

const uploadFile = async (req = request, res = response) => {
	const extensionAllowed = [ 'txt', 'md' ]
	
	try {
		const result = await saveFile(req.files, extensionAllowed, 'PlainFiles')

		res.status(httpStatus.ok).json({
			name: result
		})
	} catch (error) {
		return res.status(httpStatus.badRequest).json({ msg: error })
	}
}

const updateCategoryPicture = async (req = request, res =response) => {
	const { collection, id } = req.params
	let model;

	switch (collection) {
		case 'users':
			model = await Users.findById(id)

			if(!model){
				return res.status(httpStatus.notFound).json({ msg: `User with ID: ${ id } not found.` })
			}
			break;
		case 'products':
			model = await Products.findById(id)

			if(!model){
				return res.status(httpStatus.notFound).json({ msg: `Product with ID: ${ id } not found.` })
			}
			break
		default:
			return res.status(httpStatus.internalServerError).json({
				msg: 'Something was wrong'
			})
	}

	if(model.img) {
		const pathImage = path.join(__dirname, '../uploads', collection, model.img)

		if(fileSystem.existsSync(pathImage)) {
			fileSystem.unlinkSync(pathImage)
		}
	}

	const fileName = await saveFile(req.files, undefined, collection)
	model.img = fileName
	await model.save()

	res.status(httpStatus.ok).json(model)
}

module.exports = {
	getCollection,
	uploadFile,
	updateCategoryPicture
}