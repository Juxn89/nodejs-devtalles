const lblTicket1 = document.querySelector('#lblTicket1')
const lblEscritorio1 = document.querySelector('#lblEscritorio1')
const lblTicket2 = document.querySelector('#lblTicket2')
const lblEscritorio2 = document.querySelector('#lblEscritorio2')
const lblTicket3 = document.querySelector('#lblTicket3')
const lblEscritorio3 = document.querySelector('#lblEscritorio3')
const lblTicket4 = document.querySelector('#lblTicket4')
const lblEscritorio4 = document.querySelector('#lblEscritorio4')

const socket = io();

socket.on('connect', () => { })

socket.on('disconnect', () => { })

socket.on('actual-state', (payload) => { 
	// console.log(payload)

	try {
		const audio = new Audio('./audio/new-ticket.mp3')
		audio.play()
	} catch (error) {
		
	}

	const [ ticket_1, ticket_2, ticket_3, ticket_4] = payload

	if(ticket_1) {
		lblTicket1.innerText = `Ticket ${ ticket_1.number }`
		lblEscritorio1.innerText = ticket_1.desk		
	}

	if(ticket_2) {
		lblTicket2.innerText = `Ticket ${ ticket_2.number }`
		lblEscritorio2.innerText = ticket_2.desk		
	}

	if(ticket_3) {
		lblTicket3.innerText = `Ticket ${ ticket_3.number }`
		lblEscritorio3.innerText = ticket_3.desk		
	}

	if(ticket_4) {
		lblTicket4.innerText = `Ticket ${ ticket_4.number }`
		lblEscritorio4.innerText = ticket_4.desk		
	}

})