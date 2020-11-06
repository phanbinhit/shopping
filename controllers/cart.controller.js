const User = require('../models/user.model');
const Product = require('../models/product.model');

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

    }
}