const Config = {
	serverPort: process.env.SERVER_PORT || 3000,
	dbConnection: process.env.CONNECTION_STRING_DB || '',
	jwtSecret: process.env.JWT_SECRET || '',
	googleCliendID: process.env.GOOGLE_CLIENT_ID || ''
}

module.exports = Object.freeze(Config)