const socket = io();

const online = document.querySelector('#lblOnline')
const offline = document.querySelector('#lblOffline')

socket.on('connect', () => {
	console.log('Client connected!')
	offline.style.display = 'none'
	online.style.display = ''
})

socket.on('disconnect', () => {
	console.log('Client disconnected!')
	offline.style.display = ''
	online.style.display = 'none'
})