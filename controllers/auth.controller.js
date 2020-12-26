const User = require('../models/user.model');
const Order = require('../models/order.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const express = require('express');
const app = express();

module.exports = {
    login: async (req, res, next) => {
        if (req.signedCookies.userId) {
            res.redirect('/');
            return
        } 
        res.render('pages/login');
    },
    postLogin: (req, res, next) => {
        const email = req.body.email;
        const password = req.body.password;

        User.findOne({ email: email })
            .exec(function (err, user) {
                if (err) {
                    return callback(err)
                } else if (!user) {
                    var err = new Error('User not found.');
                    err.status = 401;
                    return callback(err);
                }
                bcrypt.compare(password, user.password, function (err, result) {
                    if (result === true) {
                        res.cookie('userId', user._id, { signed: true });
                        // res.locals.user = user

                        return res.redirect('/');
                    } else {
                        return console.log('Error');
                    }
                })
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
                    
                    let order = new Order({
                        id_user: user.id,
                        data: []
                    });
                    order.save().then(order => {
                        res.send("true");
                        return;
                    })
                        .catch(error => {
                            res.json({
                                message: 'An error occured'
                            });
                        })
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