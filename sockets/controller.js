const { randomUUID } = require('crypto')

const socketController = socket => {
	// console.log('Client connected!', socket.id)

	socket.on('disconnect', () => {
		// console.log('Cliend disconnected', socket.id)
	})

	socket.on('send-message', (paylaod, callback) => {
		// console.log('Message recived from client:', paylaod)
		const id = randomUUID()
		callback(id)

		// Emit to all clients
		socket.broadcast.emit('notify-message', 'Message from server')
	})
}

module.exports = {
	socketController
}