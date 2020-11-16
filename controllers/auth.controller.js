const User = require('../models/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

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
    },
    register: async (req, res, next) => {
        res.render('pages/register');
    },
    postRegister: async (req, res, next) => {
        bcrypt.hash(req.body.password, 10, function (err, hashedPass) {
            if (err) {
                res.json({
                    error: err
                });
            }

            let user = new User({
                fullname: req.body.name,
                email: req.body.email,
                password: hashedPass,
                role: "user"
            });
            user.save().then(user => {
                res.redirect('/auth/login');
            })
                .catch(error => {
                    res.json({
                        message: 'An error occured'
                    });
                })
        });
    }
}