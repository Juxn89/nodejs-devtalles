const express = require('express')
const cors = require('cors')
const Config = require('../config/index')
const userRoutes = require('../routes/user.routes')

class Server {
	constructor(){
		this.app = express()

		// Middlewares
		this.middlewares()

		// Routes
		this.routes()
	}

	middlewares(){
		// CORS
		this.app.use(cors())

		// Public directory
		this.app.use(express.static('public'))

		this.app.use(express.json())
	}

	routes(){
		this.app.use('/api/users', userRoutes)
	}

	listen(){
		this.app.listen(Config.serverPort)
		console.log(`App listening on port ${ Config.serverPort }`)
	}
}

module.exports = Server