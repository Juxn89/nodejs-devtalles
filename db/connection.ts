import { Sequelize } from 'sequelize'

import config from '../config/index'

const { dbConfig } = config

console.log({ ...dbConfig })

const db = new Sequelize(dbConfig.dbName, dbConfig.dbUser, dbConfig.dbPassword, {
	host: dbConfig.dbServer,
	dialect: 'mysql',
	port: 3306
	//logging: false
})

export default db