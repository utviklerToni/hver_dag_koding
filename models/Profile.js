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
	restaurant: {
		type: String,
		required: true,
	},

	dishes: {
		type: [String],
		required: true,
	},
	about: {
		type: String,
	},
	location: {
		type: String,
	},
	experience: [
		{
			title: {
				type: String,
				required: true,
			},
			restaurant: {
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
		youtube: {
			type: String,
		},
	},
	date: {
		type: Date,
		default: Date.now,
	},
});

module.exports = Profile = mongoose.model('profile', ProfileSchema);
