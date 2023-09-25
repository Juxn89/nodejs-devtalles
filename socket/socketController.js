const { checkUpOnJWT } = require('@helpers')

const socketController = async (socket) => {
	// console.log(socket)
	// console.log(socket.handshake.headers['x-token'])

	const token = socket.handshake.headers['x-token']
	const user = await checkUpOnJWT(token)

	if(!user) return socket.disconnect()

	console.log(`User: ${ user.name }, connected`)
}

module.exports = {
	socketController
}