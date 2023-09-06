require('dotenv').config()
require('module-alias/register')
const Server = require('./models/Server')

const server = new Server()
server.listen()