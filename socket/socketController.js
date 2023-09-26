const { checkUpOnJWT } = require('@helpers')
const { ChatMessage } = require('../models')

const chatMessage = new ChatMessage()

const socketController = async (socket, io) => {
	// console.log(socket)
	// console.log(socket.handshake.headers['x-token'])

	const token = socket.handshake.headers['x-token']
	const user = await checkUpOnJWT(token)

	if(!user) return socket.disconnect()

	console.log(`User: ${ user.name }, connected`)

	// Add to connected user
	chatMessage.addUser(user)
	io.emit('active-users', chatMessage.usersArray)

	// Disconnect user
	socket.on('disconnect', () => {
		chatMessage.disconnect(user.id)
		io.emit('active-users', chatMessage.usersArray)
	})

	socket.on('send-message', (payload) => {
		const { uid, message } = payload

		if(uid) {
			socket.to(uid).emit('private-message', { from: user.name, message })
		} else {
			chatMessage.sendMessage(user.id, user.name, message)
			io.emit('reveive-message', chatMessage.lastMessages)			
		}

		console.log(payload)
	})

	socket.join(user.id)
}

module.exports = {
	socketController
}