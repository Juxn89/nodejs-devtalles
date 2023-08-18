require('colors')

const showMenu = () => {
	return new Promise( (resolve, resject) => {
		console.clear()
		console.log('==========================='.green)	
		console.log('===== Select a option ====='.green)
		console.log('==========================='.green)
		console.log('\n')

		console.log(`${'1.'.green} Create task`)
		console.log(`${'2.'.green} List tasks`)
		console.log(`${'3.'.green} List completed tasks`)
		console.log(`${'4.'.green} List pendding tasks`)
		console.log(`${'5.'.green} Finish task(s)`)
		console.log(`${'6.'.green} Delete task`)
		console.log(`${'7.'.green} Exist\n`)

		const readLine = require('readline').createInterface({
			input: process.stdin,
			output: process.stdout
		})

		readLine.question('Select a option: ', (option) => {			
			readLine.close()
			resolve(option)
		})		
	})
}

const pause = () => {
	return new Promise((resolve, reject) => {
		const readLine = require('readline').createInterface({
			input: process.stdin,
			output: process.stdout,
		})

		readLine.question(`\nPress ${'ENTER'.green} to continue\n`, () => {
			readLine.close()
			resolve()
		})		
	})
}

module.exports = {
	showMenu,
	pause
}