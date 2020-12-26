const User = require('../models/user.model');

module.exports = async (req, res, next) => {
    let user = await User.findById("5fe6d6dc2040797fac54da43");
    let number = user.cart.length;
    res.locals.number = number;
    next();  
}