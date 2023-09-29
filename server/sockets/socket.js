const { io } = require('../server');
const Users = require('../classes/users')

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
		callback( people )
	})
});