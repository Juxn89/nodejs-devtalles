const { request, response } = require('express')

const { httpStatus } = require('@helpers/')

const validateUploadFile = (req = request, res = response, next) => {
  if (!req.files || Object.keys(req.files).length === 0 || !req.files.file) {
    return res.status(httpStatus.badRequest).json({
			msg: 'No files were uploaded.'
		});
  }

	next()
}

module.exports = {
	validateUploadFile
}