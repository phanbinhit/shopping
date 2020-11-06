const Product = require('../models/product.model');
const User = require('../models/user.model');

module.exports = {
    index: async (req, res, next) => {
        res.render('pages/order')
    },
    detail: async (req, res, next) => {
        let users = await User.findById("5f9247eb873dd289ba2b9b32");
        let cart = users.cart;
        let products = [];

        for (let product of cart) {
            let prt = await Product.findById(product.id);
            products.push(prt);
        }

        res.render('pages/detailOrder', {
            products: products,
            cart: cart
        });;
    }
}