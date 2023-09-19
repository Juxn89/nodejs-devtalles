const { randomUUID } = require('crypto')

const socketController = socket => {
	socket.on('disconnect', () => { })

	socket.on('send-message', (paylaod, callback) => {
		const id = randomUUID()
		callback(id)

		// Emit to all clients
		socket.broadcast.emit('notify-message', 'Message from server')
	})
}

module.exports = {
	socketController
}