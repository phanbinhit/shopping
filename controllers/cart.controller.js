const User = require('../models/user.model');
const Product = require('../models/product.model');

module.exports = {
    postID: async (req, res, next) => {
        let products = req.body.product;
        let users = await User.find();
        for (let product of products) {
            // console.log(product);
            User.update(
                {
                    // id can sua
                    "_id": "5f9247eb873dd289ba2b9b32"
                },
                {
                    // xu ly trung cua number
                    "$push": { "cart": { "id": product.id, "number": product.number } }

                },
                function (err, docs) {
                    if (err) throw err;
                }
            )
            
        }
    },
    cart: async (req, res, next) => {
        let users = await User.findById("5f9247eb873dd289ba2b9b32");
        let cart = users.cart;
        let products = [];
        
        for (let product of cart) {
            let prt = await Product.findById(product.id);
            products.push(prt);
        }
        
        res.render('pages/cart', {
            products: products
        });
        
    }
}