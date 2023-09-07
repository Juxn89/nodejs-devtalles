const bcrypt = require('bcrypt')
const { response, request } = require('express')

const { Users } = require('@models')

const { httpStatus, generateJWT, googleVerify } = require('@helpers')

const login = async (req = request, res = response) => {
	const { email, password } = req.body

	try {
		const user = await Users.findOne({ email })

		if(!user){
			return res.status(httpStatus.notFound).json({
				msg: 'Email or password wrong'
			})
		}

		if(!user.isActive){
			return res.status(httpStatus.notFound).json({
				msg: 'Email or password wrong'
			})
		}

		const validPassword = bcrypt.compareSync(password, user.password)

		if(!validPassword){
			return res.status(httpStatus.notFound).json({
				msg: 'Email or password wrong'
			})
		}

		const token = await generateJWT(user.id)

		res.status(httpStatus.ok).json({
			user,
			token
		})
	} catch (error) {
		console.log(error)
		res.status(httpStatus.internalServerError).json({
			msg: 'Contact with administrator'
		})
	}
}

const googleSingIn = async (req = request, res = response) => {
	const { gtoken } = req.body;

	try {
		const { name, img, email } = await googleVerify(gtoken)

		let user = await Users.findOne({ email })

		if(!user) { 
			const data = {
				name,
				email,
				password: ':-)',
				img,
				isGoogleAccount: true
			}
			user = new Users(data)
			await user.save()
		}

		if(!user.isActive) {
			return res.status(httpStatus.unauthorized).json({
				msg: 'Contact with administrator, user inactive'
			})
		}

		const token = await generateJWT(user.id)

		res.json({
			user,
			token
		})

	} catch (error) {
		console.error(error)
		res.status(httpStatus.badRequest).json({
			status: false,
			msg: 'Token could not be verified'
		})
	}
}

module.exports = {
	login,
	googleSingIn
}