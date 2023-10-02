const { io } = require('../server');
const Users = require('../classes/users')
const { createMessage } = require('../utils/utils')

const users = new Users()

io.on('connection', (client) => {
	console.log('Usuario conectado');

	client.on('entranceChat', (payload, callback) => {
		console.log(payload)

		if(!payload.name) {
			return callback({
				err: true,
				message: `User name is mandatory`
			})
		}
		
		let people = users.addPerson(client.id, payload.name)

		client.broadcast.emit( 'PeopleList', users.getPeople() )

		callback( people )
	})

	client.on('disconnect', () => {
		const userRemoved = users.removePerson(client.id)

		client.broadcast.emit('createMessage', createMessage('Admin', `${userRemoved} left chat`))
		client.broadcast.emit( 'PeopleList', users.getPeople() )
	})

	client.on('createMessage', (data) => {
		let person = users.getPerson(client.id)

		let message = createMessage(person.name, data.message)
		client.broadcast.emit('createMessage', message)
	})

	socket.on('privateMessage', (payload) => {
		let person = users.getPerson(client.id)
		client.broadcast.to(payload.to).emit('privateMessage', createMessage(person.name, payload.message))
	})
});