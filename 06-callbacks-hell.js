const employees = [
	{ id: 1, name: 'Juan' },
	{ id: 2, name: 'Carlos' },
	{ id: 3, name: 'Santiago' }
]

const salaries = [
	{ id: 1, salary: 2000 },
	{ id: 2, salary: 4000 }
]

const getEmployee = (id, callback) => {
	const employee = employees.find(employee => employee.id === id);

	if(employee) 
		callback(null, employee)
	else
		callback(`Employee with ID ${id} doesn't exist`)
}

const getSalary = (id, callback) => {
	const salary = salaries.find(salary => salary.id === id)?.salary;

	if(salary) {
		callback(null, salary)
	}
	else {
		callback(`Salary with ID ${id} not found!`)
	}
}

const ID = 3;

getEmployee( ID, (err, employee) => {
	if(err) {
		console.error('Error');
		return console.error(err)
	}
	
	getSalary(ID, (err, salary) => {
		if(err) {
			return console.error(err)
		}

		console.log(`Employee: ${ employee.name } has a salary of: ${ salary }`)
	})	
})



