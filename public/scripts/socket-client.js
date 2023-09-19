const socket = io();

const online = document.querySelector('#lblOnline')
const offline = document.querySelector('#lblOffline')

const txtMessage = document.querySelector('#txtMessage')
const btnSend = document.querySelector('#btnSend')

socket.on('connect', () => {
	// console.log('Client connected!')
	offline.style.display = 'none'
	online.style.display = ''
})

socket.on('disconnect', () => {
	// console.log('Client disconnected!')
	offline.style.display = ''
	online.style.display = 'none'
})

socket.on('notify-message', payload => {
	console.log('Notify message:', payload)
})

btnSend.addEventListener('click', () => {
	const message = txtMessage.value

	const payload = {
		message,
		id: '123ABC',
		date: new Date().getTime()
	}

	socket.emit('send-message', payload)
})