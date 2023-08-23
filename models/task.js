const { v4: uuidv4 } = require('uuid')
class Task {
	id = ''
	desc = ''
	completedAt = ''

	constructor(desc) {
		this.id = uuidv4()
		this.desc = desc
		this.completedAt = null
	}
}

module.exports = Task