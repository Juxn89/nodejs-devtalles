const { Schema, model } = require('mongoose')

const UserSchema = Schema({
	name: {
		type: String,
		required: [true, 'Name is required']
	},
	email: {
		type: String,
		required: [true, 'email is required'],
		unique: true
	},
	password: {
		type: String,
		required: [true, 'Password is required']
	},
	img: {
		type: String
	},
	role: {
		type: String,
		required: [true, 'Role is required'],
		enum: ['ADMIN_ROLE', 'USER_ROLE', 'SALES_ROLE']
	},
	isActive: {
		type: Boolean,
		default: true
	},
	isGoogleAccount: {
		type: Boolean,
		default: false
	}
})

UserSchema.methods.toJSON = function () {
	const { __v, password, _id, ...user } = this.toObject();
	user.uid = _id;
	return user
}

module.exports = model('Users', UserSchema)