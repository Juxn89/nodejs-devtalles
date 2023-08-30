require('colors')
const inquirer = require('inquirer')

const questions = [
	{
		type: 'list',
		name: 'option',
		message: 'What would you like to do?',
		choices: [
			{ value: 1, name: `${'1.'.green} Search city` },
			{ value: 2, name: `${'2.'.green} History` },
			{ value: 0, name: `${'0.'.green} Exit` },
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

const listOfPlaces = async (places = []) => {
	
	const choices = places.map((place, index) => {
		const idx = `${index + 1}`.green
		return {
			value: idx, name: `${idx}${'.'.green} ${place.name}`
		}
	})

	choices.unshift({value: '0', name: `${'0.'.green} Cancel`})

	const questions = [
		{
			type: 'list',
			name: 'id',
			message: 'Select',
			choices
		}
	]

	const { id } = await inquirer.prompt(questions)
	return id;
}

const confirm = async (message) => {
	const question = [
		{
			type: 'confirm',
			name: 'ok',
			message
		}
	]

	const { ok } = await inquirer.prompt(question)
	return ok;
}

const showCheckList = async (tasks = []) => {
	const choices = tasks.map((task, index) => {
		const idx = `${index + 1}`.green
		return {
			value: task.id, 
			name: `${idx}${'.'.green} ${task.desc}`, 
			checked: task.completedAt !== null
		}
	})

	choices.unshift({value: '0', name: `${'0.'.green} Cancel`})

	const questions = [
		{
			type: 'checkbox',
			name: 'ids',
			message: 'Select',
			choices
		}
	]

	const { ids } = await inquirer.prompt(questions)
	return ids;
}

module.exports = {
	Menu,
	Pause,
	ReadInput,
	listOfPlaces,
	confirm,
	showCheckList
}