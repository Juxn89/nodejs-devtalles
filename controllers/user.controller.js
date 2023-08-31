const {response, request} = require('express')
const bcrypt = require('bcrypt')
const Users = require('../models/Users')
const HTTP_STATUS =  require('../helpers/httpStatus')

const getUser = (req = request, res = response) => {
	const { limit = '', offset = '' } = req.query
	res.status(HTTP_STATUS.ok).json({
		ok: true,
		msg: 'Get API | Controller',
		limit,
		offset
	})
}

const postUser = async (req = request, res = response) => {
	const { name, email, password, role } = req.body;
	const user = new Users({ name, email, password, role });

	// Verify if email already exists

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

const putUser = (req = request, res = response) => {
	const { id } = req.params
	res.status(HTTP_STATUS.ok).json({
		ok: true,
		msg: 'Put API | Controller',
		id
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