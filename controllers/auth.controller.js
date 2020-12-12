const User = require('../models/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

module.exports = {
    login: async (req, res, next) => {
        res.render('pages/login');
    },
    postLogin: async (req, res, next) => {
        var email = req.body.email;
        var password = req.body.password;

        User.find({email:email}, (err, user) => {
            if (err) {
                console.log(err);
            } else {
                if (!user) {
                    res.render('pages/login');
                }

                bcrypt.compare(password, user.password, (err, isMatch) => {
                    if (err) {
                        console.log(err);
                    }

                    if (!isMatch) {
                        res.render('pages/login');
                    } else {
                        res.redirect('/index')
                    }
                });
            }
        });
    },
    register: async (req, res, next) => {
        res.render('pages/register');
    },
    postRegister: async (req, res, next) => {
        let email = req.body.email;
        let pass = req.body.password
        let user = await User.findOne({
            "email": email
        });
        if (user != null) {
            res.send("false");
            return;
        }
        else {
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
                    res.send("true");
                    return;
                })
                    .catch(error => {
                        res.json({
                            message: 'An error occured'
                        });
                    })
                
            });
            
        }
        
        
    }
}