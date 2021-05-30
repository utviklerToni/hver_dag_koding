const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');

// #endpoint  > api/auth
// #name      > auth route
// #access    > public
router.get('/', auth, async (req, res) => {
	try {
		const user = await User.findById(req.user.id).select('-password');
		res.json(user);
	} catch (err) {
		console.error(err.message);
		res.status(500).send('Server error');
	}
});

module.exports = router;
