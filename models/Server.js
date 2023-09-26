const cors = require('cors')
const express = require('express')
const { createServer } = require('http')
const fileUpload = require('express-fileupload')

const Config = require('@config')
const { 
	authRoutes, 
	categoriesRoutes, 
	productsRoutes, 
	searchRoutes,
	uploadRoutes,
	userRoutes, 
} = require('@routes')

const { dbConnection } = require('@db/config')
const { socketController } = require('../socket/socketController')

class Server {
	constructor(){
		this.app = express()

		// Connect to DB
		this.dbConnection()

		// Middlewares
		this.middlewares()

		// Routes
		this.routes()

		// Socket.io
		this.server = createServer(this.app)
		this.io = require('socket.io')(this.server)
		this.sockets()
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

		// Upload files
		this.app.use(fileUpload({
			useTempFiles : true,
			tempFileDir : '/tmp/',
			createParentPath: true
		}));
	}

	routes(){
		this.app.use('/api/auth', authRoutes)
		this.app.use('/api/categories', categoriesRoutes)
		this.app.use('/api/products', productsRoutes)
		this.app.use('/api/search', searchRoutes)
		this.app.use('/api/upload', uploadRoutes)
		this.app.use('/api/users', userRoutes)
	}

	sockets() {
		this.io.on('connection', (socket) => socketController(socket, this.io))
	}

	listen(){
		this.server.listen(Config.serverPort)
		console.log(`App listening on port ${ Config.serverPort }`)
	}
}

module.exports = Server