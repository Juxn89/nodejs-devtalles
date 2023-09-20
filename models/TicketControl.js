const fs = require('fs')
const path = require('path')

class Ticket {
	constructor(number, desk) {
		this.number = number
		this.desk = desk
	}
}

class TicketControl {
	constructor() {
		this.last = 0
		this.currentDate = new Date().getDate()
		this.tickets = []
		this.lastFourTickets = []

		this.init()
	}

	get toJSON() {
		return {
			last: this.last,
			currentDate: this.currentDate,
			tickets: this.tickets,
			lastFourTickets: this.lastFourTickets,
		}
	}

	init() {
		const { currentDate, tickets, last, lastFourTickets } = require('../db/tickets.json')

		if(currentDate === this.currentDate) {
			this.tickets = tickets
			this.last = last
			this.lastFourTickets = lastFourTickets
		}
		else {
			this.saveDB()
		}
	}

	saveDB() {
		const dbPath = path.join(__dirname, '../db/tickets.json')
		fs.writeFileSync(dbPath, JSON.stringify(this.toJSON))
	}

	next() {
		this.last += 1

		const ticket = new Ticket(this.last, null)
		this.tickets.push(ticket)

		this.saveDB()
		return `Ticket ${ticket.number}`
	}

	attendTicket(desk) {
		if(this.tickets === 0) return null;

		const ticket = this.tickets.shift()
		ticket.desk = desk

		this.lastFourTickets.unshift(ticket)

		if(this.lastFourTickets.length > 4) {
			this.lastFourTickets.splice(-1, 1)
		}

		this.saveDB()

		return ticket
	}
}

module.exports = TicketControl