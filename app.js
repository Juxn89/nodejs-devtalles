const express = require('express')

const app = express()

// Serve static content
app.use( express.static('public') )

app.get('/', (req, res) => {
	res.send('Index page')
})

app.use('/generic', (req, res) => {
	res.sendFile(`${__dirname}/public/generic.html`)
})

app.use('/elements', (req, res) => {
	res.sendFile(`${__dirname}/public/elements.html`)
})

app.get('/hello-world', (req, res) => {
	res.send('hello world from express!')
})

app.get('*', (req, res) => {
	// res.send('404 | Page not found')
	res.sendFile( __dirname + '/public/404.html')
})

app.listen(3000)