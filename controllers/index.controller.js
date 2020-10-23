const Product = require('../models/product.model');

module.exports = {
    index: async (req, res, next) => {
        let products = await Product.find();
        res.render('pages/index', {products: products});
    }
}