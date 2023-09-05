const bcrypt = require('bcrypt')
const { response, request } = require('express')

const { Users } = require('../models')
const httpStatus = require('../helpers/httpStatus')
const { generateJWT } = require('../helpers/jwt')

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

module.exports = {
	login
}