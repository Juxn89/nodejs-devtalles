const jwt = require('jsonwebtoken')
const config = require('@config')

const generateJWT = (uid = '') => {
	return new Promise( (resolve, reject) => {
		const payload = { uid }

		jwt.sign(payload, config.jwtSecret, { expiresIn: '4h'}, (err, token) => {
			if(err) {
				console.error(err)
				reject('Error on generating token')
			}
			else {
				resolve(token)
			}
		})
	})
}

module.exports = {
	generateJWT
}