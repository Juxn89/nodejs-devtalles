class Users {
	constructor() {
		this.people = []
	}

	addPerson(id, name) {
		let person = { id, name }
		this.people.push(person)

		return this.people
	}

	getPerson(id) {
		let person = this.people.filter(person => person.id === id)[0]

		return person
	}

	getPeople() {
		return this.people
	}

	getPersonByRoom(room) {

	}

	removePerson(id) {
		let personRemoved = this.getPerson(id)
		this.people = this.people.filter(person => person.id !== id)

		return personRemoved
	}
}

module.exports = Users