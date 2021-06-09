const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');
// importing the Schemas
const User = require('../../models/User');
const Profile = require('../../models/Profile');
const Post = require('../../models/Post');

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

// routes to create & update profile
// api/profile
// POST request
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
		if (dishes)
			profileFields.dishes = dishes.split(',').map((dish) => dish.trim());

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
			res.status(500).send('server error');
		}
	}
);

// routes to list all the profiles
// GET request
// routes: api/profile
router.get('/', async (req, res) => {
	try {
		const profiles = await Profile.find().populate('user', ['name', 'avatar']);
		res.json(profiles);
	} catch (err) {
		console.error(err.message);
		res.status(500).send('server error');
	}
});

// routes to list profiles by user ID
// GET request
// routes: api/profile/user/:user_ID
router.get('/user/:user_id', async (req, res) => {
	try {
		const profile = await Profile.findOne({
			user: req.params.user_id,
		}).populate('user', ['name', 'avatar']);
		if (!profile)
			return res
				.status(400)
				.json({ msg: 'No profile for this user, maybe create one?' });

		res.json(profile);
	} catch (err) {
		console.error(err.message);

		if (err.kind == 'ObjectId') {
			return res
				.status(400)
				.json({ msg: 'No profile for this user, maybe create one?' });
		}

		res.status(500).send('server error');
	}
});

// route  => DELETE api/profile
// desc   => delete profile, user and its posts
// access => Private
router.delete('/', auth, async (req, res) => {
	try {
		// removing user posts before permanently deleting their account
		await Post.deleteMany({ user: req.user.id });

		await Profile.findOneAndRemove({ user: req.user.id });

		await User.findOneAndRemove({ _id: req.user.id });

		res.json({ msg: 'user deleted' });
	} catch (err) {
		console.error(err.message);
		res.status(500).send('server error');
	}
});

// route => api/profile/experince
// desc => add profile experince
// access => private
router.put(
	'/experience',
	[
		auth,
		[
			check('title', 'Title is required').not().isEmpty(),
			check('restaurant', 'company name is required').not().isEmpty(),
			check('from', 'From date is required').not().isEmpty(),
		],
	],
	async (req, res) => {
		const errors = validationResult(req);

		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}

		const { title, restaurant, location, from, to, current, description } =
			req.body;

		const newExp = {
			title,
			restaurant,
			location,
			from,
			to,
			current,
			description,
		};

		try {
			const profile = await Profile.findOne({ user: req.user.id });
			profile.experience.unshift(newExp);
			await profile.save();

			res.json(profile);
		} catch (err) {
			console.error(err.message);
			res.status(500).send('server error');
		}
	}
);

// route 	=> api/profile/experince/:exp_id
// desc  	=> Delete profile experince
// access => private
router.delete('/experience/:exp_id', auth, async (req, res) => {
	try {
		const profile = await Profile.findOne({ user: req.user.id });

		const removeIndex = profile.experience
			.map((item) => item.id)
			.indexOf(req.params.exp_id);

		profile.experience.splice(removeIndex, 1);

		await profile.save();

		res.json(profile);
	} catch (err) {
		res.status(500).send('server error');
	}
});

module.exports = router;
