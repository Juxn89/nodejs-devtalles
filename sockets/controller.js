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
}

module.exports = {
	socketController
}