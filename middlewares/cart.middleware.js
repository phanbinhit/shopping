const User = require('../models/user.model');

module.exports = async (req, res, next) => {
    let user = await User.findById(req.signedCookies.userId);
    let number = user.cart.length;
    res.locals.number = number;
    next();  
}