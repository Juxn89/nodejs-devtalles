const mongoose = require('mongoose')
const config = require('@config')

const dbConnection = async () => {
	try {
		await mongoose.connect(config.dbConnection)
		console.log('DB online')
	} catch (error) {
		console.log(error)
		throw new Error('Error on connect to database')
	}
}

module.exports = {
	dbConnection
}