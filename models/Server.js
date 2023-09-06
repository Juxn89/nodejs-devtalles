const express = require('express')
const cors = require('cors')
const Config = require('@config')
const {userRoutes, authRoutes} = require('@routes')
const { dbConnection } = require('@db/config')

class Server {
	constructor(){
		this.app = express()

		// Connect to DB
		this.dbConnection()

		// Middlewares
		this.middlewares()

		// Routes
		this.routes()
	}

	async dbConnection(){
		await dbConnection()
	}

	middlewares(){
		// CORS
		this.app.use(cors())

		// Public directory
		this.app.use(express.static('public'))

		// Read and parse of body
		this.app.use(express.json())
	}

	routes(){
		this.app.use('/api/auth', authRoutes)
		this.app.use('/api/users', userRoutes)
	}

	listen(){
		this.app.listen(Config.serverPort)
		console.log(`App listening on port ${ Config.serverPort }`)
	}
}

module.exports = Server