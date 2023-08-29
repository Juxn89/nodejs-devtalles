const express = require('express')
const Config = require('../config/index')

class Server {
	constructor(){
		this.app = express()

		// Middlewares
		this.middlewares()
		
		// Routes
		this.routes()
	}

	middlewares(){
		// Public directory
		this.app.use(express.static('public'))
	}

	routes(){
		this.app.get('/', (req, res) => {
			res.send('Hello word!')
		})
	}

	listen(){
		this.app.listen(Config.serverPort)
		console.log(`App listening on port ${ Config.serverPort }`)
	}
}

module.exports = Server