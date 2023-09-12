const { Schema, model } = require('mongoose')

const ProductsSchema = Schema({
	name: {
		type: String,
		required: [true, 'Product name is mandatory'],
		unique: true
	},
	description: {
		type: String,		
	},
	isAvailable: {
		type: Boolean,
		default: true
	},
	isActive: {
		type: Boolean,
		default: true,
		required: true
	},
	price: {
		type: Number,
		default: 0
	},
	category: {
		type: Schema.Types.ObjectId,
		ref: 'Categories',
		required: true
	},
	user: {
		type: Schema.Types.ObjectId,
		ref: 'Users',
		required: true
	}
})

ProductsSchema.methods.toJSON = function() {
	const { __v, isActive, ...product } = this.toObject()
	return product
}

module.exports = model('Products', ProductsSchema)