setTimeout(() => {
	console.log('Hello world!')
}, 1000);

const getUserById = (id, callback) => {
	const user = {
		id,
		name: 'Juan'
	}

	setTimeout(() => {
		callback(user)
	} , 1500)
}

getUserById(10, (user) => { 
	console.log('Hello world from CallBack', user)
	console.log('Hello world from CallBack', user.name.toUpperCase())
})