import express, { Application } from 'express'
import config from '../config/index'

class Server {
	private app: Application;
	private port: string;

	constructor() {
		this.app = express()
		this.port = config.serverPort
	}

	listen() {
		this.app.listen(this.port, () => {
			console.log(`Server running on: ${ this.port }`)
		})
	}
}

export default Server