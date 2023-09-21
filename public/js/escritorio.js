const searchParams = new URLSearchParams( window.location.search )

if(!searchParams.has('escritorio')) {
	window.location = 'index.html'
	throw new Error('Desktop is mandatory')
}

const lblDesktop = document.querySelector('h1')
const divAlert = document.querySelector('.alert')
const lblTicket = document.querySelector('small')
const btnAttendNextTicket = document.querySelector('button')

const currentDesk = searchParams.get('escritorio')
lblDesktop.innerText = currentDesk
divAlert.style.display = 'none'

const socket = io()

socket.on('connect', () => { 
	btnAttendNextTicket.disabled = false
})

socket.on('disconnect', () => { 
	btnAttendNextTicket.disabled = true
})

socket.on('next-ticket', () => { })

btnAttendNextTicket.addEventListener('click', () => {
	socket.emit('attend-ticket', { currentDesk }, (payload) => { 
		const { ok, ticket } = payload

		if(!ok) {
			lblTicket.innerText = `Serving no one`
			return divAlert.style.display = ''
		}

		lblTicket.innerText = `Ticket ${ ticket.number }`
	})
})