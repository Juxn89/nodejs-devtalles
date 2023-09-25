let currentUser = null;
let socket = null;

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
	const socket = io({
		'extraHeaders': {
			'x-token': localStorage.getItem('x-token')
		}
	})
}

const main = async () => {
	await validateJWT();
}

main()