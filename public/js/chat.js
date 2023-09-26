let currentUser = null;
let socket = null;

const txtUid = document.querySelector('#txtUid')
const txtMessage = document.querySelector('#txtMessage')
const ulUsers = document.querySelector('#ulUsers')
const ulMessage = document.querySelector('#ulMessage')
const btnLeave = document.querySelector('#btnLeave')

const validateJWT = async () => {
	const token = localStorage.getItem('x-token') || ''

	if(token.length <= 10) {
		window.location = 'index.html'
		throw new Error('Token is missing.')
	}

	const response = await fetch('http://localhost:3000/api/auth/', { 
		headers: { 'x-token': token }
	})

	const { user, token: newToken } = await response.json()
	localStorage.setItem('x-token', newToken)
	console.log(user, newToken)

	currentUser = user
	document.title = user.name

	await connectToSocket()
}

const connectToSocket = async () => {
	socket = io({
		'extraHeaders': {
			'x-token': localStorage.getItem('x-token')
		}
	})

	socket.on('connect', () => { console.log('Socket server online!') })

	socket.on('disconnect', () => { console.log('Socket server offline') })

	socket.on('receive-message', (payload) => { 
		showMessages(payload)
	})
	
	socket.on('active-users', (payload) => { 
		//console.log(payload)
		showUsers(payload)
	})

	socket.on('private-message', (payload) => { })
}

const showUsers = (users = []) => {
	let usersHTML = ''

	users.forEach(user => {
		usersHTML += `
			<li>
				<p>
					<h5 class="text-success">${ user.name }</h5>
					<span class="fs-6 text-muted">${ user.id }</span>
				</p>
			</li>
		`
	})

	ulUsers.innerHTML = usersHTML
}

const showMessages = (messages = []) => {
	let messagesHTML = ''

	messages.forEach(message => {
		messagesHTML += `
			<li>
				<p>
					<span class="text-primary">${ message.name }</span>
					<span>${ message.message }</span>
				</p>
			</li>
		`
	})

	ulMessage.innerHTML = messagesHTML
}

txtMessage.addEventListener('keyup', (event) => { 
	const { keyCode } = event

	const uid = txtUid.value;
	const message = txtMessage.value;

	if(keyCode !== 13) return;
	if(message.length === 0) return;

	const payload = {
		uid,
		message
	}

	socket.emit('send-message', payload)
	txtMessage.value = ''
})

const main = async () => {
	await validateJWT();
}

main()