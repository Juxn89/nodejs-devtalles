require('colors')
const { showMenu, pause } = require('./helpers/messages')

console.clear()

const main = async () => {
	let optionSelected = '';

	do {
		optionSelected = await showMenu()
		await pause()		
	} while (optionSelected !== '0');

}

main()