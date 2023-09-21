const { randomUUID } = require('crypto')
const TicketControl = require('../models/TicketControl')

const ticketControl = new TicketControl()

const socketController = socket => {
	socket.on('disconnect', () => { })

	socket.emit('last-ticket', ticketControl.last)
	socket.emit('actual-state', ticketControl.lastFourTickets)
	socket.emit('pendding-tickets', ticketControl.tickets.length)

	socket.on('next-ticket', (paylaod, callback) => {
		const nextTicket = ticketControl.next()
		socket.emit('pendding-tickets', ticketControl.tickets.length)
		socket.broadcast.emit('pendding-tickets', ticketControl.tickets.length)

		callback( nextTicket )
	})

	socket.on('attend-ticket', (paylaod, callback) => {
		const { currentDesk } = paylaod

		if(!currentDesk) {
			return callback({ ok: false, msg: 'Desktop is mandatory' })
		}

		const ticket = ticketControl.attendTicket( currentDesk )
		socket.broadcast.emit('actual-state', ticketControl.lastFourTickets)

		socket.emit('pendding-tickets', ticketControl.tickets.length)
		socket.broadcast.emit('pendding-tickets', ticketControl.tickets.length)

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