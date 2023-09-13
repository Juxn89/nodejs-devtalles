
const { request, response } = require('express')

const { httpStatus, saveFile } = require('@helpers')

const uploadFile = async (req = request, res = response) => {

  if (!req.files || Object.keys(req.files).length === 0 || !req.files.file) {
    return res.status(httpStatus.badRequest).json({
			msg: 'No files were uploaded.'
		});
  }

	const extensionAllowed = [ 'txt', 'md' ]
	try {
		const result = await saveFile(req.files, extensionAllowed, 'PlainFiles')

		res.status(httpStatus.ok).json({
			path: result
		})
	} catch (error) {
		return res.status(httpStatus.badRequest).json({ msg: error })
	}
}

module.exports = {
	uploadFile
}