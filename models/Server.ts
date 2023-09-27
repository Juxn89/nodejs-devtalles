import express, { Application } from 'express'
import cors from 'cors'

import config from '../config/index'
import userRoutes from '../routes/users.routes'
import db from '../db/connection';

class Server {
	private app: Application;
	private port: string;

	constructor() {
		this.app = express()
		this.port = config.serverPort

		this.dbConnection()

		this.middlewares()

		this.routes()
	}

	middlewares() {
		this.app.use( cors() )
		this.app.use( express.json() )
		this.app.use( express.static('public') )
	}

	listen() {
		this.app.listen(this.port, () => {
			console.log(`Server running on: ${ this.port }`)
		})
	}

	routes() {
		this.app.use('/users', userRoutes)
	}

	async dbConnection() {
		try {

			await db.authenticate()
			console.log('Database online!')

		} catch (error) {
			console.error(error)
			// if(error instanceof Error)
			// 	throw new Error(error.message)
			// else
			// 	throw new Error( String(error) )
		}
	}
}

export default Server