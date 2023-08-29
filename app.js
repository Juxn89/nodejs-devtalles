const express = require('express')
const hbs = require('hbs')
require('dotenv').config()
const config = require('./config/index')

const app = express()

app.set('view engine', 'hbs')
hbs.registerPartials(`${__dirname}/views/partials`, (err) => { })

// Serve static content
app.use( express.static('public') )

app.get('/', (req, res) => {
	res.render('home', {
		name: 'Juan',
		title: 'Course of Node.js'
	})
})

app.use('/generic', (req, res) => {
	res.render('generic', {
		name: 'Juan',
		title: 'Course of Node.js'
	})
})

app.use('/elements', (req, res) => {
	res.render('elements', {
		name: 'Juan',
		title: 'Course of Node.js'
	})
})

app.get('/hello-world', (req, res) => {
	res.send('hello world from express!')
})

app.get('*', (req, res) => {
	// res.send('404 | Page not found')
	res.sendFile( __dirname + '/public/404.html')
})

app.listen(config.serverPort)