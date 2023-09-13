const cors = require('cors')
const express = require('express')
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

	listen(){
		this.app.listen(Config.serverPort)
		console.log(`App listening on port ${ Config.serverPort }`)
	}
}

module.exports = Server