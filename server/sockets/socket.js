const { io } = require('../server');
const Users = require('../classes/users')
const { createMessage } = require('../utils/utils')

const users = new Users()

io.on('connection', (client) => {
	console.log('Usuario conectado');

	client.on('entranceChat', (payload, callback) => {
		console.log(payload)

		if(!payload.name || !data.room) {
			return callback({
				err: true,
				message: `User name / room are mandatory`
			})
		}

		client.join(payload.room)
		
		users.addPerson(client.id, payload.name, payload.room)

		client.broadcast.to(data.room).emit( 'PeopleList', users.getPersonByRoom(payload.room) )
		client.broadcast.to(data.room).emit('createMessage', createMessage('Admin', `${data.nama} left chat`))

		callback( users.data(payload.room) )
	})

	client.on('disconnect', () => {
		const userRemoved = users.removePerson(client.id)

		client.broadcast.to(userRemoved.room).emit('createMessage', createMessage('Admin', `${userRemoved} left chat`))
		client.broadcast.to(userRemoved.room).emit( 'PeopleList', users.getPersonByRoom(userRemoved.room) )
	})

	client.on('createMessage', (data) => {
		let person = users.getPerson(client.id)

		let message = createMessage(person.name, data.message)
		client.broadcast.to(person.room).emit('createMessage', message)

		callback(message)
	})

	socket.on('privateMessage', (payload) => {
		let person = users.getPerson(client.id)
		client.broadcast.to(payload.to).emit('privateMessage', createMessage(person.name, payload.message))
	})
});