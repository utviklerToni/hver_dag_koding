const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');
// importing the Schemas
const User = require('../../models/User');
const Profile = require('../../models/Profile');

// #req type  > POST
// #endpoint  > api/profile
// #name      > profile route
// #task      > get current users profile
// #access    > private [because it has token attached in the user list]
router.get('/me', auth, async (req, res) => {
	try {
		// the user in {user: req.....} gonna reach out to profile schema
		// and get the user with {type: mongoose.Schema.Types.ObjectId}
		// and it is set to the user.id when it comes with the token

		// also populating from user schema to bring the name and avatar
		const profile = await Profile.findOne({ user: req.user.id }).populate(
			'user',
			['name', 'avatar']
		);

		// if no profile found
		if (!profile) {
			return res.status(400).json({ msg: 'there is no profile for this user' });
		}

		// if profile found
		res.json(profile);
	} catch (err) {
		console.error(err.message);
		res.status(500).send('Server Error');
	}
});

// #req type  > POST
// #endpoint  > api/profile
// #name      > profile route
// #task      > create/update users profile
// #access    > private
router.post(
	'/',
	[
		auth,
		[
			check('status', 'Status is required').not().isEmpty(),
			check('dishes', 'List of dish are required').not().isEmpty(),
		],
	],
	async (req, res) => {
		const errors = validationResult(req);

		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}

		const { restaurant, status, dishes, about, location, odysse, youtube } =
			req.body;

		// setting profileFields
		const profileFields = {};
		// getting "user" from req.user.id from profile schema
		profileFields.user = req.user.id;
		if (restaurant) profileFields.restaurant = restaurant;
		if (status) profileFields.status = status;
		if (about) profileFields.about = about;
		if (location) profileFields.location = location;
		if (dishes) profileFields.dishes = dishes.map((dish) => dish.trim());

		// setting video
		profileFields.video = {};
		if (odysse) profileFields.video.odysse = odysse;
		if (youtube) profileFields.video.youtube = youtube;

		try {
			let profile = await Profile.findOne({ user: req.user.id });

			// if profile found, then update
			// UPDATE
			if (profile) {
				profile = await Profile.findOneAndUpdate(
					{ user: req.user.id },
					{ $set: profileFields },
					{ new: true }
				);

				return res.json(profile);
			}

			// if no profile, then create one
			// CREATE
			profile = new Profile(profileFields);
			await profile.save();

			// send response back
			res.json(profile);
		} catch (err) {
			console.error(err.message);
			res.status(500).send('Server error');
		}
	}
);

module.exports = router;
