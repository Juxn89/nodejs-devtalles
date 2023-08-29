const HTTP_STATUS = {
	ok: 200,
	created: 201,
	badRequest: 400,
	unauthorized: 401,
	forbidden: 403,
	notFound: 404,
	internalServerError: 500,
}

module.exports = Object.freeze(HTTP_STATUS)