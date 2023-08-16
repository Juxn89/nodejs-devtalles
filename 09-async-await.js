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

	return new Promise( (resolve, reject) => {
		if(employee)
			resolve(employee)
		else
			reject(`Employee with ID ${id} doesn't exist`)
	})
}

const getSalary = (id) => {
	const salary = salaries.find(salary => salary.id === id)?.salary;

	return new Promise( (resolve, reject) => {
		if(salary)
			resolve(salary)
		else
			reject(`Salary with ID ${id} not found!`)
	} )
}

const ID = 3;

const getInfoUser = async (id) => {
	try {
		const employee = await getEmployee(id);
		const salary = await getSalary(id);

		return `Employee ${ employee.name } with salary of ${ salary }`		
	} catch (error) {
		throw error
	}
}

getInfoUser(ID)
	.then(msg => console.log(msg))
	.catch(err => console.error(err));