const express = require('express')
const Config = require('../config/index')
const HTTP_STATUS =  require('../helpers/httpStatus')

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
		this.app.use(express.json())
	}

	routes(){
		this.app.get('/', (req, res) => {
			res.send('Hello word!')
		})

		this.app.get('/api', (req, res) => {
			res.status(HTTP_STATUS.ok).json({
				ok: true,
				msg: 'Get API'
			})
		})

		this.app.post('/api', (req, res) => {
			res.status(HTTP_STATUS.created).json({
				ok: true,
				msg: 'Post API'
			})
		})

		this.app.put('/api', (req, res) => {
			res.status(HTTP_STATUS.ok).json({
				ok: true,
				msg: 'Put API'
			})
		})

		this.app.delete('/api', (req, res) => {
			res.status(HTTP_STATUS.ok).json({
				ok: true,
				msg: 'Delete API'
			})
		})

		this.app.patch('/api', (req, res) => {
			res.status(HTTP_STATUS.ok).json({
				ok: true,
				msg: 'Delete API'
			})
		})
	}

	listen(){
		this.app.listen(Config.serverPort)
		console.log(`App listening on port ${ Config.serverPort }`)
	}
}

module.exports = Server