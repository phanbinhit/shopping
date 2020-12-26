module.exports = function(req, res, next) {
	if (!req.signedCookies.userId) {
		res.redirect('/auth/login');
		return;
	}
	
	next();
}