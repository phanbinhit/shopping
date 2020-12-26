const User = require('../models/user.model');
module.exports = async function(req, res, next) {
	if (!req.signedCookies.userId) {
		res.redirect('/auth/login');
		return;
	}

	let user = await User.findById(req.signedCookies.userId);
	res.locals.user = user;
	
	next();
}