import express, { Application } from 'express'

import config from '../config/index'
import userRoutes from '../routes/users.routes'

class Server {
	private app: Application;
	private port: string;

	constructor() {
		this.app = express()
		this.port = config.serverPort

		this.routes()
	}

	listen() {
		this.app.listen(this.port, () => {
			console.log(`Server running on: ${ this.port }`)
		})
	}

	routes() {
		this.app.use('/users', userRoutes)
	}
}

export default Server