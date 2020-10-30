const User = require('../models/user.model');
const Product = require('../models/product.model');


module.exports = {
    login: async (req, res, next) => {
        res.render('pages/login');     
    },
    postLogin: async (req, res, next) => {
        let data = req.body;
        let email = data.email;
        let password = data.password;
        let user = await User.findOne({
            "email": email,
            "password": password
        });
        if (user) {
            res.cookie('email', email, { signed: true });
            console.log('Signed Cookies: ', req.signedCookies);
            res.redirect('/');
        } else {
            console.log('Cookies: ', req.cookies);
            res.redirect('/auth/login');
        }
    }
}