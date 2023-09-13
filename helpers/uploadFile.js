const path = require('path')
const { v4: uuidv4  } = require('uuid')

const saveFile = (files, extensionsAllowed = [ 'png', 'jpg', 'jpeg', 'gif' ], destination = '') => {
	return new Promise( (resolve, reject) => {
		const { file } = files;
		const nameFileSplitted = file.name.split('.')
	
		const extensionFile = nameFileSplitted[ nameFileSplitted.length - 1 ]
	
		if(!extensionsAllowed.includes(extensionFile)) {
			reject(`Extension ${ extensionFile } is not allowed!`)
		}
	
		const tempNameFile = `${uuidv4()}.${extensionFile}`
		const uploadPath = path.join(__dirname, '../uploads', destination, tempNameFile)
	
		file.mv(uploadPath, function(err) {
			if (err) {
				reject(err)			
			}
			
			resolve(`File uploaded to ${ uploadPath }`)
		});
	})
}

module.exports = {
	saveFile
}