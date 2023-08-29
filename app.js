require('dotenv').config()
const express = require('express')
const Config = require('./config/index')

const app = express()

app.get('/', (req, res) => {
	res.send('Hello word!')
})

app.listen(Config.serverPort)

console.log(`App listening on port ${ Config.serverPort }`)