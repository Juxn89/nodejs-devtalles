const { createFile } = require('./helpers/multiply')
const argv = require('./config/yargs')

console.clear()

// console.log(process.argv)
// console.log(argv)
// console.log('base: yargs', argv.base)

const { base, list, until } = argv


createFile(base, list, until)
	.then(fileName => console.log(fileName))
	.catch(err => console.error(err))
