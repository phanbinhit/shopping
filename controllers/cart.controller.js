const User = require('../models/user.model');
const Product = require('../models/product.model');
const mongoose = require('mongoose');
const Order = require('../models/order.model');

module.exports = {
    cart: async (req, res, next) => {
        let users = await User.findById("5f9247eb873dd289ba2b9b32");
        let cart = users.cart;
        let products = [];

        for (let product of cart) {
            let prt = await Product.findById(product.id);
            products.push(prt);
        }

        res.render('pages/cart', {
            products: products,
            cart: cart
        });
    },
    addCart: async (req, res, next) => {
        let data = req.query.product;
        let users = await User.findById("5f9247eb873dd289ba2b9b32");
        let cart = users.cart;
        
        let ids = cart.map((item) => {
            return item.id
        })

        let isSuccess = ids.indexOf(data.id)
        if (isSuccess == -1) {
            User.updateOne(
                {
                    // id can sua
                    "_id": "5f9247eb873dd289ba2b9b32"
                },
                {
                    // xu ly trung cua number
                    "$push": { "cart": { "id": data.id, "number": data.number } }

                },
                function (err, docs) {
                    if (err) throw err;
                }
            );

        }
        res.send(isSuccess + "")
        return
        res.redirect('/' + data.href);
    },
    postEditCart: async (req, res, next) => {
        let data = req.body.product;
        User.updateOne(
            {"_id": "5f9247eb873dd289ba2b9b32", "cart.id": data.id},
            { "$set": { "cart.$.number": data.number } },
            function(err, docs) {
                if (err) throw err;
            }
        )
        res.redirect('/cart');
    },
    deleteProduct: async(req, res, next) => {
        let data = req.body.product;
        let isSuccess = true;
        User.updateOne(
            {"_id": "5f9247eb873dd289ba2b9b32", "cart.id": data.id},
            { "$pull": { "cart": data } },
            function(err, docs) {
                if (err) throw err;
                isSuccess = false;
                
            }
        )
        res.send(isSuccess + "");
        return 
        res.redirect('/cart')
    },

    buyCart: async (req, res, next) => {
        res.render('pages/buy');
    },

    postOrder: async (req, res, next) => {
        let data = req.body;
        let user = await User.findById("5f9247eb873dd289ba2b9b32");
        let cart = user.cart;
        let order = user.order;
        let dataOrder = {
            id: mongoose.Types.ObjectId(),
            state: "Delivery",
            time: getCurrentTime(),
            method: data.method,
            address: data.address,
            name: data.name,
            phone: data.phone,
            data: cart
        };
        console.log(dataOrder);
        Order.updateOne(
            {"id_user": "5f9247eb873dd289ba2b9b32"},
            {"$push": {"data": dataOrder}},
            (err, docs) => {
                if (err) throw err;
            }
        );
        User.updateOne(
            {"_id": "5f9247eb873dd289ba2b9b32"},
            {"$set": {"cart": []}},
            (err, docs) => {
                if (err) throw err;
            }
        );
        res.redirect('/order');
    }
}

function getCurrentTime() {
    let date = new Date();
    return date.toLocaleTimeString() + " " + date.toLocaleDateString();
}