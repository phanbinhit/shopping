const { response } = require("express")

const Product = require('../models/product.model');
module.exports = {
    singleProduct: async (req, res, next) => {
        let id = req.params.id;
        let product = await Product.findById(id);
        res.render('pages/product', { product: product });
    }
}