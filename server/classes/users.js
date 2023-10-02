class Users {
	constructor() {
		this.people = []
	}

	addPerson(id, name, room) {
		let person = { id, name, room }
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
		let peopleInRoom = this.people.filter(person => person.room === room)
		return peopleInRoom
	}

	removePerson(id) {
		let personRemoved = this.getPerson(id)
		this.people = this.people.filter(person => person.id !== id)

		return personRemoved
	}
}

module.exports = Users