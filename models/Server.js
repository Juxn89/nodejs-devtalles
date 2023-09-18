const cors = require('cors')
const express = require('express')

const Config = require('../config')

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

		// Read and parse of body
		this.app.use(express.json())
	}

	routes() {

	}

	listen(){
		this.app.listen(Config.serverPort)
		console.log(`App listening on port ${ Config.serverPort }`)
	}
}

module.exports = Server