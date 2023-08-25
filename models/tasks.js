const Task = require("./task")

class Tasks {
	_listOfTasks = {}

	constructor() {
		this._listOfTasks = {}
	}

	get listOfTasks() {
		const list = [];

		Object.keys(this._listOfTasks).forEach(key => {
			const task = this._listOfTasks[key];

			list.push(task)
		})

		return list;
	}

	createTask(desc = '') {
		const task = new Task(desc)
		this._listOfTasks[task.id] = task;
	}

	loadTasksFromDB = (tasks = []) => {
		tasks.forEach(task => this._listOfTasks[task.id] = task)
	}

	listAllTasks = () => {
		let index = 1;
		Object.keys(this._listOfTasks).forEach(key => {
			const task = this._listOfTasks[key];
			const status = task.completedAt === null ? 'Pending'.red : 'Completed'.green

			console.log(`${ index.toString().green }${'.'.green} ${ task.desc } :: ${ status }`)
		})
	}

	listAllTasksCompleted = (completed = true) => {
		if(completed) {
			this.listOfTasks
				.filter(task => task.completedAt !== null)
				.forEach((task, index) => {
					const idx = `${index + 1}`.green
					console.log(`${ idx }${'.'.green} ${task.desc} :: Completed at: ${ task.completedAt.green }`)
			})
		}
		else {
			this.listOfTasks
				.filter(task => task.completedAt === null)
				.forEach((task, index) => {
					const idx = `${index + 1}`.green
					console.log(`${ idx }${'.'.green} ${task.desc} :: ${ 'Pending'.red }`)
			})
		}
	}

	deleteTask = (id = '') => {
		if(this._listOfTasks[id]) {
			delete this._listOfTasks[id]
		}
	}

	toogleCompleted = (ids = []) => {
		ids.forEach(id => {
			const task = this._listOfTasks[id];
			
			if(!task.completedAt) {
				tasks.completedAt = new Date().toISOString()
			}
		})

		this.listOfTasks.forEach(task => {
			if(!ids.includes(task.id)) {
				this._listOfTasks[task.id].completedAt = null; 
			}
		})
	}
}

module.exports = Tasks