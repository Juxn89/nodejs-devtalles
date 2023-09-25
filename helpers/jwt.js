const jwt = require('jsonwebtoken')

const config = require('@config')
const { Users } = require('@models')

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

const checkUpOnJWT = async (token = '') => {
	try {
		if(token.length < 10) return null

		const { uid } = jwt.verify(token, config.jwtSecret)
		const user = await Users.findById(uid)

		if(!user) return null

		if(!user.isActive) return null

		return user
	} catch (error) {
		console.error(error)
	}
}

module.exports = {
	checkUpOnJWT,
	generateJWT
}