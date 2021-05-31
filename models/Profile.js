const mongoose = require('mongoose');

const ProfileSchema = new mongoose.Schema({
	user: {
		// special type object from the User schema
		type: mongoose.Schema.Types.ObjectId,

		// points to the "User Schema"
		ref: 'user',
	},
	status: {
		type: String,
		required: true,
	},
	restuarant: {
		type: String,
	},

	chefs_dish: {
		type: [String],
		required: true,
	},
	about: {
		type: String,
	},
	experience: [
		{
			title: {
				type: String,
				required: true,
			},
			restuarant: {
				type: String,
				required: true,
			},
			location: {
				type: String,
			},
			from: {
				type: Date,
				required: true,
			},
			to: {
				type: Date,
			},
			current: {
				type: Boolean,
				default: false,
			},
			description: {
				type: String,
			},
		},
	],
	video: {
		odysse: {
			type: String,
		},
	},
	date: {
		type: Date,
		default: Date.now,
	},
});

module.exports = Profile = mongoose.model('profile', ProfileSchema);
