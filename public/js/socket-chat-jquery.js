const params = new URLSearchParams(window.location.search)
var divUsuarios = $('#divUsuarios')

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