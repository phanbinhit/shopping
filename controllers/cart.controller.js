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
            products: products
        });
        
    },
    addCart: async (req, res, next) => {
        let data = req.query.product;
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
        res.locals.number = res.locals.number++;
        res.redirect('/');
    }
}