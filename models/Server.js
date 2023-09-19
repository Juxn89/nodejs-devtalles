const cors = require('cors')
const express = require('express')

const Config = require('../config')

class Server {
	constructor(){
		this.app = express()

		// Socket.io
		this.server = require('http').createServer(this.app)
		this.io = require('socket.io')(this.server)

		// Middlewares
		this.middlewares()

		// Routes
		this.routes()

		// Sockets handlers
		this.sockets()
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
		this.server.listen(Config.serverPort)
		console.log(`App listening on port ${ Config.serverPort }`)
	}

	sockets() {
		this.io.on('connection', socket => {
			console.log('Client connected!', socket.id)
		})
	}
}

module.exports = Server