const bcrypt = require('bcrypt')
const {response, request} = require('express')

const { Users } = require('../models')
const HTTP_STATUS =  require('../helpers/httpStatus')

const getUser = async (req = request, res = response) => {
	const { limit = 5, offset = 0 } = req.query

	const users = await Users
		.find()
		.limit(limit)
		.skip(offset)

	res.status(HTTP_STATUS.ok).json({
		ok: true,
		msg: 'Get API | Controller',
		users
	})
}

const postUser = async (req = request, res = response) => {
	const { name, email, password, role } = req.body;
	const user = new Users({ name, email, password, role });

	// Encript password
	const salt = bcrypt.genSaltSync()
	user.password = bcrypt.hashSync(password, salt)

	// Save on DB
	try {
		await user.save()		
	} catch (error) {
		console.log(error)
	}

	res.status(HTTP_STATUS.ok).json({
		ok: true,
		msg: 'Post API | Controller',
		user
	})
}

const putUser = async (req = request, res = response) => {
	const { id } = req.params
	const { _id, password, google, email, ...rest } = req.body

	if(password) {
		const salt = bcrypt.genSaltSync()
		rest.password = bcrypt.hashSync(password, salt)
	}

	const user = await Users.findByIdAndUpdate(id, rest)

	res.status(HTTP_STATUS.ok).json({
		ok: true,
		msg: 'Put API | Controller',
		user
	})
}

const patchUser = (req = request, res = response) => {
	res.status(HTTP_STATUS.ok).json({
		ok: true,
		msg: 'Path API | Controller'
	})
}

const deleteUser = (req = request, res = response) => {
	res.status(HTTP_STATUS.ok).json({
		ok: true,
		msg: 'Delete API | Controller'
	})
}

module.exports = {
	getUser,
	postUser,
	putUser,
	patchUser,
	deleteUser
}