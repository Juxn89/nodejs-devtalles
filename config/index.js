const Config = {
	serverPort: process.env.SERVER_PORT || 3000,
	dbConnection: process.env.CONNECTION_STRING_DB || ''
}

module.exports = Object.freeze(Config)