const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');

// importing the Schemas
const User = require('../../models/User');
const Profile = require('../../models/Profile');

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

module.exports = router;
