require('colors')
const inquirer = require('inquirer')

const questions = [
	{
		type: 'list',
		name: 'option',
		message: 'What would you like to do?',
		choices: [
			{ value: '1', name: `${'1.'.green} Create task` },
			{ value: '2', name: `${'2.'.green} List tasks` },
			{ value: '3', name: `${'3.'.green} List completed tasks` },
			{ value: '4', name: `${'4.'.green} List pending tasks` },
			{ value: '5', name: `${'5.'.green} Finihs task(s)` },
			{ value: '6', name: `${'6.'.green} Delete task` },
			{ value: '0', name: `${'7.'.green} Exit` },
		]
	}
]

const Menu = async () => {
	console.clear()

	console.log('==========================='.green)	
	console.log('===== Select a option ====='.white)
	console.log('==========================='.green)
	console.log('\n')

	const { option } = await inquirer.prompt(questions)
	return option
}

const Pause = async () => {
	const question = [
		{
			type: 'input',
			name: 'enter',
			message: `Press ${ 'enter'.green } to continue`
		}
	]

	console.log(`\n`)
	await inquirer.prompt(question)
}

const ReadInput = async (message) => {
	const question = [
		{
			type: 'input',
			name: 'desc',
			message,
			validate(value) { 
				if(value.length === 0) return 'Please enter a value!'
				
				return true;
			}
		}
	]

	const { desc } = await inquirer.prompt(question)
	return desc;
}

module.exports = {
	Menu,
	Pause,
	ReadInput
}