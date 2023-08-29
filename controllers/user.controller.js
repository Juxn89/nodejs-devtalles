const {response, request} = require('express')
const HTTP_STATUS =  require('../helpers/httpStatus')

const getUser = (req = request, res = response) => {
	res.status(HTTP_STATUS.ok).json({
		ok: true,
		msg: 'Get API | Controller'
	})
}

const postUser = (req = request, res = response) => {
	res.status(HTTP_STATUS.ok).json({
		ok: true,
		msg: 'Post API | Controller'
	})
}

const putUser = (req = request, res = response) => {
	res.status(HTTP_STATUS.ok).json({
		ok: true,
		msg: 'Put API | Controller'
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