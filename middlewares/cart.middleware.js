const User = require('../models/user.model');

module.exports = async (req, res, next) => {
    let user = await User.findById("5f9247eb873dd289ba2b9b32");
    let number = user.cart.length;
    res.locals.number = number;
    next();  
}