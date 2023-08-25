require('colors')
const Tasks = require('./models/tasks');
const { Menu, Pause, ReadInput, listTasksToDelete, showCheckList } = require('./helpers/inquirer');
const { saveRecord, getRecords } = require('./helpers/database');

console.clear()

const main = async () => {
	let optionSelected = '';
	const tasks = new Tasks()
	const tasksDB = getRecords()

	if(tasksDB) {
		tasks.loadTasksFromDB(tasksDB)
	}

	do {
		optionSelected = await Menu()

		switch (optionSelected) {
			case '1':
				const desc = await ReadInput('Description')
				tasks.createTask(desc)
				break;
			case '2':
				tasks.listAllTasks()
				break;
			case '3':
				tasks.listAllTasksCompleted(true)
				break;
			case '4':
				tasks.listAllTasksCompleted(false)
				break;
			case 5:
				const ids = await showCheckList(tasks.listOfTasks)
				tasks.toogleCompleted(ids)
				break;
			case '6':
				const id = await listTasksToDelete(tasks.listOfTasks)
				if(id !== '0') {
					const confirmDelete = await confirm('Are you sure?')

					if(confirmDelete) {
						tasks.deleteTask(id)
					}					
				}
				break;
			default:
				break;
		}

		saveRecord(tasks.listOfTasks)
		await Pause()
	} while (optionSelected !== '0');
}

main()