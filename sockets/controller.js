const { randomUUID } = require('crypto')
const TicketControl = require('../models/TicketControl')

const ticketControl = new TicketControl()

const socketController = socket => {
	socket.on('disconnect', () => { })

	socket.on('next-ticket', (paylaod, callback) => {

		const nextTicket = ticketControl.next()

		callback( nextTicket )
	})

	
	socket.emit('last-ticket', ticketControl.last)

	socket.on('attend-ticket', (paylaod, callback) => {
		const { currentDesk } = paylaod

		if(!currentDesk) {
			return callback({ ok: false, msg: 'Desktop is mandatory' })
		}

		const ticket = ticketControl.attendTicket( currentDesk )
		if(!ticket) {
			callback({ ok: false, msg: `There are no pending tickes` })
		}
		else {
			callback({ ok: true, ticket })
		}
	})
}

module.exports = {
	socketController
}