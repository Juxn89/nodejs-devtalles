const {response, request} = require('express')
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

const postUser = (req = request, res = response) => {
	const { name = '', lastName = '' } = req.body

	res.status(HTTP_STATUS.ok).json({
		ok: true,
		msg: 'Post API | Controller',
		name,
		lastName,
		fullName: `${ name } ${ lastName }`
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