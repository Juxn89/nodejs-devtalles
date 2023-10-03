const params = new URLSearchParams(window.location.search)
var user = params.get('name')
var room = params.get('room')

var divUsuarios = $('#divUsuarios')
var formSend = $('#formSend')
var txtMessage = $('#txtMessage')
var divChatbox = $('#divChatbox')

function renderUsers (users = []) {

	var html = ''
	
	html += '<li>'
	html += '	<a href="javascript:void(0)" class="active"> Chat de <span>' + params.get(room) + '</span></a>'
	html += '</li>'
	
	for (const user of users) {		
		html += '<li>'
		html += '	<a data-id="' + user.id + '" href="javascript:void(0)"><img src="assets/images/users/1.jpg" alt="user-img" class="img-circle"> <span>' + user.name + '<small class="text-success">online</small></span></a>'
		html += '</li>'
	}

	divUsuarios.html(html)
}

divUsuarios.on('click', 'a', function() {
	const id = $(this).data('id')
	if(id) {
		console.log(id)
	}
})

formSend.on('submit', function(event) {
	event.preventDefault()
	if(txtMessage.val().trim().length === 0) {
		console.log(txtMessage.val())
	}

	socket.emit('createMessage', {
		name,
		message: txtMessage.val()
	}, (response) => {
		console.log('Response from server:', response)
		txtMessage.val('').focus()
		RenderMessage(response)
	})
})

function RenderMessage (message) {
	var html = ''

	html += '<li class="animated fadeIn">'
	html += '	<div class="chat-img"><img src="assets/images/users/1.jpg" alt="user" /></div>'
	html += '	<div class="chat-content">'
	html += '		<h5>' + message.name + '</h5>'
	html += '		<div class="box bg-light-info">' + message.message + '</div>'
	html += '	</div>'
	html += '	<div class="chat-time">10:56 am</div>'
	html += '</li>'

	divChatbox.append(html)
}