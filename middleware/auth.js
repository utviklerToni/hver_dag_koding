const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = function (req, res, next) {
	// when sending request to a protected route
	// we need to send the token within the header

	// #####################

	// we can get the token from req obj (which has "header" properties)
	// "x-auth-token" is the header key
	const token = req.header('x-auth-token');

	// if no token found
	if (!token) {
		return res.status(401).json({ msg: 'No token, authorization denied' });
	}

	// if token, check if valid or not and run

	try {
		// decoding token
		const decoded = jwt.verify(token, config.get('jwtSecret'));

		// taking the req object and assigning to user
		// we attached user with the id in payload
		req.user = decoded.user; //
		next();
	} catch (err) {
		res.status(401).json({ msg: 'Token is not valid' });
	}
};
