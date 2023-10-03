var socket = io();

const params = new URLSearchParams(window.location.search)

if(!params.has('name') || !params.has('room')) {
	window.location = 'index.html'
	throw new Error('Name and room are mandatory')
}

const user = {
	name: params.get('name'),
	room: params.get('room')
}

socket.on('connect', function() {
  console.log('Conectado al servidor');

	socket.emit('entranceChat', user, (response) => {
		renderUsers(response)
	})
});

// escuchar
socket.on('disconnect', function() {
  console.log('Perdimos conexión con el servidor');
});

// Enviar información
// socket.emit('sendMessage', {
//     usuario: 'Juan',
//     mensaje: 'Hola Mundo'
// }, function(resp) {
// 		console.log('respuesta server: ', resp);
// });

// Escuchar información
socket.on('createMessage', function(mensaje) {
	console.log('Servidor:', mensaje);
	RenderMessage(mensaje, false)
	scrollBottom()
});

socket.on('PeopleList', (response) => {
	renderUsers(response)
})

socket.on('privateMessage', (message) => {
	console.log('Private message: ', message)
})