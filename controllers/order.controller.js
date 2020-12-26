const Product = require('../models/product.model');
const User = require('../models/user.model');
const Order = require('../models/order.model');

module.exports = {
    index: async (req, res, next) => {
        let user = await User.findById(req.signedCookies.userId);
        if (user.role === "admin") {
            res.redirect('/admin/products');
            return;
        }
        let order = await Order.findOne({ "id_user": req.signedCookies.userId });
        let data = order.data;
        res.render('pages/order', { order: data });
    },
    detail: async (req, res, next) => {
        let user = await User.findById(req.signedCookies.userId);
        if (user.role === "admin") {
            res.redirect('/admin/products');
            return;
        }
        let order = await Order.findOne({ "id_user": req.signedCookies.userId });
        let dataDb = order.data;
        let products = [];
        let data = [];
        let idOrder = req.params.id;
        for (let order of dataDb) {
            if (order.id == idOrder) {
                data = order.data;
                break;
            }
        }

        for (let item of data) {
            let prt = await Product.findById(item.id);
            products.push(prt);
        }

        res.render('pages/detailOrder', {
            products: products,
            data: data
        });;
    }
}