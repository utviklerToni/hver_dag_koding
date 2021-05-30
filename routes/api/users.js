const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');

// #route type > POST
// #endpoint   > api/users
// #name       > test route
// #access     > public

router.post(
	'/',
	[
		check('name', 'Name is necessary').not().isEmpty(),
		check('email', 'Please include a valid email').isEmail(),
		check(
			'password',
			'Please enter a password of minimum 6 characters'
		).isLength({ min: 6 }),
	],
	(req, res) => {
		const errors = validationResult(req);

		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}

		res.send('user route');
	}
);

module.exports = router;
