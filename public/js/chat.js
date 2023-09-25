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

	socket.on('receive-message', (payload) => { })
	
	socket.on('active-users', (payload) => { })

	socket.on('private-message', (payload) => { })
}

const main = async () => {
	await validateJWT();
}

main()