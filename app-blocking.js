const { getUsersSync } = require('./users/index')

console.log('Program started');
console.time('start')

const user1 = getUsersSync(1);
console.log('User 1: ', user1);

const user2 = getUsersSync(2);
console.log('User 2: ', user2);

console.log('Program ended')
console.timeEnd('start')