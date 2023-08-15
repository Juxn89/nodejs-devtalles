const { getUsers } = require('./users/index')

console.log('Program started');
console.time('start')

getUsers(1, (user) => {
	console.log('User 1: ', user);
});

getUsers(2, (user) => {
	console.log('User 2: ', user);
});

console.log('Program ended')
console.timeEnd('start')