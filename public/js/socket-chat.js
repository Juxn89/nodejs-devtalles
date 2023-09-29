var socket = io();

const params = new URLSearchParams(window.location.search)

if(!params.has('name')) {
	window.location = 'index.html'
	throw new Error('Name is mandatory')
}

const user = {
	name: params.get('name')
}

socket.on('connect', function() {
  console.log('Conectado al servidor');

	socket.emit('entranceChat', user, (response) => {
		console.log('Users connected: ', response)
	})
});

// escuchar
socket.on('disconnect', function() {
  console.log('Perdimos conexión con el servidor');
});

// Enviar información
socket.emit('enviarMensaje', {
    usuario: 'Fernando',
    mensaje: 'Hola Mundo'
}, function(resp) {
		console.log('respuesta server: ', resp);
});

// Escuchar información
socket.on('enviarMensaje', function(mensaje) {
	console.log('Servidor:', mensaje);
});