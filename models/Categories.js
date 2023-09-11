const { Schema, model } = require('mongoose')

const categorySchema = Schema({
	name: {
		type: String,
		required: [true, 'Category name is mandatory'],
		unique: true
	},
	isActive: {
		type: Boolean,
		default: true,
		required: true
	},
	user: {
		type: Schema.Types.ObjectId,
		ref: 'Users',
		required: true
	}
})

categorySchema.methods.toJSON = function () {
	const { __v, isActive, ...category } = this.toObject();
	return category
}

module.exports = model('Categories', categorySchema)